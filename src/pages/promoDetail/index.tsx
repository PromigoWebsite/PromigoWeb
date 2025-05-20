import { PromoAPI } from "../../apis/PromoAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Promo } from "../../models/Promo";
import { Brand } from "../../models/Brand";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import dayjs from "dayjs";
import Lucide from "../../basic_components/Lucide";
import clsx from "clsx";
import { ReportAPI } from "../../apis/reportAPI";
import { toast } from "react-toastify";
import { LoginModal } from "../../basic_components/LoginModal";
import { FavoriteAPI } from "../../apis/FavoriteAPI";
import { useUser } from "../../context";
import { AxiosError } from "axios";

export default function Main() {
  const params = useParams();
  const [promo, setPromo] = useState<Promo>();
  // const [isAuth, setIsAuth] = useState<boolean>(false);
  const { isAuth } = useUser();
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [brand, setBrand] = useState<Brand>();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [reportValue, setReportValue] = useState<string>("");
  const [reportIndex, setReportIndex] = useState<number>();

  const reportParameter = [
    {
      headline: "Iklan Tidak sesuai",
      description:
        "Isi dari promo tidak sesuai dengan yang berlaku sebenarnya.",
    },
    {
      headline: "Konten tidak pantas",
      description:
        "Ada gambar atau kata-kata yang tidak pantas/sesuai untuk umum.",
    },
    {
      headline: "Pelanggaran Hak Cipta",
      description:
        "Menggunakan logo, nama brand, atau gambar produk lain tanpa izin.",
    },
    {
      headline: "Lainnya",
      description:
        "Tolong jelaskan alasan pelaporan secara detail pada form dibawah ini",
    },
  ];

  const getItems = () => {
    PromoAPI.get(params?.id)
      .then((res) => {
        const promoData = res.data.promo;
        setPromo({
          ...promoData,
          terms: promoData.terms ? JSON.parse(promoData.terms) : [],
        });
        setBrand(res.data.brandInfo);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data?.message || err.message);
        }
      });
  };

  const checkLike = () => {
    if (params?.id) {
      PromoAPI.checkLike(+params?.id)
        .then((res) => {
          setIsLike(res.data.isLike);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
          }
        });
    }
  };

  const submitReport = (value: string) => {
    if (params?.id && !isNaN(+params.id)) {
      ReportAPI.addReport(value, +params.id);
    }
  };

  useEffect(() => {
    if (params?.id && !isNaN(+params.id)) {
      getItems();
    }
  }, []);

  useEffect(() => {
    if (params?.id && !isNaN(+params.id)) {
      checkLike();
    }
  }, [isLike]);

  useEffect(() => {
    console.log(reportValue);
  }, [reportValue]);
  return (
    <div className="flex flex-col md:flex-row p-6 md:justify-center">
      {/* Left Section */}

      <div className="flex flex-col mr-8">
        <div className="rounded-xl shadow-md p-8 mb-4 border border-gray-300">
          <img
            src={promo?.path}
            alt="Promo Ngabuburit"
            className="w-[500px] h-auto rounded-lg"
          />
        </div>

        <div className="rounded-xl shadow-md p-4 border border-gray-300">
          <div className="flex flex-col">
            <div className="font-bold text-lg">Lokasi</div>
            <div className="break-words w-[500px]">{brand?.address}</div>
          </div>
          <div>
            <div className="font-bold text-lg">Kontak</div>
            {brand?.mobile}
          </div>
          {/* <h2 className="font-bold text-lg mb-2">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            <i className="fab fa-tiktok"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-x-twitter"></i>
          </div> */}
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 bg-white rounded-xl shadow-md px-8 py-6 border border-gray-300 flex flex-col">
        <div className="flex justify-between items-start ">
          <div>
            <div className="text-[40px] mt-4 pr-9 font-bold mb-7 ">
              {promo?.name}
            </div>
            <div className="text-gray-700 text-xl">{brand?.name}</div>
          </div>
          <img
            src={brand?.logo}
            alt="Brand Logo"
            className="size-32 borderobject-contain"
          />
        </div>
        <hr className="border-t border-black mt-2 mb-4" />

        <div className="flex mb-4">
          <div className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-md mr-4 flex items-center">
            {promo?.type}
          </div>
          <div className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-md flex items-center">
            {promo?.category}
          </div>
          <button
            className="ml-auto text-sm text-gray-500 self-center"
            onClick={() => {
              if (isAuth && !isLike) {
                FavoriteAPI.add(promo?.id);
                if (promo) {
                  setPromo({
                    ...promo,
                    favorite_count: (promo.favorite_count || 0) + 1,
                  });
                }
                setIsLike(true);
              } else if (isAuth && isLike) {
                FavoriteAPI.remove(promo?.id);
                if (promo) {
                  setPromo({
                    ...promo,
                    favorite_count: Math.max(
                      0,
                      (promo.favorite_count || 0) - 1
                    ),
                  });
                }
                setIsLike(false);
              } else {
                setLoginModalOpen(true);
              }
            }}
          >
            {promo?.favorite_count} Like
          </button>
          {isLike ? (
            <Lucide
              icon="Heart"
              className="w-4 h-auto fill-red-500 stroke-1 ml-1"
            />
          ) : (
            <Lucide icon="Heart" className="w-4 h-auto stroke-1 ml-1" />
          )}
        </div>

        <p className="mb-4 pr-11">{promo?.description}</p>

        <div className="mb-2">
          <h2 className="font-semibold mb-2 text-xl">Validitas</h2>
          <ul className="list-disc pl-5 text-md">
            <li>
              Berlaku hingga{" "}
              {promo?.ended_at
                ? dayjs(promo.ended_at).format("MMMM D, YYYY")
                : "Undefined"}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2 text-xl">Syarat dan Ketentuan</h2>
          <ul className="list-disc pl-5 space-y-1 text-md">
            {promo?.terms?.length != 0 ? (
              promo?.terms?.map((term, index) => <li key={index}>{term}</li>)
            ) : (
              <li>There are no Terms and Condition for this promo</li>
            )}
          </ul>
        </div>

        <div className="flex justify-end mt-auto">
          <button
            className="py-2 pl-1 bg-[#567C8D] w-12 rounded-full flex justify-center items-center"
            onClick={() => {
              if (isAuth) {
                setReportModal(true);
              } else {
                setLoginModalOpen(true);
              }
            }}
          >
            <Lucide icon="Flag" className="size-5 stroke-3 relative mr-1" />
          </button>
        </div>
      </div>

      <LoginModal openModal={loginModalOpen} setOpenModal={setLoginModalOpen} />

      <Dialog open={reportModal} onClose={() => {}} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl max-h-[1000px] bg-gray-200 p-8 rounded-2xl">
            {/* Headline */}
            <div className="flex justify-between mb-4">
              <DialogTitle className="font-bold text-2xl">
                Laporkan Promo
              </DialogTitle>
              <button
                onClick={() => {
                  setReportModal(false);
                  setReportValue("");
                  setReportIndex(-1);
                }}
              >
                <Lucide icon="X" className="w-9 h-auto stroke-2 " />
              </button>
            </div>

            {/* Body */}
            <div className="mb-2">Pilih alasan pelaporan promo ini:</div>
            <div className="flex flex-col">
              <div className="mb-2">
                {reportParameter.map((params, index) => (
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="mr-2 self-start mt-1.5"
                      checked={index == reportIndex}
                      onClick={() => {
                        if (index != reportParameter.length - 1) {
                          setReportValue(params.headline);
                        } else {
                          setReportValue("");
                        }
                        setReportIndex(index);
                      }}
                    />
                    <div>
                      <span className="font-semibold">{params.headline}</span> -{" "}
                      {params.description}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-2">
                {reportIndex == reportParameter.length - 1 && (
                  <textarea
                    className="border border-gray-300 rounded w-full h-32 p-2 align-top resize-none"
                    placeholder="Masukkan detail laporan Anda..."
                    value={reportValue}
                    onChange={(e) => {
                      setReportValue(e.target.value);
                    }}
                  ></textarea>
                )}
              </div>
              <div className="self-end">
                <button
                  className={clsx(
                    "border border-gray-400 font-semibold rounded-xl py-2 px-4 text-xs mr-2",
                    reportValue
                      ? "bg-[#80FF93] hover:bg-[#60DF73] cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                  disabled={!reportValue}
                  onClick={() => {
                    submitReport(reportValue);
                    setReportValue("");
                    setReportIndex(-1);
                    setReportModal(false);
                    toast.success("Promo berhasil di laporkan");
                  }}
                >
                  Report
                </button>
                <button
                  className="border border-gray-400  font-semibold rounded-xl py-2 px-4 text-xs"
                  onClick={() => {
                    setReportModal(false);
                    setReportValue("");
                    setReportIndex(-1);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div></div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
