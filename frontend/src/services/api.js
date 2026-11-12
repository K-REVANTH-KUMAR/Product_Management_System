
import Cookies from "js-cookie";

const API_URL = "http://localhost:3000";

export async function apiRequest(path, options = {}) {
    const token = Cookies.get("token");

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers.Authorization = "Bearer " + token;
    }

    const response = await fetch(API_URL + path, {
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}
