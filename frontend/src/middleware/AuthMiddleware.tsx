import { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthMiddleware = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default AuthMiddleware;
