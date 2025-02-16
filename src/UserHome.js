import React, { useContext, useState , useEffect} from 'react'
import logo from './assets/tringapps-copy-2.svg';
import { UserProfile } from './UserProfile';
// import image from './Update';
// import defaultImage from './Update'
import { useNavigate, useParams } from 'react-router-dom'

const UserHome = () => {

    const navigate = useNavigate();                 //Navigates

    const HomeNavigation = () =>  {                 //Navigates to Home Page
        navigate('/');
    }

    const updateNavigation = () => {                //Navigates to Update Page
        navigate('/Update');
    }

    const {currentUserData, personas} = useContext(UserProfile);

    const [userPersona, setUserPersona] = useState([]);

    useEffect(() => {
        const storedPersonas = JSON.parse(localStorage.getItem("personas")) || [];
        console.log("Loaded personas:", storedPersonas); 
        setUserPersona(storedPersonas);
    }, []);


    const logoutFunction = () => {
        localStorage.removeItem("personas");
        localStorage.removeItem("currentUserData");
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
            <h4>Welcome {currentUserData?.name}!</h4>
            <div className='userHomeContent'>                     {/*Add Persona fields */}
                <button onClick={updateNavigation}>+ Add Persona</button>
                <div className='userHomeMainContent'>
                    {userPersona.length > 0 ? (
                        userPersona.map((persona, index) => (
                            <div key={index} className='userHomeCards' style={{backgroundImage: `url(${persona.image})`, backgroundSize:'cover'}}>
                                <h3 style={{color:'white'}}>{persona.name}</h3>
                            </div>
                        ))
                    ) : (
                        <p>No persona added</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserHome