import usePokemon from "./Components/FetchPokemon.jsx";

export default function Plza() {
    const pokemonList = usePokemon();

    return (
        <div className="grid grid-cols-5 gap-4 p-4">
            {pokemonList.map((pokemon) => (
                <div
                    key={pokemon.id}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:scale-105 transition-transform"
                >
                    <h2 className="text-xl font-bold mb-2 capitalize">{pokemon.name}</h2>

                    <img
                        src={pokemon.sprites?.other?.home?.front_shiny || pokemon.sprites?.front_shiny || pokemon.sprites?.front_default}
                        alt={pokemon.name}
                        className="w-20 h-20 mx-auto"
                    />
                </div>
            ))}
        </div>
    );
}
