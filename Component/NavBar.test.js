import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NavBar from "./NavBar.js";
import { screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
global.sessionStorage = sessionStorageMock;
describe("register", () => {
  it("should be show error toast on unsuccessful login", () => {
  
    const mockSessionStorage = {
      getItem: jest.fn().mockReturnValue("true"),
    };
    jest.spyOn(global, "sessionStorage", "get").mockReturnValue(mockSessionStorage);

        render(
          <BrowserRouter>
            <NavBar />
          </BrowserRouter>
        );
        // Click the logout button
        const submitbutton=screen.getByRole("button",{name:"LogOut"});
        fireEvent.click(submitbutton)
        const submitbutton1=screen.getByRole("button",{name:"No"});
        fireEvent.click(submitbutton1)
        const logoutConfirmationDialog = screen.getByText("Do you want to logout?");
        expect(logoutConfirmationDialog).toBeInTheDocument();
    
      });
    
   it("the new test case",()=>{
    render(<BrowserRouter>< NavBar /></BrowserRouter>);
    //   await waitFor(() =>
    //     //expect(fetch).toHaveBeenCalledWith("http://localhost:8080/account/12345")
    //   );
      expect(sessionStorage.getItem("amount")).toBe(null);
      expect(sessionStorageMock).toHaveBeenCalledWith("account");
      sessionStorageMock.mockRestore();
    });
   });

