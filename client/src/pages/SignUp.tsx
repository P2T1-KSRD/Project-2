import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";

const SignUp = () => {
    const [signData, setSignData] = useState ({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignData({
      ...signData,
      [name]: value,
    });
  };

  // Handle form submission for sign up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with signData
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signData),
      });
      if (!response.ok) {
      const data = await response.json()
      setError(data.message || "Sign up failed");
      return;
      }
      const data = await response.json()
      auth.login(data.token);
      navigate("/AddRestaurant");
    } catch (err) {
      console.error('Failed to sign up', err);  // Log any errors that occur during Sign Up
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
            value={signData.username}
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
            value={signData.email}
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
            value={signData.password}
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