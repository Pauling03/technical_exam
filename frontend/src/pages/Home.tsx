import Header from "../layouts/Header";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/apiService"; // Ensure correct path

const getUser = async (setUser: (user: any) => void) => {
  try {
    // Fetch fresh data from the backend
    const response = await api.get("/api/user");    
    setUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data)); // Store fresh user data
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Failed to fetch user details");
  }
};

const Home = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser(setUser);
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome, {user?.name || "Guest"}!
          </h1>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {user?.email || "N/A"}
            </p>
            {user?.mobile && (
              <p className="text-gray-600">
                <span className="font-semibold">Mobile:</span> {user?.mobile}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
