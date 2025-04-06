import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
// installed this module so we can decode the JWT on the client side
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  username: string;
  userID: number;
}

const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);
  // added state to store the username
  const [username, setUsername] = useState<string | null>(null);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
      try {
        const token = localStorage.getItem("id_token");
        if (token) {
          const decoded = jwtDecode(token) as JwtPayload;
          setUsername(decoded.username);
        } else {
          setUsername("Guest");
        }
      } catch (error) {
        console.error("Error decoding JWT:", error);
        setUsername("Guest");
      }
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin(); // Call checkLogin() function to update loginCheck state
  }, [loginCheck]); // Dependency array ensures useEffect runs when loginCheck changes

  return (
    <div className="display-flex justify-space-between align-center py-2 px-5 mint-green">
      {/* TODO: In h1 element, say "Fork in the Road." and "Welcome" then the user that is logged in using user from local storage */}
      <h1 className="text-4xl">Fork in the Road</h1>
      <h2 className="text-2xl">{`Welcome ${username}`}</h2>
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
