import { useEffect, useState } from "react";
import { Metadata } from "../../models/Metadata";
import Lucide from "../../basic_components/Lucide";
import Pagination from "../../basic_components/pagination";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "../../basic_components/FloatingMenu";
import { format } from "date-fns";
import { RequestAPI } from "../../apis/sellerRequestAPI";
import { SellerRequest } from "../../models/Seller_request";
import api from "../../apis/api";
import { RequestSorting } from "../../models/Request_sorting";
import { useDebounce } from "@uidotdev/usehooks";

interface Props {
  search: string;
}

export function RequestListTable(props: Props) {
  const [metadata, setMetadata] = useState<Metadata>();
  const [items, setItems] = useState<Array<SellerRequest>>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<RequestSorting>({
    name: "default",
    brand_name: "default",
    brand_address: "default",
    brand_category: "default",
  });
  const debouncedSortTerm = useDebounce(sorting, 200);
  const navigate = useNavigate();

  const formatTime = (dateString: string) => {
    const date = format(new Date(dateString), "yyyy-MM-dd");
    return date;
  };

  const fetchItems = (page: number) => {
    setLoading(true);
    RequestAPI.get({ page: page, per_page: 5, search: props.search })
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
  }, [props.search, debouncedSortTerm]);
  return (
    <>
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
                  Logo Brand
                </th>
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
                    <div className="mr-2">Nama User</div>
                    {sorting.name === "asc" ? (
                      <Lucide icon="ArrowUp" />
                    ) : sorting.name === "desc" ? (
                      <Lucide icon="ArrowDown" />
                    ) : (
                      ""
                    )}
                  </button>
                </th>
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[10%]">
                  Nomor Telfon
                </th>
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[10%]">
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
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[20%]">
                  <button
                    className="flex items-center hover:cursor-pointer"
                    onClick={() => {
                      setSorting((prev) => ({
                        ...prev,
                        brand_address:
                          prev.brand_address === "asc"
                            ? "desc"
                            : prev.brand_address === "desc"
                            ? "default"
                            : "asc",
                      }));
                    }}
                  >
                    <div className="mr-2">Alamat Brand</div>
                    {sorting.brand_address === "asc" ? (
                      <Lucide icon="ArrowUp" />
                    ) : sorting.brand_address === "desc" ? (
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
                        brand_category:
                          prev.brand_category === "asc"
                            ? "desc"
                            : prev.brand_category === "desc"
                            ? "default"
                            : "asc",
                      }));
                    }}
                  >
                    <div className="mr-2">Kategori Brand</div>
                    {sorting.brand_category === "asc" ? (
                      <Lucide icon="ArrowUp" />
                    ) : sorting.brand_category === "desc" ? (
                      <Lucide icon="ArrowDown" />
                    ) : (
                      ""
                    )}
                  </button>
                </th>
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[10%]">
                  Tanggal permintaan
                </th>
                <th className="px-4 py-2 text-center border-b-3 border-gray-300 w-[10%]">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {items?.map((item, idx) => (
                <tr key={idx} className="bg-white hover:bg-gray-50 rounded-xl">
                  <td className="px-4 py-2">
                    <div className="rounded-full size-12">
                      {item.brand_image_path ? (
                        <img
                          src={api.baseCloudPath + item.brand_image_path}
                          className="object-cover size-full rounded-full"
                          alt={`${item.brand_name} logo`}
                        />
                      ) : (
                        <Lucide icon="CircleUserRound" className="size-full" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.mobile}</td>
                  <td className="px-4 py-2">{item.brand_name}</td>
                  <td className="px-4 py-2">{item.brand_address}</td>
                  <td className="px-4 py-2">{item.brand_category}</td>
                  <td className="px-4 py-2">
                    {item.created_at ? formatTime(item.created_at) : "null"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-200 cursor-pointer">
                      <Menu
                        label={<Lucide icon="Settings" className="w-5 h-5" />}
                      >
                        <MenuItem
                          label="Tolak Permintaan"
                          onClick={() => {
                            if (item.id != null && item.id != undefined) {
                              RequestAPI.deleteById(item.id)
                                .then(() => {
                                  toast.success("Penjual Berhasil Ditolak");
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
                              toast.error(
                                "Id permintaan tidak dapat ditemukan"
                              );
                            }
                          }}
                        />
                        <MenuItem
                          label="Terima Permintaan"
                          onClick={() => {
                            if (item.id != null && item.id != undefined) {
                              RequestAPI.acceptById(item.id)
                                .then(() => {
                                  toast.success("Penjual Berhasil Diterima");
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
                              toast.error(
                                "Id permintaan tidak dapat ditemukan"
                              );
                            }
                          }}
                        />
                      </Menu>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={8} className="px-4 py-3">
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
