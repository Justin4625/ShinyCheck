import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Plza from "./Components/Plza/Plza.jsx";
import Layout from "./Components/Layout.jsx";
import ShinyDex from "./Components/ShinyDex/ShinyDex.jsx";
import Sv from "./Components/Sv/Sv.jsx";
import Collection from "./Components/Collection/Collection.jsx";

// Data imports
import plzaPokemonBase from "./data/PlzaData.js";
import plzaMdPokemon from "./data/PlzaMdData.js";
import svPokemonBase from "./data/SvData.js";
import svTmPokemon from "./data/SvTmData.js";
import svIdPokemon from "./data/SvIdData.js";
import shinyDexPart1 from "./data/ShinyDexData.js";
import shinyDexPart2 from "./data/ShinyDexData2.js";
import shinyDexPart3 from "./data/ShinyDexData3.js";

const pokemonList = [...shinyDexPart1, ...shinyDexPart2, ...shinyDexPart3];

// Combineer de data hier (PLZA stijl), zodat de Collection prop de volledige lijst krijgt
const combinedPlza = plzaPokemonBase.concat(plzaMdPokemon);
const combinedSv = svPokemonBase.concat(svTmPokemon, svIdPokemon);

const router = createBrowserRouter([{
        element: <Layout/>,
        children: [
            { path: "/", element: <ShinyDex/> },
            { path: "/plza", element: <Plza/> },
            { path: "/sv", element: <Sv/> },
            {
                path: "/collection",
                element: <Collection
                    plzaPokemon={combinedPlza}
                    svPokemon={combinedSv}
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