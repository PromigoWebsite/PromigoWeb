import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Registerbg from '../../assets/Registerbg.png';

const RegisterForm = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (!form.agree) {
            alert('You must agree to the terms and conditions.');
            return;
        }
        console.log(form);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl px-8 py-6 w-full max-w-90 h-110 relative"
            >
                <div className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-gray-700">
                    ✕
                </div>

                <div className="text-center text-xl font-serif font-semibold mb-6 py-4">
                    Member Register
                </div>

                {/* Username */}
                <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center mr-2">
                        <div className="p-2 bg-gray-200 rounded-full">
                            <User size={18} className="text-black" />
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="bg-gray-200 rounded-full pl-4 pr-4 py-2">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={form.username}
                                onChange={handleChange}
                                className="bg-transparent w-full outline-none text-sm"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center mb-4">
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

                {/* Password */}
                <div className="flex items-center mb-4">
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

                {/* Confirm Password */}
                <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center mr-2">
                        <div className="p-2 bg-gray-200 rounded-full">
                            <Lock size={18} className="text-black" />
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="bg-gray-200 rounded-full flex pl-4 pr-4 py-2">
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="bg-transparent w-full outline-none text-sm"
                                required
                            />
                            <div
                                className="text-black cursor-pointer"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Agreement */}
                <div className="flex items-center text-xs mb-6 px-4 py-1">
                    <input
                        type="checkbox"
                        name="agree"
                        checked={form.agree}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <div>
                        I Agree{' '}
                        <div
                            className="text-blue-600 hover:underline inline cursor-pointer"
                            onClick={() => setShowTerms(true)}
                        >
                            Terms & Conditions
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-600 text-white w-1/3 h-8 flex justify-center py-1 text-sm rounded-full hover:bg-green-700 transition"
                    >
                        Sign In
                    </button>
                </div>
            </form>

            {/* Modal Terms & Conditions */}
            {showTerms && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50">
                    <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg relative">
                        <div
                            className="absolute top-2 right-3 text-gray-500 hover:text-black cursor-pointer"
                            onClick={() => setShowTerms(false)}
                        >
                            ✕
                        </div>
                        <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
                        <div className="text-sm max-h-120 overflow-y-auto space-y-2">
                            <p><strong>1. Acceptance of Terms</strong><br />Dengan mendaftar, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini.</p>
                            <p><strong>2. Data Pribadi</strong><br />Informasi yang Anda berikan akan digunakan untuk keperluan akun dan komunikasi resmi.</p>
                            <p><strong>3. Tanggung Jawab Pengguna</strong><br />Anda bertanggung jawab menjaga kerahasiaan akun dan tidak menggunakan identitas orang lain.</p>
                            <p><strong>4. Keamanan</strong><br />Kami berusaha menjaga keamanan, tetapi tidak bertanggung jawab atas penyalahgunaan oleh pihak ketiga.</p>
                            <p><strong>5. Perubahan Syarat</strong><br />Kami dapat mengubah Syarat & Ketentuan kapan saja dan akan memberitahukan melalui platform kami.</p>
                            <p><strong>6. Penutupan Akun</strong><br />Kami berhak menangguhkan atau menghapus akun jika terjadi pelanggaran.</p>
                            <p><strong>7. Hukum yang Berlaku</strong><br />Syarat ini diatur oleh hukum di Indonesia.</p>
                        </div>
                    </div>
                </div>
            )}
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
                    backgroundImage: `url(${Registerbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1
                }}
            />

            {/* Content Layer */}
            <div className="relative z-10 min-h-screen flex justify-center items-center">
                <RegisterForm />
            </div>
        </div>
    );
}
