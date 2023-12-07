import React from 'react'
import { useState } from 'react';
import '../css/login.css';
import loginimage from '../images/uname.png'
import Axios from 'axios'; // Import Axios
import Cookies from 'js-cookie';


import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
//import { Link, useHistory } from 'react-router-dom';
import { Navigate,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const MySwal = withReactContent(Swal);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

 
  //const history = useHistory(); 
  const navigate=useNavigate();
  useEffect(() => {
    // Check if there are stored credentials in cookies and populate the fields if "Remember Me" is checked
    const storedCredentials = Cookies.get('credentials');
    if (storedCredentials) {
      const { username: storedUsername, password: storedPassword } = JSON.parse(storedCredentials);
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []); // The empty dependency array ensures this effect runs only once

  const handleUsernameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setRememberMe(e.target.checked);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? 'text' : 'password';

  

  const validateForm = () => {
    let isValid = true;

    // U validation
    /*if (!username.includes('@')) {
      isValid = false;
      showValidationError('Username should contain @');
    }
    */
    if (username.trim() === '') {
      isValid = false;
      showValidationError('Username cannot be empty');
    }

    // P validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!*])[A-Za-z\d@#$%^&!*]{8,}$/;
    if (!password.match(passwordRegex)) {
      isValid = false;
      showValidationError('Password should be alphanumeric with at least one uppercase letter, one special character, and a minimum length of 8 characters');
    }

    return isValid;
  };

  const showValidationError = (message: string) => {
    MySwal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: message,
    });
  };

 /* const handleLogin = () => {
    if (validateForm()) {
      console.log('Username:', username);
      console.log('Password:', password);
    }
  };
  */
  const handleLogin = () => {
    if (validateForm()) {
      console.log('Username:', username);
      console.log('Password:', password);
      Axios
        .post(' https://mow0fbxife.execute-api.us-east-1.amazonaws.com/prod/login', {
          username,
          password,
        })
        .then((response) => {
          if (response.status === 200) {

            if (rememberMe) {
              // Set a cookie with username and password (not recommended for production)
              Cookies.set('credentials', JSON.stringify({ username, password }), { expires: 30 }); // Store for 30 days
            }
           //cookie creation with expiry
           Cookies.set('username', username, { expires: 1 / 24 }); // 1 hour expiration
           // Log that the cookie is created
          console.log('Session cookie created:', username);

            MySwal.fire({
              icon: 'success',
              title: 'Successful Login',
              text: 'You have successfully logged in.',
            });
  
            // Use the `navigate` function to navigate to the dashboard page
            
            navigate('/dashboard');
          } else {
            showValidationError('Login failed. Please check your credentials.');
          }
        })
        .catch((error) => {
          console.error('Login request error:', error);
          MySwal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'There was an error during login. Please check credentials.',
          });
        });
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <img className="login-image" src={loginimage} alt="Login Image" />
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="input-container">
          <input
            type={passwordInputType}
            placeholder="Password"
            value={password}
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
        <div className="remember-forgot">
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link to="/forgotpassword" className="fpass">
            Forgot Password?
          </Link>
        </div>
        <div className="register">
          <Link to="/register" className="register">
            New to App? Register!
          </Link>
        </div>
        <br />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;