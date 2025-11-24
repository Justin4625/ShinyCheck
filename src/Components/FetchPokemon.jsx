import { useEffect, useState, useRef } from "react";
import specialCases from "../data/SpecialData.js";

export default function usePokemon(entries = []) {
    const [pokemonList, setPokemonList] = useState([]);
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => (mountedRef.current = false);
    }, []);

    const formatForApi = (displayName) =>
        (specialCases && specialCases[displayName]) ||
        displayName.toLowerCase().replace(/[é]/g, "e");

    useEffect(() => {
        if (!Array.isArray(entries) || entries.length === 0) {
            if (mountedRef.current) setPokemonList([]);
            return;
        }

        let cancelled = false;

        const fetchPokemon = async () => {
            try {
                const data = await Promise.all(
                    entries.map(async (entry) => {
                        const apiName = formatForApi(entry.name);
                        try {
                            // Pokémon basisdata
                            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`);
                            if (!resp.ok) return null;
                            const json = await resp.json();

                            // Pokémon species voor alle forms
                            const speciesResp = await fetch(
                                `https://pokeapi.co/api/v2/pokemon-species/${apiName}`
                            );
                            if (!speciesResp.ok) return { ...json, id: entry.id, forms: [] };
                            const speciesJson = await speciesResp.json();

                            // Haal alle varieties op
                            const forms = await Promise.all(
                                speciesJson.varieties.map(async (v) => {
                                    try {
                                        const formResp = await fetch(v.pokemon.url);
                                        if (!formResp.ok) return null;
                                        const formJson = await formResp.json();
                                        return {
                                            name: formJson.name,
                                            sprite:
                                                formJson.sprites?.other?.home?.front_shiny ||
                                                "/placeholder.png",
                                        };
                                    } catch {
                                        return null;
                                    }
                                })
                            );

                            return { ...json, id: entry.id, forms: forms.filter(Boolean) };
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
                if (!cancelled && mountedRef.current) setPokemonList([]);
            }
        };

        fetchPokemon();

        return () => {
            cancelled = true;
        };
    }, [entries]);

    return { pokemonList };
}