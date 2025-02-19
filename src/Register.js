import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import {toastAlert} from './Toastify';

const Register = () => {
  
  const [inputData, setInputData] = useState({
    name : '', email : '', password : '',  confirmPassword : ''
  });

  const addInput = (e) => {
    setInputData({...inputData,[e.target.name]:e.target.value});      //Storing the user data in the state
  }

  const navigate = useNavigate();

  const {setCurrentUserData} = useContext(UserProfile);

  const [validation, setValidation] = useState({});

    const validate = () => {

        const error = {};

        if(!/^[A-Za-z]{3,}$/.test(inputData.name)){
          error.name = "Name must be atleast 3 letters and only alphabets";
          toastAlert('error',error.name);
        }

        if(!/.+@tringapps\.com$/.test(inputData.email)){
            error.email = "Email must be valid tringapps.com email.";
            toastAlert('error',error.email);
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const numberRegex = /[0-9]/;
        const capitalRegex = /[A-Z]/;

        if(!specialCharRegex.test(inputData.password) || !numberRegex.test(inputData.password) || !capitalRegex.test(inputData.password)){
            error.password = "Password must be atleast 5 characters and atleast include a uppercase letter, a number, and a special character.";
            toastAlert('error',error.password);
        }

        if(inputData.password !== inputData.confirmPassword){
            error.confirmPassword = "Passwords do not match.";
            toastAlert('error',error.confirmPassword);
        }

        if(inputData.confirmPassword.trim() == ''){
            error.confirmPassword = "Password must not be empty and Should match."
            toastAlert('error',error.confirmPassword);
        }

        setValidation(error);
        return Object.keys(error).length == 0;
    }
  const submitInput = (e) => {
    e.preventDefault();                                             
    // if(inputData.password != inputData.confirmPassword){
    //   alert("Password do not match,Please try again.");               
    //   return;
    // }                                                                 
    // localStorage.setItem("userRegister", JSON.stringify(inputData));   //Using localstorage to save the user data
    if(localStorage && localStorage.getItem(inputData.email)){
      toastAlert('error',"Email Already exist");
    }
    if(validate()){
      //register({name:inputData.name, email:inputData.email ,password:inputData.password, confirmPassword:inputData.confirmPassword});                                                  //Using useContext to save the user data
        const Obj = {name: inputData.name, password: inputData.password};
        localStorage.setItem(inputData.email, JSON.stringify(Obj));
        setCurrentUserData({name : (inputData.name), email : (inputData.email)})
        toastAlert('success',"Registered Successfully!Please Login Using the details.");
        navigate('/Login');
    }
  }

  return (
    <div className='registerContainer'>
      <div className='registerPopup'>
      <h1>Register Page</h1>                                                {/*Register form */}
        <form onSubmit={submitInput}>
            <input type='text' name='name' placeholder='Enter name' value={inputData.name}  onChange={addInput} title='Ex : Santhosh' /*required pattern='[a-zA-z]{3-30}'*/ />
            {validation.name && <span>{validation.name}</span>}
            <input type='email' name='email' placeholder='Enter email' value={inputData.email}  onChange={addInput}  title='Ex : santhoshkumar.a@tringapps.com' /*required pattern='.+@tringapps.com'*//>
            {validation.email && <span>{validation.email}</span>}
            <input type='password' name='password' placeholder='Enter password' value={inputData.password}  onChange={addInput} title='Ex : Admin@123' /*required pattern='(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{5-10}'*//>
            {validation.password && <span>{validation.password}</span>}
            <input type='password' name='confirmPassword' placeholder='Confirm password' value={inputData.confirmPassword}  onChange={addInput} /*pattern='(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{5-10}'*//>
            {validation.confirmPassword && <span>{validation.confirmPassword}</span>}
            <button type='submit'>Register</button>
            <p>Have an account?</p><span style={{color:"#4aa5c7",cursor:'pointer'}} onClick={() => navigate('/login')}>Login</span>
        </form>
        </div>
    </div>
  )
}

export default Register