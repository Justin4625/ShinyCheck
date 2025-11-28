// src/Plza.jsx
import React, {useEffect, useState} from "react";
import plzaPokemon from "./data/PlzaData.js";
import usePokemon from "./Components/FetchPokemon.jsx";
import PlzaModal from "./Components/PlzaModal.jsx";

export default function Plza() {
    const { pokemonList } = usePokemon(plzaPokemon);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [activeTab, setActiveTab] = useState("base"); // Nieuwe state voor tabs

    const openModal = (pokemon) => setSelectedPokemon(pokemon);
    const closeModal = () => setSelectedPokemon(null);

    useEffect(() => {
        // Blokkeer scroll bij open modal
        document.body.style.overflow = selectedPokemon ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedPokemon]);

    // Voor nu tonen we enkel Base Game Pokémon
    const displayedPokemon = activeTab === "base" ? plzaPokemon : [];

    return (
        <div className="relative p-8 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
            {/* Achtergrond lijnen */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(200,200,255,0.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(200,200,255,0.05) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            {/* Achtergrond blobs */}
            <div className="absolute -top-20 -left-10 w-60 h-60 bg-blue-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-purple-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>

            <h1 className="relative text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-4 tracking-wide z-10">
                Pokémon Legends: Z-A
            </h1>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center mb-10 z-10 gap-1 sm:gap-2">
                {[
                    { id: "active", label: "Active Hunts" },
                    { id: "base", label: "Base Game" },
                    { id: "mega", label: "Mega Dimension" },
                    { id: "collection", label: "Collection" },
                ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                            }}
                            className={`
                    relative flex-auto sm:flex-1 min-w-[100px] sm:min-w-0 px-2 sm:px-4 py-2 sm:py-3 text-center font-bold
                    text-xs sm:text-sm md:text-base transition-all duration-300
                    ${isActive
                                ? "bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-white shadow-lg"
                                : "bg-gray-300 text-gray-700 hover:bg-gray-400"}
                `}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Pokémon Grid */}
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 z-10">
                {displayedPokemon.map((entry, index) => {
                    const number = String(index + 1).padStart(3, "0");
                    const pokemon = pokemonList.find((p) => p.id === entry.id);

                    const shinyCount = Number(localStorage.getItem(`shiny_${entry.id}`)) || 0;
                    const isGolden = shinyCount >= 1; // ✅ WORDT NU ECHT GEBRUIKT

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className={`
        relative rounded-2xl shadow-md p-6 flex flex-col items-center justify-between
        hover:scale-105 hover:shadow-xl transition-transform duration-300 overflow-hidden cursor-pointer

        ${isGolden
                                ? "bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-400 text-gray-900 shadow-yellow-400/40"
                                : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900"
                            }
    `}
                        >
                            {/* Top right blob */}
                            <div
                                className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl pointer-events-none
                                    ${index % 3 === 0 ? "bg-green-400 opacity-40" : index % 3 === 1 ? "bg-pink-400 opacity-40" : "bg-blue-400 opacity-40"}`}
                            ></div>

                            {/* Bottom left blob */}
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

                            {/* Collected counter */}
                            <div className="mt-4 w-full flex justify-center">
                                <div
                                    className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-white text-sm font-bold shadow-md tracking-wide">
                                    Collected: {Number(localStorage.getItem(`shiny_${entry.id}`)) || 0}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <PlzaModal
                selectedPokemon={selectedPokemon}
                onClose={closeModal}
                index={plzaPokemon.findIndex(p => p.id === selectedPokemon?.id)}
            />
        </div>
    );
}