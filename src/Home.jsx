import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        document.title = "Simpele pagina";
    }, []);

    return (
        <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h1>Welkom</h1>
            <p>Dit is een simpele pagina met tekst.</p>
        </main>
    );
}
