import { useEffect } from "react";

export default function Plza() {
    useEffect(() => {
        document.title = "Pokémon Legends: Z-A";
    }, []);

    return (
        <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h1>Welkom</h1>
            <p>Dit is een simpele pagina met tekst.</p>
        </main>
    );
}
