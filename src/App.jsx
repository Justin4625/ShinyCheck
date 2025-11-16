import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Plza from "./Plza.jsx";
import Layout from "./Components/Layout.jsx";

const router = createBrowserRouter([{
        element: <Layout/>,
        children: [
        {
            path: "/",
            element: <Plza/>
        },
        ]
    }],
    { basename: "/Shinycheck" }
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
