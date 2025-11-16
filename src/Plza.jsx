import { useEffect } from "react";

export default function Plza() {
    useEffect(() => {
        document.title = "Pokémon Legends: Z-A";
    }, []);

    const cards = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-5 gap-4 p-4">
            {cards.map((card) => (
                <div
                    key={card}
                    className="bg-white rounded-lg shadow-md p-6 text-center hover:scale-105 transition-transform"
                >
                    <h2 className="text-xl font-bold mb-2">Card {card}</h2>
                    <p>voorbeeldkaart</p>
                </div>
            ))}
        </div>
    );
}
