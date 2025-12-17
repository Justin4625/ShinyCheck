import React, { useEffect } from "react";

export default function SvHuntTab({ timer, counter, increment, isPlaying, setTimer, setIsPlaying, setCounter }) {
    // Timer logica
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
        <div className="flex flex-col items-center gap-6 w-full">
            {/* Display Area */}
            <div className="flex flex-wrap items-center gap-4 justify-center w-full">
                {/* Timer Display met SV styling */}
                <div className="relative">
                    <div className="bg-white px-6 py-3 border-b-4 border-[#8c00ff] transform -skew-x-12 min-w-[140px] text-center shadow-md">
                        <span className="block transform skew-x-12 text-gray-700 font-black italic text-lg">
                            {formatTime(timer)}
                        </span>
                    </div>
                    <label className="absolute -top-3 left-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">Time</label>
                </div>

                {/* Counter Display */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="bg-white px-8 py-3 border-b-4 border-[#ff4d00] transform -skew-x-12 min-w-[100px] text-center shadow-md">
                            <span className="block transform skew-x-12 text-2xl font-black italic text-[#333]">
                                {counter}
                            </span>
                        </div>
                        <label className="absolute -top-3 left-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">Encounters</label>
                    </div>

                    {/* Min-knop */}
                    <button
                        onClick={() => setCounter((prev) => Math.max(0, prev - Number(increment)))}
                        className="h-12 w-12 bg-gray-100 text-gray-500 font-black rounded-lg transform -skew-x-12 hover:bg-red-50 hover:text-red-500 transition-all border-b-4 border-transparent shadow-sm"
                    >
                        <span className="block transform skew-x-12 text-sm">-{increment}</span>
                    </button>
                </div>
            </div>

            {/* Iets kleinere Start / Pause Button */}
            <button
                onClick={() => setIsPlaying((p) => !p)}
                className={`
                    px-10 py-3 font-black italic tracking-[0.2em] uppercase text-white shadow-lg transform -skew-x-12 transition-all duration-300 hover:scale-105 active:scale-95 border-b-4 border-black/20 text-xs
                    ${isPlaying ? "bg-gray-700" : "bg-gradient-to-r from-[#ff4d00] to-[#ffcc00]"}
                `}
            >
                <span className="block transform skew-x-12">
                    {isPlaying ? "PAUSE" : timer > 0 ? "CONTINUE" : "START HUNT"}
                </span>
            </button>
        </div>
    );
}