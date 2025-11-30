import React, { useEffect, useState } from "react";
import plzaPokemon from "./data/PlzaData.js";
import usePokemon from "./Components/FetchPokemon.jsx";
import PlzaModal from "./Components/PlzaModal.jsx";
import PlzaTabs from "./Components/PlzaTabs.jsx";
import PlzaCollection from "./Components/PlzaCollection.jsx";
import PlzaActiveHunts from "./Components/PlzaActiveHunts.jsx";
import PlzaCards from "./Components/PlzaCards.jsx";

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

    // Alleen Base/Mega wordt hier direct getoond
    const displayedPokemon =
        activeTab === "base"
            ? plzaPokemon
            : activeTab === "mega"
                ? [] // Voor Mega Dimension, momenteel leeg
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
                index={plzaPokemon.findIndex(p => p.id === selectedPokemon?.id)}
            />
        </div>
    );
}