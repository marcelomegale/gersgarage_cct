import React, {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle initial check

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('userData');
        if (token) {
            if(user) setUser(JSON.parse(user));
        }
        setLoading(false);
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};
