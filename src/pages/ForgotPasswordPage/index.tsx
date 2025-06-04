import { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../apis/axios";
import Lucide from "../../basic_components/Lucide";

const ForgotPasswordForm = () => {
  const [step, setStep] = useState<"email" | "reset">("email");
  const [form, setForm] = useState({
    email: "",
    token: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/forgot-password", { email: form.email });
      toast.success("Kode reset password telah dikirim ke email Anda");
      setStep("reset");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal mengirim kode reset");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      toast.error("Password tidak cocok");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/reset-password", {
        email: form.email,
        token: form.token,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });
      toast.success("Password berhasil direset");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={step === "email" ? handleSendResetLink : handleResetPassword}
      className="bg-white shadow-lg rounded-xl px-8 py-8 w-full max-w-90 relative"
    >
      <div className="flex justify-center items-center mb-8 -translate-x-3">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="p-2 text-gray-600 hover:text-gray-800"
        >
          <Lucide icon="ArrowLeft" className="size-7" />
        </button>

        <div className="text-center text-2xl font-serif font-semibold ">
          {step === "email" ? "Lupa Password" : "Reset Password"}
        </div>
      </div>

      {step === "email" && (
        <>
          <div className="text-center text-sm text-gray-600 mb-8">
            Masukkan email Anda untuk menerima kode reset password
          </div>
          <div className="flex items-center mb-6">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center mr-2">
              <div className="p-2 bg-gray-200 rounded-full">
                <Mail size={18} className="text-black" />
              </div>
            </div>
            <div className="flex-grow">
              <div className="bg-gray-200 rounded-full pl-4 pr-4 py-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-sm"
                  required
                />
              </div>
            </div>
          </div>
        </>
      )}

      {step === "reset" && (
        <>
          <div className="text-center text-sm text-gray-600 mb-8">
            Masukkan kode dari email dan password baru Anda
          </div>

          {/* Token Input */}
          <div className="mb-4">
            <div className="bg-gray-200 pl-4 pr-4 py-3 rounded-full">
              <input
                type="text"
                name="token"
                placeholder="Kode Reset dari Email"
                value={form.token}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <div className="bg-gray-200 rounded-full flex pl-4 pr-4 py-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password Baru"
                value={form.password}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-sm"
                required
              />
              <div
                className="text-black cursor-pointer ml-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full flex pl-4 pr-4 py-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                placeholder="Konfirmasi Password Baru"
                value={form.password_confirmation}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-sm"
                required
              />
              <div
                className="text-black cursor-pointer ml-2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center mb-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white w-1/2 h-10 flex justify-center items-center text-sm rounded-full hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
        >
          {loading
            ? "Loading..."
            : step === "email"
            ? "Kirim Kode Reset"
            : "Reset Password"}
        </button>
      </div>
    </form>
  );
};

export default function ForgotPasswordPage() {
  return (
    <div className="relative">
      <div
        className="fixed inset-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://wfovnuzxqrgmlgcrahdm.supabase.co/storage/v1/object/public/promigocloud/asset/etc/Registerbg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />
      <div className="relative z-10 min-h-screen flex justify-center items-center">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
