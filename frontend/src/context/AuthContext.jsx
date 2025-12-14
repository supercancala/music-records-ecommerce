import React, { createContext, useContext, useState, Children } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('vinyl_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(localStorage.getItem('vinyl_token') || null);

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const register = async (firstName, lastName, email, password, password_confirmation) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                password_confirmation
            });

            const { user, token } = response.data;

            setToken(token);
            setUser(user);

            localStorage.setItem('vinyl_user', JSON.stringify(user));
            localStorage.setItem('vinyl_token', token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return { success : true };
        } catch (error) {
            console.error('Error registering user', error);
            return { success : false, message : error.response?.data?.message }
        }
    } 

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                'email' : email,
                'password' : password
            });

            const { token, user } = response.data;

            setToken(token);
            setUser(user);

            localStorage.setItem('vinyl_user', JSON.stringify(user)); 
            localStorage.setItem('vinyl_token', token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return { success: true };
        } catch (error){
            console.error("Login Failed", error);
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('vinyl_user');
        localStorage.removeItem('vinyl_token');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);