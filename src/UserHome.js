import React, { useContext, useState , useEffect} from 'react'
import logo from './assets/tringapps-copy-2.svg';
import { UserProfile } from './UserProfile';
// import image from './Update';
import defaultImage from './Update'
import { useNavigate, useParams } from 'react-router-dom'

const UserHome = () => {

    const navigate = useNavigate();                 //Navigates

    const updateNavigation = () => {                //Navigates to Update Page
        navigate('/Update/create');
    }

    const {currentUserData, personas, SetEditPersonaKey} = useContext(UserProfile);


    const SavePersonaIndex=(index)=>{
        SetEditPersonaKey(index);           
        navigate('/Update/edit');
    }

    const logoutFunction = () => {
        navigate("/");
      };


  return (
    <div>
         <div className="App">
            <header className="App-header">                      {/*Header */}
                <img src={logo} alt="tringapps logo"/>
                <div className="signButtons" style={{marginLeft:"75%"}}>
                    <button onClick={logoutFunction}>Log out</button>
                </div>
            </header>
        </div>
        <div className='userHomeMain'>
            <h2>Welcome to the User Persona!</h2>
            <div className='userHomeContent'>                     {/*Add Persona fields */}
                <button onClick={updateNavigation}>+ Add Persona</button>
                <div className='userHomeMainContent'>
                    {personas.length > 0 ? (
                        personas.map((persona, index) => (
                            <div key={index} onClick={()=>SavePersonaIndex(index)} className='userHomeCards'>
                                <img src={persona.image}></img>
                                <h2 style={{color:"#4aa5c7"}}>{persona.name}</h2>
                                <p style={{color:"black"}}>{persona.quote.slice(0,30)}</p>
                            </div>
                        ))
                    ) : (
                        <div className='userHomeCards' onClick={() => updateNavigation()} style={{backgroundImage: `url(${defaultImage})`, backgroundSize:'cover'}}>
                            <div className='addingCards'>+</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserHome