import React from "react";

export default function PlzaModal({ selectedPokemon, onClose }) {
    if (!selectedPokemon) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl p-10 shadow-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto text-center relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-bold mb-6 capitalize tracking-wide">
                    {selectedPokemon.name}
                </h2>

                <img
                    src={selectedPokemon.sprites?.other?.home?.front_shiny || "/placeholder.png"}
                    alt={selectedPokemon.name}
                    className="w-56 h-56 mx-auto drop-shadow-lg"
                />

                {selectedPokemon.types && (
                    <p className="mt-6 text-lg text-gray-700 uppercase tracking-wider">
                        {selectedPokemon.types.map((t) => t.type.name).join(" / ")}
                    </p>
                )}
            </div>
        </div>
    );
}
