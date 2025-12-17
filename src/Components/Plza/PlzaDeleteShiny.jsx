import React from "react";

export default function PlzaDeleteShiny({ onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[70] p-4">
            <div
                className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 w-full max-w-[420px] text-center shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Waarschuwingstekst in Z-A stijl */}
                <p className="text-slate-800 font-black italic text-xl uppercase tracking-tighter leading-tight">
                    Are you sure you want to delete this shiny?
                </p>

                <div className="flex justify-center gap-4">
                    {/* Cancel Button */}
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-2.5 bg-slate-50 border border-slate-200 text-slate-400 font-black italic rounded-xl text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-600 transition-all active:scale-95 shadow-sm"
                    >
                        Cancel
                    </button>

                    {/* Delete Button - Magenta/Red Accent */}
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-red-600 text-white font-black italic rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-pink-200 transition-all hover:scale-105 active:scale-95"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}