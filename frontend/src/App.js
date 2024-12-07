import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("login"); // Default view is login
  const [expenses, setExpenses] = useState([]);

  // Check for token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setCurrentView("expenseForm"); // Automatically show ExpenseForm if authenticated
    }
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    setCurrentView("expenseForm");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setCurrentView("login");
  };

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const renderContent = () => {
    if (currentView === "login") {
      return (
        <Login onLogin={handleAuthentication} setCurrentView={setCurrentView} />
      );
    }
    if (currentView === "register") {
      return <Register onRegister={() => setCurrentView("login")} />;
    }
    if (currentView === "expenseForm") {
      return (
        <ExpenseForm
          addExpense={addExpense}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          setCurrentView={setCurrentView}
        />
      );
    }
  };

  return (
    <div className="app-container">
      <header className="header-title">
        <h1>Expense Tracker</h1>
      </header>
      <main>{renderContent()}</main>
    </div>
  );
}

export default App;
