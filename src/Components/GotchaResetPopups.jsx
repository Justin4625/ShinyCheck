// GotchaResetPopups.jsx
import React from "react";

export default function GotchaResetPopups({ message, onCancel, onConfirm, confirmColor = "bg-blue-500" }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-[90%] sm:w-1/2 max-w-[400px] text-center flex flex-col gap-4 border border-gray-200">
                <p className="text-gray-900 font-semibold text-lg">{message}</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl shadow-md transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-5 py-2 ${confirmColor} text-white font-semibold rounded-xl shadow-md transition-all duration-200`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}