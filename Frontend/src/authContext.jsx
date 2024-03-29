import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authReducer from './utils/authReducer'

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        token: null,
        email: null,
    }, () => {
        // Initialize state from local storage
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (token && email) {
            return {
                isAuthenticated: true,
                token: token,
                email: email,
            };
        }

        return {
            isAuthenticated: false,
            token: null,
            email: null,
        };
    });

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within an AuthProvider');
    }
    return context;
};