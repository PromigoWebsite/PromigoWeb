import { useState } from 'react';
import Lucide from '../../basic_components/Lucide';

export default function AddPromoPage() {
    // Placeholder state for form fields
    const [promoName, setPromoName] = useState('');
    const [promoType, setPromoType] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [promoStart, setPromoStart] = useState('');
    const [promoEnd, setPromoEnd] = useState('');
    const [promoProductType, setPromoProductType] = useState('');
    const [terms, setTerms] = useState<string[]>([]);
    const [newTerm, setNewTerm] = useState('');

    const handleAddTerm = () => {
        if (newTerm.trim()) {
            setTerms([...terms, newTerm.trim()]);
            setNewTerm('');
        }
    };

    const handleRemoveTerm = (index: number) => {
        setTerms(terms.filter((_, i) => i !== index));
    };

    const handleSavePromo = () => {
        const promoData = {
            promoName,
            promoType,
            description,
            status,
            promoStart,
            promoEnd,
            promoProductType,
            terms,
        };
        console.log('Promo Data:', promoData);
        // TODO: Add backend API call here to save promoData
    };

    return (
        <div className="min-h-screen bg-[#fafbfc] py-8 px-8">
            <div className="">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold font-serif">Buat Promo Baru</h2>
                        <div className="text-gray-500 text-sm font-serif mt-1">Anda akan menambahkan promo baru ke situs web</div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                        <Lucide icon="X" className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="promoName">Nama Promo</label>
                            <input type="text" id="promoName" className="w-full border border-gray-300 rounded-[30px] px-3 py-2 focus:outline-none focus:border-[#6b8c97]" value={promoName} onChange={(e) => setPromoName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="promoType">Jenis Promo</label>
                            <select id="promoType" className="w-full border border-gray-300 rounded-[30px] px-3 py-2 focus:outline-none focus:border-[#6b8c97]" value={promoType} onChange={(e) => setPromoType(e.target.value)}>
                                <option value="Diskon">Diskon</option>
                                <option value="Cashback">Cashback</option>
                                <option value="Gratis Ongkir">Gratis Ongkir</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">Deskripsi</label>
                            <textarea id="description" rows={6} className="w-full border border-gray-300 rounded-[30px] px-3 py-2 focus:outline-none focus:border-[#6b8c97]" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Media</label>
                            <div className="border border-gray-300 rounded-[30px] flex items-center justify-center h-32 cursor-pointer hover:bg-gray-50">
                                <Lucide icon="Plus" className="w-10 h-10 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="status">Status</label>
                            <input type="text" id="status" className="w-full border border-gray-300 rounded-[30px] px-3 py-2 focus:outline-none focus:border-[#6b8c97]" value={status} onChange={(e) => setStatus(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="promoStart">Tanggal Mulai Promo</label>
                                <input type="date" id="promoStart" className="w-full border border-gray-300 rounded-[30px] px-3 py-2 focus:outline-none focus:border-[#6b8c97]" value={promoStart} onChange={(e) => setPromoStart(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="promoEnd">Tanggal Akhir Promo</label>
                                <input type="date" id="promoEnd" className="w-full border border-gray-300 rounded-[30px] px-3 py-2 focus:outline-none focus:border-[#6b8c97]" value={promoEnd} onChange={(e) => setPromoEnd(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="promoProductType">Jenis Produk Promo</label>
                            <input type="text" id="promoProductType" className="w-full border border-gray-300 rounded-[30px] px-3 py-2 focus:outline-none focus:border-[#6b8c97]" value={promoProductType} onChange={(e) => setPromoProductType(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Syarat dan Ketentuan</label>
                            <div className="border border-gray-300 rounded-[30px] p-4 flex flex-wrap">
                                {terms.map((term, index) => (
                                    <div key={index} className="flex justify-between items-start bg-gray-100 rounded-[30px] px-3 py-2 mb-2 w-full">
                                        <div className="flex-1 mr-2" style={{ wordBreak: 'break-word' }}>{term}</div>
                                        <button onClick={() => handleRemoveTerm(index)} className="text-gray-500 hover:text-gray-700">
                                            <Lucide icon="X" className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <div className="flex flex-col w-full mt-2">
                                    <input type="text" className="w-full border border-gray-300 rounded-[30px] px-3 py-2 focus:outline-none focus:border-[#6b8c97] mb-2" placeholder="Tambahkan syarat dan ketentuan..." value={newTerm} onChange={(e) => setNewTerm(e.target.value)} />
                                    <button onClick={handleAddTerm} className="bg-[#a5d6a7] text-gray-800 font-semibold px-4 py-2 rounded-[30px] hover:bg-[#8bc34a] w-full">Tambah</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-6">
                    <button className="bg-[#6b8c97] text-white font-bold text-lg px-8 py-2 rounded-[30px] shadow hover:bg-[#466273] transition-all mr-4" onClick={handleSavePromo}>Simpan Promo</button>
                    <button className="bg-gray-300 text-gray-800 font-bold text-lg px-8 py-2 rounded-[30px] shadow hover:bg-gray-400 transition-all">Batal</button>
                </div>
            </div>
        </div>
    );
}
