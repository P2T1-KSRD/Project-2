import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);  // Set loginCheck to true if user is logged in
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin();  // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);  // Dependency array ensures useEffect runs when loginCheck changes

  return (
    <div className="display-flex justify-space-between align-center py-2 px-5 mint-green">
      <h1 className='Navbar-title' style={{ fontSize: '2rem', fontFamily:'Marker Felt, fantasy', margin: 0 , color: '#ddbe51'}}>
        <Link to="/" style={{ textDecoration: 'none', color: '#FCAE1E' }}>Fork in the Road!</Link>
      </h1>
      <div>
        {
          // Conditional rendering based on loginCheck state
          !loginCheck ? (
            // Render login button if user is not logged in
            <>
            <button className="btn" style={{ marginRight: '10px', backgroundColor: '#541E1B', color: 'black'  }}>
              <Link to="/login">Log In</Link>
            </button>
            <button className="btn"style={{ marginRight: '10px', backgroundColor: '#541E1B', color: 'white' }}>
              <Link to="/signup">Sign Up</Link>
            </button>
          </>
          ) : (
            // Render logout button if user is logged in
            <button className="btn" type='button' onClick={() => {
              auth.logout();  // Call logout() method from auth utility on button click
            }}>Logout</button>
          )
        }
      </div>
    </div>
  )
}

export default Navbar;
