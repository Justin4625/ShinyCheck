import { useEffect, useState } from "react";
import plzaPokemon from "../data/PlzaData.js";

export default function usePokemon() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const zaPokemonNames = Array.isArray(plzaPokemon) ? [...plzaPokemon] : [];
                const detailedData = await Promise.all(
                    zaPokemonNames.map(async (name) => {
                        const resp = await fetch(
                            `https://pokeapi.co/api/v2/pokemon/${name}`
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

    return pokemonList;
}
