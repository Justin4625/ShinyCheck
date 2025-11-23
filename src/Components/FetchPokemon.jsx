import { useEffect, useState, useRef } from "react";
import { specialCases } from "../data/PlzaData.js";

export default function usePokemon(names = []) {
    const [pokemonList, setPokemonList] = useState([]);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (!Array.isArray(names) || names.length === 0) {
            Promise.resolve().then(() => {
                if (mountedRef.current) setPokemonList([]);
            });
            return;
        }

        let cancelled = false;
        const fetchPokemon = async () => {
            try {
                const detailedData = await Promise.all(
                    names.map(async (name) => {
                        const formattedName =
                            (specialCases && specialCases[name]) ||
                            name.toLowerCase().replace(/[é]/g, "e");
                        try {
                            const resp = await fetch(
                                `https://pokeapi.co/api/v2/pokemon/${formattedName}`
                            );
                            if (!resp.ok) return null;
                            return resp.json();
                        } catch {
                            return null;
                        }
                    })
                );

                if (!cancelled && mountedRef.current) {
                    setPokemonList(detailedData.filter(Boolean));
                }
            } catch (err) {
                console.error("Failed to fetch Pokémon data:", err);
                if (!cancelled && mountedRef.current) {
                    setPokemonList([]);
                }
            }
        };

        fetchPokemon();
        return () => {
            cancelled = true;
        };
    }, [names]);

    return pokemonList;
}
