import { LogOut, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

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
          className="flex sm:hidden p-1 border text-gray-600 border-none rounded cursor-pointer hover:bg-gray-700 hover:text-white "
        >
          <Menu />
        </button>

        <ul className="hidden sm:flex gap-6 items-center">
          <Link
            to="/home"
            className={`p-[3px] px-2 rounded hover:bg-primaryHover hover:text-white cursor-pointer ${
              location.pathname === "/home"
                ? "bg-primary hover:bg-primaryHover text-white"
                : ""
            } `}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`p-[3px] px-2 rounded hover:bg-primary hover:text-white cursor-pointer ${
              location.pathname === "/products"
                ? "bg-primary hover:bg-primaryHover text-white"
                : ""
            } `}
          >
            Product
          </Link>

          <li className="p-[3px] px-2 rounded hover:bg-primary text-red-500 hover:text-white cursor-pointer">
            <button className="flex items-center gap-2 cursor-pointer">
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
