import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const [account, setAccount] = useState(
    JSON.parse(sessionStorage.getItem("account"))
  );

  useEffect(() => {
    // Make the API call to your backend here
    fetch("http://localhost:8080/transaction/" + account?.accountNumber, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // setTransaction(data)
        const reversedData = data.reverse();
        setTransaction(reversedData);
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error:", error);
      })
      
  }, [1]);
  console.log(transaction[0]);
  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden" }}
      className="container my-5"
    >
      <TableContainer sx={{ width: "100%", maxHeight: 830 }}>
        <h2 className="h2 text-center">Transaction List</h2>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Transaction Id</TableCell> */}
              <TableCell align="center" width="150px">
                Sender Account Number
              </TableCell>
              <TableCell align="center" width="150px">
                Receiver Account Number
              </TableCell>
              <TableCell align="center" width="150px">
              Amount (₹)
              </TableCell>
              <TableCell align="center" width="150px">
                Transaction Type
              </TableCell>
              <TableCell align="center" width="200px">
                Date & Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transaction.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell> */}
                <TableCell align="center">{row.senderAccountNumber}</TableCell>
                <TableCell align="center">
                  {row.receiverAccountNumber}
                </TableCell>
                <TableCell align="center">₹{row.amount}</TableCell>
                <TableCell align="center">{row.transactionType}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
