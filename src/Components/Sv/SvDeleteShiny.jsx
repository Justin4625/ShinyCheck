import React from "react";

export default function SvDeleteShiny({ onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[70] bg-black/60 backdrop-blur-md">
            {/* Modal met SV-stijl hoeken en bredere opzet */}
            <div
                className="bg-white border-b-4 border-r-4 border-gray-300 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-lg rounded-br-lg p-8 w-[95%] max-w-[450px] text-center flex flex-col gap-6 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Waarschuwingstekst in SV-stijl */}
                <p className="text-[#333] font-black italic text-xl uppercase tracking-tighter leading-tight px-4">
                    Are you sure you want to delete this shiny?
                </p>

                <div className="flex justify-center gap-4 mt-2">
                    {/* Cancel Button */}
                    <button
                        onClick={onCancel}
                        className="px-8 py-2.5 bg-white border-b-4 border-gray-200 text-gray-400 font-black italic text-xs uppercase tracking-widest transform -skew-x-12 hover:bg-gray-50 hover:text-gray-600 transition-all active:scale-95 shadow-sm"
                    >
                        <span className="block transform skew-x-12">Cancel</span>
                    </button>

                    {/* Delete Button - Scarlet Rood */}
                    <button
                        onClick={onConfirm}
                        className="px-8 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-black italic text-xs uppercase tracking-widest transform -skew-x-12 shadow-lg border-b-4 border-black/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <span className="block transform skew-x-12">Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}