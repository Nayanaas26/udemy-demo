import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function CourseCard({ course }) {
    return (
        <Link to={`/courses/${course._id}`} className="group flex flex-col h-full font-sans cursor-pointer transition-transform duration-200">
            <div className="relative overflow-hidden border border-gray-200 aspect-video mb-2">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
            </div>
            <div className="flex flex-col flex-grow">
                <h3 className="text-base font-bold leading-tight mb-1 line-clamp-2 text-gray-900 group-hover:text-purple-800 transition-colors">
                    {course.title}
                </h3>
                <p className="text-xs text-gray-600 mb-1 line-clamp-1">{course.instructor?.name || 'Instructor'}</p>
                
                {/* Fake Rating */}
                <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm font-bold text-yellow-700">4.6</span>
                    <div className="flex items-center text-yellow-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current text-gray-300" />
                    </div>
                    <span className="text-xs text-gray-500">(1,234)</span>
                </div>
                
                {/* Free Badge */}
                <div className="flex items-center gap-2 mt-auto">
                    <span className="font-bold text-gray-900 text-base">Free</span>
                </div>
                {/* Bestseller badge if it exists */}
                {course.title?.length % 2 === 0 && ( /* Fake logic for bestseller */
                     <div className="mt-2">
                         <span className="bg-[#eceb98] text-gray-900 text-xs font-bold px-2 py-1">Bestseller</span>
                     </div>
                )}
            </div>
        </Link>
    );
}
