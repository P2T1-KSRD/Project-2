import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000); // hide after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  useLayoutEffect(() => {
    // This will run before the DOM is painted
    checkLogin(); // Check if the user is logged in
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true); // User is logged in
      navigate("/"); // Redirect to home page
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  
  
  

  if (error) {
    return <ErrorPage />;
  }

  //   return null;

  return (
    <div className="home-container">
      <h1>Welcome to Fork in the Road!</h1>
      <h2>Let fate pick your plate.</h2>
      {loginCheck && <UserList users={users} />}
      {!loginCheck && <p>Please log in/sign up to get started!</p>}
      <button className="btnlink" onClick={handleCopyLink}>
  Share with friends!
</button>
{showModal && (
  <div className="friendsmodal">
    <div className="model-content" >
      <h3> ✅ Link copied to clipboard! </h3>
    </div>
  </div>
)}

    </div>
  );
};

export default Home;
