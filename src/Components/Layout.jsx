import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";

// Importeer de logo's direct
import plzaLogo from "/gameLogos/plzaLogo.png";
import svLogo from "/gameLogos/svLogo.png";
import plaLogo from "/gameLogos/plaLogo.png";

// --- INTERNE COMPONENT: GamesModal ---
function GamesModal({ isOpen, onClose, gameItems, currentPath }) {
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[110] p-4 animate-in fade-in duration-500"
            onClick={onClose}
        >
            <div
                className="relative bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] p-8 md:p-12 w-full max-w-5xl overflow-hidden animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Subtiele Light Mode Decoratie */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-100 via-cyan-500 to-cyan-100 opacity-30" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-50/50 blur-[100px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-slate-100/50 blur-[100px] rounded-full" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="text-center mb-12">
                        <p className="text-cyan-600 font-black text-[10px] uppercase tracking-[0.5em] mb-3">System Interface</p>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                            Select <span className="text-cyan-500">Game</span>
                        </h2>
                        <div className="flex justify-center gap-1 mt-5">
                            <div className="h-1.5 w-14 bg-cyan-500 rounded-full" />
                            <div className="h-1.5 w-3 bg-slate-200 rounded-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
                        {gameItems.map((game) => {
                            const isActive = currentPath === game.to;
                            return (
                                <Link
                                    key={game.to}
                                    to={game.to}
                                    onClick={onClose}
                                    className={`
                                        group relative p-1.5 transition-all duration-500 rounded-[2rem]
                                        ${isActive ? "bg-cyan-500 shadow-[0_20px_40px_rgba(6,182,212,0.25)] scale-105" : "bg-slate-100 hover:bg-slate-200/50"}
                                    `}
                                >
                                    <div className="bg-white rounded-[1.8rem] p-8 h-full flex flex-col items-center justify-center text-center aspect-[4/5] overflow-hidden relative border border-slate-100">
                                        <div className="relative w-full h-32 flex items-center justify-center mb-8">
                                            <img
                                                src={game.logo}
                                                alt={game.label}
                                                style={game.extraStyle}
                                                className={`max-w-full max-h-full object-contain transition-all duration-700 
                                                    ${isActive ? "scale-110" : "group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"}
                                                `}
                                            />
                                        </div>

                                        <div className="flex flex-col items-center gap-3">
                                            <span className={`text-[12px] font-black uppercase tracking-[0.15em] transition-colors ${isActive ? "text-slate-900" : "text-slate-400 group-hover:text-slate-900"}`}>
                                                {game.label}
                                            </span>
                                            {isActive && (
                                                <div className="px-4 py-1.5 bg-cyan-500 text-white text-[9px] font-black uppercase rounded-full flex items-center gap-2 shadow-sm">
                                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                                    Active
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-12 group flex items-center gap-3 px-10 py-4 bg-slate-900 text-white hover:bg-cyan-600 transition-all rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-lg active:scale-95"
                    >
                        <span>✕</span>
                        Return
                    </button>
                </div>
            </div>
        </div>
    );
}

function Layout() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isModalOpen]);

    const gameItems = [
        { to: "/plza", label: "Legends: Z-A", logo: plzaLogo, extraStyle: { transform: 'scale(1.8)' } },
        { to: "/sv", label: "Scarlet & Violet", logo: svLogo, extraStyle: { transform: 'scale(1.2)' } },
        { to: "/pla", label: "Legends: Arceus", logo: plaLogo, extraStyle: { transform: 'scale(1.0)' } },
    ];

    const isGameActive = gameItems.some(item => location.pathname === item.to);
    const linkStyle = "font-black uppercase italic tracking-tighter transition-all duration-300";

    return (
        <div className="antialiased min-h-screen">
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0b0b14] border-b border-white/[0.05] h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">

                    {/* Brand / Logo */}
                    <Link to="/" className="flex items-center group shrink-0">
                        <div className="w-8 h-8 bg-white/[0.03] border border-white/10 rounded-lg flex items-center justify-center mr-3 transition-all duration-500 group-hover:border-cyan-500/50">
                            <span className="text-white text-lg">✨</span>
                        </div>
                        <span className="text-white font-black tracking-tighter text-xl uppercase italic group-hover:text-cyan-400 transition-colors">
                            SHINY<span className="text-cyan-500 transition-colors group-hover:text-white">CHECK</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className={`${linkStyle} text-base ${location.pathname === "/" ? "text-cyan-400 scale-105" : "text-white/40 hover:text-white"}`}
                        >
                            Shinydex
                        </Link>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className={`${linkStyle} flex items-center gap-2 text-base px-2 py-1 rounded-lg ${
                                isGameActive
                                    ? "text-cyan-400"
                                    : "text-white/40 hover:text-white"
                            }`}
                        >
                            Games
                            <div className={`w-1.5 h-1.5 rounded-full ${isGameActive ? "bg-cyan-400 animate-pulse shadow-[0_0_8px_cyan]" : "bg-white/20"}`} />
                        </button>

                        <Link
                            to="/collection"
                            className={`${linkStyle} text-base ${location.pathname === "/collection" ? "text-cyan-400 scale-105" : "text-white/40 hover:text-white"}`}
                        >
                            Collection
                        </Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
                        <div className="flex flex-col gap-1.5 items-end">
                            <div className={`h-0.5 bg-current transition-all ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
                            <div className={`h-0.5 bg-current transition-all ${isOpen ? "opacity-0" : "w-4"}`} />
                            <div className={`h-0.5 bg-current transition-all ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden absolute top-full left-0 w-full bg-[#0b0b14] border-t border-white/5 transition-all duration-500 overflow-hidden ${isOpen ? "max-h-64 shadow-2xl" : "max-h-0"}`}>
                    <div className="p-6 flex flex-col gap-4 text-center">
                        <Link to="/" onClick={() => setIsOpen(false)} className={`${linkStyle} text-lg ${location.pathname === "/" ? "text-cyan-400" : "text-white/40"}`}>Shinydex</Link>
                        <button onClick={() => { setIsModalOpen(true); setIsOpen(false); }} className={`${linkStyle} text-lg ${isGameActive ? "text-cyan-400" : "text-white/40"}`}>Games</button>
                        <Link to="/collection" onClick={() => setIsOpen(false)} className={`${linkStyle} text-lg ${location.pathname === "/collection" ? "text-cyan-400" : "text-white/40"}`}>Collection</Link>
                    </div>
                </div>
            </header>

            <GamesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} gameItems={gameItems} currentPath={location.pathname} />

            <main className="pt-20">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;