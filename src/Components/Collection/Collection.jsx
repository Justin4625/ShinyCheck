import React, { useState } from "react";
import PlzaCollectionModal from "../Plza/PlzaCollectionModal.jsx";
import SvCollectionModal from "../Sv/SvCollectionModal.jsx";
import PogoCollectionModal from "../Pogo/PogoCollectionModal.jsx";
import PlaCollectionModal from "../Pla/PlaCollectionModal.jsx"; //
import CollectionFilter from "./CollectionFilter.jsx";
import CollectionCards from "./CollectionCards.jsx";

export default function Collection({ plzaPokemon = [], svPokemon = [], plaPokemon = [], pokemonList = [] }) { //
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("nl-NL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const plzaHunts = plzaPokemon.flatMap((p) => {
        const count = Number(localStorage.getItem(`plza_shiny_${p.id}`)) || 0;
        const items = [];
        for (let i = 1; i <= count; i++) {
            const data = JSON.parse(localStorage.getItem(`plza_shinyData_${p.id}_${i}`));
            if (data) items.push({ ...p, storedData: data, shinyIndex: i, type: 'PLZA' });
        }
        return items;
    });

    const svHunts = svPokemon.flatMap((p) => {
        const count = Number(localStorage.getItem(`sv_shiny_${p.id}`)) || 0;
        const items = [];
        for (let i = 1; i <= count; i++) {
            const data = JSON.parse(localStorage.getItem(`sv_shinyData_${p.id}_${i}`));
            if (data) items.push({ ...p, storedData: data, shinyIndex: i, type: 'SV' });
        }
        return items;
    });

    // Logica voor Pokémon Legends: Arceus hunts
    const plaHunts = plaPokemon.flatMap((p) => {
        const count = Number(localStorage.getItem(`pla_shiny_${p.id}`)) || 0;
        const items = [];
        for (let i = 1; i <= count; i++) {
            const data = JSON.parse(localStorage.getItem(`pla_shinyData_${p.id}_${i}`));
            if (data) items.push({ ...p, storedData: data, shinyIndex: i, type: 'PLA' });
        }
        return items;
    });

    const pogoHunts = pokemonList.flatMap((p) => {
        const count = Number(localStorage.getItem(`pogo_shiny_${p.id}`)) || 0;
        const items = [];
        for (let i = 1; i <= count; i++) {
            const data = JSON.parse(localStorage.getItem(`pogo_shinyData_${p.id}_${i}`));
            if (data) items.push({ ...p, storedData: data, shinyIndex: i, type: 'POGO' });
        }
        return items;
    });

    const totalCount = plzaHunts.length + svHunts.length + pogoHunts.length + plaHunts.length;

    const allShinies = [...plzaHunts, ...svHunts, ...pogoHunts, ...plaHunts]
        .filter((entry) => {
            const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filter === "all" || entry.type === filter;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => (b.storedData.timestamp || 0) - (a.storedData.timestamp || 0));

    return (
        <div className="max-w-[1600px] mx-auto p-6 relative">
            <div className="fixed inset-0 bg-[radial-gradient(#1e1e30_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

            <div className="relative z-10 mb-8 flex flex-col items-center">
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 uppercase italic tracking-[0.2em] text-center drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">
                    Collection
                </h1>
                <div className="mt-3 px-6 py-2 bg-slate-900/10 rounded-full border border-slate-900/10 shadow-sm backdrop-blur-sm">
                    <span className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-[0.15em] italic">
                        Total Shinies: <span className="text-cyan-600 ml-1 text-base sm:text-lg">{totalCount}</span>
                    </span>
                </div>
            </div>

            <CollectionFilter
                filter={filter}
                setFilter={setFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                totalCount={totalCount}
                plzaCount={plzaHunts.length}
                svCount={svHunts.length}
                plaCount={plaHunts.length}
                pogoCount={pogoHunts.length}
            />

            {allShinies.length === 0 ? (
                <div className="relative text-center text-slate-500 py-32 border-4 border-dashed border-slate-800 rounded-[3rem] bg-slate-900/20 backdrop-blur-sm">
                    <p className="text-xl font-black uppercase tracking-widest italic opacity-50">
                        {searchQuery ? "No matches found" : "Your collection is empty"}
                    </p>
                </div>
            ) : (
                <CollectionCards
                    allShinies={allShinies}
                    pokemonList={pokemonList}
                    onSelectEntry={setSelectedEntry}
                    formatTime={formatTime}
                    formatDate={formatDate}
                />
            )}

            {selectedEntry?.type === 'PLZA' && (
                <PlzaCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={pokemonList.find(p => p.id === selectedEntry.id)}
                    originalId={selectedEntry.id}
                    shinyIndex={selectedEntry.shinyIndex}
                    formatTime={formatTime}
                    onClose={() => setSelectedEntry(null)}
                    gameName="Pokémon Legends: Z-A"
                />
            )}

            {selectedEntry?.type === 'SV' && (
                <SvCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={pokemonList.find(p => p.id === selectedEntry.id)}
                    originalId={selectedEntry.id}
                    shinyIndex={selectedEntry.shinyIndex}
                    formatTime={formatTime}
                    onClose={() => setSelectedEntry(null)}
                    gameName="Pokémon Scarlet & Violet"
                />
            )}

            {selectedEntry?.type === 'PLA' && (
                <PlaCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={pokemonList.find(p => p.id === selectedEntry.id)}
                    originalId={selectedEntry.id}
                    shinyIndex={selectedEntry.shinyIndex}
                    formatTime={formatTime}
                    onClose={() => setSelectedEntry(null)}
                    gameName="Pokémon Legends: Arceus"
                />
            )}

            {selectedEntry?.type === 'POGO' && (
                <PogoCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={pokemonList.find(p => p.id === selectedEntry.id)}
                    originalId={selectedEntry.id}
                    shinyIndex={selectedEntry.shinyIndex}
                    onClose={() => setSelectedEntry(null)}
                />
            )}
        </div>
    );
}