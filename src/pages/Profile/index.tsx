import { useState } from "react";
import logodapurcokelat from '../../assets/logodapurcokelat.jpg';

export default function Main() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: "Llyod Frontera",
    fullname: "Kim Suho",
    email: "Llyod@gmail.com",
    phone: "(+62) 82222222424",
    role: "User",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const toggleEdit = () => {
    // Jika saat ini sedang dalam mode edit dan akan di-save, tambahkan logic save di sini (jika perlu)
    setIsEditing(prev => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-7xl">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <img
            src={logodapurcokelat}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start">
              {formData.username}
              <span className="text-blue-500 ml-2 text-xl">✔️</span>
            </h2>
            <p className="text-gray-600 text-lg">{formData.fullname}</p>
            <p className="text-gray-400 text-sm">{formData.role}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'} text-gray-700`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Fullname</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'} text-gray-700`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'} text-gray-700`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'} text-gray-700`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-100'} text-gray-700`}
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 text-center">
          <button
            onClick={toggleEdit}
            className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-2 rounded text-lg"
          >
            {isEditing ? "Save Changes" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}
