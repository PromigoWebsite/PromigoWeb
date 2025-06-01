import { useState } from "react";
import { useUser } from "../../context";
import { toast } from "react-toastify";
import clsx from "clsx";
import Lucide from "../../basic_components/Lucide";
import { AxiosError } from "axios";
import api from "../../apis/api";
import { BrandAPI } from "../../apis/BrandAPI";
import { Brand } from "../../models/Brand";

interface FormErrors {
  name?: string;
  address?: string;
  category?: string;
  terms1?: boolean;
  terms2?: boolean;
  logo?: string;
}

export default function Main() {
  const { user } = useUser();
  const [localBrand, setLocalBrand] = useState<Brand>();
  const [errors, setErrors] = useState<FormErrors>({});
  const [profilePhoto, setProfilePhoto] = useState<File>();
  const [termsCheck, setTermsCheck] = useState({
      terms1: false,
      terms2: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLocalBrand((prev) => ({
      ...prev!,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(e.target.files[0]);

      const previewUrl = URL.createObjectURL(file);

      setLocalBrand((prev) => ({
        ...prev!,
        logo: previewUrl,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Brand Name validation
    if (!localBrand?.name || localBrand.name.trim() === "") {
      newErrors.name = "Nama brand tidak boleh kosong";
      isValid = false;
    }
    // Brand Address validation
    if (!localBrand?.address || localBrand.address.trim() === "") {
      newErrors.address = "Alamat brand tidak boleh kosong";
      isValid = false;
    }

    if (!localBrand?.category || localBrand.category.trim() === "") {
      newErrors.category = "Kategori brand tidak boleh kosong";
      isValid = false;
    }

    if (!termsCheck.terms1) {
      newErrors.terms1 = true;
      isValid = false;
    }

    if (!termsCheck.terms2) {
      newErrors.terms2 = true;
      isValid = false;
    }

    if (!localBrand?.logo) {
      newErrors.logo = 'Logo Brand tidak boleh kosong';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (profilePhoto) {
        if (user?.id) {
          
          const formData = new FormData();

          formData.append("name", localBrand?.name || "");
          formData.append("address", localBrand?.address || "");
          formData.append("category", localBrand?.category || "");
          formData.append("user_id", String(user.id) || "");

          if (profilePhoto) {
            formData.append("logo", profilePhoto);
          }

          BrandAPI.addProfile(formData)
            .then(() => {
              toast.success("Pengajuan berhasil");
            })
            .catch((err) => {
              if (err instanceof AxiosError) {
                toast.error(err?.response?.data?.message || err.message);
              }
            });
        }
      }
    }
  };


  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-7xl">
        {/* Profile Header */}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex text-2xl font-bold mb-15">
            <label>Masukkan Informasi Brand</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
            {/* Bagian kiri */}
            <div className="col-span-4 space-y-4">
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="relative">
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  {localBrand?.logo ? (
                    <img
                      src={
                        localBrand?.logo?.startsWith("blob:")
                          ? localBrand.logo
                          : api.baseCloudPath + localBrand?.logo
                      }
                      alt="Profile"
                      className="size-45 rounded-full object-cover"
                    />
                  ) : (
                    <Lucide
                      icon="CircleUserRound"
                      className="size-45 stroke-1 "
                    />
                  )}

                  <label
                    htmlFor="profile-image"
                    className="absolute -translate-x-4 bottom-0 right-0 bg-teal-700 hover:bg-teal-800 p-2 rounded-full cursor-pointer shadow-md"
                  >
                    <Lucide
                      icon="Camera"
                      className="stroke-2 size-5 text-white"
                    />
                  </label>
                </div>
                {errors.logo && (
                  <p className="text-red-500 text-xs mt-1">{errors.logo}</p>
                )}
              </div>
            </div>

            {/* Bagian Kanan */}
            <div className="col-span-8 space-y-4">
              {/* BRAND NAME */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700 mb-1">
                  Nama Brand
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={localBrand?.name || ""}
                  onChange={handleChange}
                  className={clsx(
                    "w-full px-4 py-2 border rounded text-gray-700 bg-white",
                    {
                      "border-red-500": errors.name,
                      "border-gray-300": !errors.name,
                    }
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              {/* BRAND ADDRESS */}
              <div className="flex flex-col">
                <label htmlFor="address" className="text-gray-700 mb-1">
                  Alamat Brand
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={localBrand?.address || ""}
                  onChange={handleChange}
                  className={clsx(
                    "w-full px-4 py-2 border rounded text-gray-700 bg-white",
                    {
                      "border-red-500": errors.address,
                      "border-gray-300": !errors.address,
                    }
                  )}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
              {/* BRAND CATEGORY */}
              <div className="flex flex-col">
                <label htmlFor="category" className="text-gray-700 mb-1">
                  Kategori Brand
                </label>
                <select
                  id="category"
                  className={clsx(
                    "w-full px-4 py-2 border rounded text-gray-700 bg-white",
                    {
                      "border-red-500": errors.category,
                      "border-gray-300": !errors.category,
                    }
                  )}
                  value={localBrand?.category || ""}
                  onChange={(e) => {
                    setLocalBrand((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }));

                    if (errors.category) {
                      setErrors((prev) => ({
                        ...prev,
                        category: undefined,
                      }));
                    }
                  }}
                >
                  <option value="">Pilih Kategori Brand</option>
                  <option value="FnB">FnB</option>
                  <option value="Elektronik">Elektronik</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>
            </div>
            <div className="col-span-12 flex items-center mt-8">
              <input
                type="checkbox"
                className="size-5 mr-3"
                onClick={() => {
                  setTermsCheck((prev) => ({ ...prev, terms1: true }));
                }}
              />
              <div className={clsx(errors.terms1 ? "text-red-500" : "")}>
                Dengan ini saya menyatakan bahwa seluruh informasi yang saya
                berikan adalah benar dan dapat dipertanggungjawabkan.
              </div>
            </div>
            <div className="col-span-12 flex items-center mt-2">
              <input
                type="checkbox"
                className="size-5 mr-3"
                onClick={() => {
                  setTermsCheck((prev) => ({ ...prev, terms2: true }));
                }}
              />
              <div className={clsx(errors.terms1 ? "text-red-500" : "")}>
                Saya bersedia mengikuti peraturan di website Promigo
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="px-8 py-2 rounded text-lg text-white bg-teal-700 hover:bg-teal-800 cursor-pointer"
            >
              Ajukan Menjadi Seller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
