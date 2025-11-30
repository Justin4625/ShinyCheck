import React from "react";

export default function PlzaSettingsTab({ increment, setIncrement, setShowConfirm, setShowGotchaConfirm }) {
    return (
        <div className="px-4 py-3 bg-white rounded-xl shadow-md w-full text-center flex flex-col gap-4 items-center mt-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <label className="text-gray-700 font-semibold">Increment</label>
                <input
                    type="number"
                    min="1"
                    value={increment}
                    onChange={(e) => setIncrement(e.target.value)}
                    className="w-20 px-3 py-1 rounded-lg border border-gray-300 text-center no-arrows"
                />
            </div>

            <div className="flex gap-3 w-full justify-center">
                <button
                    onClick={() => setShowConfirm(true)}
                    className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                    Reset
                </button>

                <button
                    onClick={() => setShowGotchaConfirm(true)}
                    className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                    Gotcha
                </button>
            </div>
        </div>
    );
}