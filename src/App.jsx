import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Plza from "./Components/Plza/Plza.jsx";
import Layout from "./Components/Layout.jsx";
import ShinyDex from "./Components/ShinyDex/ShinyDex.jsx";
import Sv from "./Components/Sv/Sv.jsx";

const router = createBrowserRouter([{
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <ShinyDex/>
            },
            {
                path: "/plza",
                element: <Plza/>
            },
            {
                path: "/sv", // Nieuwe route voor Scarlet & Violet
                element: <Sv/>
            }
        ]
    }],
    { basename: "/ShinyCheck" }
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;