import React, { useState, useEffect } from "react";
// Data imports to choose from
import plzaPokemon from "../../data/PlzaData/PlzaData";
import plzaMdPokemon from "../../data/PlzaData/PlzaMdData";

// Internal Component for delete confirmation
function DeleteConfirmModal({ onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[70] p-4">
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

export default function PlzaCollectionModal({ data, onClose, pokemon, shinyIndex, gameName, originalId }) {
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

    const allAvailable = [...plzaPokemon, ...plzaMdPokemon];

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

    const handleSave = () => {
        const prefix = "plza";
        const totalSeconds = (Number(editHrs) * 3600) + (Number(editMins) * 60) + Number(editSecs);

        const updatedData = {
            ...data,
            pokemonName: selectedSpecies.name,
            counter: Number(editCounter),
            timer: totalSeconds,
            timestamp: new Date(editTimestamp).getTime()
        };

        if (selectedSpecies.id !== pokemon.id) {
            deleteShinyLogic(false);
            const currentNewCount = Number(localStorage.getItem(`${prefix}_shiny_${selectedSpecies.id}`)) || 0;
            const newCountForSpecies = currentNewCount + 1;
            localStorage.setItem(`${prefix}_shiny_${selectedSpecies.id}`, newCountForSpecies);
            localStorage.setItem(`${prefix}_shinyData_${selectedSpecies.id}_${newCountForSpecies}`, JSON.stringify(updatedData));
            window.location.reload();
        } else {
            localStorage.setItem(`${prefix}_shinyData_${originalId}_${shinyIndex}`, JSON.stringify(updatedData));
            onClose();
            window.location.reload();
        }
    };

    const deleteShinyLogic = (shouldReload = true) => {
        const prefix = "plza";
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
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[60] p-4 overflow-hidden">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-white border-2 border-cyan-100 rounded-[2.5rem] shadow-2xl p-8 w-full max-w-xl flex flex-col items-center overflow-hidden transition-all">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]"></div>

                <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-cyan-500 transition-all z-20 group">
                    <span className="text-xl font-black">✕</span>
                </button>

                <div className="flex flex-col items-center mb-6 relative z-10 text-center">
                    <div className="px-3 py-1 bg-cyan-500 rounded-full mb-3 shadow-lg shadow-cyan-100">
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">
                            {isEditing ? "Editing Entry" : `Registered Entry #${shinyIndex}`}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter">
                        #{String(selectedSpecies.id).padStart(4, "0")} - {selectedSpecies.name}
                    </h2>
                </div>

                <div className="w-full flex flex-col items-center mb-8 relative z-10">
                    {isChangingPokemon ? (
                        <div className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-4 shadow-inner flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search Pokemon..."
                                className="w-full p-2.5 rounded-xl border-2 border-cyan-100 font-bold text-xs outline-none focus:border-cyan-500 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="overflow-y-auto max-h-[200px] pr-1 custom-scrollbar">
                                <div className="grid grid-cols-3 gap-2">
                                    {filteredPokemon.map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => { setSelectedSpecies(p); setIsChangingPokemon(false); }}
                                            className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${selectedSpecies.id === p.id ? 'border-cyan-500 bg-cyan-50 shadow-sm' : 'bg-white border-slate-100'}`}
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
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${selectedSpecies.id}.png`} alt={selectedSpecies.name} className="w-40 h-40 drop-shadow-2xl relative z-10" />
                            {isEditing && (
                                <button
                                    onClick={() => setIsChangingPokemon(true)}
                                    className="bg-cyan-100 text-cyan-600 text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-cyan-200 transition-all border border-cyan-200"
                                >
                                    Change Species
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-full bg-slate-50/50 rounded-3xl border border-slate-100 p-4 flex flex-col gap-3 z-10 shadow-inner">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Encounters</p>
                            {isEditing ? (
                                <input type="number" value={editCounter} onChange={(e) => setEditCounter(e.target.value)} className="w-full text-center text-xl font-black bg-cyan-50 rounded-lg border-none focus:ring-2 focus:ring-cyan-500" />
                            ) : (
                                <p className="text-2xl font-black italic text-slate-900 tracking-tighter">{data.counter}</p>
                            )}
                        </div>

                        <div className="flex flex-col items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                            {isEditing ? (
                                <div className="flex gap-1 items-center">
                                    <input type="number" value={editHrs} onChange={(e) => setEditHrs(e.target.value)} className="w-9 text-center font-black bg-cyan-50 rounded text-sm" />
                                    <span className="text-[8px] font-bold text-cyan-600">h</span>
                                    <input type="number" value={editMins} onChange={(e) => setEditMins(e.target.value)} className="w-9 text-center font-black bg-cyan-50 rounded text-sm" />
                                    <span className="text-[8px] font-bold text-cyan-600">m</span>
                                    <input type="number" value={editSecs} onChange={(e) => setEditSecs(e.target.value)} className="w-9 text-center font-black bg-cyan-50 rounded text-sm" />
                                    <span className="text-[8px] font-bold text-cyan-600">s</span>
                                </div>
                            ) : (
                                <p className="text-lg font-black italic text-slate-900 tracking-tight">{formatTime(data.timer)}</p>
                            )}
                        </div>

                        <div className="flex flex-col items-center bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm col-span-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Captured On</p>
                            {isEditing ? (
                                <input type="datetime-local" value={editTimestamp} onChange={(e) => setEditTimestamp(e.target.value)} className="w-full text-center text-sm font-black bg-cyan-50 rounded-lg border-none focus:ring-2 focus:ring-cyan-500" />
                            ) : (
                                <p className="text-sm font-black italic text-slate-700">{new Date(data.timestamp).toLocaleString("en-GB")}</p>
                            )}
                        </div>

                        <div className="flex flex-col items-center bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm col-span-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Game</p>
                            <p className="text-sm font-black italic text-cyan-600 uppercase tracking-tighter">{gameName || "Pokémon Legends: Z-A"}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="flex-1 py-2.5 bg-cyan-500 text-white font-black italic rounded-2xl text-[10px] uppercase tracking-widest hover:bg-cyan-600 shadow-lg active:scale-95 transition-all">Save Changes</button>
                                <button onClick={() => { setIsEditing(false); setSelectedSpecies(pokemon); setIsChangingPokemon(false); }} className="flex-1 py-2.5 bg-slate-200 text-slate-500 font-black italic rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-300 active:scale-95 transition-all">Cancel</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="flex-1 py-2.5 bg-white border-2 border-cyan-500 text-cyan-500 font-black italic rounded-2xl text-[10px] uppercase tracking-widest hover:bg-cyan-50 active:scale-95 transition-all">Edit Entry</button>
                                <button onClick={() => setShowConfirm(true)} className="px-8 py-2.5 bg-white border-2 border-slate-200 text-slate-400 font-black italic rounded-2xl text-[10px] uppercase hover:text-red-500 active:scale-95 transition-all">Delete</button>
                            </>
                        )}
                    </div>
                </div>

                {showConfirm && <DeleteConfirmModal onCancel={() => setShowConfirm(false)} onConfirm={() => deleteShinyLogic(true)} />}
            </div>
        </div>
    );
}