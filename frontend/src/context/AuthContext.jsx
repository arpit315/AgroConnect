import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('agro_user');
        const token = localStorage.getItem('agro_token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const res = await api.post('/login', credentials);
        const { user, token, access_token } = res.data;
        
        // Handle different possible key names from backend
        const authToken = access_token || token;
        
        setUser(user);
        localStorage.setItem('agro_user', JSON.stringify(user));
        localStorage.setItem('agro_token', authToken);
        return user;
    };

    const register = async (userData) => {
        const res = await api.post('/register', userData);
        const { user, token, access_token } = res.data;
        
        const authToken = access_token || token;
        
        setUser(user);
        localStorage.setItem('agro_user', JSON.stringify(user));
        localStorage.setItem('agro_token', authToken);
        return user;
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (err) {
            console.error('Logout failed on server, clearing locale state anyway', err);
        } finally {
            setUser(null);
            localStorage.removeItem('agro_user');
            localStorage.removeItem('agro_token');
        }
    };

    const updateProfile = async (data) => {
        const res = await api.patch('/profile', data);
        setUser(res.data);
        localStorage.setItem('agro_user', JSON.stringify(res.data));
        return res.data;
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
