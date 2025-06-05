import { useEffect, useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../../apis/api';
import axios from '../../apis/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../context';

const LoginForm = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const navigate = useNavigate();
    const { isAuth, refreshUser, loading } = useUser();

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.get(`${api.BaseUrl}/sanctum/csrf-cookie`);
        await axios.post('/login',(form))
        .then(()=>{
            toast.success("Login Berhasil");
            refreshUser();
            navigate("/");
        })
        .catch((error)=>{
            toast.error(error.response?.data?.message || error.message);
        })
        
       
    };

    useEffect(() => {
      if (isAuth && !loading) {
        toast.error("Kamu sudah pernah login");
        navigate("/");
      }
    }, [isAuth]);
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl px-8 py-8 w-full max-w-90 h-130 relative"
            >
                <div className="text-center text-2xl font-serif font-semibold mb-8 py-4">
                    Selamat Datang Kembali!
                </div>

                <div className="text-center text-sm text-gray-600 mb-8">
                    Tolong masukkan data untuk melakukan login
                </div>

                {/* Username */}
                <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center mr-2">
                        <div className="p-2 bg-gray-200 rounded-full">
                            <User size={18} className="text-black" />
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="bg-gray-200 rounded-full pl-4 pr-4 py-2">
                            <input
                                type="text"
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

                {/* Password */}
                <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center mr-2">
                        <div className="p-2 bg-gray-200 rounded-full">
                            <Lock size={18} className="text-black" />
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="bg-gray-200 rounded-full flex pl-4 pr-4 py-2">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="bg-transparent w-full outline-none text-sm"
                                required
                            />
                            <div
                                className="text-black cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}  
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex justify-between items-center mb-8 px-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={form.rememberMe}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="text-sm text-gray-600">Ingat saya</label>
                    </div>
                    <div onClick={()=>navigate('/forgot')} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        Lupa Password?
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mb-6">
                    <button
                        type="submit"
                        className="bg-green-600 text-white w-1/2 h-10 flex justify-center items-center text-sm rounded-full hover:bg-green-700 transition cursor-pointer"
                    >
                        Sign In
                    </button>
                </div>

                {/* Register Link */}
                <div className="text-center text-sm text-gray-600">
                    Belum mempunyai akun?{' '}
                    <a onClick={()=>{navigate('/register')}} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        Daftar disini
                    </a>
                </div>
                <div className="text-center text-sm text-gray-600">
                Ingin pindah ke halaman utama?{' '}
                    <button onClick={()=>{navigate('/')}} className="text-blue-600 hover:text-blue-800">
                        Tekan disini
                    </button>
                </div>
            </form>
        </>
    );
};

export default function Main() {
    return (
      <div className="relative">
        {/* Background Layer */}
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

        {/* Content Layer */}
        <div className="relative z-10 min-h-screen flex justify-center items-center">
          <LoginForm />
        </div>
      </div>
    );
}
