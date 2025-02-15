import { LogOut, Menu, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/apiService";
import { useEffect, useState } from "react";

const logout = async (navigate: any) => {
  try {
    await api.post("/api/logout"); // Call Laravel API to revoke token
  } catch (error: any) {
    console.error("Logout failed:", error);
    toast.error("Failed to log out. Please try again.");
  }

  // Clear local storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  toast.success("Logged out successfully!");
  navigate("/login", { replace: true }); // Redirect to login page
};

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/user"); // Adjust this to your Laravel API endpoint
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data)); // Keep localStorage updated
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("user"); // Clear if invalid
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="border-b-1 border-b-gray-300 shadow">
      <div className="container flex items-center justify-between p-3 mx-auto">
        <div className="flex gap-4 items-center flex-shrink-0">
          <Link to="/">
            <span className="font-bold text-xl text-primary font-mono">
              Sprobe-Test
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="flex sm:hidden p-1 border text-gray-600 border-none rounded cursor-pointer hover:bg-gray-700 hover:text-white"
        >
          <Menu />
        </button>

        <ul className="hidden sm:flex gap-6 items-center">
          <Link
            to="/home"
            className={`p-[3px] px-2 rounded hover:bg-primary hover:text-white cursor-pointer ${
              location.pathname === "/home"
                ? "bg-primary hover:bg-primaryHover text-white"
                : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`p-[3px] px-2 rounded hover:bg-primary hover:text-white cursor-pointer ${
              location.pathname === "/products"
                ? "bg-primary hover:bg-primaryHover text-white"
                : ""
            }`}
          >
            Product
          </Link>

          {/* Show user info */}
          {user && (
            <Link
              to="/profile"
              className={`p-[3px] flex align-center rounded hover:bg-primary hover:text-white cursor-pointer ${
                location.pathname === "/profile"
                  ? "bg-primary hover:bg-primaryHover text-white"
                  : ""
              }`}
            >
              <User size={18} />
              <span className="font-medium">{user.name}</span>
            </Link>
          )}

          <li className="p-[3px] px-2 rounded hover:bg-primary text-red-500 hover:text-white cursor-pointer">
            <button
              onClick={() => logout(navigate)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={18} />
              <span className="hidden md:flex">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
