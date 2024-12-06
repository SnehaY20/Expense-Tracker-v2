import React, { useState } from "react";
import axios from "axios";

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Now we will use this

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert("Registration successful!");
      setError(""); // Clear any previous error
      onRegister(); // Trigger parent event if needed (optional)
    } catch (err) {
      // Display error message if API call fails
      const errorMessage =
        err.response?.data?.message || "An error occurred during registration.";
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div className="card card-container shadow">
      <div className="card-body">
        <h2 className="card-title">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
