import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserProfile } from './UserProfile';

const Login = () => {

    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        email : '', password : ''
    });
    
    const addInput = (e) => {                                     //Storing the user data in the state
        setInputData({...inputData,[e.target.name]:e.target.value});
    }

    const {login} = useContext(UserProfile);

    const submitInput = (e) => {                                  
        e.preventDefault();
        if(login(inputData.email,inputData.password)){
            alert("Login Successsfull!!!");
            // navigate(`/userHome/${inputData.email}`);
            navigate("/UserHome");
        }
        else{
            alert("Invalid Details,Please login again!");
        }
      }

  return (
    <div className='registerContainer'>
        <div className='registerPopup'>
            <h1>Login Page</h1>                                         {/*Login form*/}
            <form onSubmit={submitInput}>
                <input type='email' name='email' placeholder='Enter email' value={inputData.email} onChange={addInput} required pattern='.+@tringapps.com' title='Ex : santhoshkumar.a@tringapps.com'/>
                <input type='password' name='password' placeholder='Enter password' value={inputData.password} onChange={addInput} required pattern='(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{5-}' title='Ex : Admin@123'/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Login