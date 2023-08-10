import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Deposite() {
  const navigate = useNavigate();
  // const [topUp, setTopUp] = useState({
  //     accountNumber: JSON.parse(sessionStorage.getItem("account"))[
  //         "accountNumber"
  //     ],
  //             amount: "",
  // });
  const [topUp, setTopUp] = useState({
    accountNumber:
      JSON.parse(sessionStorage.getItem("account"))?.accountNumber ?? "",
    amount: "",
  });
  const onChangeAmount = (event) => {
    setTopUp({ ...topUp, amount: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Make the API call to your backend here
    fetch("http://localhost:8080/account/topUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topUp),
    })
      .then((response) => {
        toast.success("TopUp Successfully done", {
          position: "top-center",
          autoClose: 1000,
          onClose: () => {
            navigate("/home");
          },
        });
        return response.json();
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error:", error);
      });
  };

  return (
    <div className="container my-5">
      <ToastContainer></ToastContainer>
      <div className="text-center">
        <h1 className="h2">Top Up</h1>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            placeholder="Enter Amount"
            value={topUp.amount}
            onChange={onChangeAmount}
          />
        </div>

        <Button
          variant="contained"
          color="success"
          className="mr-5"
          onClick={handleSubmit}
        >
          Top Up
        </Button>
        <Button variant="contained" color="error">
          <Link to="/home" className="text-decoration-none text-black">
            Cancel
          </Link>
        </Button>
      </form>
    </div>
  );
}
