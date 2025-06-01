import { useState } from "react";
import Lucide from "../../basic_components/Lucide";
import { PromoListTable } from "../../table/PromoList";
import { BrandListTable } from "../../table/BrandList";
import { useUser } from "../../context";
import { useDebounce } from "@uidotdev/usehooks";
import { ReportListTable } from "../../table/ReportList";
import { RequestListTable } from "../../table/SellerRequestList";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export default function Main() {
    const [activeTab, setActiveTab] = useState("promo");
    const [search, setSearch] = useState("");   
    const { isAuth, loading, user } = useUser();
    const [totalPromo, setTotalPromo] = useState<number>(0);
    const [totalBrand, setTotalBrand] = useState<number>(0);
    const debouncedSearchTerm = useDebounce(search, 600);
    const navigate = useNavigate();
    // useEffect(() => {
    //     document.body.classList.add("hide-theme-navbar");
    //     return () => document.body.classList.remove("hide-theme-navbar");
    // }, []);

    return (
      <div className="min-h-screen bg-[#fafbfc] py-8 px-8">
        <div>
          {/* Navbar custom */}
          <div className="flex items-center justify-between mb-6">
            {/* Kiri: Welcome */}
            <div>
              <div className="text-2xl font-bold font-serif leading-tight">
                Selamat datang, {user?.username}
              </div>
              <div className="text-gray-400 text-base font-serif mt-1">
                {user?.role}
              </div>
            </div>
            {/* Tengah: Search */}
            <div className={clsx(
              "flex-1 flex",
              activeTab === "promo" ? "justify-center" : "justify-end"

              )}>
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-2 pl-10 focus:outline-none bg-white"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  <Lucide icon="Search" className="w-5 h-5" />
                </span>
              </div>
            </div>
            {/* Kanan: Add Promo */}
            {activeTab === "promo" && (
              <button
              className="bg-[#6b8c97] text-white font-bold text-lg px-8 py-2 rounded-2xl shadow hover:bg-[#466273] transition-all"
              onClick={() => navigate("/add/promo")}
            >
              Tambah Promo
            </button>
            )}
          </div>

          {/* Tab & Summary */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2 border rounded-2xl border-gray-300">
              {/* Promo Tab */}
              <button
                className={`px-2 mx-2 py-2 font-semibold ${
                  activeTab === "promo" ? "border-b-2 border-[#6b8c97]" : ""
                }`}
                onClick={() => setActiveTab("promo")}
              >
                Daftar Promo
              </button>

              {/* Brand Tab */}
              {user?.role === "Admin" && (
                <button
                  className={`px-2 mx-2 py-2 font-semibold ${
                    activeTab === "brand" ? "border-b-2 border-[#6b8c97]" : ""
                  }`}
                  onClick={() => setActiveTab("brand")}
                >
                  Daftar Brand
                </button>
              )}

              {/* Report Tab */}
              {user?.role === "Admin" && (
                <button
                  className={`px-2 mx-2 py-2 font-semibold ${
                    activeTab === "report" ? "border-b-2 border-[#6b8c97]" : ""
                  }`}
                  onClick={() => setActiveTab("report")}
                >
                  Daftar Laporan Promo
                </button>
              )}

              {/* Seller Request Tab */}
              {user?.role === "Admin" && (
                <button
                  className={`px-2 mx-2 py-2 font-semibold ${
                    activeTab === "sellerRequest"
                      ? "border-b-2 border-[#6b8c97]"
                      : ""
                  }`}
                  onClick={() => setActiveTab("sellerRequest")}
                >
                  Daftar Permintaan Penjual
                </button>
              )}
            </div>
            <div className="text-xs text-gray-500 text-right space-y-1">
              <div>Total Promo: {totalPromo}</div>
              {!loading && user?.role === "Admin" &&(
                <div>Total Brand: {totalBrand}</div>
              )}
              
            </div>
          </div>

          {/* Table */}
          {activeTab === "promo" && !loading && user?.role && (
            <PromoListTable
              role={user.role}
              search={debouncedSearchTerm}
              id={
                user.brand_id && !isNaN(+user.brand_id)
                  ? +user.brand_id
                  : undefined
              }
              totalPromo={totalPromo}
              setTotalPromo={setTotalPromo}
              {...(user.role === "Admin"
                ? {
                    totalBrand: totalBrand,
                    setTotalBrand: setTotalBrand,
                  }
                : {})}
            />
          )}
          {activeTab === "brand" && !loading && isAuth && (
            <BrandListTable search={debouncedSearchTerm} />
          )}
          {activeTab === "report" && !loading && isAuth && (
            <ReportListTable search={debouncedSearchTerm} />
          )}
          {activeTab === "sellerRequest" && !loading && isAuth && (
            <RequestListTable search={debouncedSearchTerm} />
          )}
        </div>
      </div>
    );
}
