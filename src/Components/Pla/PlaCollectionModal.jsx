import React, { useState, useEffect } from "react";
// Data imports for Legends: Arceus
import plaPokemon from "../../data/PlaData/PlaData";
import regionalPokemon from "../../data/ShinyDexData/RegionalData";

// --- INTERNAL COMPONENT: PlaDeleteConfirm (Delete Confirmation) ---
function PlaDeleteConfirm({ onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[70] bg-[#3e3b38]/80 backdrop-blur-sm">
            <div
                className="bg-[#f4f1ea] border-2 border-[#3e3b38] p-8 w-[95%] max-w-[450px] text-center flex flex-col gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                <p className="relative z-10 text-[#3e3b38] font-black italic text-xl uppercase tracking-tighter leading-tight px-4">
                    Are you sure you want to delete this shiny?
                </p>

                <div className="relative z-10 flex justify-center gap-4 mt-2">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-2.5 bg-white border-2 border-[#3e3b38] text-[#3e3b38] font-black italic transform -skew-x-12 text-[10px] uppercase tracking-widest hover:bg-[#3e3b38] hover:text-[#f4f1ea] transition-all"
                    >
                        <span className="block transform skew-x-12">Cancel</span>
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-6 py-2.5 bg-[#3e3b38] text-[#eaddca] font-black italic transform -skew-x-12 text-[10px] uppercase tracking-widest shadow-lg border-b-4 border-black/20 hover:scale-105 transition-all"
                    >
                        <span className="block transform skew-x-12">Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- MAIN EXPORT: PlaCollectionModal ---
export default function PlaCollectionModal({ data, onClose, pokemon, shinyIndex, gameName, originalId }) {
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

    // Filter regional variants to only include Hisuian forms for PLA list
    const hisuianVariants = regionalPokemon.filter(p => p.name.toLowerCase().includes("-hisuian") || p.name.toLowerCase().includes("-hisui"));
    const allAvailable = [...plaPokemon, ...hisuianVariants];

    // Edit states
    const [editCounter, setEditCounter] = useState(data.counter);
    const initialHrs = Math.floor(data.timer / 3600);
    const initialMins = Math.floor((data.timer % 3600) / 60);
    const initialSecs = data.timer % 60;

    const [editHrs, setEditHrs] = useState(initialHrs);
    const [editMins, setEditMins] = useState(initialMins);
    const [editSecs, setEditSecs] = useState(initialSecs);

    const formatForInput = (ts) => {
        const d = new Date(ts);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };
    const [editTimestamp, setEditTimestamp] = useState(formatForInput(data.timestamp));

    if (!data || !pokemon) return null;

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString("en-GB", {
            day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
        });
    };

    const handleSave = () => {
        const prefix = "pla";
        const totalSeconds = (Number(editHrs) * 3600) + (Number(editMins) * 60) + Number(editSecs);

        // Prepare updated data, syncing pokemonName for ShinyDex visibility
        const updatedData = {
            ...data,
            pokemonName: selectedSpecies.name,
            counter: Number(editCounter),
            timer: totalSeconds,
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
            localStorage.setItem(`${prefix}_shinyData_${originalId}_${shinyIndex}`, JSON.stringify(updatedData));
            onClose();
        }
    };

    const deleteShinyLogic = (shouldReload = true) => {
        const prefix = "pla";
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
            window.location.reload();
        }
    };

    const filteredPokemon = allAvailable.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toString().includes(searchQuery)
    );

    return (
        <div className="fixed inset-0 bg-[#3e3b38]/80 backdrop-blur-md flex items-center justify-center z-[60] p-4 font-serif overflow-hidden">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-[#f4f1ea] border-2 border-[#3e3b38] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.15)] p-8 w-full max-w-xl flex flex-col items-center overflow-hidden transition-all">
                <div className="absolute inset-0 pointer-events-none opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>

                <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center border-2 border-[#3e3b38] text-[#3e3b38] hover:bg-[#3e3b38] hover:text-[#eaddca] transition-all z-20 font-bold shadow-sm">
                    <span className="text-xl">✕</span>
                </button>

                <div className="flex flex-col items-center mb-6 text-center relative z-10">
                    <div className="bg-[#3e3b38] px-4 py-1 transform -skew-x-12 mb-3 shadow-md">
                        <span className="text-[10px] font-black italic text-[#bfa16d] tracking-[0.2em] uppercase block transform skew-x-12">
                            {isEditing ? "Editing Report" : `Survey Entry #${shinyIndex}`}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-[#3e3b38] tracking-tighter border-b-2 border-[#3e3b38]/10 pb-1 px-4">
                        #{String(selectedSpecies.id).padStart(4, "0")} - {selectedSpecies.name}
                    </h2>
                </div>

                {/* Species Selector Area */}
                <div className="w-full flex flex-col items-center mb-8 relative z-10">
                    {isChangingPokemon ? (
                        <div className="w-full bg-[#eaddca]/40 border border-[#3e3b38]/20 rounded-xl p-4 shadow-inner flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search survey results..."
                                className="w-full p-2.5 bg-[#f4f1ea] border-2 border-[#3e3b38]/20 rounded-md font-bold text-xs outline-none focus:border-[#bfa16d] transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="overflow-y-auto max-h-[200px] pr-1 custom-scrollbar">
                                <div className="grid grid-cols-3 gap-2">
                                    {filteredPokemon.map((p, idx) => (
                                        <button
                                            key={`${p.id}-${idx}`}
                                            onClick={() => { setSelectedSpecies(p); setIsChangingPokemon(false); }}
                                            className={`flex flex-col items-center gap-1 p-2 border transition-all ${selectedSpecies.id === p.id ? 'border-[#bfa16d] bg-[#f4f1ea] shadow-sm' : 'bg-transparent border-[#3e3b38]/10 hover:border-[#3e3b38]/40'}`}
                                        >
                                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${p.id}.png`} className="w-10 h-10" alt={p.name} />
                                            <span className="text-[8px] font-black uppercase italic text-[#3e3b38] truncate w-full text-center">{p.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => setIsChangingPokemon(false)} className="text-[9px] font-bold text-[#3e3b38]/60 uppercase hover:text-[#3e3b38]">Back</button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#bfa16d]/20 blur-[40px] rounded-full scale-125"></div>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${selectedSpecies.id}.png`} alt={selectedSpecies.name} className="w-40 h-40 drop-shadow-[0_15px_20px_rgba(0,0,0,0.25)] relative z-10" />
                            </div>
                            {isEditing && (
                                <button
                                    onClick={() => setIsChangingPokemon(true)}
                                    className="bg-[#3e3b38] text-[#eaddca] text-[9px] font-black px-4 py-2 uppercase tracking-widest hover:scale-105 transition-all transform -skew-x-12 shadow-md"
                                >
                                    <span className="block transform skew-x-12">Change Species</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-full space-y-4 z-10">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#eaddca]/50 border-2 border-[#3e3b38]/10 p-4 transform -skew-x-3 shadow-inner flex flex-col items-center">
                            <p className="text-[8px] font-black text-[#3e3b38]/50 uppercase mb-1 italic">Encounters</p>
                            {isEditing ? (
                                <input type="number" value={editCounter} onChange={(e) => setEditCounter(e.target.value)} className="w-full text-center text-xl font-black bg-[#f4f1ea] border-b-2 border-[#bfa16d] outline-none" />
                            ) : (
                                <p className="text-2xl font-black italic text-[#3e3b38] tracking-widest">{data.counter}</p>
                            )}
                        </div>
                        <div className="bg-[#eaddca]/50 border-2 border-[#3e3b38]/10 p-4 transform -skew-x-3 shadow-inner flex flex-col items-center">
                            <p className="text-[8px] font-black text-[#3e3b38]/50 uppercase mb-1 italic">Duration</p>
                            {isEditing ? (
                                <div className="flex gap-1 items-end">
                                    <div className="flex flex-col items-center">
                                        <input type="number" value={editHrs} onChange={(e) => setEditHrs(e.target.value)} className="w-7 text-center font-black bg-transparent border-b border-[#3e3b38] text-xs" />
                                        <span className="text-[7px] font-bold text-[#bfa16d]">h</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <input type="number" value={editMins} onChange={(e) => setEditMins(e.target.value)} className="w-7 text-center font-black bg-transparent border-b border-[#3e3b38] text-xs" />
                                        <span className="text-[7px] font-bold text-[#bfa16d]">m</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <input type="number" value={editSecs} onChange={(e) => setEditSecs(e.target.value)} className="w-7 text-center font-black bg-transparent border-b border-[#3e3b38] text-xs" />
                                        <span className="text-[7px] font-bold text-[#bfa16d]">s</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-lg font-black italic text-[#3e3b38] tracking-tight">{formatTime(data.timer)}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#eaddca]/30 border border-[#3e3b38]/10 p-3 transform -skew-x-3 flex justify-between items-center px-6">
                        <span className="text-[10px] font-black text-[#3e3b38]/50 uppercase tracking-widest italic">Captured On</span>
                        {isEditing ? (
                            <input type="datetime-local" value={editTimestamp} onChange={(e) => setEditTimestamp(e.target.value)} className="text-[10px] font-black bg-[#f4f1ea] border-none p-1 outline-none text-[#3e3b38]" />
                        ) : (
                            <span className="text-[14px] font-black italic text-[#3e3b38]/80 uppercase">{formatDate(data.timestamp)}</span>
                        )}
                    </div>

                    <div className="bg-[#eaddca]/30 border border-[#3e3b38]/10 p-3 transform -skew-x-3 flex justify-between items-center px-6">
                        <span className="text-[10px] font-black text-[#3e3b38]/50 uppercase tracking-widest italic">Game</span>
                        <span className="text-[12px] font-black italic text-[#bfa16d] uppercase tracking-wider">{gameName || "Legends: Arceus"}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center w-full mt-4">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="flex-1 py-2 bg-[#3e3b38] text-[#eaddca] font-black uppercase italic transform -skew-x-12 hover:scale-105 transition-all shadow-md">
                                    <span className="block transform skew-x-12">Save Changes</span>
                                </button>
                                <button onClick={() => { setIsEditing(false); setSelectedSpecies(pokemon); setIsChangingPokemon(false); }} className="flex-1 py-2 bg-[#d9ceba] text-[#3e3b38] font-black uppercase italic transform -skew-x-12 hover:bg-[#c5b8a5] transition-all">
                                    <span className="block transform skew-x-12">Cancel</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="flex-1 py-2 border-2 border-[#3e3b38] text-[#3e3b38] font-black uppercase italic transform -skew-x-12 hover:bg-[#3e3b38] hover:text-[#eaddca] transition-all">
                                    <span className="block transform skew-x-12 text-xs">Edit Report</span>
                                </button>
                                <button onClick={() => setShowConfirm(true)} className="flex-1 py-2 border-2 border-[#3e3b38]/20 text-[#3e3b38]/40 font-black uppercase italic transform -skew-x-12 hover:text-red-700 hover:border-red-700 transition-all">
                                    <span className="block transform skew-x-12 text-xs">Delete Entry</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {showConfirm && (
                    <PlaDeleteConfirm
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={() => deleteShinyLogic(true)}
                    />
                )}
            </div>
        </div>
    );
}