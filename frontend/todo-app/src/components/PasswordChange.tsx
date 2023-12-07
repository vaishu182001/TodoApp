import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import resetPass from '../images/resetpass.png'
import Swal from 'sweetalert2';
import '../css/passchange.css';
import { useEmail } from './EmailContext';
import axios from 'axios';
import { Navigate,useNavigate } from 'react-router-dom';

function PasswordChange() {
    const { email } = useEmail();
    const [pass, setPassword] = useState('');
    const [rpass, setRpassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showPassword1, setShowPassword1] = useState(false); // State to toggle password visibility
  
    const navigate=useNavigate();
   
    
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  
    const handleRpasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRpassword(e.target.value);
    };
   
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const passwordInputType = showPassword ? 'text' : 'password';
  
    const togglePasswordVisibility1 = () => {
      setShowPassword1(!showPassword1);
    };
    const passwordInputType1 = showPassword1 ? 'text' : 'password';
      
      
      /*const handleReset= () => {
     
        console.log('Password:', pass);
      
       
      };
      */
      const handleReset = () => {

        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
        if (pass !== rpass) {
          Swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text: 'Passwords do not match.',
          });
        } 
        else if (pass.length < 8 || !passwordRegex.test(pass)) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Password',
            text:
              'Password should be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character.',
          });
        } else {
          // Prepare the data to send in the request body
          const userData = {
            pass,
            email,
          };
          console.log('Password:', pass);
      
          try {
            // To send a POST request to reset the password
            axios
              .post('https://w9ym85op2f.execute-api.us-east-1.amazonaws.com/prod/passchange', userData)
              .then((response) => {
                console.log('Response:', response); // Log the response data
      
                if (response.status === 200) {
                  // Handle success
                  Swal.fire({
                    icon: 'success',
                    title: 'Password Reset Successful',
                    text: 'Your password has been reset.',
                  });
                  // You can redirect the user to the login page or another appropriate route here.
                  navigate('/');
                } else {
                  // Handle other status codes as needed
                  Swal.fire({
                    icon: 'error',
                    title: 'Password Reset Failed',
                    text: 'An error occurred during the password reset.',
                  });
                }
              })
              .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Password Reset Failed',
                  text: 'An error occurred during the password reset.',
                });
              });
          } catch (error) {
            // Handle exceptions that might occur outside of the Axios request
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred outside of the password reset process.',
            });
      
            console.error('Error outside password reset:', error);
          }
        }
      };
      
  return (
    <div className="passwordchange-page">
    <div className="passchange-container">
      <h1>Change Password</h1>
      <img className="passchange-image" src={resetPass}alt="Reset Password Image" style={{ width: '150px', height: '150px' }} />
      <div className="input-container-pc">
        
      <input
              type={passwordInputType}
            placeholder="Enter New Password"
            value={pass}
            onChange={handlePasswordChange}
            required
          />
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <i className="material-icons">visibility</i>
            ) : (
              <i className="material-icons">visibility_off</i>
            )}
          </span>
      </div>

     
      
      <div className="input-container-pc">
       
      <input
             type={passwordInputType1}
            placeholder="Re-enter Password"
            value={rpass}
            onChange={handleRpasswordChange}
            required
          />
           <span className="password-toggle-icon" onClick={togglePasswordVisibility1}>
            {showPassword1 ? (
              <i className="material-icons">visibility</i>
            ) : (
              <i className="material-icons">visibility_off</i>
            )}
          </span>
      </div>

      
      
     
     <br></br>
     
     <br></br>
     
     <div className='login'>
     <Link to="/" className="login"> Login !</Link>

     </div>
     <br></br>
     
      <button className="passchange-button" onClick={handleReset}>Reset Password</button>
    </div>
  </div>
  )
}

export default PasswordChange