import { createBrowserRouter } from "react-router-dom";
import Layout from "../theme"
import Home from "../pages/homePage"
import PromoList from "../pages/PromoList"
export const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        element:<Layout/>,
        children: [
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/list",
                element:<PromoList/>
            }
        ]
    },
])