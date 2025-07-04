import { createBrowserRouter } from "react-router-dom";

import Layout from "../theme";
import Home from "../pages/homePage";
import PromoList from "../pages/PromoList";
import AboutUsPage from "../pages/aboutUsPage";
import PromoDetail from "../pages/promoDetail";
import ProfilePage from "../pages/profilePage";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/LoginPage";
import Auth from "../theme/auth";
import FavoritePage from "../pages/favoritePage";
import BrandPage from "../pages/brandPage";
import ExtendedPromoPage from "../pages/extendedPromoPage";
import AddPromoPage from "../pages/addPromoPage";
import BrandProfilePage from "../pages/brandProfilePage";
import RequestSellerPage from "../pages/requestSellerPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

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
        path: "/profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "/favorite",
        element: <FavoritePage />,
      },
      {
        path: "/brand/:id",
        element: <BrandPage />,
      },
      {
        path: "/extended/list",
        element: <ExtendedPromoPage />,
      },
      {
        path: "/add/promo",
        element: <AddPromoPage />,
      },
      {
        path: "/edit/promo/:id",
        element: <AddPromoPage />,
      },
      {
        path: "/profile/brand/:id",
        element: <BrandProfilePage />,
      },
      {
        path: "/extended/request",
        element: <RequestSellerPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/forgot",
        element: <ForgotPasswordPage />,
      },
    ],
  },
]);
