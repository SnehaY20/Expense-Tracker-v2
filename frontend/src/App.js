import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseHistory from "./components/ExpenseHistory";
import "./App.css"; // Import the styles

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="app-container">
      <header className="header-title">
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <ExpenseForm addExpense={addExpense} />
        <ExpenseHistory expenses={expenses} />
      </main>
    </div>
  );
}

export default App;
