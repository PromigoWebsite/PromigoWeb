import { useEffect, useState } from "react";
import { useUser } from "../../context";
import { toast } from "react-toastify";
import clsx from "clsx";
import Lucide from "../../basic_components/Lucide";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import api from "../../apis/api";
import { BrandAPI } from "../../apis/BrandAPI";
import { Brand } from "../../models/Brand";

interface FormErrors {
  name?: string;
  address?: string;
  category?: string;
}

export default function Main() {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { user, isAuth, loading, refreshUser } = useUser();
  const [localBrand, setLocalBrand] = useState<Brand>();
  const [brand, setBrand] = useState<Brand>();
  const [errors, setErrors] = useState<FormErrors>({});
  const [profilePhoto, setProfilePhoto] = useState<File>();

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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const hasDataChanged =
        brand?.name !== localBrand?.name ||
        brand?.address !== localBrand?.address ||
        brand?.category !== localBrand?.category;

      if (hasDataChanged || profilePhoto) {
        if (params.id) {
          const formData = new FormData();

          formData.append("name", localBrand?.name || "");
          formData.append("address", localBrand?.address || "");
          formData.append("category", localBrand?.category || "");

          if (profilePhoto) {
            formData.append("logo", profilePhoto);
          }

          if (params.id) {
            BrandAPI.editProfile(formData, +params.id)
              .then(() => {
                refreshUser();
                toast.success("Profile berhasil diperbarui");
                setIsEditing(false);
              })
              .catch((err) => {
                if (err instanceof AxiosError) {
                  toast.error(err?.response?.data?.message || err.message);
                }
              });
          }
        }
      } else {
        // No changes detected
        setIsEditing(false);
      }
    }
  };

  const fetchBrandProfile = () => {
    if (params.id) {
      BrandAPI.getById(+params.id)
        .then((res) => {
          console.log(res.data);
          setBrand(res.data.brand);
          setLocalBrand(res.data.brand);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
          }
        });
    }
  };

  useEffect(() => {
    if (isAuth && !loading) {
      fetchBrandProfile();
    }
  }, [loading, isAuth, user]);

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow rounded-2xl  border border-gray-300 p-6 w-full max-w-7xl">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="relative">
            {isEditing && (
              <input
                type="file"
                id="profile-image"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            )}
            {brand?.logo || localBrand?.logo ? (
              <img
                src={
                  localBrand?.logo?.startsWith("blob:")
                    ? localBrand.logo
                    : api.baseCloudPath + localBrand?.logo
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <Lucide icon="CircleUserRound" className="size-32 stroke-1" />
            )}

            {isEditing && (
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-teal-700 hover:bg-teal-800 p-2 rounded-full cursor-pointer shadow-md"
              >
                <Lucide icon="Camera" className="stroke-2 size-5 text-white" />
              </label>
            )}
          </div>

          {/* BRAND NAME */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start">
              {brand?.name}
            </h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {/* Bagian kiri */}
            <div className="col-span-1 space-y-4">
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
                  disabled={!isEditing}
                  className={clsx(
                    "w-full px-4 py-2 border rounded-md text-gray-700",
                    {
                      "border-red-500": errors.name,
                      "border-gray-300": !errors.name,
                      "bg-white": isEditing,
                      "bg-gray-100": !isEditing,
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
                  disabled={!isEditing}
                  className={clsx(
                    "w-full px-4 py-2 border rounded-md text-gray-700",
                    {
                      "border-red-500": errors.address,
                      "border-gray-300": !errors.address,
                      "bg-white": isEditing,
                      "bg-gray-100": !isEditing,
                    }
                  )}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Bagian Kanan */}
            <div className="col-span-1 space-y-4">
              {/* BRAND CATEGORY */}
              <div className="flex flex-col">
                <label htmlFor="category" className="text-gray-700 mb-1">
                  Kategori Brand
                </label>
                <select
                  id="category"
                  className={clsx(
                    "w-full px-4 py-2 border rounded-md text-gray-700",
                    {
                      "border-red-500": errors.category,
                      "border-gray-300": !errors.category,
                      "bg-white": isEditing,
                      "bg-gray-100": !isEditing,
                    }
                  )}
                  disabled={!isEditing}
                  value={localBrand?.category}
                  onChange={(e) => {
                    setLocalBrand((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }));
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
          </div>

          {/* Buttons */}
          <div className="mt-6 text-center flex justify-center gap-4">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setLocalBrand(brand);
                  setIsEditing(false);
                  setErrors({});
                }}
                className={clsx(
                  "px-8 py-2 rounded-md text-lg text-white",
                  "bg-gray-500 hover:bg-gray-600 cursor-pointer"
                )}
              >
                Cancel
              </button>
            )}
            {isEditing && (
              <button
                type="submit"
                className={clsx(
                  "px-8 py-2 rounded-md text-lg text-white",
                  "bg-teal-700 hover:bg-teal-800 cursor-pointer"
                )}
              >
                Submit
              </button>
            )}
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className={clsx(
                  "px-8 py-2 rounded-md text-lg text-white",
                  "bg-teal-700 hover:bg-teal-800 cursor-pointer"
                )}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
