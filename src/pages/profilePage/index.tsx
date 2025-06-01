import { useEffect, useState } from "react";
import { useUser } from "../../context";
import { User } from "../../models/User";
import { toast } from "react-toastify";
import clsx from "clsx";
import Lucide from "../../basic_components/Lucide";
import { ProfileAPI } from "../../apis/profileAPI";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import api from "../../apis/api";

interface FormErrors {
  username?: string;
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
  oldPassword?: string;
}

export default function Main() {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { user, isAuth, loading, refreshUser } = useUser();
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<File>();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "oldPassword") {
      setOldPassword(value);
    } else {
      setLocalUser((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }

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
      
      setLocalUser((prev) => ({
        ...prev!,
        profile_picture: previewUrl,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Username validation
    if (!localUser?.username || localUser.username.trim() === "") {
      newErrors.username = "Username tidak boleh kosong";
      isValid = false;
    } else if (localUser.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!localUser?.email || localUser.email.trim() === "") {
      newErrors.email = "Email tidak boleh kosong";
      isValid = false;
    } else if (!emailRegex.test(localUser.email)) {
      newErrors.email = "Format email tidak valid";
      isValid = false;
    }

    // Mobile validation
    const phoneRegex =
      /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;
    if (!localUser?.mobile || localUser.mobile.trim() === "") {
      newErrors.mobile = "Nomor telepon tidak boleh kosong";
      isValid = false;
    } else if (!phoneRegex.test(localUser.mobile)) {
      newErrors.mobile =
        "Nomor telepon harus 10-13 digit angka dan dimulai dengan 08/62...";
      isValid = false;
    }

    // password
    if (password && password.trim() !== "") {
      if (password.length < 6) {
        newErrors.password = "Password minimal 6 karakter";
        isValid = false;
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = "Password harus memiliki minimal 1 huruf kapital";
        isValid = false;
      }
    }

    // confirm password
    if (password && confirmPassword?.trim() === "") {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
      isValid = false;
    } else if (confirmPassword != password) {
      newErrors.confirmPassword = "Password dan konfirmasi password tidak sama";
      isValid = false;
    }

    // confirm old password
    if (password && oldPassword?.trim() === "") {
      newErrors.oldPassword = "Konfirmasi password lama wajib diisi";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      if (
        JSON.stringify(localUser) !== JSON.stringify(user) ||
        password.trim() !== "" ||
        profilePhoto
      ) {
        if (params.id) {
          const formData = new FormData();

          formData.append("username", localUser?.username || "");
          formData.append("email", localUser?.email || "");
          formData.append("mobile", localUser?.mobile || "");

          if (password.trim() !== "") {
            formData.append("password", password);
            formData.append("oldPassword", oldPassword);
          }

          if (profilePhoto) {
            formData.append("profile_picture", profilePhoto);
          }
          ProfileAPI.editProfile(formData,+params.id)
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
      } else {
        setIsEditing(false);
      }
    }
  };

  useEffect(() => {
    if (isAuth && !loading) {
      setLocalUser(user);
    }
  }, [loading, isAuth, user]);

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-7xl">
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
            {user?.profile_picture || localUser?.profile_picture ? (
              <img
                src={
                  localUser?.profile_picture?.startsWith("blob:")
                    ? localUser.profile_picture
                    : api.baseCloudPath + localUser?.profile_picture
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

          {/* Username */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start">
              {user?.username}
              {/* <span className="text-blue-500 ml-2 text-xl">✔️</span> */}
            </h2>
            <p className="text-gray-400 text-sm">{user?.role}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {/* Bagian kiri */}
            <div className="col-span-1 space-y-4">
              {/* Username */}
              <div className="flex flex-col">
                <label htmlFor="username" className="text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={localUser?.username || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={clsx(
                    "w-full px-4 py-2 border rounded text-gray-700",
                    {
                      "border-red-500": errors.username,
                      "border-gray-300": !errors.username,
                      "bg-white": isEditing,
                      "bg-gray-100": !isEditing,
                    }
                  )}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              {/* Nomor Telefon */}
              <div className="flex flex-col">
                <label htmlFor="mobile" className="text-gray-700 mb-1">
                  Nomor Telefon
                </label>
                <input
                  id="mobile"
                  type="text"
                  name="mobile"
                  value={localUser?.mobile || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={clsx(
                    "w-full px-4 py-2 border rounded text-gray-700",
                    {
                      "border-red-500": errors.mobile,
                      "border-gray-300": !errors.mobile,
                      "bg-white": isEditing,
                      "bg-gray-100": !isEditing,
                    }
                  )}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>
              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 mb-1">
                  Alamat Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={localUser?.email || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={clsx(
                    "w-full px-4 py-2 border rounded text-gray-700",
                    {
                      "border-red-500": errors.email,
                      "border-gray-300": !errors.email,
                      "bg-white": isEditing,
                      "bg-gray-100": !isEditing,
                    }
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Bagian Kanan */}
            <div className="col-span-1 space-y-4">
              {/* Password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-700 mb-1">
                  Password
                </label>
                <div
                  className={clsx("border flex rounded items-center", {
                    "border-red-500": errors.password,
                    "border-gray-300": !errors.password,
                    "bg-white": isEditing,
                    "bg-gray-100": !isEditing,
                  })}
                >
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={clsx("w-full px-4 py-2 rounded text-gray-700")}
                    placeholder={
                      isEditing ? "Kosongkan jika tidak ingin mengubah" : ""
                    }
                  />
                  <div
                    className={clsx("mx-2", {
                      "text-black cursor-pointer": isEditing,
                      "text-gray-400 cursor-not-allowed opacity-50": !isEditing,
                    })}
                    onClick={
                      isEditing
                        ? () => setShowPassword(!showPassword)
                        : undefined
                    }
                  >
                    {showPassword ? (
                      <Lucide icon="EyeOff" className="stroke-2 size-5" />
                    ) : (
                      <Lucide icon="Eye" className="stroke-2 size-5" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-gray-700 mb-1">
                  Konfirmasi Password
                </label>
                <div
                  className={clsx("border flex rounded items-center", {
                    "border-red-500": errors.confirmPassword,
                    "border-gray-300": !errors.confirmPassword,
                    "bg-white": isEditing && password?.trim() !== "",
                    "bg-gray-100": !isEditing || password?.trim() === "",
                  })}
                >
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword || ""}
                    onChange={handleChange}
                    disabled={!isEditing || password?.trim() === ""}
                    className={clsx("w-full px-4 py-2 rounded text-gray-700")}
                  />
                  <div
                    className={clsx("mx-2", {
                      "text-black cursor-pointer": isEditing,
                      "text-gray-400 cursor-not-allowed opacity-50":
                        !isEditing || password?.trim() === "",
                    })}
                    onClick={
                      isEditing ? () => setShowConfirm(!showConfirm) : undefined
                    }
                  >
                    {showConfirm ? (
                      <Lucide icon="EyeOff" className="stroke-2 size-5" />
                    ) : (
                      <Lucide icon="Eye" className="stroke-2 size-5" />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Confirm Old Password */}
              <div className="flex flex-col">
                <label htmlFor="oldPassword" className="text-gray-700 mb-1">
                  Masukkan Password Lama
                </label>
                <div
                  className={clsx("border flex rounded items-center", {
                    "border-red-500": errors.oldPassword,
                    "border-gray-300": !errors.oldPassword,
                    "bg-white": isEditing && password?.trim() !== "",
                    "bg-gray-100": !isEditing || password?.trim() === "",
                  })}
                >
                  <input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={oldPassword || ""}
                    onChange={handleChange}
                    disabled={!isEditing || password?.trim() === ""}
                    className={clsx("w-full px-4 py-2 rounded text-gray-700")}
                  />
                  <div
                    className={clsx("mx-2", {
                      "text-black cursor-pointer": isEditing,
                      "text-gray-400 cursor-not-allowed opacity-50":
                        !isEditing || password?.trim() === "",
                    })}
                    onClick={
                      isEditing
                        ? () => setShowOldPassword(!showOldPassword)
                        : undefined
                    }
                  >
                    {showOldPassword ? (
                      <Lucide icon="EyeOff" className="stroke-2 size-5" />
                    ) : (
                      <Lucide icon="Eye" className="stroke-2 size-5" />
                    )}
                  </div>
                </div>
                {errors.oldPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.oldPassword}
                  </p>
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
                  setLocalUser(user);
                  setIsEditing(false);
                  setErrors({});
                  setPassword("");
                  setConfirmPassword("");
                  setOldPassword("");
                }}
                className={clsx(
                  "px-8 py-2 rounded text-lg text-white",
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
                  "px-8 py-2 rounded text-lg text-white",
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
                  "px-8 py-2 rounded text-lg text-white",
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
