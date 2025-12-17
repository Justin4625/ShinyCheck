import React from "react";

export default function PlzaGotchaReset({ message, onCancel, onConfirm, confirmColor = "from-cyan-500 to-indigo-600" }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[60] bg-slate-900/60 backdrop-blur-md p-4">
            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl p-8 w-full max-w-[440px] text-center flex flex-col gap-6 transform transition-all overflow-hidden relative">
                {/* Subtiel Grid Patroon */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                {/* Boodschap */}
                <p className="relative z-10 text-slate-800 font-black italic text-xl uppercase tracking-tighter leading-tight">
                    {message}
                </p>

                <div className="relative z-10 flex justify-center gap-4 mt-2">
                    {/* Cancel Button */}
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 bg-slate-50 border border-slate-200 text-slate-400 font-black italic rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-600 transition-all active:scale-95 shadow-sm"
                    >
                        Cancel
                    </button>

                    {/* Confirm Button */}
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-6 py-3 bg-gradient-to-r ${confirmColor} text-white font-black italic rounded-2xl text-[10px] uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}