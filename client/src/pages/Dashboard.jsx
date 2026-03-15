import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Clock, Activity, LogOut, PlusCircle } from 'lucide-react';
import api from '../api/api';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [progressStats, setProgressStats] = useState([]);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            navigate('/login');
            return;
        }
        const u = JSON.parse(userStr);
        setUser(u);

        if (u.role === 'student') {
            const fetchProgress = async () => {
                try {
                    const { data } = await api.get(`/progress/${u._id}`);
                    setProgressStats(data);
                } catch (error) {
                    console.error("Failed to fetch progress", error);
                }
            };
            fetchProgress();
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
    };

    if (!user) return null;

    return (
        <div className="flex min-h-[calc(100vh-73px)] bg-gray-900 border-t border-gray-800 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-center font-bold text-gray-100">{user.name}</div>
                    <div className="text-center text-sm text-gray-400 capitalize">{user.role}</div>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-purple-900/40 text-purple-300 font-bold rounded-lg border-l-4 border-purple-500">
                        <LayoutDashboard className="w-5 h-5"/> Dashboard
                    </Link>
                    <Link to="/courses" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                        <BookOpen className="w-5 h-5"/> Explore Courses
                    </Link>
                    {user.role === 'student' && (
                        <>
                            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                                <Clock className="w-5 h-5"/> My Learning
                            </Link>
                            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                                <Activity className="w-5 h-5"/> Progress
                            </Link>
                        </>
                    )}
                    {user.role === 'instructor' && (
                        <Link to="/instructor/upload" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                            <PlusCircle className="w-5 h-5"/> Create Course
                        </Link>
                    )}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-gray-700 rounded-lg transition-colors font-bold">
                        <LogOut className="w-5 h-5"/> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-black text-white mb-8">Welcome back, {user.name}!</h1>
                
                {user.role === 'student' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-purple-500/20 rounded-lg"><Activity className="w-6 h-6 text-purple-400"/></div>
                                <div>
                                    <h3 className="text-gray-400 font-bold">Total Lessons Completed</h3>
                                    <p className="text-2xl font-black text-white">{progressStats.filter(p => p.status === 'completed').length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg text-center">
                        <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Manage Your Courses</h2>
                        <p className="text-gray-400 mb-6">Upload new courses and lessons to your students.</p>
                        <Link to="/instructor/upload" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            <PlusCircle className="w-5 h-5"/> Upload New Course
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
