import React, {useEffect, useState} from "react";
import plzaPokemon from "./data/PlzaData.js";
import usePokemon from "./Components/FetchPokemon.jsx";
import PlzaModal from "./Components/PlzaModal.jsx";
import PlzaCollection from "./Components/PlzaCollection.jsx";
import PlzaActiveHunts from "./Components/PlzaActiveHunts.jsx";

export default function Plza() {
    const { pokemonList } = usePokemon(plzaPokemon);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [activeTab, setActiveTab] = useState("base");

    const openModal = (pokemon) => setSelectedPokemon(pokemon);
    const closeModal = () => setSelectedPokemon(null);

    useEffect(() => {
        document.body.style.overflow = selectedPokemon ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedPokemon]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    const displayedPokemon =
        activeTab === "base"
            ? plzaPokemon
            : activeTab === "mega"
                ? []
                : [];

    return (
        <div className="relative p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
            {/* Achtergrond lijnen */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(200,200,255,0.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(200,200,255,0.05) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            {/* Achtergrond blobs */}
            <div className="absolute -top-20 -left-10 w-48 sm:w-60 h-48 sm:h-60 bg-blue-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-20 w-64 sm:w-80 h-64 sm:h-80 bg-purple-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>

            <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4 sm:mb-6 tracking-wide z-10">
                Pokémon Legends: Z-A
            </h1>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center mb-8 sm:mb-10 z-10 gap-1 sm:gap-2">
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
                            style={{ clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" }}
                            className={`
                                relative flex-auto sm:flex-1 min-w-[88px] sm:min-w-0 px-2 sm:px-4 py-2 sm:py-3 text-center font-bold
                                text-[11px] sm:text-sm md:text-base transition-all duration-300
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

            {/* CONTENT */}
            {activeTab === "collection" ? (
                <PlzaCollection
                    plzaPokemon={plzaPokemon}
                    pokemonList={pokemonList}
                    formatTime={formatTime}
                />
            ) : activeTab === "active" ? (
                <PlzaActiveHunts
                    plzaPokemon={plzaPokemon}
                    pokemonList={pokemonList}
                    formatTime={formatTime}
                    openModal={openModal}
                />
            ) : (
                <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 z-10">
                    {displayedPokemon.length === 0 ? (
                        <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px] sm:min-h-[300px]">
                            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
                                {activeTab === "mega" && "Coming Soon!"}
                            </span>
                        </div>
                    ) : (
                        displayedPokemon.map((entry, index) => {
                            const number = String(entry.id).padStart(3, "0");
                            const pokemon = pokemonList.find((p) => p.id === entry.id);
                            const shinyCount = Number(localStorage.getItem(`shiny_${entry.id}`)) || 0;

                            const isGolden = (activeTab === "base" || activeTab === "mega") && shinyCount >= 1;

                            return (
                                <div
                                    key={entry.id}
                                    onClick={() => openModal(pokemon)}
                                    className={`
                                        relative rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 overflow-hidden
                                        hover:scale-105
                                        ${isGolden
                                        ? "bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-400 text-gray-900 shadow-md"
                                        : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 shadow-md"}
                                    `}
                                >
                                    {/* Blobs */}
                                    <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl pointer-events-none
                                        ${index % 3 === 0 ? "bg-green-400 opacity-40" : index % 3 === 1 ? "bg-pink-400 opacity-40" : "bg-blue-400 opacity-40"}`}
                                    ></div>

                                    <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-3xl pointer-events-none
                                        ${index % 3 === 0 ? "bg-purple-400 opacity-40" : index % 3 === 1 ? "bg-blue-400 opacity-40" : "bg-green-400 opacity-40"}`}
                                    ></div>

                                    <h2 className="text-sm sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 capitalize tracking-wide text-center">
                                        {entry.name} (#{number})
                                    </h2>

                                    <img
                                        src={pokemon?.sprites?.other?.home?.front_shiny}
                                        alt={entry.name}
                                        className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md"
                                    />

                                    {pokemon?.types && (
                                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
                                            {pokemon.types.map((t) => t.type.name).join(" / ")}
                                        </p>
                                    )}

                                    <div className="mt-4 w-full flex justify-center">
                                        <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-white text-xs sm:text-sm font-bold shadow-md tracking-wide">
                                            Collected: {shinyCount}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            <PlzaModal
                selectedPokemon={selectedPokemon}
                onClose={closeModal}
                index={plzaPokemon.findIndex(p => p.id === selectedPokemon?.id)}
            />
        </div>
    );
}