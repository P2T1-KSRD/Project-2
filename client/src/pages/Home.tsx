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
  const navigate = useNavigate();

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
      <h2>Meet our Users</h2>
      {loginCheck && <UserList users={users} />}
      {!loginCheck && <p>Please log in to see the user list.</p>}
    </div>
  );
};

export default Home;
