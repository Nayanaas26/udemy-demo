import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Search, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    let user = null;
    try {
        const userStr = localStorage.getItem('user');
        if (userStr && userStr !== 'undefined') {
            user = JSON.parse(userStr);
        }
    } catch (e) {
        localStorage.removeItem('user');
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 py-3 px-6 sticky top-0 z-50 shadow-sm font-sans">
            <div className="max-w-[1400px] mx-auto flex items-center gap-4 lg:gap-6">
                <Link to="/" className="flex-shrink-0">
                    <h1 className="text-2xl font-black tracking-tight text-gray-900">EduLMS</h1>
                </Link>
                
                <Link to="/courses" className="hidden md:block text-sm font-normal text-gray-700 hover:text-purple-700 cursor-pointer transition-colors whitespace-nowrap">
                    Categories
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden md:flex items-center border border-gray-900 rounded-full px-4 py-2 flex-grow bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-600 transition-all">
                    <button type="submit">
                        <Search className="w-5 h-5 text-gray-500 mr-2" />
                    </button>
                    <input 
                        type="text" 
                        placeholder="Search for anything" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent text-sm w-full outline-none text-gray-900 placeholder-gray-500"
                    />
                </form>

                <Link to="/courses" className="hidden lg:block text-sm text-gray-700 hover:text-purple-700 transition-colors whitespace-nowrap">
                    All Courses
                </Link>
                
                <Link to={user && user.role === 'instructor' ? "/instructor/upload" : "/dashboard"} className="hidden lg:block text-sm text-gray-700 hover:text-purple-700 cursor-pointer whitespace-nowrap">
                    Teach on EduLMS
                </Link>

                <div className="flex flex-shrink-0 items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-gray-800 hidden sm:block">Hi, {user.name}</span>
                            <button onClick={handleLogout} className="text-sm font-bold flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors">
                                <LogOut className="w-4 h-4"/>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="border border-gray-900 text-gray-900 hover:bg-gray-100 font-bold text-sm px-4 py-2 rounded transition-colors whitespace-nowrap">Log in</Link>
                            <Link to="/signup" className="border border-transparent bg-gray-900 text-white hover:bg-gray-800 font-bold text-sm px-4 py-2 rounded transition-colors whitespace-nowrap">Sign up</Link>
                        </div>
                    )}
                    
                    {!user && (
                        <button className="hidden md:flex border border-gray-900 text-gray-900 hover:bg-gray-100 p-2 rounded items-center justify-center transition-colors">
                            <Globe className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
