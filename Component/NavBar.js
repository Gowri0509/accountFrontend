// import { Button } from "@mui/material";
// import React , { useState }from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// export default function NavBar() {
//   const Navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const handleLogout = () => {
//     setOpen(true);
//   };

//   const handleConfirmLogout = () => {
//     sessionStorage.removeItem("isLoggedIn");
//     sessionStorage.removeItem("account");
//     setOpen(false);
//     Navigate("/");
//   };

//   const handleCancelLogout = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="sticky-top">
//       <ToastContainer></ToastContainer>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ">
//         <Link className="navbar-brand" to="home">
//           WalletBanking
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav mr-auto">
//             {sessionStorage.getItem("isLoggedIn") ? (
//               <li className="nav-item active">
//                 <Link className="nav-link" to="home">
//                   Dashboard <span className="sr-only">(current)</span>{" "}
//                 </Link>
//               </li>
//             ) : (
//               <li className="nav-item active">
//                 <Link className="nav-link" to="/">
//                   Home <span className="sr-only">(current)</span>{" "}
//                 </Link>
//               </li>
//             )}

//             {sessionStorage.getItem("isLoggedIn") && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="transaction">
//                   Transactions{" "}
//                 </Link>
//               </li>
//             )}
//           </ul>
//           <span className="navbar-text text-white me-5">
//             {sessionStorage.getItem("isLoggedIn") && (
//               <ul className="navbar-nav mr-auto">
//                 <li className="nav-item">
//                   {/* <h4>  Balance:₹{sessionStorage.getItem("amount")} </h4> */}
//                   {/* <h4>Balace: {account.balance}</h4> */}
//                 </li>
//                 <li className="ml-5">
//                   <div>
//                     <Button variant="contained" color="error" onClick={handleLogout}>
//                       LogOut
//                     </Button>
//                     <Dialog
//                       open={open}
//                       onClose={handleLogout}
//                       aria-labelledby="alert-dialog-title"
//                       aria-describedby="alert-dialog-description"
//                     >
//                       <DialogTitle id="alert-dialog-title">
//                         {" Are you sure you want to logout?"}
//                       </DialogTitle>
//                       <DialogContent>
//                         <DialogContentText id="alert-dialog-description">
                         
//                         </DialogContentText>
//                       </DialogContent>
//                       <DialogActions>
//                         <Button onClick={handleCancelLogout}data-testid="no">No</Button>
//                         <Button onClick={handleConfirmLogout}data-testid="logout-button">
//                           Yes
//                         </Button>
//                       </DialogActions>
//                     </Dialog>
                  
      
//                   </div>
                 
//                 </li>
//               </ul>
//             )}
//           </span>
//         </div>
//       </nav>
//       <ToastContainer />
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const NavBar = () => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(sessionStorage.getItem('amount'));

  const handleLogout = () => {
    setOpen(true);
  };

  const handleConfirmLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('account');
    setOpen(false);
    Navigate('/');
  };

  const handleCancelLogout = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Function to fetch and update the balance
    const fetchBalance = () => {
      const id = JSON.parse(sessionStorage.getItem('account'))?.accountNumber;

      if (id) {
        fetch(`http://localhost:8080/account/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setBalance(data.balance);
            sessionStorage.setItem('amount', data.balance);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    };

    // Fetch balance initially
    fetchBalance();

    // Fetch balance every 10 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchBalance, 8000);

    // Clean up the interval
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="sticky-top">
      <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ">
        <Link className="navbar-brand" to="home">
          WalletBanking
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {sessionStorage.getItem('isLoggedIn') ? (
              <li className="nav-item active">
                <Link className="nav-link" to="home">
                  Dashboard <span className="sr-only">(current)</span>{' '}
                </Link>
              </li>
            ) : (
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>{' '}
                </Link>
              </li>
            )}

            {sessionStorage.getItem('isLoggedIn') && (
              <li className="nav-item">
                <Link className="nav-link" to="transaction">
                  Transactions{' '}
                </Link>
              </li>
            )}
          </ul>
          <span className="navbar-text text-white me-5">
            {sessionStorage.getItem('isLoggedIn') && (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <h4>Balance: ₹ {balance}</h4>
                </li>
                <li className="ml-5">
                  <div>
                    <Button variant="contained" color="error" onClick={handleLogout}>
                      LogOut
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleLogout}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {'Are you sure you want to logout?'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description"></DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCancelLogout} data-testid="no">
                          No
                        </Button>
                        <Button onClick={handleConfirmLogout} data-testid="logout-button">
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </li>
              </ul>
            )}
          </span>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

