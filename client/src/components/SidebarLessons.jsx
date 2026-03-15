import { PlayCircle, CheckCircle } from 'lucide-react';

export default function SidebarLessons({ lessons, currentLessonId, onSelectLesson, progress }) {
    return (
        <div className="bg-white w-full md:w-80 h-full border-r border-gray-200 flex flex-col overflow-hidden font-sans">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900">Course Content</h2>
            </div>
            <div className="overflow-y-auto flex-1 custom-scrollbar">
                {lessons.map((lesson, idx) => {
                    const isCompleted = progress.some(p => p.lessonId === lesson._id && p.status === 'completed');
                    const isActive = currentLessonId === lesson._id;
                    return (
                        <button
                            key={lesson._id}
                            onClick={() => onSelectLesson(lesson._id)}
                            className={`w-full text-left p-4 flex gap-3 items-start border-b border-gray-200 transition-colors ${isActive ? 'bg-purple-50' : 'hover:bg-gray-100'}`}
                        >
                            <div className="mt-0.5 flex-shrink-0">
                                {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                ) : (
                                    <PlayCircle className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm leading-relaxed ${isActive ? 'text-purple-900 font-bold' : 'text-gray-900 font-normal'}`}>
                                    {idx + 1}. {lesson.title}
                                </p>
                            </div>
                        </button>
                    );
                })}
                {lessons.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No lessons available.
                    </div>
                )}
            </div>
        </div>
    );
}
