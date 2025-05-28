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

interface Props {
  role: string,
  search: string,
  id?: number | undefined,
};
export function PromoListTable(props : Props) {
  const [metadata, setMetadata] = useState<Metadata>();
  const [items, setItems] = useState<Array<Promo>>();
  const [isLoading,setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const formatTime = (dateString: string) =>{
    const date = format(new Date(dateString), "yyyy-MM-dd");
    return date;
  } 

  const fetchAdminItems = (page: number) => {
    setLoading(true);
    AdminAPI.get({ page: page, per_page: 5,search: props.search})
    .then((res) => {
      setItems(res.data.list.data);
      const { total, per_page, from, to, current_page, last_page } = res.data.list;
      setMetadata({ total, per_page, from, to, current_page, last_page });
      setLoading(false);
    })
    .catch((err)=>{
      if(err instanceof AxiosError){
        toast.error(err?.response?.data?.message || err.message);
        if(err.response?.status && err.response?.status == 403){
          navigate('/');
        }
      }
    })
  };

  const fetchSellerItems = (page: number) => {
    setLoading(true);
    if(props.id){
      SellerAPI.get({
        page: page,
        per_page: 5,
        search: props.search,
        id: props.id,
      })
        .then((res) => {
          setItems(res.data.list.data);
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
  }, [props.search]);
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
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[20%]">
                  Nama Promo
                </th>
                {props.role == "Admin" && (
                  <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[15%]">
                    Brand
                  </th>
                )}
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[10%]">
                  Tipe
                </th>
                <th className="px-4 py-2 text-left border-b-3 border-gray-300 w-[15%]">
                  Kategori
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
                    <button className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-200 cursor-pointer">
                      <Menu
                        label={<Lucide icon="Settings" className="w-5 h-5" />}
                      >
                        <MenuItem
                          label="Delete"
                          onClick={() => {
                            if (item.id != null && item.id != undefined) {
                              AdminAPI.deleteById(item.id);
                            } else {
                              toast.error("Id Promo tidak dapat ditemukan");
                            }
                          }}
                        />
                        <MenuItem label="Edit" />
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
