import React from "react";

export default function GotchaResetPopups({ message, onCancel, onConfirm, confirmColor = "from-blue-400 to-blue-600" }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] sm:w-1/2 max-w-[400px] text-center flex flex-col gap-4 border border-gray-100 transform transition-all">
                <p className="text-gray-900 font-bold text-lg leading-relaxed">{message}</p>

                <div className="flex justify-center gap-4 mt-2">
                    {/* Cancel Button */}
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        Cancel
                    </button>

                    {/* Confirm Button */}
                    <button
                        onClick={onConfirm}
                        className={`px-6 py-2 bg-gradient-to-r ${confirmColor} text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:brightness-110`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}