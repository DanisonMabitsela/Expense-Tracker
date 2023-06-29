import React, { useState, useEffect } from "react";
import "./BalanceSummary.css";

const BalanceSummary = ({ token }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/expenses", {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setExpenses(data);
        })
        .catch((error) => {
          console.error("Error fetching expenses:", error);
        });

      fetch("http://localhost:5000/api/incomes", {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIncomes(data);
        })
        .catch((error) => {
          console.error("Error fetching incomes:", error);
        });
    }
  }, [token]);

  const totalIncome = () => {
    return incomes.reduce((acc, curr) => acc + curr.amount, 0);
  };

  const totalExpenses = () => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  return (
    <div className="balance-summary-container">
      <h1>All Transactions</h1>
      <div className="stats-con">
        <div className="chart-con">
          <div className="amount-con">
            <div className="income">
              <h2>Total Income</h2>
              <p>R {totalIncome()}</p>
            </div>
            <div className="expense">
              <h2>Total Expense</h2>
              <p>R{totalExpenses()}</p>
            </div>
            <div className="balance">
              <h2>Total Balance</h2>
              <p>R{totalBalance()}</p>
            </div>
          </div>
        </div>
        <div className="history-con">
          <h2 className="salary-title">
            Min <span>Income</span> Max
          </h2>
          <div className="salary-item">
            <p>R{Math.min(...incomes.map((item) => item.amount))}</p>
            <p>R{Math.max(...incomes.map((item) => item.amount))}</p>
          </div>
          <h2 className="salary-title">
            Min <span>Expense</span> Max
          </h2>
          <div className="salary-item">
            <p>R{Math.min(...expenses.map((item) => item.amount))}</p>
            <p>R{Math.max(...expenses.map((item) => item.amount))}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSummary;
