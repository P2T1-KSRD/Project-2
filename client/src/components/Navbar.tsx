import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import forkLogo from "../assets/forklogo.png";
// installed this module so we can decode the JWT on the client side
import { jwtDecode } from "jwt-decode";
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
    <div className="banner">
      <div className="logo">
        <img src={forkLogo} alt="Fork in the Road logo" className="logo-img" />
        <h1 className="text-4xl">Fork in the Road</h1>
      </div>
      <h2 className="welcome">{`Welcome ${username}!`}</h2>

      {/* Mobile menu toggle button */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop navbar */}
      <div className="navbar">
        {!loginCheck ? (
          <>
            <Link className="btnlink link-text" to="/login">
              Log In
            </Link>
            <Link className="btnlink link-text" to="/signup">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <button className="btnlink" onClick={handleLogout}>
              Logout
            </button>
            <Link className="btnlink link-text" to="/browse">
              Browse
            </Link>
            <Link className="btnlink link-text" to="/addrestaurant">
              Add Restaurant
            </Link>
            <Link className="btnlink link-text" to="/">
              Home
            </Link>
          </>
        )}
      </div>

      {/* Mobile sidebar menu */}
      <div className={`mobile-sidebar ${menuOpen ? "open" : ""}`}>
        {!loginCheck ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Log In
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/browse" onClick={() => setMenuOpen(false)}>
              Browse
            </Link>
            <Link to="/addrestaurant" onClick={() => setMenuOpen(false)}>
              Add Restaurant
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
