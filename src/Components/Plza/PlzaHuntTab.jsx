import React, { useEffect, useRef } from "react";

export default function PlzaHuntTab({ timer, counter, increment, isPlaying, setTimer, setIsPlaying, setCounter, onClose }) {
    const timerRef = useRef(timer);
    const counterRef = useRef(counter);

    // Keep refs updated
    useEffect(() => { timerRef.current = timer; }, [timer]);
    useEffect(() => { counterRef.current = counter; }, [counter]);

    // Timer interval
    useEffect(() => {
        let interval;
        if (isPlaying) interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
        return () => clearInterval(interval);
    }, [isPlaying, setTimer]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            {/* Close button rechtsboven van hunt-tab */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xl font-bold shadow-md shadow-purple-500/40 transition-all duration-200 hover:scale-110 hover:shadow-purple-600/50 active:scale-95 z-20"
            >
                ✕
            </button>

            {/* Timer links, counter rechts */}
            <div className="flex items-center gap-4 justify-center flex-wrap sm:flex-nowrap w-full">
                <div
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-xl shadow-md text-gray-600 font-bold text-base sm:text-xl text-center min-w-[90px]">
                    {formatTime(timer)}
                </div>

                <div className="flex items-center gap-2">
                    <div
                        className="px-6 py-2 sm:py-3 bg-white rounded-xl shadow-md text-xl sm:text-2xl font-bold text-gray-900 min-w-[70px] sm:min-w-[80px] text-center">
                        {counter}
                    </div>
                    <button
                        onClick={() => setCounter((prev) => Math.max(0, prev - Number(increment)))}
                        className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                        -{increment}
                    </button>
                </div>
            </div>

            {/* Start / Continue / Pause button */}
            <button
                onClick={() => setIsPlaying((p) => !p)}
                className={`
        px-6 py-3 sm:px-8 sm:py-4 font-bold rounded-xl text-white shadow-lg transform hover:scale-105 transition-all duration-300
        ${isPlaying
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700"
                    : timer > 0
                        ? "bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500"
                        : "bg-gradient-to-r from-green-500 via-lime-600 to-green-600"} 
        bg-[length:200%_200%] bg-[position:0%_50%] hover:bg-[position:100%_50%]
    `}
            >
                {isPlaying ? "Pause" : timer > 0 ? "Continue" : "Start"}
            </button>
        </div>
    );
}