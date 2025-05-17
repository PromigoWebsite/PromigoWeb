import { createBrowserRouter } from "react-router-dom";

import Layout from "../theme";
import Home from "../pages/homePage";
import PromoList from "../pages/PromoList";
import AboutUsPage from "../pages/aboutUsPage";
import PromoDetail from "../pages/promoDetail";
import ProfilePage from "../pages/profilePage"; 
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/LoginPage";
import FavoritePage from "../pages/favoritePage";
import BrandPage from "../pages/brandPage";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/list",
        element: <PromoList />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/detail/:id",
        element: <PromoDetail />,
      },
      {
        path: "/profile",
        element: <ProfilePage />, 
      },
      {
        path: "/register",
        element: <RegisterPage />, 
      },
      {
        path: "/login",
        element: <LoginPage />, 
      },
      {
        path: "/favorite",
        element: <FavoritePage />, 
      },
      {
        path: "/brand",
        element: <BrandPage />, 
      },
    ],
  },
]);
