import React from "react";
import { render, waitFor,screen ,fireEvent} from "@testing-library/react";
import Home from "./Home";
import {BrowserRouter ,act} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import LogOut from './LogIn';

jest.mock("node-fetch", () =>
jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 1, balance: 100 }),
  })
)
);
const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
  global.sessionStorage = sessionStorageMock;

describe("YourComponent", () => {
test("should make API call and update state correctly", async () => {
  // Mock sessionStorage getItem
  const sessionStorageMock = jest.spyOn(
    Storage.prototype,
    "getItem"
  );
  sessionStorageMock.mockReturnValueOnce(
    JSON.stringify({ accountNumber: "12345" })
  );
  render(<BrowserRouter>< Home /></BrowserRouter>);
//   await waitFor(() =>
//     //expect(fetch).toHaveBeenCalledWith("http://localhost:8080/account/12345")
//   );
  expect(sessionStorage.getItem("amount")).toBe(null);
  expect(sessionStorageMock).toHaveBeenCalledWith("account");
  sessionStorageMock.mockRestore();
});
it("should show error toast on unsuccessful login", async () => {
      render(<BrowserRouter>< Home /></BrowserRouter>);
      expect(await screen.findByText("Logged in Successfully")).toBeInTheDocument();

    });
    it("should be show error toast on unsuccessful login", async () => {
      render(<BrowserRouter>< Home /></BrowserRouter>);
     
     // expect(await screen.findByText("amount")).toBeInTheDocument();
      const logoutButton = screen.getByRole('button', { name:"Deposit"});
      fireEvent.click(logoutButton)
      

    });
    it(" show error toast on unsuccessful login", async () => {
      render(<BrowserRouter>< Home /></BrowserRouter>);
      const logoutButton = screen.getByRole('button', { name:"Send Amount"});
      fireEvent.click(logoutButton)
      
    });
  });