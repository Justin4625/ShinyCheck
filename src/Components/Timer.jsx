import React, { useEffect, useRef } from "react";

export default function Timer({ timer, counter, increment, isPlaying, setTimer, setCounter }) {
    const timerRef = useRef(timer);
    const counterRef = useRef(counter);

    useEffect(() => {
        timerRef.current = timer;
    }, [timer]);

    useEffect(() => {
        counterRef.current = counter;
    }, [counter]);

    // Timer effect
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, setTimer]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full mt-4">
            <div className="flex items-center gap-4 justify-center flex-wrap sm:flex-nowrap w-full">
                <div className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-xl shadow-md text-gray-600 font-bold text-base sm:text-xl text-center min-w-[90px]">
                    {formatTime(timer)}
                </div>

                <div className="flex items-center gap-2 justify-center">
                    <div className="px-6 py-2 sm:py-3 bg-white rounded-xl shadow-md text-xl sm:text-2xl font-bold text-gray-900 min-w-[70px] sm:min-w-[80px] text-center">
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
        </div>
    );
}