import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Register = () => {
  
  const [inputData, setInputData] = useState({
    name : '', email : '', password : '',  confirmPassword : ''
  });

  const addInput = (e) => {
    setInputData({...inputData,[e.target.name]:e.target.value});      //Storing the user data in the state
  }

  const navigate = useNavigate();

  const submitInput = (e) => {
    e.preventDefault();                                             
    if(inputData.password != inputData.confirmPassword){
      alert("Password do not match,Please try again.");               //Using localstorage to save the user data
      return;
    }                                                                 
    localStorage.setItem("userRegister", JSON.stringify(inputData));
    alert("Registered Successfully!");
    navigate('/');
  }
  return (
    <div>
      <h1>Register Page</h1>                                                {/*Register form */}
        <form onSubmit={submitInput}>
            <input type='text' name='name' placeholder='Enter name' value={inputData.name}  onChange={addInput} required pattern='[a-zA-z]{3-}' title='Ex : Santhosh'/>
            <input type='email' name='email' placeholder='Enter email' value={inputData.email}  onChange={addInput} required pattern='.+@tringapps.com' title='Ex : santhoshkumar.a@tringapps.com'/>
            <input type='password' name='password' placeholder='Enter password' value={inputData.password}  onChange={addInput} required pattern='(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{5-}' title='Ex : Admin@123'/>
            <input type='password' name='confirmPassword' placeholder='Enter password' value={inputData.confirmPassword}  onChange={addInput} required pattern='(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{5-}'/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register