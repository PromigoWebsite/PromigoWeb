import { useEffect, useState } from "react";
import { Promo } from "../../models/Promo";
import { PromoAPI } from "../../apis/PromoAPI";
import Lucide from "../../basic_components/Lucide";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BrandAPI } from "../../apis/BrandAPI";
import { Brand } from "../../models/Brand";
import clsx from "clsx";
import api from "../../apis/api";

export default function PromoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [sort, setSort] = useState("");
  // Updated filter to support arrays for multiple selection
  const [filter, setFilter] = useState<{
    type: string[];
    category: string[];
    brand: string[];
  }>({
    type: [],
    category: [],
    brand: [],
  });

  const [promos, setPromo] = useState<Array<Promo>>([]);
  const [brands, setBrands] = useState<Array<Brand>>([]);
  const promoTypes = ["Diskon", "Cashback", "Gratis Ongkir"];

  const promoCategories = ["Makanan", "Minuman", "Elektronik"];

  const [reset, setReset] = useState<boolean>(false);
  const [applyChanges, setApplyChanges] = useState<boolean>(false);
  const [categoryChecked, setCategoryChecked] = useState<boolean>(true);
  const [promoTypeChecked, setPromoTypeChecked] = useState<boolean>(true);

  const getBrands = () => {
    BrandAPI.all()
      .then((res) => {
        setBrands(res?.data);
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          toast.error(e?.response?.data?.message || e?.message);
        }
      });
  };

  const getItems = () => {
    setIsLoading(true);
    const filterForAPI = {
      type: filter.type.join(","),
      category: filter.category.join(","),
      brand: filter.brand.join(","),
    };

    PromoAPI.all({ search: search, sort: sort, filter: filterForAPI })
      .then((res) => {
        setPromo(res?.data);
        setIsLoading(false);
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          toast.error(e?.response?.data?.message || e?.message);
        }
      });
  };

  const checkBox = (
    filterCategory: "type" | "category" | "brand",
    filterValue: string
  ) => {
    const isChecked = filter[filterCategory].includes(filterValue);

    return (
      <>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              setFilter((prev) => ({
                ...prev,
                [filterCategory]: isChecked
                  ? prev[filterCategory].filter((item) => item !== filterValue)
                  : [...prev[filterCategory], filterValue],
              }));
            }}
            className="mr-1"
          />
          {filterValue}
        </label>
        <br />
      </>
    );
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    getItems();
  }, [reset, applyChanges, search, sort]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <div className="flex gap-4 p-4">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <hr className="border-t border-gray-400 mt-2 mb-4" />

        {/* Display selected filters */}
        {(filter.type.length > 0 ||
          filter.category.length > 0 ||
          filter.brand.length > 0) && (
          <div className="mb-4 p-2 bg-gray-50 rounded">
            <h3 className="text-sm font-semibold mb-2">Filter Aktif:</h3>
            <div className="flex flex-wrap gap-1">
              {filter.type.map((type) => (
                <span
                  key={type}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {type}
                </span>
              ))}
              {filter.category.map((category) => (
                <span
                  key={category}
                  className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                >
                  {category}
                </span>
              ))}
              {filter.brand.map((brand) => (
                <span
                  key={brand}
                  className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <button
            className="font-semibold flex"
            onClick={() => {
              setPromoTypeChecked(!promoTypeChecked);
            }}
          >
            Jenis Promo
            {promoTypeChecked ? (
              <div>
                <Lucide
                  icon="ChevronUp"
                  className="ml-2 h-[25px] stroke-2 relative pt-1"
                />
              </div>
            ) : (
              <div>
                <Lucide
                  icon="ChevronDown"
                  className="ml-2 h-[25px] stroke-2 relative"
                />
              </div>
            )}
          </button>

          {promoTypeChecked && (
            <div className="space-y-1 mt-2">
              {promoTypes.map((type) => checkBox("type", type))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <button
            className="font-semibold flex"
            onClick={() => {
              setCategoryChecked(!categoryChecked);
            }}
          >
            Kategori
            {categoryChecked ? (
              <div>
                <Lucide
                  icon="ChevronUp"
                  className="ml-2 h-[25px] stroke-2 relative pt-1"
                />
              </div>
            ) : (
              <div>
                <Lucide
                  icon="ChevronDown"
                  className="ml-2 h-[25px] stroke-2 relative"
                />
              </div>
            )}
          </button>

          {categoryChecked && (
            <div className="space-y-1 mt-2">
              {promoCategories.map((category) =>
                checkBox("category", category)
              )}
            </div>
          )}
        </div>

        <button
          className="mb-5 text-[#567C8D] w-32 align-middle border-2 flex justify-center border-[#567C8D] hover:bg-[#567C8D] hover:text-white cursor-pointer rounded"
          onClick={() => {
            setApplyChanges(!applyChanges);
          }}
        >
          Terapkan
        </button>
        <button
          className="text-[#567C8D] w-32 align-middle border-2 flex justify-center border-[#567C8D] hover:bg-[#567C8D] hover:text-white cursor-pointer rounded"
          onClick={() => {
            setFilter({
              type: [],
              category: [],
              brand: [],
            });
            setReset(!reset);
          }}
        >
          Hapus
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/*  Sort */}
        <div className="flex justify-between items-center mb-4">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Urutkan</option>
            <option value="DESC">Terbaru</option>
          </select>
        </div>

        <div className="flex mb-3 gap-2 flex-wrap">
          {brands
            .filter((brand) => brand.name)
            .map((brand) => (
              <button
                key={brand.name}
                className={clsx([
                  "px-4 py-2 flex hover:scale-105 rounded-md",
                  filter.brand.includes(brand.name!)
                    ? "bg-[#063EB8] text-white"
                    : "bg-[#567C8D] text-white",
                ])}
                onClick={() => {
                  const brandName = brand.name!;
                  const isSelected = filter.brand.includes(brandName);
                  setFilter((prev) => ({
                    ...prev,
                    brand: isSelected
                      ? prev.brand.filter((b) => b !== brandName)
                      : [...prev.brand, brandName],
                  }));
                  setApplyChanges(!applyChanges);
                }}
              >
                {brand.name}
              </button>
            ))}
        </div>

        {/* Products */}
        {!isLoading && (
          <div className="grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-12 gap-4">
            {promos.map((product, index) => (
              <div
                key={index}
                className=" col-span-3 rounded-md p-4 bg-white hover:scale-105 shadow-md transition flex flex-col items-center border border-gray-300"
                onClick={() => {
                  navigate(`/detail/${product.id}`);
                }}
              >
                <img
                  src={api.baseCloudPath + product.path}
                  alt="promos"
                  className="w-56 h-[270px] object-fit rounded-md mb-2 self-center"
                />
                <div className="text-lg font-bold mt-1 text-center">
                  {product.name}
                </div>
                <div className="text-gray-600 text-sm">
                  {product.brand_name}
                </div>
              </div>
            ))}
          </div>
        )}
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Lucide icon="LoaderCircle" className={`size-14 animate-spin `} />
          </div>
        )}
      </div>
    </div>
  );
}
