import React from "react";

export default function DeleteShinyPopup({ onCancel, onConfirm }) {
    return (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div
                className="bg-white rounded-2xl p-6 w-80 sm:w-96 text-center shadow-2xl flex flex-col gap-5 border border-gray-100 animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="font-bold text-gray-800 text-lg leading-tight">
                    Are you sure you want to delete this shiny?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:brightness-110"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}