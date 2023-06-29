import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";

it("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("App", () => {
  it("logs out the user when the logout button is clicked", () => {
    // Set up the test
    sessionStorage.setItem("token", "test-token");
    const { getByText } = render(<App />);
    const logoutButton = getByText(/logout/i);

    // Verify that the token is set in local storage
    expect(sessionStorage.getItem("token")).toBe("test-token");

    // Simulate clicking the logout button
    fireEvent.click(logoutButton);

    // Verify that the token is removed from local storage
    expect(sessionStorage.getItem("token")).toBeNull();
  });

  it("fetches user data when the token is set", async () => {
    // Set up the test
    sessionStorage.setItem("token", "test-token");
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ isAdmin: true }),
      })
    );
    global.fetch = mockFetch;
    render(<App />);

    // Verify that the fetch function was called with the correct arguments
    expect(mockFetch).toHaveBeenCalledWith("http://localhost:5000/api/user", {
      headers: {
        Authorization: "test-token",
      },
    });

    // Clean up
    global.fetch.mockRestore();
  });
});
