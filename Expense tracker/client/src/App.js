import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateExpense from "./components/CreateExpense";
import CreateIncome from "./components/CreateIncome";
import ExpenseList from "./components/ExpenseList";
import IncomeList from "./components/IncomeList";
import BalanceSummary from "./components/BalanceSummary";
import AdminComponent from "./components/AdminComponent"; // Import AdminComponent
import "./App.css";

const Sidebar = ({ onLogout, isAdmin }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li>
          <Link to="/" className="sidebar-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/create-expense" className="sidebar-link">
            Create Expense
          </Link>
        </li>
        <li>
          <Link to="/create-income" className="sidebar-link">
            Create Income
          </Link>
        </li>
        <li>
          <Link to="/expenses" className="sidebar-link">
            Expenses
          </Link>
        </li>
        <li>
          <Link to="/incomes" className="sidebar-link">
            Incomes
          </Link>
        </li>
        {isAdmin && ( // Render link to AdminComponent if user is admin
          <li>
            <Link to="/user" className="sidebar-link">
              user
            </Link>
          </li>
        )}
      </ul>
      <li>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </li>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to check if user is admin
  const checkIsAdmin = async () => {
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/api/user", {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    checkIsAdmin(); // Call checkIsAdmin on mount and when token changes
  }, [token]);

  const handleLogout = () => {
    sessionStorage.clear();
    setToken(null);
    setIsAdmin(false); // Reset isAdmin state to false
  };

  return (
    <Router>
      <div className="app">
        {token && (
          <Sidebar
            onLogout={handleLogout}
            isAdmin={isAdmin}
            checkIsAdmin={checkIsAdmin}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <BalanceSummary token={token} />
              ) : (
                <Login setToken={setToken} setIsAdmin={setIsAdmin} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setToken={setToken} setIsAdmin={setIsAdmin} />}
          />
          <Route
            path="/create-expense"
            element={token ? <CreateExpense token={token} /> : <Login />}
          />
          <Route
            path="/create-income"
            element={token ? <CreateIncome token={token} /> : <Login />}
          />
          <Route
            path="/expenses"
            element={
              token ? (
                <ExpenseList token={token} isAdmin={isAdmin} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/incomes"
            element={
              token ? <IncomeList token={token} isAdmin={isAdmin} /> : <Login />
            }
          />
          {isAdmin && ( // Render route to AdminComponent if user is admin
            <Route
              path="/user"
              element={
                <AdminComponent
                  isAdmin={isAdmin}
                  checkIsAdmin={checkIsAdmin}
                  token={token} // Pass token as a prop to AdminComponent
                />
              }
            />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
