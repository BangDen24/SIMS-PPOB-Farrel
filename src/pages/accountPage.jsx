import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfileImageMutation,
} from "../store/services/profileApi";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { User, Mail, Edit2, AtSign, LogOut } from "lucide-react";

const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });
  useState(() => {
    if (profile?.data) {
      setFormData({
        first_name: profile.data.first_name,
        last_name: profile.data.last_name,
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({
        first_name: profile.data.first_name,
        last_name: profile.data.last_name,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(formData).unwrap();
      alert("Profile berhasil diupdate!");
      setIsEditing(false);
    } catch (error) {
      alert(error?.data?.message || "Gagal update profile");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Format file harus JPEG atau PNG");
      return;
    }
    if (file.size > 100 * 1024) {
      alert("Ukuran file maksimal 100KB");
      return;
    }
    try {
      await updateProfileImage(file).unwrap();
      alert("Foto profile berhasil diupdate!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(error?.data?.message || "Gagal update foto profile");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      dispatch(logout());
      navigate("/login");
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] p-8 ">
      <div className="max-w-2xl mx-auto">
        <div className=" rounded-lg p-8 mb-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src={profile?.data?.profile_image || "/profile.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors"
              >
                <Edit2 size={16} />
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <h1 className="text-2xl font-bold mb-1">
              {profile?.data?.first_name} {profile?.data?.last_name}
            </h1>
            <p className="text-gray-600">{profile?.data?.email}</p>
          </div>
        </div>

        <div className=" rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  value={profile?.data?.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Depan
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Belakang
              </label>
              <div className="relative">
                <AtSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {!isEditing ? (
              <button
                onClick={handleEditToggle}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleEditToggle}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Batalkan
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={updating}
                  className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 disabled:bg-gray-400 transition-colors"
                >
                  {updating ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full  border-2 border-red-500 text-red-500 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
