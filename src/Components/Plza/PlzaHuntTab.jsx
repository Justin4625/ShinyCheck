import React, { useEffect } from "react";

export default function PlzaHuntTab({ timer, counter, increment, isPlaying, setTimer, setIsPlaying, setCounter }) {
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
        <div className="flex flex-col items-center gap-6 w-full relative z-10">
            <div className="flex flex-wrap items-center gap-4 justify-center w-full">
                {/* Timer Display */}
                <div className="relative group">
                    <div className="bg-slate-50 px-6 py-3 border-b-2 border-pink-500 rounded-2xl min-w-[140px] text-center shadow-sm group-hover:bg-white transition-colors">
                        <span className="block text-slate-700 font-black italic text-lg tracking-tight">
                            {formatTime(timer)}
                        </span>
                    </div>
                    <label className="absolute -top-2.5 left-3 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Duration</label>
                </div>

                {/* Counter Area */}
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <div className="bg-slate-50 px-8 py-3 border-b-2 border-cyan-500 rounded-2xl min-w-[100px] text-center shadow-sm group-hover:bg-white transition-colors">
                            <span className="block text-2xl font-black italic text-slate-900 tracking-tighter">
                                {counter}
                            </span>
                        </div>
                        <label className="absolute -top-2.5 left-3 text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Encounters</label>
                    </div>

                    <button
                        onClick={() => setCounter((prev) => Math.max(0, prev - Number(increment)))}
                        className="h-12 w-12 bg-slate-50 text-slate-400 font-black rounded-2xl hover:bg-pink-50 hover:text-pink-500 transition-all border border-slate-100 shadow-sm"
                    >
                        -{increment}
                    </button>
                </div>
            </div>

            <button
                onClick={() => setIsPlaying((p) => !p)}
                className={`
                    px-12 py-3.5 font-black italic tracking-[0.3em] uppercase text-white shadow-xl rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 text-xs
                    ${isPlaying ? "bg-slate-800" : "bg-gradient-to-r from-cyan-500 via-cyan-400 to-indigo-500 shadow-cyan-200"}
                `}
            >
                {isPlaying ? "PAUSE" : timer > 0 ? "CONTINUE" : "START HUNT"}
            </button>
        </div>
    );
}