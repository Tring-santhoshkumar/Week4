import React, { useContext, useState , useEffect} from 'react'
import logo from '../../assets/tringapps-copy-2.svg';
import { UserProfile } from '../useContext/UserProfile';
// import image from './Update';
import defaultImage from '../UpdatePage/Update'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { toastAlert } from '../../Toastify';

const UserHome = () => {

    const navigate = useNavigate();                 //Navigates

    const updateNavigation = () => {                //Navigates to Update Page
        navigate('/Update/create');
    }
    
    const {personas, currentUserData, SetEditPersonaKey} = useContext(UserProfile);

    const SavePersonaIndex=(index)=>{
        SetEditPersonaKey(index);           
        navigate('/Update/edit');
    }

    const logoutFunction = () => {
        toastAlert('info',"Logout succesfull.");
        navigate("/");
      };

    //   const temp = 'Santhosh';

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
        {/* {console.log(currentUserData.name)} */}
        <div className='userHomeMain'>
            <h2>Welcome to the {currentUserData.name}  Persona!</h2>
            <div className='userHomeContent'>                     {/*Add Persona fields */}
                <button onClick={updateNavigation}>+ Add Persona</button>
                <div className='userHomeMainContent'>
                    {personas.length > 0 &&
                        personas.map((persona, index) => (
                            <div key={index} onClick={()=>SavePersonaIndex(index)} className='userHomeCards'>
                                <img src={persona.image}></img>
                                <h2 style={{color:"#4aa5c7"}}>{persona.name.slice(0,15)}</h2>
                                <p style={{color:"black"}}>{persona.quote.slice(0,30)}</p>
                            </div>
                        ))
                    }
                    <div className='userHomeCards' onClick={() => updateNavigation()} style={{backgroundImage: `url(${defaultImage})`, backgroundSize:'cover'}}>
                            <div className='addingCards'>+</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserHome