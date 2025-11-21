import usePokemon from "./Components/FetchPokemon.jsx";

export default function Plza() {
    const pokemonList = usePokemon();

    return (
        <div className="relative p-8 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
            {/* Futuristic city/grid overlay */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(200,200,255,0.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(200,200,255,0.05) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            {/* Neon accent circles in background */}
            <div className="absolute -top-20 -left-10 w-60 h-60 bg-blue-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-pink-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>

            <h1 className="relative text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-wide z-10">
                Pokémon Legends Z-A
            </h1>

            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 z-10">
                {pokemonList.map((pokemon, index) => (
                    <div
                        key={pokemon.id}
                        className="relative bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 rounded-2xl shadow-md p-6 flex flex-col items-center justify-between hover:scale-105 hover:shadow-xl transition-transform duration-300 overflow-hidden"
                    >
                        {/* Neon accents op de kaart: fel blauw en roze/purple */}
                        <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl pointer-events-none
                            ${index % 3 === 0 ? "bg-green-300 opacity-20" : index % 3 === 1 ? "bg-pink-400 opacity-40" : "bg-blue-400 opacity-40"}`}>
                        </div>
                        <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-3xl pointer-events-none
                            ${index % 3 === 0 ? "bg-purple-300 opacity-30" : index % 3 === 1 ? "bg-blue-400 opacity-50" : "bg-pink-400 opacity-50"}`}>
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold mb-4 capitalize tracking-wide">
                            {pokemon.name}
                        </h2>

                        <img
                            src={pokemon.sprites?.other?.home?.front_shiny}
                            alt={pokemon.name}
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md"
                        />

                        {pokemon.types && (
                            <p className="mt-3 text-sm text-gray-600 uppercase tracking-wide">
                                {pokemon.types.map((t) => t.type.name).join(" / ")}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
