import React from "react";
import {
  fireEvent,
  getByTestId,
  render,
  userEvent,
} from "@testing-library/react";
import Register from "./Register";
import { BrowserRouter } from "react-router-dom";
import { act, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

describe("register", () => {
  it("register render", () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          accountNumber: "1234567890",
          accountHolderName: "John Doe",
          email: "john@example.com",
          balance: 1000, // The account balance, you can set it to any value you need for testing
          mobileNumber: "1234567890",
          address: "123 Main St",
          password: "password123",
          repeatPassword: "password123",
          transactionList: [], // An array to hold the transaction data, you can set it to an empty array for testing
        }),
    });
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const accountNumber = screen.getByPlaceholderText("Enter Account Number");
    fireEvent.change(accountNumber, { target: { value: "0509" } });
    const accName = screen.getByPlaceholderText("Enter Account Holder Name");
    fireEvent.change(accName, { target: { value: "0509" } });
    const mobile = screen.getByPlaceholderText("Enter Mobile Number");
    fireEvent.change(mobile, { target: { value: "0509" } });
    const email = screen.getByPlaceholderText("Enter Email");
    fireEvent.change(email, { target: { value: "0509" } });
    const address = screen.getByPlaceholderText("Enter Address");
    fireEvent.change(address, { target: { value: "0509" } });
    const submitbutton = screen.getByRole("button", { name: "Sign in" });
    fireEvent.click(submitbutton);
    const password = screen.getByPlaceholderText("Enter Password");
    fireEvent.change(password, { target: { value: "0509" } });
    const repassword = screen.getByPlaceholderText(
      "Enter the Password for Confirmation"
    );
    fireEvent.change(repassword, { target: { value: "0509" } });
    fireEvent.click(screen.getByText("Sign in"));   
    const passwordInput = screen.getByPlaceholderText('Enter the Password for Confirmation');
    fireEvent.blur(passwordInput);
    const mobileNumberInput = screen.getByPlaceholderText('Enter Mobile Number');
    fireEvent.blur(mobileNumberInput);
  });

  it("should show error toast on unsuccessful login", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });
});
