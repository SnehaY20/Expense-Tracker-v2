import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import "../App.css"; // Import the styles

const ExpenseForm = ({
  addExpense,
  isAuthenticated,
  handleLogout,
  setCurrentView,
}) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getCurrentDateAndDay = () => {
    const today = new Date();
    return today.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !amount || !description) {
      setError("Please fill in all fields before adding an expense!");
      setSuccess("");
      return;
    }

    const newExpense = {
      category,
      amount: parseFloat(amount),
      description,
      date: getCurrentDateAndDay(),
    };

    try {
      const token = localStorage.getItem("token"); // Assuming you save the JWT token in localStorage after login
      const response = await axios.post(
        "http://localhost:5000/api/v1/expenses",
        newExpense,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token for authentication
          },
        }
      );

      addExpense(response.data); // Update local state with new expense
      setCategory("");
      setAmount("");
      setDescription("");
      setError("");
      setSuccess("Expense added successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Please log in to add expense.");
      setSuccess("");
    }
  };

  return (
    <Container>
      <Card className="card-container">
        <Card.Title className="card-title new-expense-title">
          New Expense
        </Card.Title>
        <Card.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Food">Food</option>
                <option value="Travelling">Travelling</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Skincare">Skincare</option>
                <option value="Groceries">Groceries</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount (RS)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </Form.Group>
            <div className="d-flex justify-content-between mt-3">
              <Button type="submit" className="add-expense-button">
                Add Expense
              </Button>
              <Button
                onClick={
                  isAuthenticated ? handleLogout : () => setCurrentView("login")
                }
                className="login-logout-button"
                style={{
                  backgroundColor: isAuthenticated ? "red" : "blue",
                  color: "white",
                }}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExpenseForm;
