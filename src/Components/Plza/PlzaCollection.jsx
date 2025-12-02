import React, { useState } from "react";
import PlzaCollectionModal from "./PlzaCollectionModal.jsx";

export default function PlzaCollection({ plzaPokemon = [], pokemonList = [], formatTime }) {
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const collectionPokemon = plzaPokemon
        .flatMap((p) => {
            const shinyCount = Number(localStorage.getItem(`shiny_${p.id}`)) || 0;
            const hunts = [];

            for (let i = 1; i <= shinyCount; i++) {
                const storedData =
                    JSON.parse(localStorage.getItem(`shinyData_${p.id}_${i}`)) || {
                        timer: 0,
                        counter: 0,
                        timestamp: 0,
                    };

                hunts.push({ ...p, storedData, shinyIndex: i });
            }

            return hunts;
        })
        .sort((a, b) => b.storedData.timestamp - a.storedData.timestamp);

    return (
        <>
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 z-10">
                {collectionPokemon.length === 0 ? (
                    <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px] sm:min-h-[300px]">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
                            No Shiny Pokémon in Collection
                        </span>
                    </div>
                ) : (
                    collectionPokemon.map((entry, index) => {
                        const number = String(entry.id).padStart(3, "0");
                        const pokemon = pokemonList.find((p) => p.id === entry.id);

                        // ✅ Game ophalen uit plzaData
                        const plzaDataEntry = plzaPokemon.find(
                            (p) =>
                                String(p.id).padStart(3, "0") ===
                                String(entry.id).padStart(3, "0")
                        );
                        const gameName = plzaDataEntry?.game || "Unknown Game";

                        // ✅ Naam met hoofdletter
                        const capitalizedName =
                            entry.name.charAt(0).toUpperCase() + entry.name.slice(1);

                        return (
                            <div
                                key={`${entry.id}_${entry.shinyIndex}`}
                                onClick={() => {
                                    setSelectedEntry(entry);
                                    setSelectedPokemon(pokemon);
                                }}
                                className="relative cursor-pointer rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center justify-between transition-transform duration-300 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 shadow-md hover:scale-[1.03]"
                            >
                                {/* ✅ GLOWS */}
                                <div
                                    className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl pointer-events-none
                                    ${
                                        index % 3 === 0
                                            ? "bg-green-400 opacity-60"
                                            : index % 3 === 1
                                                ? "bg-pink-400 opacity-60"
                                                : "bg-blue-400 opacity-60"
                                    }`}
                                ></div>

                                <div
                                    className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-3xl pointer-events-none
                                    ${
                                        index % 3 === 0
                                            ? "bg-purple-400 opacity-60"
                                            : index % 3 === 1
                                                ? "bg-blue-400 opacity-60"
                                                : "bg-green-400 opacity-60"
                                    }`}
                                ></div>

                                {/* ✅ Naam & Nummer */}
                                <div className="w-full flex justify-between items-center mb-3 relative z-10">
                                    <h2 className="text-base sm:text-lg md:text-xl font-extrabold capitalize tracking-wide text-gray-900 text-left">
                                        {capitalizedName}
                                    </h2>
                                    <span className="px-2 py-1 text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-full shadow-md relative z-10">
                                        #{number}
                                    </span>
                                </div>

                                <img
                                    src={pokemon?.sprites?.other?.home?.front_shiny}
                                    alt={capitalizedName}
                                    className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md"
                                />

                                {pokemon?.types && (
                                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
                                        {pokemon.types.map((t) => t.type.name).join(" / ")}
                                    </p>
                                )}

                                <div className="mt-4 w-full flex flex-col items-center gap-2">
                                    <div className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs sm:text-base font-bold rounded-xl p-2 shadow-md flex justify-between">
                                        <span>Encounters:</span>
                                        <span>{entry.storedData.counter}</span>
                                    </div>

                                    <div className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs sm:text-base font-bold rounded-xl p-2 shadow-md flex justify-between">
                                        <span>Time:</span>
                                        <span>{formatTime(entry.storedData.timer)}</span>
                                    </div>

                                    <div className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white text-xs sm:text-base font-bold rounded-xl p-2 shadow-md flex justify-between">
                                        <span>Date:</span>
                                        <span>
                                            {new Date(entry.storedData.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white text-xs sm:text-base font-bold rounded-xl p-2 shadow-md flex justify-center">
                                        {gameName}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {selectedEntry?.storedData && selectedPokemon && (
                <PlzaCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={selectedPokemon}
                    shinyIndex={selectedEntry.shinyIndex}
                    gameName={
                        plzaPokemon.find(
                            (p) =>
                                String(p.id).padStart(3, "0") ===
                                String(selectedEntry.id).padStart(3, "0")
                        )?.game
                    }
                    onClose={() => {
                        setSelectedEntry(null);
                        setSelectedPokemon(null);
                    }}
                />
            )}
        </>
    );
}