import React, { useEffect, useState } from "react";

export default function PlzaSettingsTab({ increment, setIncrement, timer, setTimer, counter, setCounter, onShowConfirm, onShowGotcha }) {
    const [hours, setHours] = useState(Math.floor(timer / 3600));
    const [minutes, setMinutes] = useState(Math.floor((timer % 3600) / 60));
    const [seconds, setSeconds] = useState(timer % 60);

    useEffect(() => {
        setTimer(hours * 3600 + minutes * 60 + seconds);
    }, [hours, minutes, seconds, setTimer]);

    const inputContainerClass = "relative flex flex-col items-center group";
    const labelClass = "text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5";
    const inputClass = `
        w-20 sm:w-24 px-3 py-2 bg-slate-50 border-b-2 border-slate-200 
        text-center font-black italic text-slate-800 rounded-xl
        focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-300
        shadow-sm text-sm
    `;

    return (
        <div className="w-full max-w-2xl mx-auto relative z-10 px-4">
            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex flex-col gap-8 shadow-inner">

                <div className="flex flex-col sm:flex-row items-center justify-around gap-8">
                    {/* Data Inputs */}
                    <div className="flex gap-4">
                        <div className={inputContainerClass}>
                            <label className={labelClass}>Increment</label>
                            <input type="number" min="1" value={increment} onChange={(e) => setIncrement(Math.max(1, Number(e.target.value)))} className={inputClass} />
                        </div>
                        <div className={inputContainerClass}>
                            <label className={labelClass}>Encounters</label>
                            <input type="number" min="0" value={counter} onChange={(e) => setCounter(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-cyan-500 text-lg`} />
                        </div>
                    </div>

                    {/* Time Inputs */}
                    <div className="flex gap-2">
                        {["Hrs", "Min", "Sec"].map((label, i) => {
                            const value = i === 0 ? hours : i === 1 ? minutes : seconds;
                            const setter = i === 0 ? setHours : i === 1 ? setMinutes : setSeconds;
                            return (
                                <div key={label} className={inputContainerClass}>
                                    <label className={labelClass}>{label}</label>
                                    <input type="number" min="0" max={i === 0 ? undefined : 59} value={value} onChange={(e) => setter(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-pink-500 w-16 sm:w-20`} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4">
                    <button onClick={onShowConfirm} className="px-10 py-3 bg-white border border-slate-200 text-slate-400 font-black italic rounded-2xl hover:text-pink-500 hover:border-pink-200 transition-all text-[10px] uppercase tracking-widest shadow-sm">
                        Reset
                    </button>
                    <button onClick={onShowGotcha} className="px-10 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-black italic rounded-2xl hover:scale-105 transition-all shadow-lg shadow-cyan-200 text-[10px] uppercase tracking-widest">
                        Gotcha
                    </button>
                </div>
            </div>
        </div>
    );
}