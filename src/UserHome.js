import React from 'react'
import logo from './assets/tringapps-copy-2.svg';
// import image from './Update';
// import defaultImage from './Update'
import { useNavigate } from 'react-router-dom'

const UserHome = () => {

    const navigate = useNavigate();                 //Navigates

    const HomeNavigation = () =>  {                 //Navigates to Home Page
        navigate('/');
    }

    const updateNavigation = () => {                //Navigates to Update Page
        navigate('/Update');
    }

  return (
    <div>
         <div className="App">
            <header className="App-header">                      {/*Header */}
                <img src={logo} alt="tringapps logo"/>
                <div className="signButtons" style={{marginLeft:"75%"}}>
                    <button onClick={HomeNavigation}>Log out</button>
                </div>
            </header>
        </div>
        <div className='userHomeMain'>
            <div className='userHomeContent'>                     {/*Add Persona fields */}
                <button onClick={updateNavigation}>+ Add Persona</button>
                <div className='userHomeMainContent'>
                    <div className='userHomeCards'>

                    </div>
                    <div className='userHomeCards'>
                    
                    </div>
                    <div className='userHomeCards'>
                    
                    </div>
                    <div className='userHomeCards'>

                    </div>
                    <div className='userHomeCards'>
                    
                    </div>
                    <div className='userHomeCards'>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserHome