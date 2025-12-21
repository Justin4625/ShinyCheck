import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Plza from "./Components/Plza/Plza.jsx";
import Layout from "./Components/Layout.jsx";
import ShinyDex from "./Components/ShinyDex/ShinyDex.jsx";
import Sv from "./Components/Sv/Sv.jsx";
import Collection from "./Components/Collection/Collection.jsx";

// Data imports
import plzaPokemon from "./data/PlzaData.js";
import plzaMdPokemon from "./data/PlzaMdData.js";
import svPokemon from "./data/SvData.js";
import svTmPokemon from "./data/SvTmData.js";
import svIdData from "./data/SvIdData.js";
import shinyDexPart1 from "./data/ShinyDexData.js";
import shinyDexPart2 from "./data/ShinyDexData2.js";
import shinyDexPart3 from "./data/ShinyDexData3.js";
import regionalPokemon from "./data/RegionalData.js";

// Combineer alle PLZA pokemon lijsten en filter op unieke ID's
const allPlzaPokemon = Array.from(
    new Map([...plzaPokemon, ...plzaMdPokemon].map(p => [p.id, p])).values()
);

// Combineer alle SV pokemon lijsten (Base + DLCs) en filter op unieke ID's
const allSvPokemon = Array.from(
    new Map([...svPokemon, ...svTmPokemon, ...svIdData].map(p => [p.id, p])).values()
);

const pokemonList = [...shinyDexPart1, ...shinyDexPart2, ...shinyDexPart3, ...regionalPokemon];

const router = createBrowserRouter([{
        element: <Layout/>,
        children: [
            { path: "/", element: <ShinyDex/> },
            { path: "/plza", element: <Plza/> },
            { path: "/sv", element: <Sv/> },
            {
                path: "/collection",
                element: <Collection
                    plzaPokemon={allPlzaPokemon}
                    svPokemon={allSvPokemon}
                    pokemonList={pokemonList}
                />
            }
        ]
    }],
    { basename: "/ShinyCheck" }
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;