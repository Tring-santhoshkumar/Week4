import React, { createContext, useEffect, useState } from 'react'

export const UserProfile = createContext();

export const UserProvider = ({children}) => {

    const [currentUserData, setCurrentUserData] = useState({name : null, email : null});

    const [ editPersonaKey, setEditPersonaKey ] = useState(null);

    const [personas, setPersonas] = useState([]);

    const SetEditPersonaKey = (index)=>{
        setEditPersonaKey(index); 
      }

    const addPersona = (persona) => {
        const updatedPersona = [...personas,persona];
        setPersonas(updatedPersona);
    }

    const deletePersona = (index) => {
        const OldPersonas = personas;
        OldPersonas.splice(index, 1);
        setPersonas(OldPersonas);
      }

      
    // const register = (userInput) => {
    //     setCurrentUserData(userInput);
    //     localStorage.setItem("currentUserData", JSON.stringify(userInput));
    // }

    // console.log(userData);

    // const login = (email, password) => {
    //     const storedUser = JSON.parse(localStorage.getItem("currentUserData"));
    //     if(storedUser.email == email && storedUser.password == password){
    //         setCurrentUserData(storedUser);
    //         return true;
    //     }
    //     return false;
    // };
    

    // const logout = () => {
    //     setCurrentUserData(null);
    //     setPersonas([]);
    //     localStorage.removeItem("personas");
    //     localStorage.removeItem("currentUserData");
    // };
    

    return (
        <UserProfile.Provider value={{currentUserData, setCurrentUserData, personas, setPersonas , addPersona, editPersonaKey, SetEditPersonaKey, deletePersona}}>
            {children}
        </UserProfile.Provider>
    );
}
