import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import LearningPage from './pages/LearningPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import InstructorDashboard from './pages/InstructorDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans relative">
        <Navbar />
        <ChatWidget />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/learn/:courseId" element={<LearningPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/instructor/upload" element={<InstructorDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
