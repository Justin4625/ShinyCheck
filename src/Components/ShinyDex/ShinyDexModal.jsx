import React from "react";

export default function ShinyDexModal({ pokemon, onClose, onSelectEntry }) {
    if (!pokemon) return null;

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    const getCapturedItems = () => {
        const items = [];
        const lowerName = pokemon.name.toLowerCase();

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("plza_shinyData_") || key.startsWith("sv_shinyData_")) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.pokemonName && data.pokemonName.toLowerCase() === lowerName) {
                        const isPlza = key.startsWith("plza");
                        const keyParts = key.split("_");
                        const shinyIndex = parseInt(keyParts[keyParts.length - 1]);
                        const originalId = keyParts[2];

                        items.push({
                            ...pokemon,
                            id: originalId,
                            storedData: data,
                            type: isPlza ? 'PLZA' : 'SV',
                            shinyIndex: shinyIndex
                        });
                    }
                    // eslint-disable-next-line no-unused-vars
                } catch (e) { /* empty */ }
            }
        }
        return items.sort((a, b) => (b.storedData.timestamp || 0) - (a.storedData.timestamp || 0));
    };

    const capturedItems = getCapturedItems();

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shiny Records</p>
                        <h2 className="text-2xl font-black uppercase italic text-slate-800">
                            #{String(pokemon.id).padStart(4, "0")} - {pokemon.name}
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-[#ff4d29]">
                        <span className="text-xl font-black">✕</span>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                    <div className="grid gap-3">
                        {capturedItems.map((item, idx) => (
                            <button key={`${item.type}_${item.shinyIndex}_${idx}`} onClick={() => onSelectEntry(item)} className="w-full text-left group bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between hover:border-[#ff4d29] transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.type === 'PLZA' ? 'bg-cyan-50' : 'bg-orange-50'}`}>
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`} className="w-10 h-10 object-contain" alt="" />
                                    </div>
                                    <div>
                                        <p className={`text-[8px] font-black uppercase tracking-widest ${item.type === 'PLZA' ? 'text-cyan-600' : 'text-orange-600'}`}>{item.type === 'PLZA' ? 'Legends: Z-A' : 'Scarlet & Violet'}</p>
                                        <p className="text-sm font-black text-slate-700 italic">{new Date(item.storedData.timestamp).toLocaleDateString('nl-NL')}</p>
                                        <p className="text-[10px] font-bold text-slate-400 italic">{formatTime(item.storedData.timer || 0)}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-black text-slate-400 uppercase">Encounters</p>
                                    <p className="text-lg font-black italic text-slate-900">{item.storedData.counter}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}