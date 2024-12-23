// import ExpenseForm from "./components/ExpenseForm";
// import Navbar from "./components/Navbar";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <Routes>
//           <Route path="/add-expense" element={<ExpenseForm />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ExpenseForm from "./components/ExpenseForm";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token"); // Remove token on logout
  };

  const handleRegister = () => {
    setIsAuthenticated(true); // Mark as authenticated after registration
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <RegisterForm onRegister={handleRegister} />
              )
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <h1>Welcome to Home Page</h1>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-expense"
            element={
              isAuthenticated ? <ExpenseForm /> : <Navigate to="/login" />
            }
          />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
