import { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import clsx from "clsx";
import Lucide from "../basic_components/Lucide";
import { Menu, MenuItem } from "../basic_components/FloatingMenu";
import { AuthAPI } from "../apis/authAPI";
import { toast } from "react-toastify";
import { useUser } from "../context";
import api from "../apis/api";
import "../global.css";

export default function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuth, refreshUser, loading, user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={clsx([
            "flex flex-col bg-[#567C8D] shadow-md rounded-tr-4xl transition-all duration-300 overflow-hidden",
            isSidebarOpen ? "w-[250px]" : "w-[71px]",
            "z-2",
          ])}
        >
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex h-[35px] justify-start text-white items-center mt-6 mb-10"
          >
            <Lucide
              icon="Menu"
              className="min-w-[70px] h-[30px] stroke-2 relative"
            />
            <span className="whitespace-nowrap">Menu List </span>
          </button>
          <div className="flex flex-col space-y-2 w-full">
            {/* homeButton */}
            <button
              className="flex rounded-2xl h-[50px] justify-start text-white items-center hover:bg-white/10"
              onClick={() => {
                navigate("/");
              }}
            >
              <Lucide icon="House" className="min-w-[70px] h-[25px] relative" />
              <span className="whitespace-nowrap">Home Page</span>
            </button>
            {/* PromoButton */}
            <button
              className="flex rounded-2xl h-[50px] justify-start text-white items-center hover:bg-white/10"
              onClick={() => {
                navigate("/list");
              }}
            >
              <Lucide
                icon="BadgePercent"
                className="min-w-[70px] h-[25px] relative"
              />
              <span className="whitespace-nowrap">Promo Page</span>
            </button>
            {/* FavoriteButton */}
            {isAuth && !loading && (
              <button
                className="flex rounded-2xl h-[50px] justify-start text-white items-center hover:bg-white/10"
                onClick={() => {
                  navigate(`/favorite`);
                }}
              >
                <Lucide
                  icon="Heart"
                  className="min-w-[70px] h-[25px] relative"
                />
                <span className="whitespace-nowrap">Favorite Page</span>
              </button>
            )}

            {/* NewestButton */}
            <button
              className="flex rounded-2xl h-[50px] justify-start text-white items-center hover:bg-white/10"
              onClick={() => {
                navigate("/about");
              }}
            >
              <Lucide icon="Users" className="min-w-[70px] h-[25px] relative" />
              <span className="whitespace-nowrap">About us</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <nav className={clsx("flex justify-center p-3 z-1 bg-gray-50", "theme-navbar")}>
            <div
              className={clsx([
                "flex items-center h-[60px] border bg-white border-gray-300 rounded-full pl-4 pr-8 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300",
                isSidebarOpen
                  ? "w-full md:max-w-[1050px]"
                  : "w-full md:max-w-[1300px]",
                "max-w-[320px]",
              ])}
            >
              <button
                className="font-bold text-lg text-gray-700 pr-4 font-serif"
                onClick={() => {
                  navigate(`/`);
                }}
              >
                PROMIGO
              </button>

              {/* Input Pencarian */}
              <div
                className={clsx(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isSearchVisible
                    ? "w-full opacity-100 translate-x-0 mr-2"
                    : "w-0 opacity-0 translate-x-20"
                )}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (searchQuery != "") {
                        navigate(`/list/?search=${searchQuery}`);
                      } else {
                        navigate(`/list`);
                      }
                    }
                  }}
                  className="mr-4 pl-4 py-2 outline-none w-full bg-gray-300/30 rounded-full"
                />
              </div>

              {/* Ikon-ikon */}
              <div className="flex items-center space-x-3 ml-auto">
                <button
                  onClick={() => setIsSearchVisible(!isSearchVisible)}
                  className="cursor-pointer"
                >
                  <Lucide
                    icon={isSearchVisible ? "CircleX" : "Search"}
                    className="stroke-2 text-gray-500 size-6"
                  />
                </button>
                {/* <button>
                  <Lucide
                    icon="Heart"
                    className="stroke-2 text-gray-500 size-6"
                  />
                </button> */}
                <Menu
                  label={
                    isAuth && !loading ? (
                      <div className="size-9 rounded-full overflow-hidden border-gray-300 bg-gray-100 flex items-center justify-center cursor-pointer">
                        <img
                          src={api.baseCloudPath + user?.profile_picture}
                          className="object-fill size-full"
                        />
                      </div>
                    ) : (
                      <Lucide
                        icon="CircleUserRound"
                        className="stroke-2 text-gray-500 size-6 cursor-pointer"
                      />
                    )
                  }
                >
                  {isAuth && !loading ? (
                    <>
                      <MenuItem
                        label="Profil"
                        onClick={() => navigate(`/profile/${user?.id}`)}
                      />

                      <MenuItem
                        label="Logout"
                        onClick={() => {
                          AuthAPI.logout().then((res) => {
                            if (res.status == 200) {
                              refreshUser();
                              navigate("/login");
                            }
                          });
                        }}
                      />
                    </>
                  ) : (
                    <MenuItem
                      label="Login"
                      onClick={() => {
                        navigate("/login");
                      }}
                    />
                  )}
                </Menu>
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <div className="flex-1 p-4 bg-gray-50 z-0">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 shadow-md z-1">
        <div className="container mx-auto flex flex-col md:flex-row justify-around h-50 items-center">
          <div>
            <h2 className="font-bold text-lg">PROMIGO</h2>
            <div className="flex space-x-3 mt-2">
              <button className="p-2 bg-gray-300 rounded-full">
                <Lucide icon="Facebook" className="size-6 stroke-2" />
              </button>
              <button className="p-2 bg-gray-300 rounded-full">
                <Lucide icon="Instagram" className="size-6 stroke-2" />
              </button>
              <button className="p-2 bg-gray-300 rounded-full">
                <Lucide icon="Twitter" className="size-6 stroke-2" />
              </button>
              <button className="p-2 bg-gray-300 rounded-full">
                <Lucide icon="Youtube" className="size-6 stroke-2" />
              </button>
            </div>
          </div>
          <div>
            <ul className="space-y-1">
              <li>
                <button
                  className="cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Halaman Utama
                </button>
              </li>
              <li>
                <button
                  className="cursor-pointer"
                  onClick={() => navigate("/about")}
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  className="cursor-pointer"
                  onClick={() => navigate("/list")}
                >
                  Promo List
                </button>
              </li>
            </ul>
          </div>
          {/* <div>
            <h3 className="font-semibold">Promo Interest</h3>
            <ul className="space-y-1">
              <li>Recommendation</li>
              <li>Newest Promo</li>
              <li>Food/Drink</li>
              <li>Service</li>
            </ul>
          </div> */}
        </div>
        <div className="text-center text-sm text-white p-4 mt-4 bg-gray-500">
          Copyright © 2025 Promigo, designed by Fransisco, developed by Arvin,
          Jason, and Candra. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
