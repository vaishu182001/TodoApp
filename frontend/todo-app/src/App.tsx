import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPass from './components/ForgotPass';
import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import PasswordChange from './components/PasswordChange';
import { EmailProvider } from './components/EmailContext';

import { Navigate,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the session cookie exists when the app loads
  useEffect(() => {
    const username = Cookies.get('username'); // Replace 'Cookies' with your cookie library
    if (username) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    
    <div className="App">
         <BrowserRouter>
         <EmailProvider>
      <Routes>
        <Route path="/" element={<Login />}/>
         
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPass />} />
        <Route path="/addtask" element={<AddTask/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
         <Route path='/edittask' element={<EditTask/>}/>
        <Route path='/passwordchange' element={<PasswordChange/>}/>
        
          
      </Routes>
      </EmailProvider>
    </BrowserRouter>
      
   
      
        </div>
  );
}

export default App;
