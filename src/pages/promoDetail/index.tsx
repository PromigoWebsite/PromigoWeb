import { Heart, Share2 } from 'lucide-react';
import dapurcokelat from '../../assets/detaildapurcokelat.jpg';
import logodapurcokelat from '../../assets/logodapurcokelat.jpg';
export default function Main(){
    return (
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Left Section */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <div className="rounded-xl shadow-md overflow-hidden p-4 bg-white">
              <img
                src={dapurcokelat}
                alt="Promo Ngabuburit"
                className="w-full h-auto rounded-lg"
              />
            </div>
    
            <div className="rounded-xl shadow-md p-4 bg-white">
              <h2 className="font-bold text-lg mb-2">Location</h2>
              <p>
                Jl. Green Ville No.4 Blok B. L, RT.5/RW.14, Duri Kepa, Kec. Kb. Jeruk,
                Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11510
              </p>
          
    

              <h2 className="font-bold text-lg">Telephone</h2>
              <p>(021) 56058618</p>
       
    
          
              <h2 className="font-bold text-lg mb-2">Follow Us</h2>
              <div className="flex gap-4 text-2xl">
                <i className="fab fa-tiktok"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-x-twitter"></i>
              </div>
            </div>
          </div>
    
          {/* Right Section */}
          <div className="md:w-1/2 bg-white rounded-xl shadow-md p-6 border border-blue-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold">Special Ngabuburit</h1>
                <p className="text-gray-700">Dapur Cokelat</p>
              </div>
              <img
                src={logodapurcokelat}
                alt="Dapur Cokelat Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
    
            <div className="flex gap-4 mb-4">
              <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm">Food and Drink</button>
              <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm">Restaurant</button>
              <span className="ml-auto text-sm text-gray-500">175k Like ♡</span>
            </div>
    
            <p className="mb-4">
              Pastinya karena Dapur Cokelat lagi mengadakan DISKON 10% SPECIAL NGABUBURIT SALE dari tanggal 6-31 Maret 2025, khusus buat kamu, Chocolaters!
            </p>
    
            <div className="mb-4">
              <h2 className="font-semibold">Validity</h2>
              <ul className="list-disc pl-5">
                <li>Valid until 31 March 2025</li>
              </ul>
            </div>
    
            <div>
              <h2 className="font-semibold mb-2">Terms and Conditions</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Berlaku di seluruh outlet & delivery point Dapur Cokelat Area Jawa dan Bali</li>
                <li>Berlaku 6 - 31 Maret 2025, setiap jam 15:00 - 19:00 WIB</li>
                <li>Promo hanya berlaku untuk produk yang telah ditentukan</li>
                <li>Promo berlaku untuk transaksi di Grabfood dan Shopeefood</li>
                <li>berlaku kelipatan pembelian</li>
                <li>Tidak dapat digabungkan dengan promo lain atau gift voucher lainnya</li>
                <li>
                  Produk Delibox yang berlaku: Black Forest 10x10, Double Chocolate 10x10, Peanut Butter Chocolate 10x10, Red Velvet 10x10, Deli Box Nissin Chocolate Cake 10x10, Deli Box Milky O Cake, Choco Monkey 10x10, Coffee Crinch Cake 10x10
                </li>
                <li>Selama persediaan masih ada</li>
              </ul>
            </div>
          </div>
        </div>
      );
}