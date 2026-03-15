import { useState, useEffect } from 'react';

export default function VideoPlayer({ videoId }) {
    const [started, setStarted] = useState(false);

    useEffect(() => {
        setStarted(false);
    }, [videoId]);

    if (!videoId) {
        return (
            <div className="w-full bg-gray-900 flex flex-col items-center justify-center font-sans" style={{ aspectRatio: '16/9', minHeight: '300px' }}>
                <div className="text-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-400 font-medium">Select a lesson from the sidebar to start watching</p>
                </div>
            </div>
        );
    }

    // Extract video ID from various URL formats
    let vid = videoId;
    try {
        if (videoId.includes('youtube.com/watch')) {
            const url = new URL(videoId);
            vid = url.searchParams.get('v') || videoId;
        } else if (videoId.includes('youtu.be/')) {
            vid = videoId.split('youtu.be/')[1]?.split('?')[0] || videoId;
        } else if (videoId.includes('youtube.com/embed/')) {
            vid = videoId.split('youtube.com/embed/')[1]?.split('?')[0] || videoId;
        }
    } catch (e) {
        vid = videoId;
    }

    const thumbnail = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${vid}?autoplay=1&rel=0&modestbranding=1`;

    if (!started) {
        return (
            <div
                className="w-full relative cursor-pointer group"
                style={{ aspectRatio: '16/9', minHeight: '300px', background: '#000' }}
                onClick={() => setStarted(true)}
            >
                <img
                    src={thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => { e.target.style.display = 'none'; }}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="text-white text-sm bg-black/60 px-3 py-1 rounded-full">Click to play</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-black" style={{ aspectRatio: '16/9', minHeight: '300px' }}>
            <iframe
                key={vid}
                src={embedUrl}
                title="Course Video Player"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ display: 'block', width: '100%', height: '100%' }}
            />
        </div>
    );
}
