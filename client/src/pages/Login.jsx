import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { LogIn } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/courses');
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full py-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Log in to your EduLMS account</h2>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-4 px-4 border border-transparent font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : <span className="flex items-center gap-2">Log in <LogIn className="w-5 h-5" /></span>}
                    </button>
                    <div className="text-center mt-2">
                         <span className="text-sm text-purple-700 font-bold hover:text-purple-900 cursor-pointer">Forgot password?</span>
                    </div>
                </form>
                <div className="mt-6 text-center text-sm border-t border-gray-200 pt-6">
                    <p className="text-gray-700">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-bold text-purple-700 hover:text-purple-900 transition-colors underline">
                            Sign up
                        </Link>
                    </p>
                    <p className="text-purple-700 font-bold hover:text-purple-900 mt-2 cursor-pointer underline">Log in with your organization</p>
                </div>
            </div>
        </div>
    );
}
