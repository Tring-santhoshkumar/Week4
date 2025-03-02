import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../useContext/UserProfile';
import {toastAlert} from '../../Toastify';

const Register = () => {
  
  const [inputData, setInputData] = useState({
    name : '', email : '', password : '',  confirmPassword : ''
  });

  const addInput = (e) => {
    setInputData({...inputData,[e.target.name]:e.target.value});      //Storing the user data in the state
  }

  const navigate = useNavigate();

  // const jwt = require('jsonwebtoken');

  const {setCurrentUserData,setPersonas} = useContext(UserProfile);

  const [validation, setValidation] = useState({});

    const validate = () => {

        const error = {};

        if(!/^[A-Za-z\s]+$/.test(inputData.name.trim()) || inputData.name.trim() == ''){
          error.name = "Name must be atleast 3 letters and only alphabets";
          // toastAlert('error',error.name);
        }

        const userNameRegex = /^(?!\d+$)[a-zA-Z]+/;
        const domainRegex = /@[A-Za-z]+/;
        const endRegex = /\.com$/;
        if(!(userNameRegex.test(inputData.email) && domainRegex.test(inputData.email) && endRegex.test(inputData.email))){
            error.email = "Enter a valid email.";
            // toastAlert('error',error.email);
        }

        const specialCharRegex = /[!@#$%^&*(),.<>?]/;
        const numberRegex = /[0-9]/;
        const capitalRegex = /[A-Z]/;

        if(!specialCharRegex.test(inputData.password) || !numberRegex.test(inputData.password) || !capitalRegex.test(inputData.password)){
            error.password = "Password must be atleast 5 characters and atleast include a uppercase letter, a number, and a special character.";
            // toastAlert('error',error.password);
        }

        if(inputData.password !== inputData.confirmPassword){
            error.confirmPassword = "Passwords do not match.";
            // toastAlert('error',error.confirmPassword);
        }

        if(inputData.confirmPassword.trim() == ''){
            error.confirmPassword = "Password must not be empty and Should match."
            // toastAlert('error',error.confirmPassword);
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
        const Obj = {name: inputData.name, password: inputData.password, personas : []};
        localStorage.setItem(inputData.email, JSON.stringify(Obj));
        setCurrentUserData({name : (inputData.name), email : (inputData.email)})
        setPersonas([]);
        toastAlert('success',"Registered Successfully!Please Login Using the details.");
        navigate('/Login');
    }
  }

  const showPassword = () => {
    const hide = document.getElementById('hideButton');
    const show = document.getElementById('visibleButton');
    const pass = document.getElementById('password');
    hide.style.display = "none";
    show.style.display = "block";
    pass.type = "text";
  }

  const showPasswordCp = () => {
    const hide = document.getElementById('hideButtoncp');
    const show = document.getElementById('visibleButtoncp');
    const pass = document.getElementById('confirmPassword');
    hide.style.display = "none";
    show.style.display = "block";
    pass.type = "text";
  }

  const showPasswordDisable = () => {
    const hideDisable = document.getElementById('hideButton');
    const showDisable = document.getElementById('visibleButton');
    const passDisable = document.getElementById('password');
    hideDisable.style.display = "block";
    showDisable.style.display = "none";
    passDisable.type = "password";
  }

  const showPasswordDisableCp = () => {
    const hideDisable = document.getElementById('hideButtoncp');
    const showDisable = document.getElementById('visibleButtoncp');
    const passDisable = document.getElementById('confirmPassword');
    hideDisable.style.display = "block";
    showDisable.style.display = "none";
    passDisable.type = "password";
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

            <div className='passwordContainer'>
              <input type='password' id='password' name='password' placeholder='Enter password' value={inputData.password}  onChange={addInput} title='Ex : Admin@123' /*required pattern='(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{5-10}'*//>
              <span className='eyeButton'>
              <svg id='hideButton' onClick={showPassword} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
              </svg>
              <svg id='visibleButton' onClick={showPasswordDisable} style={{display:'none'}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
              </span>
            </div>
           {validation.password && <span>{validation.password}</span>}
            <div className='passwordContainer'>
            <input type='password' id='confirmPassword' name='confirmPassword' placeholder='Confirm password' value={inputData.confirmPassword}  onChange={addInput} /*pattern='(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{5-10}'*//>
            <span className='eyeButton'>
              <svg id='hideButtoncp' onClick={showPasswordCp} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
              </svg>
              <svg id='visibleButtoncp' onClick={showPasswordDisableCp} style={{display:'none'}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
            </span> 
            </div>
            {validation.confirmPassword && <span>{validation.confirmPassword}</span>}
            <button type='submit'>Register</button>
            <p>Have an account?</p><span style={{color:"#4aa5c7",cursor:'pointer'}} onClick={() => navigate('/login')}>Login</span>
        </form>
        </div>
    </div>
  )
}

export default Register