import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function InstructorDashboard() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(userStr);
        if (user.role !== 'instructor' && user.role !== 'admin') {
            alert("Unauthorized access");
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const { data } = await api.post('/courses', {
                title, description, thumbnail, instructor: user._id
            });
            alert("Course created successfully!");
            navigate(`/courses/${data._id}`);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create course");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 font-sans p-8 border-t border-gray-800">
            <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700">
                <h1 className="text-2xl font-black text-white mb-6">Create New Course</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Course Title</label>
                        <input
                            type="text" required
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            placeholder="React Full Course"
                            value={title} onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Description</label>
                        <textarea
                            required rows="4"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            placeholder="Course description..."
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Thumbnail URL</label>
                        <input
                            type="url" required
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            placeholder="https://example.com/image.jpg"
                            value={thumbnail} onChange={(e) => setThumbnail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit" disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Course'}
                    </button>
                </form>
            </div>
        </div>
    );
}
