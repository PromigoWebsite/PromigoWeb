import { useEffect, useState } from "react";

import Lucide from "../../basic_components/Lucide";

const promoData = [
    {
        promoName: "Tanggal kembr...",
        brand: "Starbucks",
        type: "Buy one get one",
        category: "Elektronik",
        startDate: "10-20-2030",
        endDate: "10-20-2099",
    },
    {
        promoName: "Tanggal kembr...",
        brand: "Pizza Hut",
        type: "Buy one get one",
        category: "Game",
        startDate: "10-20-2030",
        endDate: "10-20-2099",
    },
    {
        promoName: "Tanggal kembr...",
        brand: "KFC",
        type: "Buy one get one",
        category: "Fnb",
        startDate: "10-20-2030",
        endDate: "10-20-2099",
    },
    {
        promoName: "Tanggal kembr...",
        brand: "Tomoro",
        type: "Buy one get one",
        category: "Fashion",
        startDate: "10-20-2030",
        endDate: "10-20-2099",
    },
    {
        promoName: "Tanggal kembr...",
        brand: "Hokeben",
        type: "Buy one get one",
        category: "Elektronik",
        startDate: "10-20-2030",
        endDate: "10-20-2099",
    },
];

const brandData = [
    {
        brandName: "Tanggal kembr...",
        address: "Starbucks",
        category: "Elektronik",
        createdAt: "10-20-2030",
    },
    {
        brandName: "Tanggal kembr...",
        address: "Pizza Hut",
        category: "Game",
        createdAt: "10-20-2030",
    },
    {
        brandName: "Tanggal kembr...",
        address: "KFC",
        category: "Fnb",
        createdAt: "10-20-2030",
    },
    {
        brandName: "Tanggal kembr...",
        address: "Tomoro",
        category: "Fashion",
        createdAt: "10-20-2030",
    },
    {
        brandName: "Tanggal kembr...",
        address: "Hokeben",
        category: "Elektronik",
        createdAt: "10-20-2030",
    },
];

export default function ListPromoPage() {
    const [activeTab, setActiveTab] = useState("promo");
    const [search, setSearch] = useState("");

    useEffect(() => {
        document.body.classList.add("hide-theme-navbar");
        return () => document.body.classList.remove("hide-theme-navbar");
    }, []);

    return (
        <div className="min-h-screen bg-[#fafbfc] py-8 px-8">
            <div>
                {/* Navbar custom */}
                <div className="flex items-center justify-between mb-6">
                    {/* Kiri: Welcome */}
                    <div>
                        <div className="text-3xl font-bold font-serif leading-tight">Selamat datang, admin</div>
                        <div className="text-gray-400 text-base font-serif mt-1">Yang Terkuat</div>
                    </div>
                    {/* Tengah: Search */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full border border-gray-300 rounded-full px-4 py-2 pl-10 focus:outline-none bg-white"
                            />
                            <span className="absolute left-3 top-2.5 text-gray-400">
                                <Lucide icon="Search" className="w-5 h-5" />
                            </span>
                        </div>
                    </div>
                    {/* Kanan: Add Promo */}
                    <button className="bg-[#6b8c97] text-white font-bold text-lg px-8 py-2 rounded-full shadow hover:bg-[#466273] transition-all">
                        Tambah Promo
                    </button>
                </div>

                {/* Tab & Summary */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-2">
                        <button
                            className={`px-6 py-2 rounded-full border font-semibold ${activeTab === "promo" ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200"}`}
                            onClick={() => setActiveTab("promo")}
                        >
                            Daftar Promo
                        </button>
                        <button
                            className={`px-6 py-2 rounded-full border font-semibold ${activeTab === "brand" ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200"}`}
                            onClick={() => setActiveTab("brand")}
                        >
                            Daftar Brand
                        </button>
                    </div>
                    <div className="text-xs text-gray-500 text-right space-y-1">
                        <div>Total Promo: 2000</div>
                        <div>Total Brand: 160</div>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-2 rounded-2xl shadow-lg bg-white p-4 pt-2 border border-gray-200">
                    {activeTab === "promo" ? (
                        <table className="min-w-full border-separate border-spacing-y-2">
                            <thead className="border-b border-gray-300">
                                <tr className="text-gray-700 text-base font-semibold ">
                                    <th className="px-4 py-2 text-left border-b-3 border-gray-300 ">Nama Promo</th>
                                    <th className="px-4 py-2 text-left border-b-3 border-gray-300">Brand</th>
                                    <th className="px-4 py-2 text-left border-b-3 border-gray-300">Tipe</th>
                                    <th className="px-4 py-2 text-left border-b-3 border-gray-300">Kategori</th>
                                    <th className="px-4 py-2 text-left border-b-3 border-gray-300">Tanggal Mulai</th>
                                    <th className="px-4 py-2 text-left border-b-3 border-gray-300">Tanggal Berakhir</th>
                                    <th className="px-4 py-2 text-center border-b-3 border-gray-300">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {promoData.map((row, idx) => (
                                    <tr key={idx} className="bg-white hover:bg-gray-50 rounded-xl">
                                        <td className="px-4 py-2 font-serif">{row.promoName}</td>
                                        <td className="px-4 py-2">{row.brand}</td>
                                        <td className="px-4 py-2">{row.type}</td>
                                        <td className="px-4 py-2">{row.category}</td>
                                        <td className="px-4 py-2">{row.startDate}</td>
                                        <td className="px-4 py-2">{row.endDate}</td>
                                        <td className="px-4 py-2 text-center">
                                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-200 cursor-pointer">
                                                <Lucide icon="Settings" className="w-5 h-5" />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="min-w-full border-separate border-spacing-y-2">
                            <thead className="border-b border-gray-300 ">
                                <tr className="text-gray-700 text-sm font-semibold">
                                    <th className="px-4 py-2 text-left border-b-3 border-gray-300">Nama Brand</th>
                                    <th className="px-4 py-2 text-left border-b-3 border-gray-300">Alamat</th>
                                    <th className="px-4 py-2 text-left border-b-3 border-gray-300">Kategori</th>
                                    <th className="px-4 py-2 text-left border-b-3 border-gray-300">Tanggal Dibuat</th>
                                    <th className="px-4 py-2 text-center border-b-3 border-gray-300">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brandData.map((row, idx) => (
                                    <tr key={idx} className="bg-white hover:bg-gray-50 rounded-xl">
                                        <td className="px-4 py-2 font-serif">{row.brandName}</td>
                                        <td className="px-4 py-2">{row.address}</td>
                                        <td className="px-4 py-2">{row.category}</td>
                                        <td className="px-4 py-2">{row.createdAt}</td>
                                        <td className="px-4 py-2 text-center">
                                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-200 cursor-pointer">
                                                <Lucide icon="Settings" className="w-5 h-5" />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
