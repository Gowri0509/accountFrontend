import React from "react";
import { fireEvent, render,screen,waitFor} from "@testing-library/react";
import LogOut from "./LogIn";
import { BrowserRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import { act } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import LogIn from "./LogIn";
import userEvent from '@testing-library/user-event';

// Mock the useNavigate function
// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(),
// }));

// Mock the sessionStorage functions
const mockSessionStorage = () => {
  let storage = {};
  return {
    getItem: (key) => storage[key],
    setItem: (key, value) => (storage[key] = value || ''),
    removeItem: (key) => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage() });

// Mock the toast function
jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
  },
}));

describe("login", () => { 
    it("login render", ()=>{
        render(
            <BrowserRouter>< LogIn /></BrowserRouter>
            );
        const accountNumber =screen.getByPlaceholderText("Enter Account Number");
        fireEvent.change(accountNumber,{target:{value:"0509"}})
        const password =screen.getByPlaceholderText("Enter password");
        fireEvent.change(password,{target:{value:"0509"}})

        const submitbutton=screen.getByRole("button",{name:"Sign in"});
        fireEvent.click(submitbutton)
        
     
        expect(sessionStorage.getItem('isLoggedIn')).toBeUndefined();
        expect(sessionStorage.getItem('account')).toBeUndefined();
    }) 
});  

describe('handleSubmit', () => {
  test('should log in successfully and navigate to home', async () => {
    const responseMock = { /* Mock the response data here */ };
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(responseMock),
    });

    render(
      <BrowserRouter>< LogIn /></BrowserRouter>
      );

    const loginButton = screen.getByRole('button', { name: /Sign in/i });
    userEvent.click(loginButton);

    // You can add assertions here to ensure that the success toast message is displayed and the navigation function is called
   
  });
});

test('should show error toast for unauthorized user', async () => {
  jest.spyOn(window, 'fetch').mockResolvedValueOnce({
    ok: false,
    status: 401, // Unauthorized status code
  });

  render(
    <BrowserRouter>< LogIn /></BrowserRouter>
    );

  const loginButton = screen.getByRole('button', { name: /Sign in/i });
  userEvent.click(loginButton);

  // You can add assertions here to ensure that the error toast message is displayed
 
});

test('should show error toast for API call failure', async () => {
  jest.spyOn(window, 'fetch').mockRejectedValueOnce(new Error('API Error'));

  render(
    <BrowserRouter>< LogIn /></BrowserRouter>
    );

  const loginButton = screen.getByRole('button', { name: /Sign in/i });
  userEvent.click(loginButton);

  // You can add assertions here to ensure that the error toast message is displayed
  // await waitFor(() => {
  //   //expect(screen.getByText(/unAuthorised/i)).toBeInTheDocument();
  // });
  it("should show error toast on unsuccessful login", async () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>
    );
    expect(await screen.findByText("Successfully")).toBeInTheDocument();
  });
});
