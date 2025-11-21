import { useEffect, useState } from "react";

export default function Plza() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        document.title = "Pokémon Legends: Z-A";

        const fetchPokemon = async () => {
            try {
                const zaPokemonNames = ["Chikorita", "Bayleef", "Meganium"];
                const detailedData = await Promise.all(
                    zaPokemonNames.map(async (name) => {
                        const resp = await fetch(
                            `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
                        );
                        return resp.json();
                    })
                );

                setPokemonList(detailedData);
            } catch (err) {
                console.error("Failed to fetch Pokémon data:", err);
                setPokemonList([]);
            }
        };

        fetchPokemon();
    }, []);

    return (
        <div className="grid grid-cols-5 gap-4 p-4">
            {pokemonList.map((pokemon) => (
                <div
                    key={pokemon.id}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:scale-105 transition-transform"
                >
                    <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>

                    <img
                        src={pokemon.sprites?.front_default}
                        alt={pokemon.name}
                        className="w-20 h-20 mx-auto"
                    />
                </div>
            ))}
        </div>
    );
}
