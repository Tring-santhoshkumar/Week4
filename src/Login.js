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

    const {setCurrentUserData} = useContext(UserProfile);

    const [validation, setValidation] = useState({});
    
    const validate = () => {
        
        const error = {};
        
        if(!/^[A-Za-z]{3,}$/.test(inputData.name)){
            error.name = "Name must be atleast 3 letters and only alphabets";
        }
    
        if(!/.+@tringapps\.com$/.test(inputData.email)){
            error.email = "Email must be valid tringapps.com email.";
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const numberRegex = /[0-9]/;
        const capitalRegex = /[A-Z]/;

        if(!specialCharRegex.test(inputData.password) || !numberRegex.test(inputData.password) || !capitalRegex.test(inputData.password)){
            error.password = "Password must be atleast 5 characters and atleast include a uppercase letter, a number, and a special character.";
        }

        if(inputData.password !== inputData.confirmPassword){
            error.confirmPassword = "Passwords do not match.";
        }  

        setValidation(error);
        return Object.keys(error).length == 0;
    }

    const submitInput = (e) => {                                  
        e.preventDefault();
        // if(login(inputData.email,inputData.password)){
        //     alert("Login Successsfull!!!");
        //     // navigate(`/userHome/${inputData.email}`);
        //     navigate("/UserHome");
        // }
        // else{
        //     alert("Invalid Details,Please login again!");
        // }
        if((localStorage.length == 0)){
            alert("Please first Register.");
        }
        else if(validate && localStorage.getItem(inputData.email)){
            const User = JSON.parse(localStorage.getItem(inputData.email));
            if(inputData.password === User.password){
                alert("Login Successfull!!!");
                setCurrentUserData( {name : (inputData.name), email: (inputData.email)})
                navigate('/UserHome');
            }
            else{
              alert("Password Wrong.");
            //   console.log(User.password);
            }
        }
      
      }

  return (
    <div className='registerContainer'>
        <div className='registerPopup'>
            <h1>Login Page</h1>                                         {/*Login form*/}
            <form onSubmit={submitInput}>
                <input type='email' name='email' placeholder='Enter email' value={inputData.email} onChange={addInput} title='Ex : santhoshkumar.a@tringapps.com'/>
                {validation.email && <span>{validation.email}</span>}
                <input type='password' name='password' placeholder='Enter password' value={inputData.password} onChange={addInput} title='Ex : Admin@123'/>
                {validation.password && <span>{validation.password}</span>}
                <button type='submit' onClick={validate}>Submit</button>
                <p>New User?</p><span style={{color:"#4aa5c7",cursor:'pointer'}} onClick={() => navigate('/register')}>Register</span>
            </form>
        </div>
    </div>
  )
}

export default Login