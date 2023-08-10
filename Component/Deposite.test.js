import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Deposite from "./Deposite";

describe("sendamount", () => {
  it("Send amount", () => {
    render(
      <BrowserRouter>
        <Deposite />
      </BrowserRouter>
    );
    // Fast forward time to simulate the autoClose duration
   // jest.advanceTimersByTime(2000);
    const mockCallback = jest.fn();
    const amount = screen.getByPlaceholderText("Enter Amount");
    fireEvent.change(amount, { target: { value: "0509" } });
    const submitbutton = screen.getByRole("button", { name: "Top Up" });
    fireEvent.click(submitbutton)
  });
  it("should show error toast on unsuccessful login", async () => {
    render(
      <BrowserRouter>
        <Deposite />
      </BrowserRouter>
    );
    expect(await screen.findByText("TopUp Successfully done")).toBeInTheDocument();
  });
});
