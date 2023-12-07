import React from 'react'
import { useState } from 'react'
import resetPass from '../images/resetpass.png'
import '../css/forgotpass.css'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navigate,useNavigate } from 'react-router-dom';
import { useEmail } from './EmailContext';

function ForgotPass() {
    
  const { email, setEmail } = useEmail();
    const [dob, setDob] = useState('');
    const navigate=useNavigate();
    
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
  
    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDob(e.target.value);
    };
   
      
      
      
      const handleAuthenticate= () => {

        if (
          
          !dob ||
          !email 
          
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill out all fields and ensure passwords match!',
          });
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
          });
        
        } else {
          // Prepare the data to send in the request body
          const userData = {
          
            
            email,dob,
         
          };
    
          // To send a POST request to the API Gateway endpoint with the user data
          try {
            axios.post('https://mv6h9vutg7.execute-api.us-east-1.amazonaws.com/prod/forgotpass', userData)
              .then((response) => {
                if (response.status === 200) {
                  // Handle success
                  Swal.fire({
                    icon: 'success',
                    title: 'Authentication Successful',
                    text: 'You can go and change your password',
                  });
                  navigate('/passwordchange');
          
                  console.log('Authentication Successful:', response.data);
                } else {
                  // Handle other status codes as needed
                  Swal.fire({
                    icon: 'error',
                    title: 'Authentication Failed',
                    text: 'An error occurred during authentication.',
                  });
          
                  console.error('Authentication Failed:', response.data);
                }
              })
              .catch((error) => {
                // Handle errors
                Swal.fire({
                  icon: 'error',
                  title: 'Authentication Failed',
                  text: 'An error occurred during authentication.',
                });
          
                console.error('Authentication Failed:', error);
              });
          } catch (error) {
            // Handle exceptions that might occur outside of the Axios request
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred outside of the authentication process.',
            });
          
            console.error('Error outside authentication:', error);
          }
        }
     
        console.log('Email:', email);
        console.log('DOB:', dob);


      };
  return (
    <div className="forgotpassword-page">
    <div className="fpass-container">
      <h1>Forgot Password</h1>
      <img className="fpass-image" src={resetPass}alt="Reset Password Image" style={{ width: '150px', height: '150px' }} />
      <div className="input-containerfp">
        
        <input
          type="email"
          placeholder="Type your Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

     
      
      <div className="input-containerfp">
       
        <input
          type="date"
          placeholder="DOB"
          value={dob}
          onChange={handleDobChange}
        />
      </div>

      
      
     
     <br></br>
     
     <br></br>
     
     <div className='register'>
     <Link to="/" className="register"> Login !</Link>

     </div>
     <br></br>
     
      <button className="fpass-button" onClick={handleAuthenticate}>Authenticate</button>
    </div>
  </div>
  )
}

export default ForgotPass