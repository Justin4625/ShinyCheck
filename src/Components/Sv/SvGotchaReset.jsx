import React from "react";

export default function SvGotchaReset({ message, onCancel, onConfirm, confirmColor = "from-blue-400 to-blue-600" }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[60] bg-black/60 backdrop-blur-md">
            {/* Bredere modal met SV hoeken */}
            <div className="bg-white border-b-4 border-r-4 border-gray-300 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-lg rounded-br-lg p-8 w-[95%] max-w-[450px] text-center flex flex-col gap-6 shadow-2xl transform transition-all">

                {/* Tekst in SV stijl */}
                <p className="text-[#333] font-black italic text-xl uppercase tracking-tighter leading-tight px-4">
                    {message}
                </p>

                <div className="flex justify-center gap-4 mt-2">
                    {/* Cancel Button - Grijs/Strak */}
                    <button
                        onClick={onCancel}
                        className="px-8 py-2.5 bg-white border-b-4 border-gray-200 text-gray-400 font-black italic text-xs uppercase tracking-widest transform -skew-x-12 hover:bg-gray-50 hover:text-gray-600 transition-all active:scale-95 shadow-sm"
                    >
                        <span className="block transform skew-x-12">Cancel</span>
                    </button>

                    {/* Confirm Button - Gebruikt de doorgegeven kleurgradiënt */}
                    <button
                        onClick={onConfirm}
                        className={`px-8 py-2.5 bg-gradient-to-r ${confirmColor} text-white font-black italic text-xs uppercase tracking-widest transform -skew-x-12 shadow-lg border-b-4 border-black/20 hover:scale-105 active:scale-95 transition-all`}
                    >
                        <span className="block transform skew-x-12">Confirm</span>
                    </button>
                </div>
            </div>
        </div>
    );
}