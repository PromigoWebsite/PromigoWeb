import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import Lucide from "../basic_components/Lucide";
import { Menu, MenuItem } from "../basic_components/FloatingMenu";
import { AuthAPI } from "../apis/authAPI";
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
              className="flex rounded-2xl h-[50px] justify-start text-white items-center hover:bg-white/10 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <Lucide icon="House" className="min-w-[70px] h-[25px] relative" />
              <span className="whitespace-nowrap">Home Page</span>
            </button>
            {/* PromoButton */}
            <button
              className="flex rounded-2xl h-[50px] justify-start text-white items-center hover:bg-white/10 cursor-pointer"
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
                className="flex rounded-2xl h-[50px] justify-start text-white items-center hover:bg-white/10 cursor-pointer"
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
              className="flex rounded-2xl h-[50px] justify-start text-white items-center hover:bg-white/10 cursor-pointer"
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
        <div className="flex flex-col flex-1 min-w-0">
          {/* Navbar */}
          <nav
            className={clsx(
              "flex justify-center p-3 z-1 bg-gray-50 flex-shrink-0",
              "theme-navbar"
            )}
          >
            <div
              className={clsx([
                "flex items-center h-[60px] border bg-white border-gray-300 rounded-full pl-4 pr-8 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300",
                isSidebarOpen ? "w-full md:max-w-4/5" : "w-full",
                "md:max-w-12/13",
              ])}
            >
              <button
                className="font-bold text-lg text-gray-700 pr-4 font-serif cursor-pointer"
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
                    isAuth && !loading && user?.profile_picture ? (
                      <div className="size-9 rounded-full overflow-hidden border-gray-300 bg-gray-100 flex items-center justify-center cursor-pointer">
                        <img
                          src={api.baseCloudPath + user?.profile_picture}
                          className="object-contain size-full"
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
                      {user?.role === "Seller" && (
                        <MenuItem
                          label="Profil Brand"
                          onClick={() =>
                            navigate(`/profile/brand/${user?.brand_id}`)
                          }
                        />
                      )}
                      {(user?.role === "Admin" || user?.role === "Seller") && (
                        <MenuItem
                          label="Menu Detail"
                          onClick={() => navigate(`/extended/list`)}
                        />
                      )}
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
                      label="Daftar/Masuk"
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
          <div className="flex-1 bg-gray-50 z-0 min-w-0 overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 shadow-md z-1">
        <div className="container mx-auto px-6 py-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-center">
              <h2 className="font-bold text-xl mb-4">PROMIGO</h2>
              <div className="flex space-x-3">
                <button
                  className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full transition-colors cursor-pointer"
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/promigoo/",
                      "_blank"
                    );
                  }}
                >
                  <Lucide icon="Instagram" className="size-5 stroke-2" />
                </button>
                <button
                  className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full transition-colors cursor-pointer"
                  onClick={() => {
                    window.open("https://x.com/Promigo", "_blank");
                  }}
                >
                  <Lucide icon="Twitter" className="size-5 stroke-2" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Menu Utama</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      className="text-gray-600 hover:text-blue-500 transition-colors text-left cursor-pointer"
                      onClick={() => navigate("/")}
                    >
                      Halaman Utama
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-gray-600 hover:text-blue-500 transition-colors text-left cursor-pointer"
                      onClick={() => navigate("/about")}
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-gray-600 hover:text-blue-500 transition-colors text-left cursor-pointer"
                      onClick={() => navigate("/list")}
                    >
                      Promo List
                    </button>
                  </li>
                  {isAuth && (
                    <li>
                      <button
                        className="text-gray-600 hover:text-blue-500 transition-colors text-left cursor-pointer"
                        onClick={() => navigate("/favorite")}
                      >
                        Halaman Favorit
                      </button>
                    </li>
                  )}
                </ul>
              </div>
              {/* Contact or Additional Info */}
              <div className="flex flex-col items-end md:items-start">
                <h3 className="font-semibold text-lg mb-3">Kontak</h3>
                <div className="text-sm text-gray-600 space-y-1 text-center md:text-left">
                  <p>Email: info@promigo.com</p>
                  <p>Phone: +62 813 1764 4690</p>
                </div>
              </div>
            </div>
            {user?.role && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Menu Lainnya</h3>
                <ul className="space-y-2">
                  {(user?.role === "Admin" || user?.role === "Seller") && (
                    <li>
                      <button
                        className="text-gray-600 hover:text-blue-500 transition-colors text-left cursor-pointer"
                        onClick={() => navigate("/extended/list")}
                      >
                        Menu Detail
                      </button>
                    </li>
                  )}
                  {user?.role === "User" && (
                    <li className="text-sm">
                      <span className="text-gray-600">
                        Tertarik menjadi mitra penjual?{" "}
                      </span>
                      <button
                        onClick={() => navigate(`/extended/request`)}
                        className="text-blue-500 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                      >
                        Klik Disini
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="bg-gray-500 text-white text-center text-sm py-4">
          <p>
            Copyright © 2025 Promigo, designed by Fransisco, developed by Arvin,
            Jason, and Candra. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
