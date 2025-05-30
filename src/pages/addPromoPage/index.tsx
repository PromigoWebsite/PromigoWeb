import { useEffect, useState } from "react";
import Lucide from "../../basic_components/Lucide";
import { z } from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { PromoAPI } from "../../apis/PromoAPI";
import { useUser } from "../../context";
import { toast } from "react-toastify";
import { Brand } from "../../models/Brand";
import { BrandAPI } from "../../apis/BrandAPI";
import { AxiosError } from "axios";
import api from "../../apis/api";
import { AdminAPI } from "../../apis/adminAPI";

export default function AddPromoPage() {
  const [newTerm, setNewTerm] = useState("");
  const [mediaErrors, setmediaErrors] = useState("");
  const [filePreview, setFilePreview] = useState<string>("");
  const [brands, setBrands] = useState<Array<Brand>>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>();
  const [brandErrors, setBrandErrors] = useState("");
  const [file, setFile] = useState<File>();
  const {user} = useUser();
  const params = useParams();
  const navigate = useNavigate();
  
  const fetchBrand = ()=>{
        BrandAPI.all()
        .then((res)=>{
          setBrands(res.data);
         
        })
        .catch((err)=>{
          if(err instanceof AxiosError){
            toast.error(err?.response?.data?.message || err.message);
          }
        })
      };  

  const fetchItems = () => {
    if(params.id){
      PromoAPI.get(+params?.id)
        .then((res) => {
          const data = res.data.promo;
          console.log(res.data.promo);
          setValue('promoName',data.name);
          setValue('promoCategory',data.category);
          setValue("promoType", data.type);
          setValue("started_at", data.started_at);
          setValue("ended_at", data.ended_at);
          setValue("description",data.description);
          setValue("status",data.status);
          setValue("terms", JSON.parse(data.terms));
          setSelectedBrand(data.brand_id);

          const cloudMedia = api.baseCloudPath + data.path;
          setFilePreview(cloudMedia);

          fetch(cloudMedia)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.blob();
            })
            .then((blob) => {
              const file = new File(
                [blob],
                data.path.split("/").pop() || "image.jpg",
                {
                  type: blob.type || "image/jpeg",
                }
              );
              setFile(file);
            })
            .catch(() => {
              toast.error("Gagal mengambil media dari server");
            });
          
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
          }
        });
    }
   
  }
  const schema = z.object({
    promoName: z.string().min(1, { message: "Nama Promo tidak boleh kosong" }),
    promoType: z.string().min(1, { message: "Tipe Promo tidak boleh kosong" }),
    description: z
      .string()
      .min(1, { message: "Deskripsi Promo tidak boleh kosong" }),
    status: z.string().min(1, { message: "Status Promo tidak boleh kosong" }),
    promoCategory: z
      .string()
      .min(1, { message: "Jenis produk tidak boleh kosong" }),
    started_at: z.string().optional(),
    ended_at: z.string().optional(),
    terms: z
      .array(z.string())
      .min(1, { message: "Syarat dan Ketentuan tidak boleh kosong" }),
  });

  const defaultValues = {
    promoName: "",
    promoType: "",
    description: "",
    promoCategory: "",
    started_at: "",
    ended_at: "",
    status: "",
    terms: [],
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({ resolver: zodResolver(schema), defaultValues: defaultValues });

  const terms = watch("terms") || [];

  const handleAddTerm = () => {
    if (newTerm.trim()) {
      const updatedTerms = [...terms, newTerm.trim()];
      setValue("terms", updatedTerms, { shouldValidate: true });
      setNewTerm("");
    }
  };

  const handleFilePreview = (preview: File) => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    return URL.createObjectURL(preview);
  };
  

  const handleRemoveTerm = (index: number) => {
    const updatedTerms = terms.filter((_, i) => i !== index);
    setValue("terms", updatedTerms, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    const data = getValues();
    const form = new FormData();

    if(!file){
        setmediaErrors("Media tidak boleh kosong");
        return;
    }
    if (!selectedBrand) {
      setBrandErrors("Brand tidak boleh kosong");
      return;
    }
    if(!user){
        toast.error('Tidak ada user yang terautentikasi')
        navigate('/');
    }else if(user && user.role === "Seller"){
        form.append("brand_id", String(user?.brand_id));
    }else if (user && user.role === "Admin"){
        form.append("brand_id", selectedBrand);
    }
      Object.entries(data).forEach(([key, value]) => {
        if (key === "terms") {
          form.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          form.append(key, value as string);
        }
      });

    form.append("Media",file);

    console.log(form);

    AdminAPI.save({ id: +(params.id ?? 0), data: form })
      .then(() => {
        toast.success("Promo Berhasil Ditambahkan/Diubah")
        navigate('/extended/list');
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data?.message || err.message);
        }
      });
  };

  useEffect(()=>{
    fetchBrand();
    if(params.id && !isNaN(+params.id)){
      fetchItems();
    }
  },[])

  return (
    <div className="min-h-screen bg-[#fafbfc] py-8 px-8">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold font-serif">Buat Promo Baru</h2>
            <div className="text-gray-500 text-sm font-serif mt-1">
              Anda akan menambahkan promo baru ke situs web
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <Lucide icon="X" className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              {/* NAMA PROMO */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="promoName"
                >
                  Nama Promo
                </label>
                <input
                  type="text"
                  id="promoName"
                  className={`w-full border ${
                    errors.promoName ? "border-red-500" : "border-gray-300"
                  } rounded-full px-3 py-2 focus:outline-none focus:border-[#6b8c97]`}
                  {...register("promoName")}
                />
                {errors.promoName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.promoName.message as string}
                  </p>
                )}
              </div>
              {/* JENIS PROMO */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="promoType"
                >
                  Jenis Promo
                </label>
                <select
                  id="promoType"
                  className={`w-full border ${
                    errors.promoType ? "border-red-500" : "border-gray-300"
                  } rounded-full px-3 py-2 focus:outline-none focus:border-[#6b8c97]`}
                  {...register("promoType")}
                >
                  <option value="">Pilih jenis promo</option>
                  <option value="Diskon">Diskon</option>
                  <option value="Cashback">Cashback</option>
                  <option value="Gratis Ongkir">Gratis Ongkir</option>
                </select>
                {errors.promoType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.promoType.message as string}
                  </p>
                )}
              </div>
              {/* DESKRIPSI */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="description"
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  rows={6}
                  className={`w-full border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-xl px-3 py-2 focus:outline-none focus:border-[#6b8c97]`}
                  {...register("description")}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message as string}
                  </p>
                )}
              </div>
              {/* MEDIA */}
              <div className="mb-4">
                <label
                  htmlFor="media"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Media
                </label>
                <input
                  type="file"
                  id="media"
                  className="hidden"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFile(e.target.files[0]);
                      setFilePreview(handleFilePreview(e.target.files[0]));
                      if (mediaErrors != "") {
                        setmediaErrors("");
                      }
                    }
                  }}
                />

                <label
                  htmlFor="media"
                  className={clsx(
                    "border border-gray-300 rounded-xl flex cursor-pointer",
                    filePreview ? "h-96" : "h-32"
                  )}
                >
                  <div
                    className="flex flex-col items-center justify-center"
                    style={{
                      backgroundImage: filePreview
                        ? `url(${filePreview})`
                        : "none",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <div
                      className={clsx(
                        "flex flex-col items-center justify-center size-full",
                        filePreview ? "bg-black/60" : ""
                      )}
                    >
                      <Lucide
                        icon="Plus"
                        className={clsx(
                          "size-10 mb-4",
                          filePreview ? "text-white" : "text-gray-500"
                        )}
                      />
                      <span
                        className={clsx(
                          "text-sm",
                          filePreview ? "text-white " : "text-gray-500"
                        )}
                      >
                        Klik untuk mengunggah gambar
                      </span>
                      {filePreview && (
                        <button
                          className="text-sm text-blue-300 hover:text-blue-500 hover:cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            setFile(undefined);
                            setFilePreview("");
                            if (mediaErrors != "") {
                              setmediaErrors("");
                            }
                          }}
                        >
                          Hapus media?
                        </button>
                      )}
                    </div>
                  </div>
                </label>
                {mediaErrors && (
                  <p className="text-red-500 text-xs mt-1">{mediaErrors}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* STATUS */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="promoStatus"
                >
                  Status
                </label>
                <select
                  id="promoStatus"
                  className={`w-full border ${
                    errors.promoType ? "border-red-500" : "border-gray-300"
                  } rounded-full px-3 py-2 focus:outline-none focus:border-[#6b8c97]`}
                  {...register("status")}
                >
                  <option value="">Pilih Status Promo</option>
                  <option value="Active">Aktif</option>
                  <option value="Inactive">Tidak Aktif</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.status.message as string}
                  </p>
                )}
              </div>
              {/* STARTED_AT AND ENDED AT */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="started_at"
                  >
                    Tanggal Mulai Promo
                  </label>
                  <input
                    type="date"
                    id="started_at"
                    className={`w-full border ${
                      errors.started_at ? "border-red-500" : "border-gray-300"
                    } rounded-full px-3 py-2 focus:outline-none focus:border-[#6b8c97]`}
                    {...register("started_at")}
                  />
                  {errors.started_at && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.started_at.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="ended_at"
                  >
                    Tanggal Akhir Promo
                  </label>
                  <input
                    type="date"
                    id="ended_at"
                    className={`w-full border ${
                      errors.ended_at ? "border-red-500" : "border-gray-300"
                    } rounded-full px-3 py-2 focus:outline-none focus:border-[#6b8c97]`}
                    {...register("ended_at")}
                  />
                  {errors.ended_at && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.ended_at.message as string}
                    </p>
                  )}
                </div>
              </div>
              {/* KATEGORI PROMO */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="promoCategory"
                >
                  Kategori Produk
                </label>
                <select
                  id="promoCategory"
                  className={`w-full border ${
                    errors.promoType ? "border-red-500" : "border-gray-300"
                  } rounded-full px-3 py-2 focus:outline-none focus:border-[#6b8c97]`}
                  {...register("promoCategory")}
                >
                  <option value="">Pilih Kategori produk</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Elektronik">Elektronik</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.status.message as string}
                  </p>
                )}
              </div>
              {/* SYARAT DAN KETENTUAN */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Syarat dan Ketentuan
                </label>
                <div
                  className={`border ${
                    errors.terms ? "border-red-500" : "border-gray-300"
                  } rounded-xl p-4 flex flex-wrap`}
                >
                  {terms.map((term, index) => (
                    <div
                      key={index}
                      className="flex justify-between bg-gray-100 rounded-full px-3 py-2 mb-2 w-full border-1 border-gray-300"
                    >
                      <div
                        className="flex-1 mr-2"
                        style={{ wordBreak: "break-word" }}
                      >
                        {term}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveTerm(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Lucide
                          icon="X"
                          className="flex w-4 h-4 items-center hover:scale-120 hover:stroke-2"
                        />
                      </button>
                    </div>
                  ))}
                  <div className="flex w-full mt-2 space-x-2">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-2xl px-3 py-2 focus:outline-none focus:border-[#6b8c97] mb-2"
                      placeholder="Tambahkan syarat dan ketentuan..."
                      value={newTerm}
                      onChange={(e) => setNewTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTerm();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTerm}
                      className="bg-[#6b8c97] text-white font-semibold px-4 py-2 rounded-2xl hover:bg-[#466273] h-10 flex flex-col justify-center"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.terms.message as string}
                  </p>
                )}
              </div>
              {user && user.role === "Admin" && (
                // BRAND
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="promoType"
                  >
                    Brand
                  </label>
                  <select
                    id="promoType"
                    className={`w-full border ${
                      errors.promoType ? "border-red-500" : "border-gray-300"
                    } rounded-full px-3 py-2 focus:outline-none focus:border-[#6b8c97]`}
                    value={selectedBrand}
                    onChange={(e) => {
                      if (brandErrors != "") {
                        setBrandErrors("");
                      }
                      setSelectedBrand(e.target.value);
                    }}
                  >
                    <option value="">Pilih Brand untuk promo</option>
                    {brands.map((brand, index) => (
                      <option value={brand.id} key={index}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  {brandErrors && (
                    <p className="text-red-500 text-xs mt-1">{brandErrors}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-[#6b8c97] text-white font-bold text-lg px-8 py-2 rounded-full shadow hover:bg-[#466273] transition-all mr-4"
            >
              Simpan Promo
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-800 font-bold text-lg px-8 py-2 rounded-full shadow hover:bg-gray-400 transition-all"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
