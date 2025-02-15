import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../services/apiService";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // 🔥 Redirect authenticated users away from login page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.post("/api/login", values);
      if (response.data && response.data.access_token) {
        const token = response.data.access_token;
        const user = response.data.user; // Extract user details

        toast.success("Login successful!");
        console.log("User received:", user);

        setAuthToken(token);
        localStorage.setItem("token", token); // Store token
        localStorage.setItem("user", JSON.stringify(user)); // Store user data

        navigate("/home", { replace: true }); // Redirect after successful login
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white rounded p-6 w-[400px] shadow-2xl border border-gray-200">
        <h2 className="text-center text-2xl font-bold">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="mt-8">
          {/* Email Input */}
          <div className="mb-6 relative">
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="peer block border w-full rounded bg-white px-3 pt-4 pb-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-primary sm:text-sm"
            />
            <label
              className={`absolute left-2 transition-all bg-white px-1 ${
                values.email
                  ? "top-[-5px] text-xs text-primary"
                  : "top-4 text-sm text-gray-600"
              }`}
            >
              Email address
            </label>
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <input
              type="password"
              name="password"
              required
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="peer block border w-full rounded bg-white px-3 pt-4 pb-2 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-primary sm:text-sm"
            />
            <label
              className={`absolute left-2 transition-all bg-white px-1 ${
                values.password
                  ? "top-[-5px] text-xs text-primary"
                  : "top-4 text-sm text-gray-600"
              }`}
            >
              Password
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col items-center">
            <button
              type="submit"
              className="w-full rounded bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-primaryHover focus:outline-primary"
            >
              Login
            </button>

            {/* OR Separator */}
            <div className="flex items-center w-full my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm font-medium">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <Link
              to="/register"
              className="flex w-full justify-center rounded px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
