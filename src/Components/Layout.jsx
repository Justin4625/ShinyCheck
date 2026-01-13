import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";

// --- INTERNE COMPONENT: GamesModal (Light Mode, Navbar Style) ---
function GamesModal({ isOpen, onClose, gameItems, currentPath }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative bg-white border-2 border-slate-200 rounded-[2.5rem] shadow-2xl p-8 w-full max-w-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Grid achtergrond effect (dezelfde stijl als navbar, maar licht) */}
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:25px_25px]" aria-hidden="true" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="flex flex-col items-center mb-10">
                        <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter leading-none">Select Game</h2>
                        <div className="h-1 w-12 bg-cyan-500 mt-2 rounded-full" />
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
                                        group relative p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center
                                        ${isActive
                                        ? "bg-slate-50 border-cyan-500 shadow-[0_10px_25px_rgba(6,182,212,0.15)] scale-105"
                                        : "bg-white border-slate-100 hover:border-cyan-200 hover:bg-slate-50"
                                    }
                                    `}
                                >
                                    <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${isActive ? "text-cyan-600" : "text-slate-400 group-hover:text-cyan-600"}`}>
                                        {game.label}
                                    </span>
                                    {isActive && (
                                        <div className="absolute -top-2 px-3 py-0.5 bg-cyan-500 text-[8px] font-black text-white rounded-full uppercase tracking-tighter shadow-sm">
                                            Active
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-12 px-10 py-3 bg-slate-100 rounded-2xl text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-200 hover:text-slate-600 transition-all active:scale-95"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

function Layout() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state
    const [isModalOpen, setIsModalOpen] = useState(false); // Games modal state

    // Voorkom scrollen als de modal open is
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isModalOpen]);

    const gameItems = [
        { to: "/plza", label: "Legends: Z-A" },
        { to: "/sv", label: "Scarlet & Violet" },
        { to: "/pla", label: "Legends: Arceus" },
    ];

    const isGameActive = gameItems.some(item => location.pathname === item.to);

    return (
        <>
            {/* Navbar (Donker zoals origineel) */}
            <nav className="relative bg-[#0d0d1a] backdrop-blur-md border-b border-cyan-500/30 px-4 py-4 md:px-6 md:py-6 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:25px_25px]" aria-hidden="true" />
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-400/10 blur-[100px]"/>

                <div className="relative z-20 flex flex-col md:flex-row md:justify-center items-center">
                    <div className="flex w-full justify-between items-center md:hidden mb-0">
                        <span className="text-cyan-400 font-bold tracking-widest text-lg">SHINYCHECK</span>
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
                        space-y-4 md:space-y-0 md:space-x-8
                        mt-4 md:mt-0 
                        items-center transition-all duration-300
                    `}>
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className={`relative font-bold text-base sm:text-lg md:text-xl tracking-wide px-3 py-1 transition-all ${location.pathname === "/" ? "text-white" : "text-cyan-400 hover:text-white"}`}
                        >
                            Shinydex
                            {location.pathname === "/" && <div className="hidden md:block absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />}
                        </Link>

                        {/* GAMES TRIGGER BUTTON */}
                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                                setIsOpen(false);
                            }}
                            className={`
                                relative font-bold text-base sm:text-lg md:text-xl tracking-wide
                                px-3 py-1 transition-all flex items-center
                                ${isGameActive ? "text-white" : "text-cyan-400 hover:text-white"}
                            `}
                        >
                            Games
                            <div className={`ml-2 w-2 h-2 rounded-full transition-all ${isGameActive ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-white/20"}`} />
                        </button>

                        <Link
                            to="/collection"
                            onClick={() => setIsOpen(false)}
                            className={`relative font-bold text-base sm:text-lg md:text-xl tracking-wide px-3 py-1 transition-all ${location.pathname === "/collection" ? "text-white" : "text-cyan-400 hover:text-white"}`}
                        >
                            Collection
                            {location.pathname === "/collection" && <div className="hidden md:block absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Games Modal (Light Mode) */}
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