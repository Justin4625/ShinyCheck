import React, { useEffect, useState } from "react";

export default function SvSettingsTab({ increment, setIncrement, timer, setTimer, counter, setCounter, onShowConfirm, onShowGotcha }) {
    const [hours, setHours] = useState(Math.floor(timer / 3600));
    const [minutes, setMinutes] = useState(Math.floor((timer % 3600) / 60));
    const [seconds, setSeconds] = useState(timer % 60);

    useEffect(() => {
        setTimer(hours * 3600 + minutes * 60 + seconds);
    }, [hours, minutes, seconds, setTimer]);

    const labelClass = "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 transform skew-x-12";
    const inputClass = `
        w-20 sm:w-24 px-3 py-2 bg-white border-b-4 border-gray-300 
        text-center font-black italic text-[#333] transform -skew-x-12 
        focus:outline-none focus:border-[#ff4d00] transition-all duration-300
        shadow-sm text-base
    `;

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center group">
                            <label className={labelClass}>Increment</label>
                            <input type="number" min="1" value={increment} onChange={(e) => setIncrement(Math.max(1, Number(e.target.value)))} className={inputClass} />
                        </div>
                        <div className="flex flex-col items-center group">
                            <label className={labelClass}>Encounters</label>
                            <input type="number" min="0" value={counter} onChange={(e) => setCounter(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-[#ff4d00] text-lg`} />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {["Hrs", "Min", "Sec"].map((label, i) => {
                            const value = i === 0 ? hours : i === 1 ? minutes : seconds;
                            const setter = i === 0 ? setHours : i === 1 ? setMinutes : setSeconds;
                            return (
                                <div key={label} className="flex flex-col items-center group">
                                    <label className={labelClass}>{label}</label>
                                    <input type="number" min="0" max={i === 0 ? undefined : 59} value={value} onChange={(e) => setter(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-[#8c00ff] w-16 sm:w-20`} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={onShowConfirm} className="px-8 py-3 bg-white border-b-4 border-red-500 text-red-600 font-black italic transform -skew-x-12 hover:bg-red-50 transition-all text-xs uppercase tracking-widest shadow-md">
                        <span className="block transform skew-x-12">Reset</span>
                    </button>
                    <button onClick={onShowGotcha} className="px-8 py-3 bg-gradient-to-r from-[#ff4d00] to-[#ffcc00] text-white font-black italic transform -skew-x-12 hover:scale-105 transition-all shadow-lg border-b-4 border-black/20 text-xs uppercase tracking-widest">
                        <span className="block transform skew-x-12">Gotcha</span>
                    </button>
                </div>
            </div>
        </div>
    );
}