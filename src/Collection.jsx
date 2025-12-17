import React, { useState } from "react";
import PlzaCollectionModal from "./Components/Plza/PlzaCollectionModal.jsx";
import SvCollectionModal from "./Components/Sv/SvCollectionModal.jsx";

export default function Collection({ plzaPokemon = [], svPokemon = [], pokemonList = [] }) {
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");

    // Helpers
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

    // 1. Data ophalen uit localStorage
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

    // Totaal aantal voor de teller
    const totalCount = plzaHunts.length + svHunts.length;

    // 2. Filter en Sorteer Logica
    const allShinies = [...plzaHunts, ...svHunts]
        .filter((entry) => {
            const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filter === "all" || entry.type === filter;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => (b.storedData.timestamp || 0) - (a.storedData.timestamp || 0));

    return (
        <div className="max-w-[1600px] mx-auto p-6 relative">
            {/* Achtergrond decoratie */}
            <div className="fixed inset-0 bg-[radial-gradient(#1e1e30_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

            {/* Header Sectie */}
            <div className="relative z-10 mb-8 flex flex-col items-center">
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 uppercase italic tracking-[0.2em] text-center drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">
                    Collection
                </h1>
                {/* Totaal teller - Iets groter gemaakt */}
                <div className="mt-3 px-6 py-2 bg-slate-900/10 rounded-full border border-slate-900/10 shadow-sm backdrop-blur-sm">
                    <span className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-[0.15em] italic">
                        Total Shinies: <span className="text-cyan-600 ml-1 text-base sm:text-lg">{totalCount}</span>
                    </span>
                </div>
            </div>

            {/* Controls Area: Filters en Search */}
            <div className="relative z-10 max-w-5xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-center gap-4">

                {/* Filters - Pill stijl */}
                <div className="flex flex-wrap justify-center gap-2">
                    {[
                        { id: "all", label: "All Games", count: totalCount },
                        { id: "PLZA", label: "Legends: Z-A", count: plzaHunts.length },
                        { id: "SV", label: "Scarlet & Violet", count: svHunts.length }
                    ].map((tab) => {
                        const isActive = filter === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setFilter(tab.id)}
                                className={`px-5 py-2 rounded-full font-black italic text-[10px] tracking-widest uppercase transition-all duration-300 border-2
                                    ${isActive
                                    ? "bg-white border-cyan-500 text-cyan-600 shadow-xl scale-105 z-10"
                                    : "bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/30 hover:text-white"}`}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        );
                    })}
                </div>

                {/* Search Bar */}
                <div className="w-full md:w-72 bg-white/5 backdrop-blur-md p-2 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH COLLECTION..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-100 rounded-2xl text-[10px] font-bold text-slate-700 focus:border-cyan-400 outline-none transition-all placeholder:text-slate-300 shadow-inner"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Area - Kaarten */}
            {allShinies.length === 0 ? (
                <div className="relative text-center text-slate-500 py-32 border-4 border-dashed border-slate-800 rounded-[3rem] bg-slate-900/20 backdrop-blur-sm">
                    <p className="text-xl font-black uppercase tracking-widest italic opacity-50">
                        {searchQuery ? "No matches found" : "Your collection is empty"}
                    </p>
                </div>
            ) : (
                <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {allShinies.map((entry, index) => {
                        const pokemonData = pokemonList.find((p) => p.name.toLowerCase() === entry.name.toLowerCase());
                        const spriteId = pokemonData ? pokemonData.id : entry.id;
                        const isPlza = entry.type === 'PLZA';
                        const svAccent = index % 2 === 0 ? "#ff4d00" : "#8c00ff";

                        return (
                            <div
                                key={`${entry.type}_${entry.id}_${entry.shinyIndex}`}
                                onClick={() => setSelectedEntry(entry)}
                                className={`group relative cursor-pointer p-5 flex flex-col items-center transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 shadow-2xl overflow-hidden
                                    ${isPlza
                                    ? "rounded-[2.2rem] border-2 border-slate-100 bg-gradient-to-br from-slate-50 to-cyan-50 shadow-cyan-500/5"
                                    : "bg-white border-b-4 border-r-4 border-gray-200 rounded-tr-[2.8rem] rounded-bl-[2.8rem] rounded-tl-xl rounded-br-xl shadow-black/5"
                                }`}
                            >
                                <div className="w-full flex justify-between items-start mb-3 z-10">
                                    <div className={`px-2.5 py-1 ${isPlza ? "bg-cyan-500 rounded-full shadow-md shadow-cyan-200" : "transform -skew-x-12 shadow-sm"}`}
                                         style={{ backgroundColor: !isPlza ? svAccent : undefined }}>
                                        <span className="text-[9px] font-black italic text-white tracking-widest uppercase">
                                            No. {String(spriteId).padStart(3, "0")}
                                        </span>
                                    </div>
                                    <div className={`text-base drop-shadow-md group-hover:animate-bounce ${isPlza ? "text-cyan-500" : "text-gray-400"}`}>✨</div>
                                </div>

                                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-3 z-10 text-center w-full truncate px-1 text-slate-800">
                                    {entry.name}
                                </h3>

                                <div className="relative flex items-center justify-center w-full aspect-square max-w-[120px] mb-5">
                                    {isPlza && <div className="absolute w-20 h-20 bg-cyan-400 blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity"></div>}
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${spriteId}.png`}
                                        alt={entry.name}
                                        className="w-full h-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)] z-10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                                    />
                                </div>

                                <div className="w-full space-y-2 z-10 mt-auto">
                                    <div className={`flex justify-between items-center px-4 py-2 rounded-xl border ${isPlza ? "bg-white/80 border-cyan-50 shadow-sm" : "bg-gray-50 border-gray-100 transform -skew-x-3"}`}>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${isPlza ? "text-cyan-600/50" : "text-slate-400"}`}>Encounters</span>
                                        <span className="text-base font-black italic text-slate-900" style={{ color: !isPlza ? svAccent : undefined }}>
                                            {entry.storedData.counter}
                                        </span>
                                    </div>

                                    <div className={`flex justify-between items-center px-4 py-2 rounded-xl border ${isPlza ? "bg-white/80 border-cyan-50 shadow-sm" : "bg-gray-50 border-gray-100 transform -skew-x-3"}`}>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${isPlza ? "text-cyan-600/50" : "text-slate-400"}`}>Duration</span>
                                        <span className="text-xs font-black italic text-slate-700">
                                            {formatTime(entry.storedData.timer)}
                                        </span>
                                    </div>

                                    <div className={`flex justify-between items-center px-4 py-1.5 rounded-lg border-b ${isPlza ? "border-cyan-100" : "bg-gray-50/50 border-gray-100 transform -skew-x-3"}`}>
                                        <span className={`text-[7px] font-black uppercase tracking-widest ${isPlza ? "text-cyan-600/40" : "text-slate-400"}`}>Captured on</span>
                                        <span className="text-[10px] font-black italic text-slate-500">
                                            {formatDate(entry.storedData.timestamp)}
                                        </span>
                                    </div>

                                    <div className={`w-full py-2 rounded-xl shadow border flex justify-center items-center ${isPlza ? "bg-slate-800 border-slate-700" : "bg-gray-800 border-gray-700 transform skew-x-[-6deg]"}`}>
                                        <p className="text-[9px] font-black text-center uppercase tracking-[0.15em] italic text-white">
                                            {isPlza ? "Pokémon Legends: Z-A" : "Pokémon Scarlet & Violet"}
                                        </p>
                                    </div>
                                </div>
                                {!isPlza && <div className="absolute bottom-0 left-0 w-full h-1.5" style={{ backgroundColor: svAccent }}></div>}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modals */}
            {selectedEntry?.type === 'PLZA' && (
                <PlzaCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={pokemonList.find(p => p.name.toLowerCase() === selectedEntry.name.toLowerCase())}
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
                    pokemon={pokemonList.find(p => p.name.toLowerCase() === selectedEntry.name.toLowerCase())}
                    originalId={selectedEntry.id}
                    shinyIndex={selectedEntry.shinyIndex}
                    formatTime={formatTime}
                    onClose={() => setSelectedEntry(null)}
                    gameName="Pokémon Scarlet & Violet"
                />
            )}
        </div>
    );
}