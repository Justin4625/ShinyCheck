import usePokemon from "./Components/FetchPokemon.jsx";

export default function Plza() {
    const pokemonList = usePokemon();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {pokemonList.map((pokemon) => (
                <div
                    key={pokemon.id}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:scale-105 transition-transform"
                >
                    <h2 className="text-lg sm:text-xl font-bold mb-2 capitalize">{pokemon.name}</h2>
                    <img
                        src={pokemon.sprites?.other?.home?.front_shiny}
                        alt={pokemon.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto"
                    />
                </div>
            ))}
        </div>
    );
}
