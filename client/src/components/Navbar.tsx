import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import forkLogo from "../assets/forklogo.png";
// installed this module so we can decode the JWT on the client side
import jwtDecode from "jwt-decode";
import { Menu, X } from "lucide-react";

interface JwtPayload {
  username: string;
  userID: number;
}

const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);
  // added state to store the username
  const [username, setUsername] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem("id_token");

    if (auth.loggedIn() && token) {
      setLoginCheck(true);
      try {
        const decoded = jwtDecode(token) as JwtPayload;
        setUsername(decoded.username);
      } catch (error) {
        console.error("Error decoding JWT:", error);
        setUsername("Guest");
      }
    } else {
      setLoginCheck(false);
      setUsername("Guest");
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin(); // Call checkLogin() function to update loginCheck state
  }, [loginCheck]); // Dependency array ensures useEffect runs when loginCheck changes

  const handleLogout = () => {
    auth.logout();
    setMenuOpen(false); // close menu on logout
  };

  return (
    <div className="banner" aria-label="Main Navigation Bar">
      <div className="logo" aria-label="Website Logo and Name">
        <img
          src={forkLogo}
          alt="Fork in the Road logo"
          className="logo-img"
          aria-hidden="true"
        />
        <h1 className="text-4xl">Fork in the Road</h1>
      </div>
      <h2 className="welcome">{`Welcome ${username}!`}</h2>

      {/* Mobile menu toggle button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop navbar */}
      <div className="navbar" aria-label="Desktop Navigation Links">
        {!loginCheck ? (
          <>
            <Link className="btnlink link-text" to="/login" aria-label="Log In">
              Log In
            </Link>
            <Link
              className="btnlink link-text"
              to="/signup"
              aria-label="Sign Up"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              className="btnlink link-text"
              to="/browse"
              aria-label="Browse Restaurants"
            >
              Browse
            </Link>
            <Link
              className="btnlink link-text"
              to="/addrestaurant"
              aria-label="Add Restaurant"
            >
              Add Restaurant
            </Link>
            <Link className="btnlink link-text" to="/" aria-label="Home">
              Home
            </Link>
            <button className="btnlink" onClick={handleLogout} aria-label="Logout">
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile sidebar menu */}
      <div
        className={`mobile-sidebar ${menuOpen ? "open" : ""}`}
        aria-label="Mobile Navigation Sidebar"
      >
        {!loginCheck ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)} aria-label="Log In">
              Log In
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)} aria-label="Sign Up">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)} aria-label="Home">
              Home
            </Link>
            <Link
              to="/browse"
              onClick={() => setMenuOpen(false)}
              aria-label="Browse Restaurants"
            >
              Browse
            </Link>
            <Link
              to="/addrestaurant"
              onClick={() => setMenuOpen(false)}
              aria-label="Add Restaurant"
            >
              Add Restaurant
            </Link>
            <button onClick={handleLogout} aria-label="Logout">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
