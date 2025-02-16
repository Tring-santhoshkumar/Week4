import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        email : '', password : ''
    });
    
    const addInput = (e) => {                                     //Storing the user data in the state
        setInputData({...inputData,[e.target.name]:e.target.value});
    }

    const submitInput = (e) => {                                  //Getting from localstorage to login
        e.preventDefault();
        const registeredUser = JSON.parse(localStorage.getItem("userRegister"));
        if(registeredUser.email == inputData.email && registeredUser.password == inputData.password){
            alert("Login Successfull!!!");
            navigate('/userHome');
        }
      }
  return (
    <div>
        <h1>Login Page</h1>                                         {/*Login form*/}
        <form onSubmit={submitInput}>
            <input type='email' name='email' placeholder='Enter email' value={inputData.email} onChange={addInput} required pattern='.+@tringapps.com' title='Ex : santhoshkumar.a@tringapps.com'/>
            <input type='password' name='password' placeholder='Enter password' value={inputData.password} onChange={addInput} required pattern='(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{5-}' title='Ex : Admin@123'/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login