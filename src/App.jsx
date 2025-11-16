import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />
        }
    ],
    { basename: "/Shinycheck" }
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
