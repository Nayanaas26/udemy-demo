export default function ProgressBar({ percentage }) {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-400">Course Progress</span>
                <span className="text-sm font-bold text-indigo-400">{percentage}% Complete</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 max-w-md shadow-inner">
                <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-700 ease-out shadow-lg shadow-indigo-500/50"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
}
