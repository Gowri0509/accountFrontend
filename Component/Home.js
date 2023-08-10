import React, { useState, useEffect } from "react";
import Trasaction from "./Transaction";
import { Button } from "@mui/material";
import SendAmountForm from "./SendAmountForm";
import { Link, json } from "react-router-dom";
import "./style.css";

export default function Home() {
  const [account, setAccount] = useState({});

  // useEffect(() => {
  //   const id = JSON.parse(sessionStorage.getItem("account"))["accountNumber"];
  useEffect(() => {
    const accountData = JSON.parse(sessionStorage.getItem("account"));
    if (accountData?.accountNumber) {
      const id = accountData.accountNumber;
      fetch(`http://localhost:8080/account/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the API response data her
          setAccount(data);
          sessionStorage.setItem("amount", data.balance);
          
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error fetching data:", error);
        });
    }
  }, []);


  return (
    <div className="container mt-5">
      <div className="text-center h4">
        {account?.accountHolderName} Welcome To Wallet Banking
      </div>
      <div className="my-4">
        <span className="welcomeNote">
          Thank you for visiting the Wallet Banking App! Our goal at Wallet
          Banking is to completely change the way you handle and maintain
          control over your finances. Our goal is to provide users with a
          platform that is secure, practical, and easy to use, making banking
          simpler for both individuals and businesses.
        </span>
      </div>
      <div className="my-5">
        <a href="addAmount">
          <Button variant="contained" className="mr-5">
            {/* Send Amount */}
            Transfer Amount
          </Button>
        </a>
        <a href="deposite">
          <Button variant="contained">Deposit</Button>
        </a>
      </div>
   
    </div>
  );
}
