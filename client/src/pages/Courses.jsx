import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/api';
import CourseCard from '../components/CourseCard';
import { Search, Filter, Youtube, Database } from 'lucide-react';
import axios from 'axios';

const API_KEY = "YOUR_API_KEY";

export default function Courses() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [courses, setCourses] = useState([]);
    const [youtubeCourses, setYoutubeCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [activeTab, setActiveTab] = useState('local'); // 'local' or 'youtube'

    useEffect(() => {
        setSearchTerm(searchParams.get('search') || '');
    }, [searchParams]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Fetch local DB courses
                const { data } = await api.get('/courses');
                setCourses(data);

                // Fetch YouTube courses automatically
                if (API_KEY === "YOUR_API_KEY") {
                    // Provide mock data if the user hasn't added their real key yet
                    setYoutubeCourses([
                        {
                            _id: 'K5KVEU3aaeQ',
                            title: 'Full Stack React & Node.js Programming Course',
                            description: 'Learn MERN stack by building projects.',
                            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
                            instructor: { name: 'Traversy Media' },
                            isYouTube: true
                        },
                        {
                            _id: 'D1eL1EnxXXQ',
                            title: 'Complete Web Development Bootcamp',
                            description: 'Become a full-stack web developer with just one course.',
                            thumbnail: 'https://images.unsplash.com/photo-1627398246454-e873918408f9?w=800&q=80',
                            instructor: { name: 'Programming with Mosh' },
                            isYouTube: true
                        },
                        {
                            _id: '8aGhPhKrqqc',
                            title: 'Next.js 14 Full Course 2024',
                            description: 'Build and deploy a full stack Next.js application.',
                            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
                            instructor: { name: 'JavaScript Mastery' },
                            isYouTube: true
                        },
                        {
                            _id: 'xVqNEWU5Tjc',
                            title: 'Python for Beginners - Full Course',
                            description: 'Learn Python programming from scratch in this full 4 hour course.',
                            thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=800&q=80',
                            instructor: { name: 'Programming with Mosh' },
                            isYouTube: true
                        },
                        {
                            _id: 't2CEgPsws3U',
                            title: 'Data Structures and Algorithms in Java',
                            description: 'Comprehensive DSA course covering arrays, lists, trees, and more.',
                            thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
                            instructor: { name: 'freeCodeCamp' },
                            isYouTube: true
                        },
                        {
                            _id: 'qz0aGYrrlhU',
                            title: 'HTML Tutorial for Beginners',
                            description: 'Learn HTML in 1 hour!',
                            thumbnail: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&q=80',
                            instructor: { name: 'Programming with Mosh' },
                            isYouTube: true
                        },
                        {
                            _id: 'ZzaPdXTrSb8',
                            title: 'C++ Programming Course - Beginner to Advanced',
                            description: 'Learn C++ from scratch to advanced topics like pointers and OOP.',
                            thumbnail: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c8f1?w=800&q=80',
                            instructor: { name: 'freeCodeCamp' },
                            isYouTube: true
                        },
                        {
                            _id: 'YSgRW-X3K_Q',
                            title: 'Go Programming – Golang Course',
                            description: 'Learn the Go programming language in this full tutorial for beginners.',
                            thumbnail: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=800&q=80',
                            instructor: { name: 'Programming with Mosh' },
                            isYouTube: true
                        },
                        {
                            _id: 'OK_JCtrrv-c',
                            title: 'PHP Full Course for Non-Haters',
                            description: 'A complete beginner tutorial covering everything you need to know about PHP.',
                            thumbnail: 'https://images.unsplash.com/photo-1599507593499-a3f7d1d08731?w=800&q=80',
                            instructor: { name: 'Traversy Media' },
                            isYouTube: true
                        },
                        {
                            _id: 't_ispmWxwI8',
                            title: 'Ruby Programming Language - Full Course',
                            description: 'Learn the Ruby programming language in this comprehensive tutorial.',
                            thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
                            instructor: { name: 'freeCodeCamp' },
                            isYouTube: true
                        }
                    ]);
                } else {
                    const ytRes = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=programming%20course&key=${API_KEY}`);
                    const formattedYoutubeCourses = ytRes.data.items.map(item => ({
                        _id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
                        instructor: { name: item.snippet.channelTitle },
                        isYouTube: true
                    }));
                    setYoutubeCourses(formattedYoutubeCourses);
                }
            } catch (error) {
                console.error("Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const activeCoursesList = activeTab === 'local' ? courses : youtubeCourses;

    const filteredCourses = activeCoursesList.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center items-center py-32 font-sans bg-white min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen font-sans border-t border-gray-200">
            <div className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="flex flex-col mb-8 gap-4">
                    <h1 className="text-3xl font-black text-gray-900 font-serif">All Courses</h1>
                    
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex rounded-md shadow-sm" role="group">
                            <button 
                                onClick={() => setActiveTab('local')}
                                className={`px-4 py-2 text-sm font-bold flex items-center gap-2 border border-gray-900 rounded-l-lg transition-colors ${activeTab === 'local' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
                            >
                                <Database className="w-4 h-4"/> Local DB Courses
                            </button>
                            <button 
                                onClick={() => setActiveTab('youtube')}
                                className={`px-4 py-2 text-sm font-bold flex items-center gap-2 border-t border-b border-r border-gray-900 rounded-r-lg transition-colors ${activeTab === 'youtube' ? 'bg-red-600 border-red-600 text-white' : 'bg-white text-red-600 hover:bg-red-50'}`}
                            >
                                <Youtube className="w-4 h-4"/> YouTube Courses
                            </button>
                        </div>

                        <div className="relative flex-grow max-w-md ml-auto">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    if(e.target.value) {
                                        setSearchParams({ search: e.target.value });
                                    } else {
                                        setSearchParams({});
                                    }
                                }}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-900 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-colors rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">{filteredCourses.length} results found in {activeTab === 'local' ? 'Database' : 'YouTube API'}</h2>
                </div>

                {filteredCourses.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-gray-600 text-lg">No courses found matching your search. Try different keywords.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-4">
                        {filteredCourses.map(course => (
                           <div key={course._id}>
                             <CourseCard course={course} />
                           </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
