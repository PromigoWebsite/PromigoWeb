import { useState } from "react";
import { useUser } from "../../context";
import { toast } from "react-toastify";
import clsx from "clsx";
import Lucide from "../../basic_components/Lucide";
import { AxiosError } from "axios";
import api from "../../apis/api";
import { BrandAPI } from "../../apis/BrandAPI";
import { Brand } from "../../models/Brand";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";

interface FormErrors {
  name?: string;
  address?: string;
  category?: string;
  description?: string;
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
    terms2: false,
  });
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    // Brand Description validation
    if (!localBrand?.description || localBrand.description.trim() === "") {
      newErrors.description = "Deskripsi brand tidak boleh kosong";
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
      newErrors.logo = "Logo Brand tidak boleh kosong";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setConfirmModal(true);
    }
  };

  const submitSellerRequest = () => {
    if (profilePhoto && user?.id) {
      const formData = new FormData();

      formData.append("name", localBrand?.name || "");
      formData.append("address", localBrand?.address || "");
      formData.append("category", localBrand?.category || "");
      formData.append("description", localBrand?.description || "");
      formData.append("user_id", String(user.id) || "");

      if (profilePhoto) {
        formData.append("logo", profilePhoto);
      }

      BrandAPI.addProfile(formData)
        .then(() => {
          toast.success("Pengajuan berhasil");
          setConfirmModal(false);
          navigate(`/`);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
          }
          setConfirmModal(false);
        });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-7xl">
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
              {/* BRAND DESCRIPTION */}
              <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-700 mb-1">
                  Deskripsi Brand
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  value={localBrand?.description || ""}
                  onChange={handleChange}
                  placeholder="Masukkan deskripsi brand Anda..."
                  className={clsx(
                    "w-full px-4 py-2 border rounded text-gray-700 bg-white",
                    {
                      "border-red-500": errors.description,
                      "border-gray-300": !errors.description,
                    }
                  )}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-12 flex items-center mt-8">
              <input
                type="checkbox"
                className="size-5 mr-3"
                checked={termsCheck.terms1}
                onChange={(e) => {
                  setTermsCheck((prev) => ({
                    ...prev,
                    terms1: e.target.checked,
                  }));
                  if (errors.terms1) {
                    setErrors((prev) => ({
                      ...prev,
                      terms1: undefined,
                    }));
                  }
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
                checked={termsCheck.terms2}
                onChange={(e) => {
                  setTermsCheck((prev) => ({
                    ...prev,
                    terms2: e.target.checked,
                  }));
                  if (errors.terms2) {
                    setErrors((prev) => ({
                      ...prev,
                      terms2: undefined,
                    }));
                  }
                }}
              />
              <div className={clsx(errors.terms2 ? "text-red-500" : "")}>
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

      {/* Confirmation Dialog */}
      <Dialog open={confirmModal} onClose={() => {}} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-md bg-white p-6 rounded-2xl shadow-lg">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setConfirmModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Lucide icon="X" className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="text-center px-4 pb-4">
              <DialogTitle className="text-lg font-medium mb-4">
                Apakah kamu yakin dengan informasi yang diberikan?
              </DialogTitle>

              <div className="flex justify-center gap-4">
                <button
                  onClick={submitSellerRequest}
                  className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmModal(false)}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
