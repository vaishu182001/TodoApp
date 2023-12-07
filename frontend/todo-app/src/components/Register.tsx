import React, { useState } from 'react';
import axios from 'axios';
import register from '../images/register.png';
import '../css/register.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rpassword, setRpassword] = useState('');
  const [dob, setDobNo] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: '',
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordCheck = zxcvbn(newPassword);
    const feedback = passwordCheck.feedback.suggestions.join(' ');

    setPasswordStrength({
      score: passwordCheck.score,
      feedback,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDobNo(e.target.value);
  };

  const handleRpasswordchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRpassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputType = showPassword ? 'text' : 'password';

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const passwordInputType1 = showPassword1 ? 'text' : 'password';

  const handleRegister = () => {
    if (
      !username ||
      !name ||
      !dob ||
      !email ||
      !password ||
      !rpassword ||
      password !== rpassword
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
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password) ||
      password.length < 8
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password',
        text:
          'Password should be at least 8 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character.',
      });
    } else if (!/^[A-Za-z0-9]{6,}$/.test(username)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Username',
        text: 'Username should be alphanumeric and at least 6 characters long.',
      });
    }
    else if (!/^[A-Za-z\s]+$/.test(name)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Name',
        text: 'Name should contain only alphabets and spaces.',
      });
    } else {
      const userData = {
        username,
        name,
        dob,
        email,
        password,
      };

      try {
        axios
          .post('https://e8iu4j5jhe.execute-api.us-east-1.amazonaws.com/prod/register', userData)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'You are now registered! You can Login.',
              });
              navigate('/');
              console.log('Registration Successful:', response.data);
            } else if (response.status === 409) {
              Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'Username already exists. Please choose a different username or email.',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'An error occurred during registration.',
              });
              console.error('Registration Failed:', response.data);
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: 'Username or email already exists.',
            });
            console.error('Registration Failed:', error);
          });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred outside of the registration process.',
        });
        console.error('Error outside registration:', error);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Register</h1>
        <img
          className="register-image"
          src={register}
          alt="Register Image"
          style={{ width: '150px', height: '150px' }}
        />
        <div className="input-container">
          <input
            type="email"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="date"
            placeholder="DOB"
            value={dob}
            onChange={handleDobChange}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
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

        {passwordStrength.score > 0 && (
          <div className={`password-strength strength-${passwordStrength.score}`}>
            Password Strength: {passwordStrength.score}/4 - {passwordStrength.feedback}
          </div>
        )}

        <div className="input-container">
          <input
            type={passwordInputType1}
            placeholder="Re-enter Password"
            value={rpassword}
            onChange={handleRpasswordchange}
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
        <div className="register">
          <Link to="/" className="register">
            Already Registered? Login!
          </Link>
        </div>
        <br></br>
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
