import { useState } from 'react';

const dummyProducts = new Array(6).fill({
  title: 'Promo Hokken Payday Deals Rp 50 Ribu-an/Ongkir',
  image: 'https://via.placeholder.com/150',
  discount: '50%',
  brand: 'Hokben',
});

export default function PromoPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Newest');

  return (
    <div className="flex gap-4 p-4">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <h3 className="font-semibold">Jenis Promo</h3>
          <div className="space-y-1 mt-2">
            <label><input type="checkbox" /> Diskon</label><br />
            <label><input type="checkbox" /> Cashback</label><br />
            <label><input type="checkbox" /> Gratis Ongkir</label>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Category</h3>
          <div className="space-y-1 mt-2">
            <label><input type="checkbox" /> Food</label><br />
            <label><input type="checkbox" /> Drink</label><br />
            <label><input type="checkbox" /> Elektronik</label>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Brand</h3>
          <input type="range" className="w-full" />
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Diskon</h3>
          <input type="range" className="w-full" />
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Price</h3>
          <input type="range" className="w-full" />
        </div>
        <button className="text-blue-600 underline mt-4">Return To Top</button>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Search + Sort */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-1/3"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Newest</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dummyProducts.map((product, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
              <img src={product.image} alt="promo" className="w-full h-40 object-cover rounded mb-2" />
              <p className="text-sm font-semibold text-red-500">{product.discount}</p>
              <h3 className="text-lg font-bold mt-1">{product.title}</h3>
              <p className="text-gray-600 text-sm">{product.brand}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
