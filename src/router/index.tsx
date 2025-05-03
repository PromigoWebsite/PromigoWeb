import { createBrowserRouter } from "react-router-dom";
import Layout from "../theme"
import Home from "../pages/homePage"
import PromoList from "../pages/PromoList"
import AboutUsPage from "../pages/aboutUsPage"  
import PromoDetail from "../pages/promoDetail"
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
            },

            {
                path: "/about",
                element: <AboutUsPage />,
            },

            {
                path:"/detail",
                element:<PromoDetail/>,
            }
              
        ]
    },
])