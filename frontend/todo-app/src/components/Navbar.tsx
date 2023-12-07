import React from 'react'
import bar from '../images/bar.png'
import logout from '../images/turn-off.png'
import home from '../images/home.png'
import '../css/dashboard.css'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useState } from 'react'
import { useEffect } from 'react'

type NavbarProps = {
  onFilterChange: (status: string) => void;
  fetchTasks: () => void; // Function to fetch tasks
  fetchAndRefreshTasks: () => void;
 
};


function Navbar({ onFilterChange, fetchTasks, fetchAndRefreshTasks }: NavbarProps) {
  const handleFilterChange = (status: string) => {
    onFilterChange(status);
  };

  // State to store the retrieved username
  const [username, setUsername] = useState('');
  

  // Use the useEffect hook to retrieve the username from the session cookie
  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Delete the session cookie
    Cookies.remove('username');

    // Redirect to the login page
    window.location.href = '/'; // Replace '/login' with the actual URL of your login page
  };

  const handleHomeClick = () => {
    fetchAndRefreshTasks(); // Call the fetchAndRefreshTasks function to refresh the tasks
  }

  
  return (
    <ul className="navbar">
    <li className="dropdown">
      <a href="javascript:void(0)" className="menubtn"><img className="dropdown-image" src={bar}alt="Bar Image" style={{ width: '35px', height: '20px' }}  /></a>
      <div className="dropdown-content">
          <a onClick={() => handleFilterChange('All')}>All Tasks</a>
          <a onClick={() => handleFilterChange('In Progress')}>In Progress Tasks</a>
          <a onClick={() => handleFilterChange('Completed')}>Completed Tasks</a>
          <a onClick={() => handleFilterChange('Deleted')}>Deleted Tasks</a>
        </div>
    </li>
    <li><a onClick={handleHomeClick}><img className="home-image" src={home}alt="Home Image" style={{ width: '35px', height: '20px' }}  /></a></li>
    <li><a onClick={handleLogout}><img className="logout-image" src={logout}alt="Logout Image" style={{ width: '35px', height: '20px' }}  /></a></li>
     {/* Display the "Welcome [Username]" message as a list element */}
     {username && (
        <li className="welcome-message">   Welcome {username}   !</li>
      )}
  </ul>
  )
}

export default Navbar