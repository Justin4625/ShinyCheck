import { Link, Outlet } from "react-router";

function Layout() {
    return (
        <>
            <nav className="relative bg-[#353435] border-b border-[#92cd9a] backdrop-blur-lg p-4 shadow-xl font-pixel">

                {/* Futuristic grid overlay */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,95,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,95,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"
                    aria-hidden="true"
                ></div>

                {/* Container met rechts uitgelijnde items */}
                <div className="relative z-10 flex start-5 space-x-10">
                    {[
                        {to: "/", label: "Pokémon Legends: Z-A"},
                    ].map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="
                                px-4 py-2 text-lg font-bold
                                text-[#92cd9a]
                                border border-[#92cd9a]
                                rounded-xl shadow-md
                                transition-all
                                hover:bg-[#102418]
                                hover:shadow-[#92cd9a]
                                hover:text-white
                                hover:scale-110
                            "
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

            </nav>

            <Outlet/>
        </>
    );
}

export default Layout;
