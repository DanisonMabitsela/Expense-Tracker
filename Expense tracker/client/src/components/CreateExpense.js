import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateExpennse.css";

const CreateExpense = ({ token }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreateExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ amount, description }),
      });

      if (response.ok) {
        setAmount("");
        setDescription("");

        // Redirect the user to the expenses page after successful expense creation
        navigate("/expenses");
        window.location.reload();
      } else {
        const data = await response.json();
        console.error("Error creating expense:", data.error);
      }
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  return (
    <div className="create-expense-container">
      <h2>Create Expense</h2>
      <form onSubmit={handleCreateExpense}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Expense</button>
      </form>
    </div>
  );
};

export default CreateExpense;
