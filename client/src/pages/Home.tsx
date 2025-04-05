import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import auth from '../utils/auth';
import fork from '../assets/fork.jpg';  

const Home = () => {
    

    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />;
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

    return (
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        <h1>
                        Let’s Find Your Next Bite
                        </h1>
                    </div>
                ) : (
                    <UserList users={users} />
                )}
        </>
    );
};

export default Home;
