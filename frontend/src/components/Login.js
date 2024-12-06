import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin, setCurrentView }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      alert("Login successful!");
      onLogin();
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="card card-container shadow">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-success w-45">
              Login
            </button>
            <button
              type="button"
              className="btn btn-primary w-45"
              onClick={() => setCurrentView("register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
