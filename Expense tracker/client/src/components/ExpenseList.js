import React, { useEffect, useState } from "react";
import "./ExpenseList.css";

const ExpenseList = ({ token, isAdmin }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Send a GET request to the backend '/expenses' route to retrieve the expenses
    fetch("http://localhost:5000/api/expenses", {
      headers: {
        Authorization: token, // Include the JWT token in the request header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data); // Update the expenses state with the retrieved data
      })
      .catch((error) => {
        console.error("Error getting expenses", error);
      });
  }, [token]);

  const handleDeleteExpense = async (expenseId) => {
    try {
      await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== expenseId)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleUpdateExpense = async (expenseId) => {
    try {
      const updatedExpense = expenses.find(
        (expense) => expense._id === expenseId
      );
      await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedExpense),
      });

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense._id === expenseId ? updatedExpense : expense
        )
      );
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleInputChange = (event, expenseId) => {
    const { name, value } = event.target;
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense._id === expenseId ? { ...expense, [name]: value } : expense
      )
    );
  };

  return (
    <div className="expense-list-container">
      <h2>Expense List</h2>
      {expenses.map((expense) => (
        <div key={expense._id}>
          <label htmlFor={`expense-amount-${expense._id}`}>Amount:</label>
          <input
            id={`expense-amount-${expense._id}`}
            type="number"
            name="amount"
            defaultValue={expense.amount}
            onChange={(event) => handleInputChange(event, expense._id)}
          />
          <br />
          <label htmlFor={`expense-description-${expense._id}`}>
            Description:
          </label>
          <input
            id={`expense-description-${expense._id}`}
            type="text"
            name="description"
            defaultValue={expense.description}
            onChange={(event) => handleInputChange(event, expense._id)}
          />
          <br />
          {isAdmin && (
            <>
              <button onClick={() => handleDeleteExpense(expense._id)}>
                Delete
              </button>
              <button onClick={() => handleUpdateExpense(expense._id)}>
                Update
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
