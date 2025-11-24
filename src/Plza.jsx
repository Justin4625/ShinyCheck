import { useState } from "react";
import plzaPokemon from "./data/PlzaData.js";
import usePokemon from "./Components/FetchPokemon.jsx";

export default function Plza() {
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const { pokemonList } = usePokemon(plzaPokemon);

    const openModal = (pokemon) => setSelectedPokemon(pokemon);
    const closeModal = () => setSelectedPokemon(null);

    return (
        <div className="relative p-8 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(200,200,255,0.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(200,200,255,0.05) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            {/* Color blobs */}
            <div className="absolute -top-20 -left-10 w-60 h-60 bg-blue-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-purple-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>

            <h1 className="relative text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-wide z-10">
                Pokémon Legends: Z-A
            </h1>

            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 z-10">
                {plzaPokemon.map((entry, index) => {
                    const number = String(index + 1).padStart(3, "0");
                    const pokemon = pokemonList.find((p) => p.id === entry.id);

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className="relative bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 rounded-2xl shadow-md p-6 flex flex-col items-center justify-between hover:scale-105 hover:shadow-xl transition-transform duration-300 overflow-hidden cursor-pointer"
                        >
                            {/* Blobs */}
                            <div
                                className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl pointer-events-none
                                ${index % 3 === 0 ? "bg-green-400 opacity-40" : index % 3 === 1 ? "bg-pink-400 opacity-40" : "bg-blue-400 opacity-40"}`}
                            ></div>

                            <div
                                className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-3xl pointer-events-none
                                ${index % 3 === 0 ? "bg-purple-400 opacity-40" : index % 3 === 1 ? "bg-blue-400 opacity-40" : "bg-green-400 opacity-40"}`}
                            ></div>

                            <h2 className="text-lg sm:text-xl font-bold mb-4 capitalize tracking-wide">
                                {entry.name} (#{number})
                            </h2>

                            <img
                                src={pokemon?.sprites?.other?.home?.front_shiny || "/placeholder.png"}
                                alt={entry.name}
                                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md"
                            />

                            {pokemon?.types && (
                                <p className="mt-3 text-sm text-gray-600 uppercase tracking-wide">
                                    {pokemon.types.map((t) => t.type.name).join(" / ")}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ---------------------- */}
            {/*        MODAL           */}
            {/* ---------------------- */}
            {selectedPokemon && (
                <div
                    onClick={closeModal}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center relative"
                    >
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-4 capitalize tracking-wide">
                            {selectedPokemon.name}
                        </h2>

                        <img
                            src={selectedPokemon.sprites?.other?.home?.front_shiny}
                            alt={selectedPokemon.name}
                            className="w-40 h-40 mx-auto drop-shadow-md"
                        />

                        {selectedPokemon.types && (
                            <p className="mt-4 text-gray-700 uppercase tracking-wide">
                                {selectedPokemon.types.map((t) => t.type.name).join(" / ")}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}