import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from './assets/tringapps-copy-2.svg';

const Home = () => {
    const navigate = useNavigate();                          //Navigation

    const registerNavigation = () => {                       //Navigation to Register page
        navigate('/register');
    }

    const loginNavigation = () => {                          //Navigation to Login page
      navigate('/login');
    }

    return (
      <div className="App">
        <header className="App-header">                     {/*Header */}
          <img src={logo} alt="tringapps logo"/>
          <div className="signButtons">
            <button onClick={registerNavigation}>Register</button>
            <button onClick={loginNavigation}>Log In</button>
          </div>
        </header>
      </div>
  
    );
}

export default Home