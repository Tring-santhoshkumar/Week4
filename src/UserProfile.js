import React, { createContext, useEffect, useState } from 'react'

export const UserProfile = createContext();

export const UserProvider = ({children}) => {

    const [currentUserData, setCurrentUserData] = useState();

    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem("currentUserData"));
        const storedPersonas = JSON.parse(localStorage.getItem("personas")) || [];
        if(savedUsers) setCurrentUserData(savedUsers);
        setPersonas(storedPersonas);
    }, [])

    const register = (userInput) => {
        setCurrentUserData(userInput);
        localStorage.setItem("currentUserData", JSON.stringify(userInput));
    }

    // console.log(userData);

    const login = (email, password) => {
        const storedUser = JSON.parse(localStorage.getItem("currentUserData"));
        if(storedUser.email == email && storedUser.password == password){
            setCurrentUserData(storedUser);
            return true;
        }
        return false;
    };

    const addPersona = (persona) => {
        const updatedPersona = [...personas,persona];
        setPersonas(updatedPersona);
        localStorage.setItem("personas",JSON.stringify(updatedPersona));
    }

    const logout = () => {
        setCurrentUserData(null);
        setPersonas([]);
        localStorage.removeItem("personas");
        localStorage.removeItem("currentUserData");
    };
    

    return (
        <UserProfile.Provider value={{currentUserData, personas , register, login, logout, addPersona}}>
            {children}
        </UserProfile.Provider>
    );
}
