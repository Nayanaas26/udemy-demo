import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarLessons from '../components/SidebarLessons';
import VideoPlayer from '../components/VideoPlayer';
import ProgressBar from '../components/ProgressBar';
import api from '../api/api';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen } from 'lucide-react';

export default function LearningPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [progress, setProgress] = useState([]);
    const [courseProgress, setCourseProgress] = useState(0);
    const [loading, setLoading] = useState(true);

    const checkUser = () => {
        let user = null;
        try {
            const userStr = localStorage.getItem('user');
            if (userStr && userStr !== 'undefined') {
                user = JSON.parse(userStr);
            }
        } catch (e) {
            localStorage.removeItem('user');
        }
        if (!user) navigate('/login');
        return user;
    };

    useEffect(() => {
        const user = checkUser();
        if(!user) return;

        const fetchData = async () => {
            // Fetch lessons first — this always works without auth
            let lessonsData = [];
            try {
                const lessonsRes = await api.get(`/lessons/${courseId}`);
                lessonsData = lessonsRes.data;
                setLessons(lessonsData);
            } catch (error) {
                console.error("Failed to fetch lessons", error);
            }

            // Fetch user progress (requires auth) — fail gracefully
            let completedLessonIds = [];
            try {
                const progressRes = await api.get(`/progress/${user._id}`);
                setProgress(progressRes.data);
                completedLessonIds = progressRes.data
                    .filter(p => p.status === 'completed')
                    .map(p => String(p.lessonId));
            } catch (error) {
                console.warn("Could not load progress, defaulting to 0%", error);
            }

            // Fetch course progress percentage — fail gracefully
            try {
                const cProgressRes = await api.get(`/progress/course/${courseId}`);
                if (cProgressRes.data.percentage !== undefined) {
                    setCourseProgress(cProgressRes.data.percentage);
                }
            } catch (error) {
                console.warn("Could not load course progress", error);
            }

            // Set the first uncompleted lesson
            if (lessonsData.length > 0) {
                let nextLesson = lessonsData[0];
                for (const lesson of lessonsData) {
                    if (!completedLessonIds.includes(String(lesson._id))) {
                        nextLesson = lesson;
                        break;
                    }
                }
                setCurrentLesson(nextLesson);
            }
            setLoading(false);
        };

        fetchData();
    }, [courseId, navigate]);

    const handleLessonComplete = async () => {
        try {
            await api.post('/progress/update', { courseId, lessonId: currentLesson._id });
            const user = checkUser();
            const [progressRes, cProgressRes] = await Promise.all([
                api.get(`/progress/${user._id}`),
                api.get(`/progress/course/${courseId}`)
            ]);
            setProgress(progressRes.data);
            setCourseProgress(cProgressRes.data.percentage);
            
            // Move to next lesson if available
            const currentIndex = lessons.findIndex(l => l._id === currentLesson._id);
            if (currentIndex < lessons.length - 1) {
                setCurrentLesson(lessons[currentIndex + 1]);
            }
        } catch (error) {
            console.error("Failed to update progress", error);
        }
    };

    const isLessonCompleted = currentLesson ? progress.some(p => p.lessonId === currentLesson._id && p.status === 'completed') : false;

    return (
        <div className="flex flex-col md:flex-row bg-white overflow-hidden font-sans border-t border-gray-200" style={{ height: 'calc(100vh - 73px)' }}>
            <SidebarLessons 
                lessons={lessons} 
                currentLessonId={currentLesson?._id} 
                onSelectLesson={(id) => setCurrentLesson(lessons.find(l => l._id === id))} 
                progress={progress} 
            />
            
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-white">
                <div className="max-w-5xl mx-auto flex flex-col h-full">
                    <div className="mb-8 pt-2">
                        <ProgressBar percentage={courseProgress} />
                    </div>

                    {currentLesson ? (
                        <>
                            <div className="flex items-center justify-between bg-white py-4 px-6 rounded border border-gray-200 shadow-sm mb-6">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex flex-col md:flex-row md:items-center gap-3">
                                    <span className="flex items-center gap-2"><BookOpen className="w-6 h-6 text-purple-600" /> {currentLesson.title}</span>
                                </h2>
                                {isLessonCompleted && <span className="text-emerald-700 flex items-center gap-1.5 text-sm font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 whitespace-nowrap"><CheckCircle className="w-4 h-4"/> Done</span>}
                            </div>
                            
                            <div className="flex-grow flex flex-col mb-8 shadow-md">
                                <VideoPlayer videoId={currentLesson.youtubeId} />
                            </div>
                            
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 p-6 rounded border border-gray-200 shadow-sm">
                                <button 
                                    className="w-full sm:w-auto px-6 py-3 border border-gray-900 bg-white hover:bg-gray-100 text-gray-900 rounded transition-colors flex items-center justify-center gap-2 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => {
                                        const idx = lessons.findIndex(l => l._id === currentLesson._id);
                                        if(idx > 0) setCurrentLesson(lessons[idx - 1]);
                                    }}
                                    disabled={lessons.findIndex(l => l._id === currentLesson._id) === 0}
                                >
                                    <ArrowLeft className="w-5 h-5"/> Previous
                                </button>
                                
                                {!isLessonCompleted ? (
                                    <button 
                                        className="w-full sm:w-auto px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded transition-colors font-bold flex items-center justify-center gap-2"
                                        onClick={handleLessonComplete}
                                    >
                                        Complete &amp; Continue <CheckCircle className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button 
                                        className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors flex items-center justify-center gap-2 font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => {
                                            const idx = lessons.findIndex(l => l._id === currentLesson._id);
                                            if(idx < lessons.length - 1) setCurrentLesson(lessons[idx + 1]);
                                        }}
                                        disabled={lessons.findIndex(l => l._id === currentLesson._id) === lessons.length - 1}
                                    >
                                        Next Lesson <ArrowRight className="w-5 h-5"/>
                                    </button>
                                )}
                            </div>
                        </>
                    ) : loading ? (
                        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded border border-gray-200 min-h-[300px]">
                            <p className="text-gray-600 text-lg flex items-center gap-2">
                                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-purple-600"></span> Loading lessons...
                            </p>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded border border-gray-200 min-h-[300px] gap-4">
                            <BookOpen className="w-12 h-12 text-gray-400" />
                            <p className="text-gray-600 text-lg font-bold">No lessons found for this course.</p>
                            <p className="text-gray-500 text-sm">Please select a lesson from the sidebar.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
