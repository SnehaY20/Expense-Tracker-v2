import React from "react";
import { Card, ListGroup, Badge, Container } from "react-bootstrap";
import "../App.css";

const ExpenseHistory = ({ expenses }) => {
  return (
    <Container>
      <Card className="card-container">
        <Card.Title className="card-title expense-history-title">
          Expense History
        </Card.Title>
        <ListGroup>
          {expenses.map((expense, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <Badge bg="info" className="expense-category me-2">
                  {expense.category}
                </Badge>
                <span className="expense-description">
                  {expense.description}
                </span>
              </div>
              <div>
                <strong className="expense-amount">₹{expense.amount}</strong>
                <div className="expense-date">{expense.date}</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default ExpenseHistory;
