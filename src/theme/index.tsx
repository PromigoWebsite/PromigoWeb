import { useState } from "react";
import { Outlet } from "react-router-dom";
import searchIcon from "../assets/searchIcon.svg";
import closeIcon from "../assets/closeIcon.svg";
import bellIcon from "../assets/bellIcon.svg";
import userIcon from "../assets/userIcon.svg";
import menuIcon from "../assets/menuIcon.svg";
import fireIcon from "../assets/fireIcon.svg";
import starIcon from "../assets/starIcon.svg";
import homeIcon from "../assets/homeIcon.svg";

export default function Main() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                {/* Sidebar */}
                <div
                    className={`flex flex-col bg-[#567C8D] p-4 shadow-md rounded-tr-xl transition-all duration-300 ${
                        isSidebarOpen ? "w-1/4" : "w-[70px]"
                    }`}
                >
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="pb-8">
                        <img src={menuIcon} alt="Menu" className="w-6 h-6" />
                    </button>
                    <div className="flex flex-col space-y-6">
                        <button className="flex items-center text-white space-x-3">
                            <img src={homeIcon} alt="Home" className="w-6 h-6" />
                            {isSidebarOpen && <p className="text-sm">Home Page</p>}
                        </button>
                        <button className="flex items-center text-white space-x-3">
                            <img src={starIcon} alt="Favorite" className="w-6 h-6" />
                            {isSidebarOpen && <p className="text-sm">Favorite Page</p>}
                        </button>
                        <button className="flex items-center text-white space-x-3">
                            <img src={fireIcon} alt="Newest" className="w-6 h-6" />
                            {isSidebarOpen && <p className="text-sm">Newest Page</p>}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-1">
                    {/* Navbar */}
                    <nav className="flex items-center bg-white p-3 shadow-md">
                        <div className="flex items-center w-full border border-gray-300 rounded-full px-4 py-2 shadow-sm">
                            <p className="font-bold text-lg text-gray-700 pr-4">PROMIGO</p>
                            
                            {/* Input Pencarian */}
                            {isSearchVisible && (
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="px-4 py-2 outline-none flex-1 bg-transparent"
                                />
                            )}

                            {/* Ikon-ikon */}
                            <div className="flex items-center space-x-3 ml-auto">
                                <button onClick={() => setIsSearchVisible(!isSearchVisible)}>
                                    <img src={isSearchVisible ? closeIcon : searchIcon} alt="Search" className="w-6 h-6" />
                                </button>
                                <button>
                                    <img src={bellIcon} alt="Notifications" className="w-6 h-6" />
                                </button>
                                <button>
                                    <img src={userIcon} alt="User" className="w-6 h-6" />
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
