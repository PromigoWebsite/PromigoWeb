import { useEffect, useState } from "react";
import { Brand } from "../../models/Brand";
import { BrandAPI } from "../../apis/BrandAPI";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { PromoAPI } from "../../apis/PromoAPI";
import { Promo } from "../../models/Promo";

// Komponen UI sederhana
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
    {...props}
  />
);

const Button = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function Main() {
  const [brands, setBrands] = useState<Array<Brand>>([]);
  const [newestPromos, setNewestPromos] = useState<Array<Promo>>([]);
  const [reccomendations, setReccomendations] = useState<Array<Promo>>([]);

  const fetchBrand = () => {
    BrandAPI.all()
      .then((res) => setBrands(res.data))
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data?.message || err.message);
        }
      });
  };

  const fetchNewestPromo = () => {
    PromoAPI.newest()
      .then((res) => setNewestPromos(res.data))
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data?.message || err.message);
        }
      });
  };

  const fetchReccomendation = () => {
    PromoAPI.reccomendation()
      .then((res) => setReccomendations(res.data))
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err?.response?.data?.message || err.message);
        }
      });
  };

  useEffect(() => {
    fetchBrand();
    fetchNewestPromo();
    fetchReccomendation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardContent>
          {/* Avatar + Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <img
              src="https://i.pinimg.com/originals/3c/5e/ba/3c5eba8cfbbcf741351d158b03c9c38e.jpg"
              alt="User Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">Llyod Frontera</h2>
              <p className="text-gray-600 text-lg">Kim Suho</p>
              <p className="text-sm text-gray-500">User</p>
            </div>
          </div>

          {/* Form Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Username</label>
              <Input defaultValue="Llyod Frontera" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Fullname</label>
              <Input defaultValue="Kim Suho" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
              <Input defaultValue="Llyuod@gmail.com" type="email" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
              <Input defaultValue="(+62) 82222242424" type="tel" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Role</label>
              <Input defaultValue="User" disabled />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 text-right">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
