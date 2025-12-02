import React from "react";

export default function PokemonSpriteModal({selectedPokemon, isPlaying, increment, setCounter}) {
    if (!selectedPokemon) return null;

    return (
        <img
            src={selectedPokemon.sprites?.other?.home?.front_shiny}
            alt={selectedPokemon.name}
            onClick={() => {
                if (isPlaying) {
                    setCounter((prev) => prev + Number(increment));
                }
            }}
            className="w-40 h-40 sm:w-64 sm:h-64 mx-auto drop-shadow-lg cursor-pointer active:scale-95 transition-transform z-10 mb-4"
        />
    );
}