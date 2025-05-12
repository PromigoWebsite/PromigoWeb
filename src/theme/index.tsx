import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import Lucide from "../basic_components/Lucide";

export default function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={clsx([
            "flex flex-col bg-[#567C8D] shadow-md rounded-tr-xl transition-all duration-300 overflow-hidden",
            isSidebarOpen ? "w-[250px]" : "w-[70px]",
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
            <button className="flex rounded-2xl h-[50px] justify-start text-white items-center hover:bg-white/10">
              <Lucide icon="Star" className="min-w-[70px] h-[25px] relative" />
              <span className="whitespace-nowrap">Favorite Page</span>
            </button>
            {/* NewestButton */}
            <button className="flex rounded-2xl h-[50px] justify-start text-white items-center hover:bg-white/10">
              <Lucide icon="Flame" className="min-w-[70px] h-[25px] relative" />
              <span className="whitespace-nowrap">Newest Page</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <nav className="flex justify-center p-3">
            <div
              className={clsx([
                "flex items-center h-[60px] border border-gray-300 rounded-full px-4 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300",
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
              {isSearchVisible && (
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate(`/list/?search=${searchQuery}`);
                    }
                  }}
                  className="px-4 py-2 outline-none flex-1 bg-transparent"
                />
              )}

              {/* Ikon-ikon */}
              <div className="flex items-center space-x-3 ml-auto">
                <button onClick={() => setIsSearchVisible(!isSearchVisible)}>
                  <Lucide
                    icon={isSearchVisible ? "CircleX" : "Search"}
                    className="stroke-2 size-6"
                  />
                </button>
                <button>
                  <Lucide icon="Bell" className="stroke-2 size-6" />
                </button>
                <button>
                  <Lucide icon="CircleUserRound" className="stroke-2 size-6" />
                </button>
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <div className="flex-1 p-4 bg-gray-50">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 p-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="font-bold text-lg">PROMIGO</h2>
            <div className="flex space-x-3 mt-2">
              <button className="p-2 bg-gray-300 rounded-full">ⓕ</button>
              <button className="p-2 bg-gray-300 rounded-full">ⓣ</button>
              <button className="p-2 bg-gray-300 rounded-full">ⓘ</button>
              <button className="p-2 bg-gray-300 rounded-full">Ⓨ</button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">About us</h3>
            <ul className="space-y-1">
              <li>About us</li>
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Settings</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Promo Interest</h3>
            <ul className="space-y-1">
              <li>Recommendation</li>
              <li>Newest Promo</li>
              <li>Food/Drink</li>
              <li>Service</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          Copyright © 2025 Promigo, designed by Fransisco. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
