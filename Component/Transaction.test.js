import React from "react";
import { fireEvent, render,screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Transaction from "./Transaction";


describe("sendamount", () => { 

it('should show error toast on unsuccessful login', async () => {
  
    render(<BrowserRouter>< Transaction /></BrowserRouter>);

    expect(await screen.findByText('unAuthorised')).toBeInTheDocument();
  });

it('should  error toast on unsuccessful login', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));
  render(<BrowserRouter>< Transaction /></BrowserRouter>);


});

});