import { useEffect, useState } from "react";
import { Metadata } from "../../models/Metadata";
import Lucide from "../../basic_components/Lucide";
import Pagination from "../../basic_components/pagination";
import { BrandAPI } from "../../apis/BrandAPI";
import { Brand } from "../../models/Brand";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "../../basic_components/FloatingMenu";
import { format } from "date-fns";
import { BrandSorting } from "../../models/brand_sorting";
import { useDebounce } from "@uidotdev/usehooks";
import { ExtendedBrandFilter } from "../../models/Extended_brand_filter";

interface Props {
  search: string;
}

export function BrandListTable(props: Props) {
  const [metadata, setMetadata] = useState<Metadata>();
  const [items, setItems] = useState<Array<Brand>>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [sorting, setSorting] = useState<BrandSorting>({
    name: "default",
    category: "default",
    address: "default",
  });
  const debouncedSortTerm = useDebounce(sorting, 200);

  const [filter, setFilter] = useState<ExtendedBrandFilter>({
    category: "default",
  });
  const [activeFilter, setActiveFilter] = useState<string>("");
  const brandCategories = ["FnB", "Elektronik"]; // Hanya ada 2 kategori

  const navigate = useNavigate();
  const formatTime = (dateString: string) => {
    const date = format(new Date(dateString), "yyyy-MM-dd");
    return date;
  };

  const fetchItems = (page: number) => {
    setLoading(true);
    BrandAPI.get({
      page: page,
      per_page: 5,
      search: props.search,
      sorting: sorting,
      filter: filter,
    })
      .then((res) => {
        console.log(res);
        setItems(res.data.data);
        const { total, per_page, from, to, current_page, last_page } = res.data;
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

  useEffect(() => {
    fetchItems(1);
  }, [props.search, debouncedSortTerm, filter]);
  return (
    <>
      <div className="flex flex-col items-start bg-gray-300 rounded-2xl py-4 px-7 mb-2">
        <div className="flex justify-start items-center space-x-4 mb-2">
          <div className="text-base font-semibold">Filter</div>
          <Menu
            label={
              <>
                <div className="rounded-2xl py-2 px-4 bg-[#567C8D] text-white flex items-center hover:cursor-pointer">
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
                setFilter({ category: "default" });
              }}
            />
            <MenuItem
              label="Kategori"
              onClick={() => setActiveFilter("category")}
            />
          </Menu>
        </div>

        {/* Filter kategori */}
        <div className="flex flex-wrap gap-2 justify-start items-center w-full">
          {activeFilter === "category" &&
            brandCategories.map((category, index) => (
              <div
                key={index}
                className={`rounded-2xl p-2 ${
                  filter.category === category ? "bg-[#395c68]" : "bg-[#567C8D]"
                } text-white flex items-center justify-center px-4 mb-2 min-w-[120px] text-center h-[40px] hover:cursor-pointer`}
                onClick={() => {
                  setFilter({ category });
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
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[10%]">
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
                    <div className="mr-2">Nama Brand</div>
                    {sorting.name === "asc" ? (
                      <Lucide icon="ArrowUp" />
                    ) : sorting.name === "desc" ? (
                      <Lucide icon="ArrowDown" />
                    ) : (
                      ""
                    )}
                  </button>
                </th>
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[30%]">
                  <button
                    className="flex items-center hover:cursor-pointer"
                    onClick={() => {
                      setSorting((prev) => ({
                        ...prev,
                        address:
                          prev.address === "asc"
                            ? "desc"
                            : prev.address === "desc"
                            ? "default"
                            : "asc",
                      }));
                    }}
                  >
                    <div className="mr-2">Alamat</div>
                    {sorting.address === "asc" ? (
                      <Lucide icon="ArrowUp" />
                    ) : sorting.address === "desc" ? (
                      <Lucide icon="ArrowDown" />
                    ) : (
                      ""
                    )}
                  </button>
                </th>
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[10%]">
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

                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[10%]">
                  Tanggal Dibuat
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
                  <td className="px-4 py-2">{item.address}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">
                    {item.created_at ? formatTime(item.created_at) : "null"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-200 cursor-pointer">
                      <Menu
                        label={<Lucide icon="Settings" className="w-5 h-5" />}
                      >
                        <MenuItem
                          label="Hapus"
                          onClick={() => {
                            if (item.id != null && item.id != undefined) {
                              BrandAPI.deleteById(item.id)
                                .then(() => {
                                  toast.success("Penjual Berhasil Dihapus");
                                  fetchItems(1);
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
                              toast.error("Id Brand tidak dapat ditemukan");
                            }
                          }}
                        />
                        <MenuItem
                          label="Edit"
                          onClick={() => navigate(`/profile/brand/${item.id}`)}
                        />
                      </Menu>
                    </button>
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
                        onPageChange={(page) => fetchItems(page)}
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
