import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';  // Import the Auth utility for managing authentication state
import { signup } from "../api/authAPI";  // Import the login function from the API
import { UserSignup } from "../interfaces/UserSignup";  // Import the interface for UserLogin

const SignUp = () => {
    const [signUpData, setsignUpData] = useState ({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setsignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  // Handle form submission for sign up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await signup(signUpData);
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
      const navigate = useNavigate();
      navigate("/addrestaurant");
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };
  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={signUpData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={signUpData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={signUpData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;