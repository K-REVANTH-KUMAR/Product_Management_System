
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(Cookies.get("token") || null);
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user") || "null")
    );

    function login(loginToken, loginUser) {
        Cookies.set("token", loginToken);
        localStorage.setItem("user", JSON.stringify(loginUser));

        setToken(loginToken);
        setUser(loginUser);
    }

    function logout() {
        Cookies.remove("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
