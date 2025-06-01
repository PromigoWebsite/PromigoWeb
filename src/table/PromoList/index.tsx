import { useEffect, useState } from "react";
import { AdminAPI } from "../../apis/adminAPI";
import { Metadata } from "../../models/Metadata";
import { Promo } from "../../models/Promo";
import Lucide from "../../basic_components/Lucide";
import Pagination from "../../basic_components/pagination";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "../../basic_components/FloatingMenu";
import { SellerAPI } from "../../apis/sellerAPI";
import { format } from "date-fns";
import { PromoSorting } from "../../models/Promo_sorting";
import { useDebounce } from "@uidotdev/usehooks";
import { AdminPromoFilter } from "../../models/Admin_promo_filter";
import { BrandAPI } from "../../apis/BrandAPI";
import { Brand } from "../../models/Brand";

interface Props {
  role: string;
  search: string;
  id?: number | undefined;
  totalBrand?: number;
  setTotalBrand?: (totalBrand: number) => void;
  totalPromo: number;
  setTotalPromo: (totalPromo: number) => void;
}
export function PromoListTable(props: Props) {
  const [metadata, setMetadata] = useState<Metadata>();
  const [items, setItems] = useState<Array<Promo>>();
  const [brands, setBrands] = useState<Array<Brand>>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<PromoSorting>({
    name: "default",
    type: "default",
    category: "default",
    brand_name: "default",
  });
  const [filter, setFilter] = useState<AdminPromoFilter>({
    brand_name: "default",
    type: "default",
    category: "default",
  });
  const [activeFilter, setActiveFilter] = useState<string>("");
  const promoTypes = ["Diskon", "Cashback", "Gratis Ongkir"];
  const promoCategories = ["Makanan", "Minuman", "Elektronik"];

  const fetchBrand = () => {
    BrandAPI.all()
      .then((res) => {
        setBrands(res.data);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data?.message || err.message);
        }
      });
  };

  const debouncedSortTerm = useDebounce(sorting, 200);
  const formatTime = (dateString: string) => {
    const date = format(new Date(dateString), "yyyy-MM-dd");
    return date;
  };

  const fetchAdminItems = (page: number) => {
    setLoading(true);
    AdminAPI.get({
      page: page,
      per_page: 5,
      search: props.search,
      sorting: sorting,
      filter: filter,
    })
      .then((res) => {
        setItems(res.data.list.data);

        if (props.setTotalPromo) {
          props.setTotalPromo(res.data.total_promo);
        }

        if (props.setTotalBrand) {
          props.setTotalBrand(res.data.total_brand);
        }
        const { total, per_page, from, to, current_page, last_page } =
          res.data.list;
        setMetadata({ total, per_page, from, to, current_page, last_page });
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data?.message || err.message);
          if (err.response?.status && err.response?.status == 403) {
            navigate("/");
          }
        }
      });
  };

  const fetchSellerItems = (page: number) => {
    setLoading(true);
    if (props.id) {
      SellerAPI.get({
        page: page,
        per_page: 5,
        search: props.search,
        id: props.id,
        sorting: sorting,
        filter: filter
      })
        .then((res) => {
          setItems(res.data.list.data);
          if (props.setTotalPromo) {
            props.setTotalPromo(res.data.total_promo);
          }
          const { total, per_page, from, to, current_page, last_page } =
            res.data.list;
          setMetadata({ total, per_page, from, to, current_page, last_page });
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
            if (err.response?.status && err.response?.status == 403) {
              navigate("/");
            }
          }
        });
    }
  };

  useEffect(() => {
    if (props.id && props.role == "Seller") {
      fetchSellerItems(1);
    } else {
      fetchAdminItems(1);
    }
  }, [props.search, debouncedSortTerm, filter]);

  useEffect(() => {
    fetchBrand();
  }, []);
  return (
    <>
      <div className="flex flex-col items-start bg-gray-300 rounded-2xl py-4 px-7">
        <div className="flex justify-start items-center space-x-4 mb-2">
          <div className="text-base font-semibold">Filter</div>
          <Menu
            label={
              <>
                <div className="rounded-2xl p-2 bg-[#567C8D] text-white flex items-center hover:cursor-pointer">
                  <div>Pilih Filter</div>
                  <Lucide icon="ChevronDown" className="pt-1 ml-1 stroke-2" />
                </div>
              </>
            }
          >
            <MenuItem
              label="Default"
              onClick={() => {
                setActiveFilter("");
                setFilter({
                  brand_name: "default",
                  type: "default",
                  category: "default",
                });
              }}
            />
            {props.id && props.role == "Admin" && (
              <MenuItem
                label="Brand"
                onClick={() => setActiveFilter("brand")}
              />
            )}
            <MenuItem label="Tipe" onClick={() => setActiveFilter("type")} />
            <MenuItem
              label="Kategori"
              onClick={() => setActiveFilter("category")}
            />
          </Menu>
        </div>
        <div className="flex flex-wrap gap-2 justify-start items-center w-full">
          {/* Filter Brand */}
          {activeFilter === "brand" &&
            brands?.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-2 ${
                  filter.brand_name === item.name
                    ? "bg-[#395c68]"
                    : "bg-[#567C8D]"
                } text-white flex items-center justify-center px-4 mb-2 min-w-[120px] text-center h-[40px] hover:cursor-pointer`}
                onClick={() => {
                  setFilter((prev) => ({ ...prev, brand_name: item.name }));
                }}
              >
                <span className="line-clamp-1">{item.name}</span>
              </div>
            ))}

          {/* Filter Tipe */}
          {activeFilter === "type" &&
            promoTypes.map((type, index) => (
              <div
                key={index}
                className={`rounded-2xl p-2 ${
                  filter.type === type ? "bg-[#395c68]" : "bg-[#567C8D]"
                } text-white flex items-center justify-center px-4 mb-2 min-w-[120px] text-center h-[40px] hover:cursor-pointer`}
                onClick={() => {
                  setFilter((prev) => ({ ...prev, type }));
                }}
              >
                <span className="line-clamp-1">{type}</span>
              </div>
            ))}

          {/* Filter Kategori */}
          {activeFilter === "category" &&
            promoCategories.map((category, index) => (
              <div
                key={index}
                className={`rounded-2xl p-2 ${
                  filter.category === category ? "bg-[#395c68]" : "bg-[#567C8D]"
                } text-white flex items-center justify-center px-4 mb-2 min-w-[120px] text-center h-[40px] hover:cursor-pointer`}
                onClick={() => {
                  setFilter((prev) => ({ ...prev, category }));
                }}
              >
                <span className="line-clamp-1">{category}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-2 rounded-2xl shadow-lg bg-white p-4 pt-2 border border-gray-200">
        {isLoading && (
          <div className="flex items-center justify-center h-full my-3">
            <Lucide icon="LoaderCircle" className={`size-14 animate-spin `} />
          </div>
        )}
        {!isLoading && (
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead className="border-b border-gray-300">
              <tr className="text-gray-700 text-base font-semibold">
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[20%]">
                  <button
                    className="flex items-center hover:cursor-pointer"
                    onClick={() => {
                      setSorting((prev) => ({
                        ...prev,
                        name:
                          prev.name === "asc"
                            ? "desc"
                            : prev.name === "desc"
                            ? "default"
                            : "asc",
                      }));
                    }}
                  >
                    <div className="mr-2">Nama Promo</div>
                    {sorting.name === "asc" ? (
                      <Lucide icon="ArrowUp" />
                    ) : sorting.name === "desc" ? (
                      <Lucide icon="ArrowDown" />
                    ) : (
                      ""
                    )}
                  </button>
                </th>
                {props.role == "Admin" && (
                  <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[15%]">
                    <button
                      className="flex items-center hover:cursor-pointer"
                      onClick={() => {
                        setSorting((prev) => ({
                          ...prev,
                          brand_name:
                            prev.brand_name === "asc"
                              ? "desc"
                              : prev.brand_name === "desc"
                              ? "default"
                              : "asc",
                        }));
                      }}
                    >
                      <div className="mr-2">Nama Brand</div>
                      {sorting.brand_name === "asc" ? (
                        <Lucide icon="ArrowUp" />
                      ) : sorting.brand_name === "desc" ? (
                        <Lucide icon="ArrowDown" />
                      ) : (
                        ""
                      )}
                    </button>
                  </th>
                )}
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[15%]">
                  <button
                    className="flex items-center hover:cursor-pointer"
                    onClick={() => {
                      setSorting((prev) => ({
                        ...prev,
                        type:
                          prev.type === "asc"
                            ? "desc"
                            : prev.type === "desc"
                            ? "default"
                            : "asc",
                      }));
                    }}
                  >
                    <div className="mr-2">Tipe</div>
                    {sorting.type === "asc" ? (
                      <Lucide icon="ArrowUp" />
                    ) : sorting.type === "desc" ? (
                      <Lucide icon="ArrowDown" />
                    ) : (
                      ""
                    )}
                  </button>
                </th>
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[15%]">
                  <button
                    className="flex items-center hover:cursor-pointer"
                    onClick={() => {
                      setSorting((prev) => ({
                        ...prev,
                        category:
                          prev.category === "asc"
                            ? "desc"
                            : prev.category === "desc"
                            ? "default"
                            : "asc",
                      }));
                    }}
                  >
                    <div className="mr-2">Kategori</div>
                    {sorting.category === "asc" ? (
                      <Lucide icon="ArrowUp" />
                    ) : sorting.category === "desc" ? (
                      <Lucide icon="ArrowDown" />
                    ) : (
                      ""
                    )}
                  </button>
                </th>
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[15%]">
                  Tanggal Mulai
                </th>
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[15%]">
                  Tanggal Berakhir
                </th>
                <th className="px-4 py-2 text-center border-b-3 border-gray-300 w-[10%]">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {items?.map((item, idx) => (
                <tr key={idx} className="bg-white hover:bg-gray-50 rounded-xl">
                  <td className="px-4 py-2">{item.name}</td>
                  {props.role == "Admin" && (
                    <td className="px-4 py-2">{item.brand_name}</td>
                  )}
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">
                    {item.started_at ? formatTime(item.started_at) : "null"}
                  </td>
                  <td className="px-4 py-2">
                    {item.ended_at ? formatTime(item.ended_at) : "null"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-200 cursor-pointer">
                      <Menu
                        label={<Lucide icon="Settings" className="w-5 h-5" />}
                      >
                        <MenuItem
                          label="Hapus"
                          onClick={() => {
                            if (item.id != null && item.id != undefined) {
                              AdminAPI.deleteById(item.id)
                                .then(() => {
                                  toast.success("Promo Berhasil Dihapus");
                                  if (props.id && props.role == "Seller") {
                                    fetchSellerItems(1);
                                  } else {
                                    fetchAdminItems(1);
                                  }
                                })
                                .catch((err) => {
                                  if (err instanceof AxiosError) {
                                    toast.error(
                                      err?.response?.data?.message ||
                                        err.message
                                    );
                                  }
                                });
                            } else {
                              toast.error("Id Promo tidak dapat ditemukan");
                            }
                          }}
                        />
                        <MenuItem
                          label="Edit"
                          onClick={() => navigate(`/edit/promo/${item.id}`)}
                        />
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={7} className="px-4 py-3">
                  {metadata && (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Menampilkan {metadata.from || 0} sampai{" "}
                        {metadata.to || 0} dari {metadata.total || 0} data
                      </div>

                      <Pagination
                        pageCount={metadata.last_page || 1}
                        currentPage={metadata.current_page || 1}
                        onPageChange={(page) => fetchAdminItems(page)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </>
  );
}
