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
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-in fade-in duration-300" onClick={onClose}>
            <div className="relative bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl p-6 md:p-12 w-full max-w-4xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="relative z-10 flex flex-col items-center">
                    <div className="flex flex-col items-center mb-10 text-center font-sans">
                        <p className="text-cyan-600 font-black text-[10px] uppercase tracking-[0.4em] mb-2">Switch Adventure</p>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase italic tracking-tighter">Select Game</h2>
                        <div className="h-1 w-16 bg-cyan-500 mt-4 rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                        {gameItems.map((game) => {
                            const isActive = currentPath === game.to;
                            return (
                                <Link key={game.to} to={game.to} onClick={onClose} className={`group relative p-8 rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center text-center aspect-[4/5] ${isActive ? "bg-slate-50 border-cyan-500 shadow-lg scale-105 z-20" : "bg-white border-slate-100 hover:border-cyan-200 hover:bg-slate-50"}`}>
                                    <div className="relative w-full h-32 flex items-center justify-center mb-6">
                                        <img src={game.logo} alt={game.label} style={game.extraStyle} className={`max-w-full max-h-full object-contain transition-all duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest font-sans ${isActive ? "text-cyan-600" : "text-slate-500"}`}>{game.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                    <button onClick={onClose} className="mt-10 px-10 py-3 bg-slate-100 text-slate-500 font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-slate-200 transition-all font-sans">Close</button>
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
        { to: "/sv", label: "Scarlet & Violet", logo: svLogo, extraStyle: { transform: 'scale(1.4)' } },
        { to: "/pla", label: "Legends: Arceus", logo: plaLogo, extraStyle: { transform: 'scale(1.0)' } },
    ];

    const isGameActive = gameItems.some(item => location.pathname === item.to);

    // Stijl voor de links (kopie van logo stijl)
    const linkStyle = "font-black uppercase italic tracking-tighter transition-all duration-300";

    return (
        <div className="antialiased">
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0b0b14] border-b border-white/[0.05] h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">

                    {/* Brand / Logo */}
                    <Link to="/" className="flex items-center group shrink-0">
                        <div className="w-8 h-8 bg-white/[0.03] border border-white/10 rounded-lg flex items-center justify-center mr-3 transition-all duration-500 group-hover:border-cyan-500/50">
                            <span className="text-white text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">✨</span>
                        </div>
                        <span className="text-white font-black tracking-tighter text-xl uppercase italic group-hover:text-cyan-400 transition-colors">
                            SHINY<span className="text-cyan-500 transition-colors group-hover:text-white">CHECK</span>
                        </span>
                    </Link>

                    {/* Navigation - Shinydex | Games | Collection */}
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
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
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

            <main className="pt-16">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;