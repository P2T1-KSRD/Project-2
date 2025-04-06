import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import { retrieveUsers } from "../api/userAPI";

const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true); // Set loginCheck to true if user is logged in
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin(); // Call checkLogin() function to update loginCheck state
  }, [loginCheck]); // Dependency array ensures useEffect runs when loginCheck changes

  return (
    <div className="display-flex justify-space-between align-center py-2 px-5 mint-green">
      {/* TODO: In h1 element, say "Fork in the Road." and "Welcome" then the user that is logged in using user from local storage */}
      <h1 className="text-4xl">
        Fork in the Road. Welcome,{" "}
        {localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user") || '""')
          : "Guest"}
      </h1>
      <div>
        {
          // Conditional rendering based on loginCheck state
          !loginCheck ? (
            // Render login button if user is not logged in
            <>
              <button className="btn">
                <Link to="/login">Log In</Link>
              </button>
              <button className="btn">
                <Link to="/signup">Sign Up</Link>
              </button>
            </>
          ) : (
            // Render logout button if user is logged in
            <>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  auth.logout(); // Call logout() method from auth utility on button click
                }}
              >
                Logout
              </button>
              <button className="btn">
                <Link to="/browse">Browse</Link>
              </button>
              <button className="btn">
                <Link to="/addrestaurant">Add Restaurant</Link>
              </button>

              <button className="btn">
                <Link to="/">Home</Link>
              </button>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
