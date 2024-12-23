// // src/components/LoginForm.js
// import React, { useState } from "react";
// import { Form, Button, Container } from "react-bootstrap";
// import { toast, ToastContainer } from "react-toastify"; // For Toast notifications
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

// function LoginForm() {
//   // State for form fields
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const loginData = {
//       email,
//       password,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/v1/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store the token (e.g., in localStorage or sessionStorage)
//         localStorage.setItem("token", data.token);

//         toast.success("Login successful!");
//         // Redirect user or navigate to the dashboard (if needed)
//         // You can use react-router for this
//       } else {
//         toast.error(data.message || "Login failed.");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       toast.error("Error logging in.");
//     }
//   };

//   return (
//     <Container className="my-5">
//       <ToastContainer />
//       <h2>Login</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="formPassword" className="mt-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" className="mt-4">
//           Login
//         </Button>
//       </Form>
//     </Container>
//   );
// }

// export default LoginForm;

import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        onLogin(); // Notify parent component
        navigate("/home"); // Redirect to home page
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in.");
    }
  };

  return (
    <Container className="my-5">
      <ToastContainer />
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Login
        </Button>
        <p className="mt-3">
          Don't have an account?{" "}
          <Button variant="link" as={Link} to="/register">
            Register
          </Button>
        </p>
      </Form>
    </Container>
  );
}

export default LoginForm;
