import React, { useState, useMemo } from "react";
import plzaPokemon from "./data/PlzaData.js";
import usePokemon from "./Components/FetchPokemon.jsx";
import PlzaModal from "./Components/Plza/PlzaModal.jsx";
import PlzaTabs from "./Components/Plza/PlzaTabs.jsx";
import PlzaCollection from "./Components/Plza/PlzaCollection.jsx";
import PlzaActiveHunts from "./Components/Plza/PlzaActiveHunts.jsx";
import PlzaCards from "./Components/Plza/PlzaCards.jsx";

export default function Plza() {
    const { pokemonList } = usePokemon(plzaPokemon);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [activeTab, setActiveTab] = useState("base");

    const openModal = (pokemon) => setSelectedPokemon(pokemon);
    const closeModal = () => setSelectedPokemon(null);

    // Modal scroll lock
    React.useEffect(() => {
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
                ? [] // Voor Mega Dimension, momenteel leeg
                : [];

    // Shiny progress afleiden met useMemo (geen setState nodig)
    // Shiny progress afleiden met useMemo (alleen unieke Pokémon met shiny)
    const shinyProgress = useMemo(() => {
        let uniqueShinyCount = 0;
        plzaPokemon.forEach(p => {
            const count = Number(localStorage.getItem(`shiny_${p.id}`)) || 0;
            if (count > 0) uniqueShinyCount += 1; // alleen tellen als er minstens 1 shiny van deze Pokémon is
        });
        return { count: uniqueShinyCount, total: 232 };
    }, [pokemonList, selectedPokemon]);

    const shinyPercentage = ((shinyProgress.count / shinyProgress.total) * 100).toFixed(1);

    const modalIndex = selectedPokemon
        ? plzaPokemon.findIndex(p => p.id === selectedPokemon.id)
        : -1;

    return (
        <div className="relative p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
            {/* Achtergrond lijnen */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(200,200,255,0.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(200,200,255,0.05) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            {/* Achtergrond blobs */}
            <div className="absolute -top-20 -left-10 w-48 sm:w-60 h-48 sm:h-60 bg-blue-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-20 w-64 sm:w-80 h-64 sm:h-80 bg-purple-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>

            <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-2 sm:mb-4 tracking-wide z-10">
                Pokémon Legends: Z-A
            </h1>

            {/* Shiny Progress */}
            <div className="relative w-full max-w-xl mx-auto mb-6">
                <p className="text-center text-gray-700 font-bold mb-2">
                    Shiny Progress: {shinyProgress.count}/232 ({shinyPercentage}%)
                </p>

                {/* Progress bar achtergrond */}
                <div className="w-full h-6 rounded-full bg-gray-300/30 overflow-hidden relative">
                    {/* Voorgrond bar */}
                    <div
                        className="h-6 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 transition-all duration-700 ease-out"
                        style={{ width: shinyPercentage + '%' }}
                    ></div>
                </div>
            </div>

            {/* Tabs */}
            <PlzaTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content per tab */}
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
                <PlzaCards
                    displayedPokemon={displayedPokemon}
                    pokemonList={pokemonList}
                    openModal={openModal}
                    activeTab={activeTab}
                />
            )}

            {/* Modal */}
            <PlzaModal
                selectedPokemon={selectedPokemon}
                onClose={closeModal}
                index={modalIndex}
            />
        </div>
    );
}