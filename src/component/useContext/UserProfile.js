import React, { createContext, useEffect, useState } from 'react'

export const UserProfile = createContext();

export const UserProvider = ({children}) => {

    const [currentUserData, setCurrentUserData] = useState({name : null, email : null});

    const [ editPersonaKey, setEditPersonaKey ] = useState(null);

    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        if(currentUserData.email != null){
            const data = JSON.parse(localStorage.getItem(currentUserData.email));
            const updateData = {
                ...data, personas : personas
            };
            localStorage.setItem(currentUserData.email,JSON.stringify(updateData));
        }
    },[personas,currentUserData.email]);

    const SetEditPersonaKey = (index)=> {
        setEditPersonaKey(index);
      }

    const updateEdit = (datas) => {
        setPersonas(prevData=>{
            const data = [...prevData];
            data[editPersonaKey] =  datas;
            return data;
        })
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
        <UserProfile.Provider value={{currentUserData, setCurrentUserData, personas, setPersonas , addPersona, editPersonaKey, SetEditPersonaKey, deletePersona, updateEdit}}>
            {children}
        </UserProfile.Provider>
    );
}
