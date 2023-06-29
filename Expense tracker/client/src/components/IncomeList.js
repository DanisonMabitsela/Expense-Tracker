import React, { useState, useEffect } from "react";

import "./IncomeList.css";

const IncomeList = ({ token, isAdmin }) => {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/incomes", {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        setIncomes(data);
      } catch (error) {
        console.error("Error fetching incomes:", error);
      }
    };

    fetchIncomes();
  }, [token]);

  const handleDeleteIncome = async (incomeId) => {
    try {
      await fetch(`http://localhost:5000/api/incomes/${incomeId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      setIncomes((prevIncomes) =>
        prevIncomes.filter((income) => income._id !== incomeId)
      );
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const handleUpdateIncome = async (incomeId) => {
    try {
      const updatedIncome = incomes.find((income) => income._id === incomeId);
      await fetch(`http://localhost:5000/api/incomes/${incomeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedIncome),
      });

      setIncomes((prevIncomes) =>
        prevIncomes.map((income) =>
          income._id === incomeId ? updatedIncome : income
        )
      );
    } catch (error) {
      console.error("Error updating income:", error);
    }
  };

  const handleInputChange = (event, incomeId) => {
    const { name, value } = event.target;
    setIncomes((prevIncomes) =>
      prevIncomes.map((income) =>
        income._id === incomeId ? { ...income, [name]: value } : income
      )
    );
  };

  return (
    <div className="income-list-container">
      <h2>Income List</h2>
      {incomes.map((income) => (
        <div key={income._id}>
          <label htmlFor={`income-amount-${income._id}`}>Amount:</label>
          <input
            id={`income-amount-${income._id}`}
            type="number"
            name="amount"
            defaultValue={income.amount}
            onChange={(event) => handleInputChange(event, income._id)}
          />
          <br />
          <label htmlFor={`income-description-${income._id}`}>
            Description:
          </label>
          <input
            id={`income-description-${income._id}`}
            type="text"
            name="description"
            defaultValue={income.description}
            onChange={(event) => handleInputChange(event, income._id)}
          />
          <br />
          {isAdmin && (
            <>
              <button onClick={() => handleDeleteIncome(income._id)}>
                Delete
              </button>
              <button onClick={() => handleUpdateIncome(income._id)}>
                Update
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default IncomeList;
