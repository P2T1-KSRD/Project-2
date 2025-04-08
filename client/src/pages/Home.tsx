import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";

import UserList from '../components/Users';
import auth from '../utils/auth';
import fork from '../assets/fork.jpg';  
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
  }
return (
  <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${fork})` }}>
    {
      !loginCheck ? (
        <div className="text-center p-10 bg-white bg-opacity-70 rounded-md max-w-xl mx-auto mt-20">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
          Let’s Find Your Next Bite
          </h1>
        </div>
      ) : (
        <UserList users={users} />
      )
    }
  </div>
);

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
    </div>
  );
};


export default Home;
