import { useEffect, useState } from "react";
import plzaPokemon, {specialCases} from "../data/PlzaData.js";

export default function usePokemon() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const zaPokemonNames = Array.isArray(plzaPokemon) ? [...plzaPokemon] : [];
                const detailedData = await Promise.all(
                    zaPokemonNames.map(async (name) => {
                        const formattedName = specialCases[name] || name.toLowerCase().replace(/[é]/g, 'e');
                        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedName}`);
                        if (!resp.ok) return null; // sla mislukkingen over
                        return resp.json();
                    })
                );

                setPokemonList(detailedData.filter(Boolean)); // verwijder nulls
            } catch (err) {
                console.error("Failed to fetch Pokémon data:", err);
                setPokemonList([]);
            }
        };

        fetchPokemon();
    }, []);

    return pokemonList;
}
