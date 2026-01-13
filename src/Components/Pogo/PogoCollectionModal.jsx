import React, { useState, useEffect } from "react";
// Data imports to choose from
import shinyDexData from "../../data/ShinyDexData/ShinyDexData";
import regionalPokemon from "../../data/ShinyDexData/RegionalData";
import shinyDexData2 from "../../data/ShinyDexData/ShinyDexData2.js";
import shinyDexData3 from "../../data/ShinyDexData/ShinyDexData3.js";

// Internal Component for delete confirmation
function DeleteConfirmModal({ onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[130] p-4">
            <div className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 w-full max-w-[420px] text-center shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                <p className="text-slate-800 font-black italic text-xl uppercase tracking-tighter leading-tight">Are you sure you want to delete this shiny?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onCancel} className="flex-1 px-6 py-2.5 bg-slate-50 border border-slate-200 text-slate-400 font-black italic rounded-xl text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-600 transition-all active:scale-95 shadow-sm">Cancel</button>
                    <button onClick={onConfirm} className="flex-1 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-red-600 text-white font-black italic rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-pink-200 transition-all hover:scale-105 active:scale-95">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default function PogoCollectionModal({ data, onClose, pokemon, shinyIndex, originalId }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPokemon, setIsChangingPokemon] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Temporary state for the selected species (only saved on Save Changes)
    const [selectedSpecies, setSelectedSpecies] = useState(pokemon);

    // Disable background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Combine all available Pokemon for the selector
    const allAvailable = [...shinyDexData, ...shinyDexData2, ...shinyDexData3, ...regionalPokemon];

    const formatForInput = (ts) => {
        const d = new Date(ts);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };
    const [editTimestamp, setEditTimestamp] = useState(formatForInput(data.timestamp));

    if (!data || !pokemon) return null;

    const handleSave = () => {
        const prefix = "pogo";

        // Prepare updated data, syncing pokemonName for ShinyDex visibility
        const updatedData = {
            ...data,
            pokemonName: selectedSpecies.name,
            timestamp: new Date(editTimestamp).getTime()
        };

        if (selectedSpecies.id !== pokemon.id) {
            // Species changed: delete old entry and move to new ID
            deleteShinyLogic(false);

            const currentNewCount = Number(localStorage.getItem(`${prefix}_shiny_${selectedSpecies.id}`)) || 0;
            const newCountForSpecies = currentNewCount + 1;

            localStorage.setItem(`${prefix}_shiny_${selectedSpecies.id}`, newCountForSpecies);
            localStorage.setItem(`${prefix}_shinyData_${selectedSpecies.id}_${newCountForSpecies}`, JSON.stringify(updatedData));

            onClose();
        } else {
            // Just update current entry
            const storageKey = `${prefix}_shinyData_${originalId}_${shinyIndex}`;
            localStorage.setItem(storageKey, JSON.stringify(updatedData));
            onClose();
        }
    };

    const deleteShinyLogic = (shouldReload = true) => {
        const prefix = "pogo";
        const shinyCount = Number(localStorage.getItem(`${prefix}_shiny_${originalId}`)) || 0;
        localStorage.removeItem(`${prefix}_shinyData_${originalId}_${shinyIndex}`);

        for (let i = shinyIndex + 1; i <= shinyCount; i++) {
            const entry = localStorage.getItem(`${prefix}_shinyData_${originalId}_${i}`);
            if (entry) {
                localStorage.setItem(`${prefix}_shinyData_${originalId}_${i - 1}`, entry);
                localStorage.removeItem(`${prefix}_shinyData_${originalId}_${i}`);
            }
        }

        const newCount = shinyCount - 1;
        if (newCount > 0) localStorage.setItem(`${prefix}_shiny_${originalId}`, newCount);
        else localStorage.removeItem(`${prefix}_shiny_${originalId}`);

        if (shouldReload) {
            onClose();
        }
    };

    const filteredPokemon = allAvailable.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toString().includes(searchQuery)
    );

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[120] p-4 overflow-hidden">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-white border-4 border-emerald-400 rounded-[3rem] shadow-2xl p-8 w-full max-w-md flex flex-col items-center overflow-hidden transition-all">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>

                <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-emerald-500 transition-all z-20 group">
                    <span className="text-xl font-black">✕</span>
                </button>

                <div className="flex flex-col items-center mb-6 relative z-10 text-center">
                    <div className="bg-emerald-500 px-4 py-1 rounded-full mb-3 shadow-md">
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">
                            {isEditing ? "Editing Entry" : `Pokémon GO Entry #${shinyIndex}`}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter">
                        {selectedSpecies.name}
                    </h2>
                </div>

                {/* Species Selector Area */}
                <div className="w-full flex flex-col items-center mb-8 relative z-10">
                    {isChangingPokemon ? (
                        <div className="w-full bg-slate-50 border border-emerald-100 rounded-3xl p-4 shadow-inner flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search Pokemon..."
                                className="w-full p-2.5 rounded-xl border-2 border-emerald-100 font-bold text-xs outline-none focus:border-emerald-500 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="overflow-y-auto max-h-[200px] pr-1 custom-scrollbar">
                                <div className="grid grid-cols-3 gap-2">
                                    {filteredPokemon.map((p, idx) => (
                                        <button
                                            key={`${p.id}-${idx}`}
                                            onClick={() => { setSelectedSpecies(p); setIsChangingPokemon(false); }}
                                            className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${selectedSpecies.id === p.id ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'bg-white border-slate-100'}`}
                                        >
                                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${p.id}.png`} className="w-10 h-10" alt={p.name} />
                                            <span className="text-[8px] font-black uppercase italic text-slate-500 truncate w-full text-center">{p.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => setIsChangingPokemon(false)} className="text-[9px] font-bold text-slate-400 uppercase">Back</button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-100 blur-3xl opacity-40 rounded-full"></div>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${selectedSpecies.id}.png`} alt={selectedSpecies.name} className="w-40 h-40 drop-shadow-2xl relative z-10" />
                            </div>
                            {isEditing && (
                                <button
                                    onClick={() => setIsChangingPokemon(true)}
                                    className="bg-emerald-100 text-emerald-600 text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-emerald-200 transition-all border border-emerald-200 shadow-sm"
                                >
                                    Change Species
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-full space-y-4 z-10">
                    <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-3xl shadow-sm flex flex-col items-center">
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">Captured On</p>
                        {isEditing ? (
                            <input
                                type="datetime-local"
                                value={editTimestamp}
                                onChange={(e) => setEditTimestamp(e.target.value)}
                                className="w-full text-center text-sm font-black bg-white rounded-xl border-2 border-emerald-100 focus:border-emerald-400 focus:ring-0 text-slate-700"
                            />
                        ) : (
                            <p className="text-lg font-black italic text-slate-800 tracking-tight">
                                {new Date(data.timestamp).toLocaleString("en-GB", {
                                    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
                                })}
                            </p>
                        )}
                    </div>

                    <div className="bg-emerald-500/10 p-3 rounded-2xl border-2 border-emerald-500/20 flex justify-center items-center gap-3">
                        <span className="text-xs font-black italic text-emerald-700 uppercase tracking-widest">Pokémon GO</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="flex-1 py-3 bg-emerald-500 text-white font-black italic rounded-2xl text-[11px] uppercase tracking-widest hover:bg-emerald-600 shadow-lg active:scale-95 transition-all">Save Changes</button>
                                <button onClick={() => { setIsEditing(false); setSelectedSpecies(pokemon); setIsChangingPokemon(false); }} className="flex-1 py-3 bg-slate-200 text-slate-500 font-black italic rounded-2xl text-[11px] uppercase tracking-widest hover:bg-slate-300 active:scale-95 transition-all">Cancel</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="flex-1 py-3 bg-white border-2 border-emerald-500 text-emerald-500 font-black italic rounded-2xl text-[11px] uppercase tracking-widest hover:bg-emerald-50 shadow-sm active:scale-95 transition-all">Edit Entry</button>
                                <button onClick={() => setShowConfirm(true)} className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-400 font-black italic rounded-2xl text-[11px] uppercase hover:text-red-500 hover:border-red-200 transition-all active:scale-95">Delete</button>
                            </>
                        )}
                    </div>
                </div>

                {showConfirm && <DeleteConfirmModal onCancel={() => setShowConfirm(false)} onConfirm={() => deleteShinyLogic(true)} />}
            </div>
        </div>
    );
}