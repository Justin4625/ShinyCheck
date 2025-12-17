import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Plza from "./Components/Plza/Plza.jsx";
import Layout from "./Components/Layout.jsx";
import ShinyDex from "./Components/ShinyDex/ShinyDex.jsx";
import Sv from "./Components/Sv/Sv.jsx";
import Collection from "./Collection.jsx";

// Data imports
import plzaPokemon from "./data/PlzaData.js";
import svPokemon from "./data/SvData.js";
import shinyDexPart1 from "./data/ShinyDexData.js";
import shinyDexPart2 from "./data/ShinyDexData2.js";
import shinyDexPart3 from "./data/ShinyDexData3.js";

// Combineer alle data
const pokemonList = [...shinyDexPart1, ...shinyDexPart2, ...shinyDexPart3];

const router = createBrowserRouter([{
        element: <Layout/>,
        children: [
            { path: "/", element: <ShinyDex/> },
            { path: "/plza", element: <Plza/> },
            { path: "/sv", element: <Sv/> },
            {
                path: "/collection",
                element: <Collection
                    plzaPokemon={plzaPokemon}
                    svPokemon={svPokemon}
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