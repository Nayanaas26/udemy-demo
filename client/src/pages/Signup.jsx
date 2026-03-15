import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { UserPlus } from 'lucide-react';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/signup', { name, email, password });
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/courses');
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to sign up");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans border-t border-gray-200">
            <div className="max-w-md w-full py-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Sign up and start learning</h2>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            required
                            className="block w-full px-4 py-4 bg-white border border-gray-900 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 transition-colors"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            required
                            className="block w-full px-4 py-4 bg-white border border-gray-900 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 transition-colors"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            required
                            className="block w-full px-4 py-4 bg-white border border-gray-900 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 transition-colors"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-start mt-2 mb-4">
                        <div className="flex items-center h-5">
                            <input id="tips" type="checkbox" className="w-4 h-4 border border-gray-900 rounded bg-white focus:ring-3 focus:ring-purple-300 accent-purple-600" />
                        </div>
                        <label htmlFor="tips" className="ml-2 text-sm font-medium text-gray-900">Send me personalized recommendations, and learning tips.</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-4 px-4 border border-transparent font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Creating account...' : <span className="flex items-center gap-2">Sign up <UserPlus className="w-5 h-5" /></span>}
                    </button>
                    
                    <div className="text-center text-xs text-gray-600 mt-4 leading-relaxed">
                        By signing up, you agree to our <span className="underline cursor-pointer hover:text-purple-700">Terms of Use</span> and <span className="underline cursor-pointer hover:text-purple-700">Privacy Policy</span>.
                    </div>
                </form>
                
                <div className="mt-6 text-center text-sm border-t border-gray-200 pt-6">
                    <p className="text-gray-700">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-purple-700 hover:text-purple-900 transition-colors underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
