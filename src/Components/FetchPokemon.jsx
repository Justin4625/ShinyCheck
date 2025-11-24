import { useEffect, useState, useRef } from "react";
import specialCases from "../data/SpecialData.js";

export default function usePokemon(entries = []) {
    const [pokemonList, setPokemonList] = useState([]);
    const mountedRef = useRef(false);

    // Track whether component is mounted
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    // Helper to normalize names for the API
    const formatForApi = (displayName) =>
        (specialCases && specialCases[displayName]) ||
        displayName.toLowerCase().replace(/[é]/g, "e");

    useEffect(() => {
        if (!Array.isArray(entries) || entries.length === 0) {
            // Defer clearing state to avoid synchronous setState inside effect
            if (mountedRef.current) {
                Promise.resolve().then(() => {
                    if (mountedRef.current) setPokemonList([]);
                });
            }
            return;
        }

        let cancelled = false;

        const fetchPokemon = async () => {
            try {
                const data = await Promise.all(
                    entries.map(async (entry) => {
                        const apiName = formatForApi(entry.name);
                        try {
                            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`);
                            if (!resp.ok) return null;
                            const json = await resp.json();
                            return { ...json, id: entry.id }; // keep local id
                        } catch {
                            return null;
                        }
                    })
                );

                if (!cancelled && mountedRef.current) {
                    setPokemonList(data.filter(Boolean));
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
    }, [entries]);

    return { pokemonList };
}