import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api, setAuthToken } from "../services/apiService";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    name: "",
    password_confirmation: "",
    password: "",
  });

  // 🔥 Redirect authenticated users away from login page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await api.post("/api/register", values);
      toast.success("Registration successful!");
      setAuthToken(response.data.data.token);
      navigate("/home");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="h-screen">
      <div className="h-full flex items-center justify-center">
        <div className="bg-white rounded p-6 w-[400px] shadow-2xl border border-gray-200">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold">
              Create New Account
            </h2>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit}>
                {/* Username Input */}
                <div className="mb-6 relative">
                  <input
                    type="text"
                    name="username"
                    required
                    autoComplete="username"
                    value={values.username}
                    onChange={(e) =>
                      setValues({ ...values, username: e.target.value })
                    }
                    className="peer block border w-full rounded bg-white px-3 pt-4 pb-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder-transparent focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm"
                  />
                  <label
                    htmlFor="username"
                    className={`absolute left-2 transition-all duration-200 bg-white px-1
                  ${
                    values.username
                      ? "top-[-5px] text-xs text-primary"
                      : "top-4 text-sm text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-5px] peer-focus:text-xs peer-focus:text-primary"
                  }`}
                  >
                    Username
                  </label>
                </div>

                {/* Name Input */}
                <div className="mb-6 relative">
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                    className="peer block border w-full rounded bg-white px-3 pt-4 pb-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder-transparent focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm"
                  />
                  <label
                    htmlFor="username"
                    className={`absolute left-2 transition-all duration-200 bg-white px-1
                  ${
                    values.name
                      ? "top-[-5px] text-xs text-primary"
                      : "top-4 text-sm text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-5px] peer-focus:text-xs peer-focus:text-primary"
                  }`}
                  >
                    Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="mb-6 relative">
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    className="peer block border w-full rounded bg-white px-3 pt-4 pb-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder-transparent focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-2 transition-all duration-200 bg-white px-1
                  ${
                    values.email
                      ? "top-[-5px] text-xs text-primary"
                      : "top-4 text-sm text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-5px] peer-focus:text-xs peer-focus:text-primary"
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
                    value={values.password}
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    required
                    className="peer block border w-full rounded bg-white px-3 pt-4 pb-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder-transparent focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm"
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-2 transition-all duration-200 bg-white px-1
                  ${
                    values.password
                      ? "top-[-5px] text-xs text-primary"
                      : "top-4 text-sm text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-5px] peer-focus:text-xs peer-focus:text-primary"
                  }`}
                  >
                    Password
                  </label>
                </div>

                {/* Password  Confirmation Input */}
                <div className="mb-6 relative">
                  <input
                    type="password"
                    name="password_confirmation"
                    value={values.password_confirmation}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        password_confirmation: e.target.value,
                      })
                    }
                    required
                    className="peer block border w-full rounded bg-white px-3 pt-4 pb-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder-transparent focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm"
                  />
                  <label
                    htmlFor="password_confirmation"
                    className={`absolute left-2 transition-all duration-200 bg-white px-1
                  ${
                    values.password_confirmation
                      ? "top-[-5px] text-xs text-primary"
                      : "top-4 text-sm text-gray-600 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-5px] peer-focus:text-xs peer-focus:text-primary"
                  }`}
                  >
                    Confirm Password
                  </label>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center flex-col">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded cursor-pointer bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primaryHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Create
                  </button>

                  {/* OR Separator */}
                  <div className="flex items-center w-full my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm font-medium">
                      Or
                    </span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <Link
                    to="/login"
                    className="flex w-full justify-center rounded px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
