import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../App.css"; // Import the styles

const ExpenseForm = ({ addExpense }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const getCurrentDateAndDay = () => {
    const today = new Date();
    return today.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = () => {
    if (!category || !amount || !description) {
      alert("Please fill in all fields before adding an expense!");
      return;
    }

    const newExpense = {
      category,
      amount: parseFloat(amount),
      description,
      date: getCurrentDateAndDay(),
    };
    addExpense(newExpense);
    setCategory("");
    setAmount("");
    setDescription("");
  };

  return (
    <Container>
      <Card className="card-container">
        <Card.Title className="card-title new-expense-title">
          New Expense
        </Card.Title>
        <Form>
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
          <Button className="add-expense-button w-100" onClick={handleSubmit}>
            Add Expense
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ExpenseForm;
