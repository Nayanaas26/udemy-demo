import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Star, Award, Clock, PlayCircle } from 'lucide-react';

export default function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data } = await api.get(`/courses/${id}`);
                setCourse(data);
            } catch (error) {
                console.error("Course fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleEnroll = () => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
        } else {
            navigate(`/learn/${id}`);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center py-32 bg-white min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
    );
    if (!course) return <div className="text-center py-20 text-gray-800 bg-white min-h-screen">Course not found</div>;

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Dark Header Banner */}
            <div className="bg-gray-900 text-white">
                <div className="max-w-[1200px] mx-auto px-6 py-10 relative flex flex-col lg:flex-row gap-8">
                    
                    {/* Main Content Info */}
                    <div className="lg:w-2/3 pr-4">
                        <div className="text-sm font-bold text-purple-400 mb-4 flex items-center gap-2">
                            <span>Development</span> &gt; <span>Web Development</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-black mb-4 leading-tight">
                            {course.title}
                        </h1>
                        <p className="text-lg mb-6 leading-relaxed">
                            {course.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="bg-[#eceb98] text-gray-900 text-xs font-bold px-2 py-1 mr-2 hidden sm:inline-block">Bestseller</span>
                            <span className="text-yellow-500 font-bold">4.6</span>
                            <div className="flex text-yellow-500">
                                <Star className="w-4 h-4 fill-current"/>
                                <Star className="w-4 h-4 fill-current"/>
                                <Star className="w-4 h-4 fill-current"/>
                                <Star className="w-4 h-4 fill-current"/>
                                <Star className="w-4 h-4 fill-current text-white/30" />
                            </div>
                            <span className="text-purple-300 underline">(12,945 ratings)</span>
                            <span className="text-white ml-2">123,456 students</span>
                        </div>

                        <div className="text-sm mb-6 flex flex-col gap-1">
                            <div>Created by <span className="text-purple-300 underline">{course.instructor?.name || 'Expert Instructor'}</span></div>
                        </div>
                    </div>

                    {/* Floating Sidebar Card */}
                    <div className="lg:absolute lg:top-10 lg:right-6 lg:w-[340px] bg-white border border-gray-200 text-gray-900 shadow-xl overflow-hidden self-center lg:self-start w-full max-w-sm">
                        <div className="relative aspect-video hidden lg:block border-b border-gray-200">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                <PlayCircle className="w-16 h-16 text-white" />
                                <span className="absolute bottom-2 font-bold text-white mb-2">Preview this course</span>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-4 mt-2">
                                <span className="text-3xl font-black">Free</span>
                                <span className="text-sm font-bold bg-green-100 px-2 py-1 rounded text-green-800">100% off</span>
                            </div>
                            
                            <button 
                                onClick={handleEnroll}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 transition-colors mb-2 text-lg mt-4"
                            >
                                Start Learning Now
                            </button>
                            
                            <p className="text-center text-xs text-gray-600 mb-6">Start immediately, no credit card required.</p>
                            
                            <div className="text-sm">
                                <h4 className="font-bold mb-2">This course includes:</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex gap-2 items-center"><PlayCircle className="w-4 h-4"/> 10 hours on-demand video</li>
                                    <li className="flex gap-2 items-center"><Award className="w-4 h-4"/> Certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="max-w-[1200px] mx-auto px-6 pt-10 lg:pt-20 pb-20">
                <div className="lg:w-2/3">
                    <div className="border border-gray-300 p-6 bg-gray-50 mb-10">
                        <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-gray-900 mt-0.5">✓</span> Build amazing applications
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-900 mt-0.5">✓</span> Master modern technologies
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-900 mt-0.5">✓</span> Write clean, performant code
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gray-900 mt-0.5">✓</span> Deploy to production easily
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
