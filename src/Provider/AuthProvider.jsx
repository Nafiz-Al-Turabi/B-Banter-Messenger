import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../Axios/AxiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await axiosInstance.get('/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data[0]);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const signup = async (email, password) => {
        try {
            const response = await axiosInstance.post('/signup', { email, password });
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/login', { email, password });
            const { token, userData } = response.data;

            localStorage.setItem('token', token);
            setUser(userData);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
