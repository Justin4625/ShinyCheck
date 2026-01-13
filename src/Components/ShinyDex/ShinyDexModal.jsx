import React, { useMemo } from "react";
import regionalPokemon from "../../data/ShinyDexData/RegionalData.js";

export default function ShinyDexModal({ pokemon, onClose, onSelectEntry, onAddPokemon, refreshKey }) {
    if (!pokemon) return null;

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    // Haalt de basisvorm en alle regionale varianten op (inclusief flexibele Basculin fix)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const allForms = useMemo(() => {
        const baseName = pokemon.name.toLowerCase();
        const variants = regionalPokemon.filter(p => {
            const variantName = p.name.toLowerCase();
            const isBasculinMatch = baseName.includes("basculin") && variantName.includes("basculin");
            return (variantName.includes(baseName) || isBasculinMatch) && p.id !== pokemon.id;
        });

        const combined = [pokemon, ...variants];
        return Array.from(new Map(combined.map(item => [item.id, item])).values());
    }, [pokemon]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const capturedItems = useMemo(() => {
        const items = [];
        const lowerBaseName = pokemon.name.toLowerCase();

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key.startsWith("plza_shinyData_") || key.startsWith("sv_shinyData_") || key.startsWith("pogo_shinyData_") || key.startsWith("pla_shinyData_")) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data?.pokemonName) {
                        const caughtName = data.pokemonName.toLowerCase();
                        const isBasculinCase = lowerBaseName.includes("basculin") && caughtName.includes("basculin");
                        const matchesName = caughtName === lowerBaseName || caughtName.includes(lowerBaseName) || isBasculinCase;

                        let isException = false;
                        if (lowerBaseName === "porygon" && (caughtName === "porygon2" || caughtName === "porygon-z")) isException = true;

                        if (matchesName && !isException) {
                            const keyParts = key.split("_");
                            const gamePrefix = keyParts[0].toUpperCase();
                            const shinyIndex = parseInt(keyParts[keyParts.length - 1]);
                            const originalId = keyParts[2];

                            // VERBETERDE LOGICA: Zoek de variant op.
                            // Als de variant niet in RegionalData staat, gebruiken we de basis pokemon
                            // MAAR we overschrijven de naam met de naam uit de localStorage (data.pokemonName)
                            // zodat "Hisuian Basculin" niet terug verandert in "Basculin".
                            const foundVariant = regionalPokemon.find(v => v.name.toLowerCase() === caughtName);

                            const displayData = foundVariant ? { ...foundVariant } : { ...pokemon };
                            // Forceer de correcte naam uit de opgeslagen data
                            displayData.name = data.pokemonName;

                            items.push({
                                ...displayData,
                                id: originalId,
                                storedData: data,
                                type: gamePrefix,
                                shinyIndex: shinyIndex
                            });
                        }
                    }
                } catch (e) { /* eslint-disable-line no-unused-vars */ }
            }
        }

        return items.sort((a, b) => (b.storedData.timestamp || 0) - (a.storedData.timestamp || 0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allForms, pokemon.name, refreshKey]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const totalCount = useMemo(() => {
        let count = capturedItems.length;

        allForms.forEach(form => {
            const pogoBulkCount = localStorage.getItem(`pogo_shiny_${form.id}`);
            if (pogoBulkCount) {
                const bulkVal = parseInt(pogoBulkCount);
                const pogoInList = capturedItems.filter(item => item.type === 'POGO' && String(item.id) === String(form.id)).length;
                if (bulkVal > pogoInList) {
                    count += (bulkVal - pogoInList);
                }
            }
        });

        return count;
    }, [capturedItems, allForms]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden">

                <div className="pt-6 px-6 pb-4 border-b border-slate-50 flex justify-between items-start bg-white">
                    <div className="flex flex-col">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">National Dex Entry</p>
                        <h2 className="text-2xl font-black uppercase italic text-slate-800 leading-tight">
                            {pokemon.name} <span className="text-[#ff4d29] ml-1">x{totalCount}</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-[#ff4d29] transition-colors">
                        <span className="text-xl font-black">✕</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto pt-4 pb-6 px-6 bg-slate-50/50">
                    <button
                        onClick={() => onAddPokemon(pokemon)}
                        className="w-full mb-5 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase italic text-xs tracking-[0.2em] shadow-lg shadow-emerald-100 hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center gap-3 border-b-4 border-emerald-700"
                    >
                        <span className="text-xl">+</span> Add to Pokémon GO
                    </button>

                    <div className="grid gap-3">
                        {capturedItems.map((item, idx) => (
                            <button
                                key={`${item.type}_${item.id}_${item.shinyIndex}_${idx}`}
                                onClick={() => onSelectEntry(item)}
                                className="w-full text-left group bg-white border-2 border-slate-100 p-4 rounded-2xl flex items-center justify-between hover:border-[#ff4d29] transition-all shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                                        item.type === 'POGO' ? 'bg-emerald-50 text-emerald-500' :
                                            item.type === 'PLZA' ? 'bg-cyan-50 text-cyan-500' :
                                                item.type === 'PLA' ? 'bg-amber-50 text-amber-600' : 'bg-orange-50 text-orange-500'
                                    }`}>
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${item.id}.png`} className="w-12 h-12 object-contain" alt={item.name} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-slate-800 uppercase italic leading-none mb-1">{item.name}</p>
                                        <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${
                                            item.type === 'POGO' ? 'text-emerald-600' :
                                                item.type === 'PLZA' ? 'text-cyan-600' :
                                                    item.type === 'PLA' ? 'text-amber-700' : 'text-orange-600'
                                        }`}>
                                            {item.type === 'POGO' ? 'Pokémon GO' : item.type === 'PLZA' ? 'Legends: Z-A' : item.type === 'PLA' ? 'Legends: Arceus' : 'Scarlet & Violet'}
                                        </p>
                                        <p className="text-[11px] font-bold text-slate-400 italic">
                                            {new Date(item.storedData.timestamp).toLocaleDateString('nl-NL')}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1.5">
                                    <div className="flex flex-col items-end">
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Encounters</p>
                                        <p className="text-xl font-black italic text-slate-900 leading-none">{item.storedData.counter}</p>
                                    </div>
                                    <div className="px-2 py-0.5 bg-slate-100 rounded-lg border border-slate-200">
                                        <p className="text-sm font-black text-slate-600 italic leading-none">{formatTime(item.storedData.timer || 0)}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                        {capturedItems.length === 0 && (
                            <p className="text-center py-10 font-black italic text-slate-400 uppercase tracking-widest opacity-40">No records found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}