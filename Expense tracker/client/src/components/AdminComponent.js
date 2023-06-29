import React, { useState, useEffect } from "react";
import "./AdminComponent.css";

const AdminComponent = ({ isAdmin, checkIsAdmin, token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users only when isAdmin changes
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: token, // Use token prop as value for Authorization header
        },
      });
      fetchUsers();
      checkIsAdmin(); // Call checkIsAdmin after deleting a user
    } catch (error) {
      console.error(`Failed to delete user ${userId}:`, error);
    }
  };

  return (
    <div className="admin-component-container">
      <h2>User Management</h2>
      <p>User is {isAdmin ? "an admin" : "not an admin"}</p>
      {isAdmin && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>
                  {isAdmin && (
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminComponent;
