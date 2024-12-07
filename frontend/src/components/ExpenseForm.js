import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import "../App.css";

const ExpenseForm = ({
  addExpense,
  isAuthenticated,
  handleLogout,
  setCurrentView,
}) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/v1/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token for authentication
            },
          }
        );
        console.log(response.data);
        setCategories(response.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

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

    if (!category || !amount || !name) {
      setError("Please fill in all fields before adding an expense!");
      setSuccess("");
      return;
    }

    const newExpense = {
      category,
      amount: parseFloat(amount),
      name,
      date: getCurrentDateAndDay(),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/v1/expenses",
        newExpense,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      addExpense(response.data);
      setCategory("");
      setAmount("");
      setName("");
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
                {categories.map((cat) => (
                  <option key={cat._id || cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
