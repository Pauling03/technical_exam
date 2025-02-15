import { useEffect, useState } from "react";
import { api } from "../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import { CircularProgress } from "@mui/material";
import { AlignCenter } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  // Fetch user info from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/user"); // Adjust endpoint as needed
        const userData = response.data;

        setUser(userData);
        setFormData({
          id: userData.id || "",
          name: userData.name || "",
          email: userData.email || "",
          username: userData.username || "",
          password: "",
          password_confirmation: "",
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put(`/api/users/${formData.id}`, formData);
      toast.success(response.data.message);
      setUser(response.data.user);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed.");
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>

        {loading ? (
          <CircularProgress size={120} className="mx-auto block" />
        ) : user ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border rounded w-full p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="border rounded w-full p-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="border rounded w-full p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  })
                }
                className="border rounded w-full p-2"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white rounded py-2 hover:bg-primaryHover"
            >
              Update Profile
            </button>
          </form>
        ) : (
          <p>User not found.</p>
        )}
      </div>
    </>
  );
};

export default Profile;
