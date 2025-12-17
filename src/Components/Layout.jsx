import { Link, Outlet, useLocation } from "react-router";

function Layout() {
    const location = useLocation();

    const navItems = [
        { to: "/", label: "Shinydex" },
        { to: "/plza", label: "Pokémon Legends: Z-A" },
        { to: "/sv", label: "Pokémon Scarlet & Violet" }, // Nieuwe link toegevoegd
    ];

    return (
        <>
            <nav className="relative bg-[#0d0d1a] backdrop-blur-md border-b border-cyan-500/30 px-6 py-6 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:25px_25px]" aria-hidden="true" />
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-400/10 blur-[100px]"/>
                <div className="relative z-10 flex justify-center space-x-6">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`
                                    relative font-bold text-lg sm:text-xl tracking-wide
                                    px-3 py-1 rounded-md
                                    transition-all duration-300 hover:scale-105
                                    ${isActive ? "text-white" : "text-cyan-400 hover:text-white"}
                                    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:rounded-full
                                    after:bg-gradient-to-r after:from-cyan-400 after:to-purple-500
                                    after:scale-x-0 after:origin-center after:transition-transform
                                    ${isActive ? "after:scale-x-100" : ""}
                                `}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
                <div className="absolute inset-0 animate-pulse-slow pointer-events-none"></div>
                <style>{`@keyframes pulse-slow { 0%, 100% {opacity: 0.05;} 50% {opacity: 0.15;} }`}</style>
            </nav>
            <Outlet/>
        </>
    );
}

export default Layout;