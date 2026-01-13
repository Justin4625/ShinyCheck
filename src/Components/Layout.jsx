import { useState, useEffect, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router";

// Data imports
import shinyDexPart1 from "../data/ShinyDexData/ShinyDexData.js";
import shinyDexPart2 from "../data/ShinyDexData/ShinyDexData2.js";
import shinyDexPart3 from "../data/ShinyDexData/ShinyDexData3.js";

// Importeer de logo's
import plzaLogo from "/gameLogos/plzaLogo.png";
import svLogo from "/gameLogos/svLogo.png";
import plaLogo from "/gameLogos/plaLogo.png";

const fullShinyDex = [...shinyDexPart1, ...shinyDexPart2, ...shinyDexPart3];

// --- INTERNE COMPONENT: GamesModal ---
function GamesModal({ isOpen, onClose, gameItems, currentPath }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[110] p-4 animate-in fade-in duration-300" onClick={onClose}>
            <div className="relative bg-white border-2 border-slate-100 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.2)] p-6 md:p-12 w-full max-w-4xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="relative z-10 flex flex-col items-center">
                    <div className="flex flex-col items-center mb-12 text-center">
                        <p className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2">Switch Adventure</p>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-800 uppercase italic tracking-tighter leading-none">Select Game</h2>
                        <div className="h-1.5 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mt-4 rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                        {gameItems.map((game) => {
                            const isActive = currentPath === game.to;
                            return (
                                <Link key={game.to} to={game.to} onClick={onClose} className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center justify-center text-center aspect-[4/5] ${isActive ? "bg-slate-50 border-cyan-500 shadow-[0_20px_40px_rgba(6,182,212,0.15)] scale-105 z-20" : "bg-white border-slate-100 hover:border-cyan-200 hover:shadow-xl hover:-translate-y-2"}`}>
                                    <div className="relative w-full h-32 flex items-center justify-center mb-6 px-4">
                                        <img src={game.logo} alt={game.label} style={game.extraStyle} className={`max-w-full max-h-full object-contain transition-all duration-700 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <span className={`text-[11px] font-black uppercase tracking-[0.2em] leading-tight transition-colors ${isActive ? "text-cyan-600" : "text-slate-400 group-hover:text-cyan-600"}`}>{game.label}</span>
                                        {isActive && <div className="px-3 py-1 bg-cyan-500 text-white text-[8px] font-black uppercase rounded-full tracking-tighter shadow-md">Exploring</div>}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <button onClick={onClose} className="mt-12 group flex items-center gap-3 px-12 py-4 bg-slate-900 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-cyan-600 transition-all active:scale-95 shadow-lg"><span>✕</span><span>Close</span></button>
                </div>
            </div>
        </div>
    );
}

function Layout() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // Gebruikt voor live updates

    // 1. Luister naar storage events (voor andere tabbladen)
    // 2. Gebruik een interval om de UI up-to-date te houden bij lokale wijzigingen
    useEffect(() => {
        const handleStorageChange = () => setRefreshTrigger(prev => prev + 1);
        window.addEventListener("storage", handleStorageChange);

        // Interval check elke 2 seconden om wijzigingen in hetzelfde tabblad op te vangen
        const interval = setInterval(() => {
            setRefreshTrigger(prev => prev + 1);
        }, 2000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    // --- EXACTE PROGRESS LOGICA ---
    const progress = useMemo(() => {
        const isCaught = (baseName) => {
            const lowerBaseName = baseName.toLowerCase();
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith("plza_shinyData_") || key.startsWith("sv_shinyData_") || key.startsWith("pogo_shinyData_") || key.startsWith("pla_shinyData_") || key.startsWith("pogo_shiny_")) {
                    try {
                        const caughtNameFromKey = key.includes("_shinyData_") ? JSON.parse(localStorage.getItem(key))?.pokemonName?.toLowerCase() : null;

                        if (key.startsWith("pogo_shiny_") && !key.includes("shinyData")) {
                            const parts = key.split("_");
                            const pokemonId = parts[2];
                            const pokemonMatch = fullShinyDex.find(p => String(p.id) === String(pokemonId));
                            if (pokemonMatch?.name.toLowerCase() === lowerBaseName) return true;
                        }

                        if (caughtNameFromKey) {
                            const matchesName = caughtNameFromKey === lowerBaseName || new RegExp(`\\b${lowerBaseName}\\b`).test(caughtNameFromKey);
                            let isException = false;
                            if (lowerBaseName === "porygon" && (caughtNameFromKey === "porygon2" || caughtNameFromKey === "porygon-z")) isException = true;
                            if (matchesName && !isException) return true;
                        }
                        // eslint-disable-next-line no-unused-vars
                    } catch (e) { /* ignore */ }
                }
            }
            return false;
        };

        const count = fullShinyDex.filter(p => isCaught(p.name)).length;
        const total = fullShinyDex.length;
        const percentage = total > 0 ? (count / total) * 100 : 0;

        return { count, total, percentage: percentage.toFixed(1) };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, isModalOpen, refreshTrigger]); // refreshTrigger zorgt voor de live update

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isModalOpen]);

    const gameItems = [
        { to: "/plza", label: "Legends: Z-A", logo: plzaLogo, extraStyle: { transform: 'scale(1.8)' } },
        { to: "/sv", label: "Scarlet & Violet", logo: svLogo, extraStyle: { transform: 'scale(1.4)' } },
        { to: "/pla", label: "Legends: Arceus", logo: plaLogo, extraStyle: { transform: 'scale(1.0)' } },
    ];

    const isGameActive = gameItems.some(item => location.pathname === item.to);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? "bg-[#0d0d1a]/95 backdrop-blur-xl py-3 border-cyan-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" : "bg-[#0d0d1a] py-5 border-transparent"}`}>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative flex items-center justify-between">
                    <Link to="/" className="flex items-center group shrink-0">
                        <div className="relative h-8 w-8 mr-3 flex items-center justify-center">
                            <div className="absolute inset-0 bg-cyan-500 rounded-lg rotate-45 group-hover:rotate-180 transition-all duration-700 opacity-20" />
                            <span className="relative text-cyan-400 font-black text-xs">✨</span>
                        </div>
                        <span className="text-white font-black tracking-tighter text-xl italic uppercase">Shiny<span className="text-cyan-500">Check</span></span>
                    </Link>

                    {/* Progress Bar Gecentreerd */}
                    <div className="hidden lg:flex flex-col items-center w-72 absolute left-1/2 -translate-x-1/2">
                        <div className="flex justify-between w-full mb-1.5 px-1">
                            <span className="text-[7px] font-black text-cyan-500 uppercase tracking-[0.3em]">Global Shinydex Progress</span>
                            <span className="text-[7px] font-black text-white/50 uppercase tracking-widest">{progress.count} / {progress.total}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden border border-white/5 relative shadow-inner">
                            <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out rounded-full" style={{ width: `${progress.percentage}%` }} />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-1.5 py-1 backdrop-blur-md">
                        <Link to="/" className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${location.pathname === "/" ? "bg-cyan-500 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}>Shinydex</Link>
                        <button onClick={() => setIsModalOpen(true)} className={`flex items-center px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 group ${isGameActive ? "bg-white/10 text-cyan-400 shadow-inner" : "text-slate-400 hover:text-white"}`}>
                            Games
                            <div className={`ml-3 w-1.5 h-1.5 rounded-full ${isGameActive ? "bg-cyan-400 shadow-[0_0_8px_cyan] animate-pulse" : "bg-slate-600"}`} />
                        </button>
                        <Link to="/collection" className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${location.pathname === "/collection" ? "bg-cyan-500 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}>Collection</Link>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-cyan-400 transition-all">
                        <div className="flex flex-col gap-1.5 items-end">
                            <div className={`h-0.5 bg-current transition-all ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
                            <div className={`h-0.5 bg-current transition-all ${isOpen ? "opacity-0" : "w-4"}`} />
                            <div className={`h-0.5 bg-current transition-all ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
                        </div>
                    </button>
                </div>

                <div className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 bg-[#0d0d1a] border-b border-cyan-500/20 ${isOpen ? "max-h-screen py-6 opacity-100" : "max-h-0 py-0 opacity-0"}`}>
                    <div className="flex flex-col gap-3 px-6">
                        <div className="mb-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                            <div className="flex justify-between mb-2">
                                <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">Global Progress</span>
                                <span className="text-[9px] font-black text-white">{progress.count}/{progress.total} ({progress.percentage}%)</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${progress.percentage}%` }} />
                            </div>
                        </div>
                        <Link to="/" onClick={() => setIsOpen(false)} className="py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-white/5 text-slate-300 text-center">Shinydex</Link>
                        <button onClick={() => { setIsModalOpen(true); setIsOpen(false); }} className="py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-white/5 text-cyan-400 text-center">Games</button>
                        <Link to="/collection" onClick={() => setIsOpen(false)} className="py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-white/5 text-slate-300 text-center">Collection</Link>
                    </div>
                </div>
            </nav>

            <GamesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} gameItems={gameItems} currentPath={location.pathname} />
            <div className="h-28 md:h-32" />
            <Outlet />
        </>
    );
}

export default Layout;