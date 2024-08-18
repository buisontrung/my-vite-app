import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Tạo context
interface AuthContextProps {
    user: User | null;
    setUser: (user: User | null) => void; // Thêm phương thức cập nhật người dùng
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface User {
    Id: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
    "JWTID"?: string;
    "FirstName"?: string;
    "LastName"?: string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
    exp: number | undefined;
    iss: string;
    aud: string;
}

// Tạo component provider
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Hàm lấy thông tin người dùng từ token
    const loadUserFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token) as User;
                setUser(decodedUser);
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    };

    // Hàm đăng xuất
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Lấy thông tin người dùng khi render lần đầu
    useEffect(() => {
        loadUserFromToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
