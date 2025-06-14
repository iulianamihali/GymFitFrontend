import React from 'react';
import {createContext} from 'react';
import { useState, ReactNode } from 'react';
import {LoginResponse} from "../pages/Home/types";
import Cookies from "js-cookie";
interface ApplicationContextType {
    user: LoginResponse | null;
    updateUser: (user: LoginResponse | null) => void;

}

export const ApplicationContext = createContext<ApplicationContextType|null>(null);

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<LoginResponse | null>(() => {
        const cookieUser = Cookies.get('user');
        return cookieUser ? JSON.parse(cookieUser) : null;
    });
    const updateUser = (newUser: LoginResponse | null) => {
        setUser(newUser);
    };

    return (
        <ApplicationContext.Provider value={{user, updateUser}}>
            {children}
        </ApplicationContext.Provider>
    );

};
