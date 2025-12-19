import React from "react";

export default function SvActiveHunts({ svPokemon, pokemonList, formatTime, openModal }) {
    // Sorteren op meest recente activiteit (lastUpdated)
    const activeHunts = svPokemon
        .map(p => {
            const storedData = localStorage.getItem(`sv_hunt_${p.id}`);
            if (!storedData) return null;
            try {
                const parsed = JSON.parse(storedData);
                if (parsed.counter > 0 || parsed.timer > 0) {
                    return { ...p, huntData: parsed };
                }
                // eslint-disable-next-line no-unused-vars
            } catch (e) { return null; }
            return null;
        })
        .filter(Boolean)
        .sort((a, b) => (b.huntData.lastUpdated || 0) - (a.huntData.lastUpdated || 0));

    const getStaticIndex = (entry) => {
        const index = svPokemon.findIndex(p => p.id === entry.id);
        return index !== -1 ? index + 1 : 1;
    };

    const isLoading = activeHunts.length > 0 && activeHunts.some((entry) => {
        const pokemon = pokemonList.find((p) => p.id === entry.id);
        return !pokemon?.sprites?.other?.home?.front_shiny;
    });

    return (
        <div className="relative z-10 px-2">
            {activeHunts.length === 0 ? (
                <div className="flex flex-col justify-center items-center text-center min-h-[300px]">
                    <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border-2 border-dashed border-gray-300 transform -rotate-1">
                        <span className="text-xl font-black text-gray-400 uppercase tracking-[0.2em] italic">
                            No Active Hunts
                        </span>
                    </div>
                </div>
            ) : isLoading ? (
                <div className="flex flex-col justify-center items-center text-center min-h-[300px]">
                    <span className="text-sm font-black text-[#ff4d00] animate-pulse uppercase tracking-widest">
                        Loading Hunts...
                    </span>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeHunts.map((entry, index) => {
                        const pokemon = pokemonList.find((p) => p.id === entry.id);
                        const staticNumber = getStaticIndex(entry);
                        const isScarlet = index % 2 === 0;
                        const accentColor = isScarlet ? "#ff4d00" : "#8c00ff";

                        return (
                            <div
                                key={entry.id}
                                onClick={() => openModal(pokemon)}
                                className="group relative bg-white border-b-[6px] border-r-[6px] border-gray-300 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-lg rounded-br-lg p-5 flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rotate-45 opacity-[0.08] pointer-events-none" style={{ backgroundColor: accentColor }} />
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className="flex flex-col">
                                        <div className="self-start px-2 py-0.5 transform -skew-x-12 mb-1" style={{ backgroundColor: accentColor }}>
                                            <span className="text-[10px] font-black italic text-white tracking-tighter uppercase">No. {String(staticNumber).padStart(3, "0")}</span>
                                        </div>
                                        <h3 className="font-black text-xl text-gray-800 uppercase italic tracking-tighter leading-none">{entry.name}</h3>
                                    </div>
                                    <div className="text-2xl animate-pulse">✨</div>
                                </div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <img src={pokemon?.sprites?.other?.home?.front_shiny} alt={entry.name} className="w-24 h-24 drop-shadow-[0_5px_5px_rgba(0,0,0,0.1)]" />
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className="px-3 py-1.5 rounded-lg transform skew-x-[-10deg] shadow-inner" style={{ backgroundColor: `${accentColor}10` }}>
                                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest skew-x-[10deg]">Encounters</div>
                                            <div className="text-xl font-black italic leading-none skew-x-[10deg]" style={{ color: accentColor }}>{entry.huntData.counter}</div>
                                        </div>
                                        <div className="px-3 py-1.5 rounded-lg transform skew-x-[-10deg] shadow-inner" style={{ backgroundColor: `${accentColor}10` }}>
                                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest skew-x-[10deg]">Time</div>
                                            <div className="text-base font-black italic leading-none skew-x-[10deg] whitespace-nowrap" style={{ color: accentColor }}>{formatTime(entry.huntData.timer)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full animate-pulse transition-all duration-500" style={{ backgroundColor: accentColor, width: '100%' }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}