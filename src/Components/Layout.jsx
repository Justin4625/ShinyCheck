import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";

// Importeer de logo's direct (Vite zorgt nu voor de juiste paden)
import plzaLogo from "/gameLogos/plzaLogo.png";
import svLogo from "/gameLogos/svLogo.png";
import plaLogo from "/gameLogos/plaLogo.png";

// --- INTERNE COMPONENT: GamesModal ---
function GamesModal({ isOpen, onClose, gameItems, currentPath }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="relative bg-white border-2 border-slate-100 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.2)] p-6 md:p-12 w-full max-w-4xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Subtiel Grid & Decoratie */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/30 blur-[100px] rounded-full -mr-32 -mt-32" />

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
                                <Link
                                    key={game.to}
                                    to={game.to}
                                    onClick={onClose}
                                    className={`
                                        group relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center justify-center text-center aspect-[4/5]
                                        ${isActive
                                        ? "bg-slate-50 border-cyan-500 shadow-[0_20px_40px_rgba(6,182,212,0.15)] scale-105 z-20"
                                        : "bg-white border-slate-100 hover:border-cyan-200 hover:shadow-xl hover:-translate-y-2"
                                    }
                                    `}
                                >
                                    {/* Game Logo Container */}
                                    <div className="relative w-full h-32 flex items-center justify-center mb-6 px-4">
                                        <img
                                            src={game.logo}
                                            alt={game.label}
                                            style={game.extraStyle}
                                            className={`max-w-full max-h-full object-contain transition-all duration-700 
                                                ${isActive ? "scale-110" : "group-hover:scale-110"}
                                            `}
                                        />
                                        {isActive && (
                                            <div className="absolute inset-0 bg-cyan-400/5 blur-2xl rounded-full" />
                                        )}
                                    </div>

                                    <div className="flex flex-col items-center gap-2">
                                        <span className={`text-[11px] font-black uppercase tracking-[0.2em] leading-tight transition-colors ${isActive ? "text-cyan-600" : "text-slate-400 group-hover:text-cyan-600"}`}>
                                            {game.label}
                                        </span>
                                        {isActive && (
                                            <div className="px-3 py-1 bg-cyan-500 text-white text-[8px] font-black uppercase rounded-full tracking-tighter shadow-md">
                                                Exploring
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-12 group flex items-center gap-3 px-12 py-4 bg-slate-900 text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:bg-cyan-600 transition-all active:scale-95 shadow-lg"
                    >
                        <span>✕</span>
                        <span>Close</span>
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
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isModalOpen]);

    // Gebruik de geïmporteerde variabelen hier
    const gameItems = [
        {
            to: "/plza",
            label: "Legends: Z-A",
            logo: plzaLogo,
            extraStyle: { transform: 'scale(1.8)' }
        },
        {
            to: "/sv",
            label: "Scarlet & Violet",
            logo: svLogo,
            extraStyle: { transform: 'scale(1.4)' }
        },
        {
            to: "/pla",
            label: "Legends: Arceus",
            logo: plaLogo,
            extraStyle: { transform: 'scale(1.0)' }
        },
    ];

    const isGameActive = gameItems.some(item => location.pathname === item.to);

    return (
        <>
            <nav className="relative bg-[#0d0d1a] backdrop-blur-md border-b border-cyan-500/30 px-4 py-4 md:px-6 md:py-6 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:25px_25px]" aria-hidden="true" />
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-400/10 blur-[100px]"/>

                <div className="relative z-20 flex flex-col md:flex-row md:justify-center items-center">
                    <div className="flex w-full justify-between items-center md:hidden mb-0">
                        <span className="text-cyan-400 font-bold tracking-widest text-lg italic uppercase">SHINYCHECK</span>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-cyan-400 focus:outline-none p-2"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>

                    <div className={`
                        ${isOpen ? "flex" : "hidden"} 
                        md:flex flex-col md:flex-row 
                        w-full md:w-auto 
                        space-y-4 md:space-y-0 md:space-x-10 
                        mt-4 md:mt-0 
                        items-center transition-all duration-300
                    `}>
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className={`relative font-black text-xs md:text-sm uppercase tracking-[0.2em] px-3 py-1 transition-all ${location.pathname === "/" ? "text-white" : "text-cyan-400 hover:text-white"}`}
                        >
                            Shinydex
                            {location.pathname === "/" && <div className="hidden md:block absolute left-0 -bottom-2 h-[3px] w-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />}
                        </Link>

                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                                setIsOpen(false);
                            }}
                            className={`relative font-black text-xs md:text-sm uppercase tracking-[0.2em] px-3 py-1 transition-all flex items-center gap-2 ${isGameActive ? "text-white" : "text-cyan-400 hover:text-white"}`}
                        >
                            Games
                            <div className={`w-2 h-2 rounded-full transition-all ${isGameActive ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" : "bg-white/20"}`} />
                        </button>

                        <Link
                            to="/collection"
                            onClick={() => setIsOpen(false)}
                            className={`relative font-black text-xs md:text-sm uppercase tracking-[0.2em] px-3 py-1 transition-all ${location.pathname === "/collection" ? "text-white" : "text-cyan-400 hover:text-white"}`}
                        >
                            Collection
                            {location.pathname === "/collection" && <div className="hidden md:block absolute left-0 -bottom-2 h-[3px] w-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />}
                        </Link>
                    </div>
                </div>
            </nav>

            <GamesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                gameItems={gameItems}
                currentPath={location.pathname}
            />

            <Outlet/>
        </>
    );
}

export default Layout;