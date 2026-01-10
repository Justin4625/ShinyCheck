import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

function Layout() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { to: "/", label: "Shinydex" },
        { to: "/plza", label: "Pokémon Legends: Z-A" },
        { to: "/sv", label: "Pokémon Scarlet & Violet" },
        { to: "/pla", label: "Pokémon Legends: Arceus" },
        { to: "/collection", label: "Collection" },
    ];

    return (
        <>
            <nav className="relative bg-[#0d0d1a] backdrop-blur-md border-b border-cyan-500/30 px-4 py-4 md:px-6 md:py-6 shadow-lg overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:25px_25px]" aria-hidden="true" />
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-400/10 blur-[100px]"/>

                <div className="relative z-20 flex flex-col md:flex-row md:justify-center items-center">
                    {/* Mobile Header: Toggle Button */}
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

                    {/* Navigation Links */}
                    <div className={`
                        ${isOpen ? "flex" : "hidden"} 
                        md:flex flex-col md:flex-row 
                        w-full md:w-auto 
                        space-y-4 md:space-y-0 md:space-x-6 
                        mt-4 md:mt-0 
                        items-center transition-all duration-300
                    `}>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.to;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setIsOpen(false)} // Sluit menu na klik op mobiel
                                    className={`
                                        relative font-bold text-base sm:text-lg md:text-xl tracking-wide
                                        px-3 py-1 rounded-md w-full md:w-auto text-center
                                        transition-all duration-300 hover:scale-105
                                        ${isActive ? "text-white" : "text-cyan-400 hover:text-white"}
                                        md:after:absolute md:after:left-0 md:after:-bottom-1 md:after:h-[2px] md:after:w-full md:after:rounded-full
                                        md:after:bg-gradient-to-r md:after:from-cyan-400 md:after:to-purple-500
                                        md:after:scale-x-0 md:after:origin-center md:after:transition-transform
                                        ${isActive ? "md:after:scale-x-100 bg-cyan-500/10 md:bg-transparent" : ""}
                                    `}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="absolute inset-0 animate-pulse-slow pointer-events-none"></div>
                <style>{`@keyframes pulse-slow { 0%, 100% {opacity: 0.05;} 50% {opacity: 0.15;} }`}</style>
            </nav>
            <Outlet/>
        </>
    );
}

export default Layout;