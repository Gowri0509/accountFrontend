import React from "react";
import { fireEvent, render,screen} from "@testing-library/react";
import SendAmountForm from "./SendAmountForm";
import { BrowserRouter } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { toast } from 'react-toastify';

// Mock the fetch function to return a successful response
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe("sendamount", () => { 
    it("Send amount",()=>{
        render(
            <BrowserRouter>< SendAmountForm /></BrowserRouter>
            );    
     const acno =screen.getByPlaceholderText("Enter Account Number")
     fireEvent.change(acno,{target:{value:"0509"}})
     const amount =screen.getByPlaceholderText("Enter Amount")
     fireEvent.change(amount,{target:{value:"0509"}})
     const submitbutton=screen.getByRole("button",{name:"Send Amount"});
        fireEvent.click(submitbutton)
        
        expect(toast.success).toHaveBeenCalledWith('Transaction Successful');

        });
   
 });    