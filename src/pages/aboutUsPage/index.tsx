export default function Main() {
  const members = [
    {
      name: "Arvin Hasim",
      url: "https://wfovnuzxqrgmlgcrahdm.supabase.co/storage/v1/object/public/promigocloud/member/PhotoArvin.jpg",
    },
    {
      name: "Candra Wijaya",
      url: "https://wfovnuzxqrgmlgcrahdm.supabase.co/storage/v1/object/public/promigocloud/member/PhotoCandra.jpg",
    },
    {
      name: "Fransisco",
      url: "https://wfovnuzxqrgmlgcrahdm.supabase.co/storage/v1/object/public/promigocloud/member/PhotoSisco.jpg",
    },
    {
      name: "Jason Francesco Tay",
      url: "https://wfovnuzxqrgmlgcrahdm.supabase.co/storage/v1/object/public/promigocloud/member/PhotoJason.jpg",
    },
  ];
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        About Us
      </h1>

      {/* Our Mission */}
      <div className="bg-[#6a8a92] text-white p-6 rounded-lg mb-8 shadow">
        <h2 className="text-2xl font-semibold mb-2">Misi</h2>
        <p>
          Kami percaya dengan hadirnya promigo, kami dapat membantu para
          mahasiswa Binus untuk mendapatkan informasi seputaran promo pada badan
          usaha yang berlokasi di sekitar Binus Kemanggisan dengan memberikan
          update seputaran promo dengan cepat, lengkap, dan akurat.
        </p>
      </div>

      {/* Our Vision */}
      <div
        className="p-6 rounded-lg mb-8 shadow relative overflow-hidden"
        style={{
          backgroundImage: `url('https://wfovnuzxqrgmlgcrahdm.supabase.co/storage/v1/object/public/promigocloud/asset/aboutus/pexels-galerieb-1209982.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100px",
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-55 rounded-lg"></div>

        {/* Content positioned on top of background */}
        <div className="relative z-10 text-white">
          <h2 className="text-2xl font-semibold mb-2">Visi</h2>
          <div className="flex flex-col">
            <p className="text-lg">
              Kami memiliki visi untuk selalu menjadi yang terdepan dalam
              membantu para mahasiswa Binus menemukan Promo terbaik di sekitaran
              Binus Kemanggisan.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white border border-gray-300 p-6 rounded-lg mb-8 shadow">
        <h2 className="text-2xl font-semibold mb-2 text-[#6a8a92]">
          Nilai kami
        </h2>
        <p>
          Kami mengedepankan nilai kejujuran, baik itu pada promo-promo yang
          kami cantumkan, maupun pada cara kerja kami. Semua agar para user kami
          puas
        </p>
      </div>

      {/* Team Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {members.map((member, index) => (
          <div key={index} className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden">
              <img
                src={member.url}
                alt="Team Member"
                className="w-full h-full object-cover rounded-md mx-auto"
              />
            </div>

            <p className="font-medium">{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
