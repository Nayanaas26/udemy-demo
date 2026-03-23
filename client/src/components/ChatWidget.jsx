import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react'; // Using lucide-react for icons, assuming you have it

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* The Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out transform origin-bottom-right">
          <div className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
            <h3 className="font-semibold text-sm">🎓 AI Study Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-indigo-700 p-1 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="w-full h-[calc(100%-48px)]">
            <iframe
              src="https://asnayana-my-study-bot.hf.space"
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="AI Study Assistant"
              allow="microphone"
            ></iframe>
          </div>
        </div>
      )}

      {/* The Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 ${
          isOpen ? 'bg-gray-100 text-gray-800' : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default ChatWidget;
