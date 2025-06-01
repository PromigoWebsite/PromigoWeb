import starbucksLogo from "../../assets/Starbucks.png";
import cappuccino from "../../assets/Capucino.png";
import americano from "../../assets/Americano.png";
import hazelnutFrappuccino from "../../assets/HazelnutFrappucino.png";
import milkChocolate from "../../assets/MilkChocolate.png";
import hokbenPromo from "../../assets/HokbenFavoritepage.png";

const BrandPage = () => {
    const brand = {
        logo: starbucksLogo,
        name: 'STARBUCKS',
        subtitle: '36000+ toko di 84 negara',
        description:
            'Didirikan tahun 1971 di Seattle, Starbucks adalah perusahaan global kopi dengan lebih dari 36.000 toko di 84 negara. Dikenal sebagai tempat berkumpul yang nyaman, Starbucks menyajikan kopi premium, minuman khas, dan makanan segar berkualitas.',
        values: [
            { icon: '☕', title: 'Craft', desc: 'Kualitas dan detail terbaik di setiap produk.', bg: 'bg-yellow-100' },
            { icon: '❤️', title: 'Beloging', desc: 'Hangat, transparan, dan menghargai semua orang.', bg: 'bg-red-100' },
            { icon: '💡', title: 'Inovasi', desc: 'Terus berinovasi untuk kepuasan pelanggan.', bg: 'bg-yellow-200' },
            { icon: '🎉', title: 'Joy', desc: 'Merayakan kebahagiaan kecil setiap hari.', bg: 'bg-blue-200' },
        ],
        products: [
            { name: 'Cappuccino', image: cappuccino },
            { name: 'Americano', image: americano },
            { name: 'Hazelnut Frappuccino', image: hazelnutFrappuccino },
            { name: 'Milk Chocolate', image: milkChocolate },
        ],
        promos: Array(4).fill({
            image: hokbenPromo,
            desc: 'Promo Holaben Payday Deals Rp 50 Ribuan/Orang',
            likes: 100,
        }),
    };

    return (
        <div className="max-w-screen-xl mx-auto p-6 space-y-16">
            {/* Header */}
            <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                    <img src={brand.logo} alt="Brand Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-3xl font-bold mt-6">{brand.name}</div>
                <div className="text-gray-700 mt-2">{brand.subtitle}</div>
            </div>

            {/* Tentang */}
            <div className="border rounded-lg p-8 bg-white shadow">
                <div className="text-xl font-bold mb-4">Tentang {brand.name}</div>
                <div className="text-gray-700 leading-relaxed">{brand.description}</div>
            </div>

            {/* Nilai dan Misi */}
            <div className="border rounded-lg p-8 bg-white shadow">
                <div className="text-xl font-bold mb-8 text-center">Nilai dan Misi</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {brand.values.map((value, index) => (
                        <div key={index} className={`${value.bg} p-6 rounded-lg`}>
                            <div className="text-3xl">{value.icon}</div>
                            <div className="font-semibold mt-3">{value.title}</div>
                            <div className="text-sm text-gray-600 mt-2">{value.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Produk Unggulan */}
            <div className="border rounded-lg p-8 bg-white shadow">
                <div className="text-xl font-bold mb-8 text-center">Produk Unggulan</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                    {brand.products.map((product, index) => (
                        <div key={index}>
                            <img src={product.image} alt={product.name} className="rounded-lg shadow-md" />
                            <div className="mt-3 font-medium">{product.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* List Promo */}
            <div className="border rounded-lg p-8 bg-white shadow">
                <div className="text-xl font-bold mb-8 text-center">List Promo</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {brand.promos.map((promo, index) => (
                        <div
                            key={index}
                            className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition h-full"
                        >
                            <img src={promo.image} alt="Promo" className="rounded w-full h-64 object-cover mb-3" />
                            <div className="text-sm text-gray-700">{promo.desc}</div>
                            <div className="flex items-center justify-center gap-2 text-gray-500 mt-2 text-sm">
                                <span>❤️</span>
                                <span>{promo.likes} suka</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <button className="px-8 py-3 border border-gray-500 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                        More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrandPage;
