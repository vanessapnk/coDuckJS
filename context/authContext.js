// context/authContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
        // Check if user is already authenticated (e.g., from localStorage)
        const storedUser = localStorage.getItem("authenticatedUser");
        if (storedUser) {
            setAuthenticatedUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (user) => {
        setAuthenticatedUser(user);
        // Persist the authentication state in localStorage
        localStorage.setItem("authenticatedUser", JSON.stringify(user));
    };

    const logout = () => {
        setAuthenticatedUser(null);
        // Remove the authentication state from localStorage
        localStorage.removeItem("authenticatedUser");
    };

    return (
        <AuthContext.Provider value={{ authenticatedUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
