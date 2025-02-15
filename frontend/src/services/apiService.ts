import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to set Authorization header dynamically
export const setAuthToken = (token: string | null) => {
    console.log(token);
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
    } else {
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
    }
};
