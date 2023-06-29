import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateIncome.css";

const CreateIncome = ({ token }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreateIncome = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/incomes", {
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

        // Redirect the user to the incomes page after successful income creation
        navigate("/incomes");
        window.location.reload();
      } else {
        const data = await response.json();
        console.error("Error creating income:", data.error);
      }
    } catch (error) {
      console.error("Error creating income:", error);
    }
  };

  return (
    <div className="create-income-container">
      <h2>Create Income</h2>
      <form onSubmit={handleCreateIncome}>
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
        <button type="submit">Create Income</button>
      </form>
    </div>
  );
};

export default CreateIncome;
