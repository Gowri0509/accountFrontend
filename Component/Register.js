
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

export default function Register() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    accountNumber: "",
    accountHolderName: "",
    email: "",
    balance: 0,
    mobileNumber: "",
    address: "",
    password: "",
    repeatPassword: "",
    transactionList: [],
  });
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateMobileNumber = (mobileNumber) => {
    const numericMobileNumber = mobileNumber.replace(/\D/g, "");

    if (numericMobileNumber.length !== 10) {
      setMobileNumberError("Mobile number should be 10 digits");
    } else {
      setMobileNumberError("");
    }
  };

  const onChangeMobileNumber = (event) => {
    const newMobileNumber = event.target.value;
    setAccount({ ...account, mobileNumber: newMobileNumber });
  };
  const validatePassword = () => {
    if (account.password !== account.repeatPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const onBlurMobileNumber = () => {
    validateMobileNumber(account.mobileNumber);
  };
  const onChangeAccountNumber = (event) => {
    setAccount({ ...account, accountNumber: event.target.value });
  };
  const onChangeAccountHolderName = (event) => {
    setAccount({ ...account, accountHolderName: event.target.value });
  };
  const onChangeEmail = (event) => {
    setAccount({ ...account, email: event.target.value });
  };
  const onChangeAddress = (event) => {
    setAccount({ ...account, address: event.target.value });
  };
  const onChangePassword = (event) => {
    setAccount({ ...account, password: event.target.value });
  };
  const onChangeRepeatPassword = (event) => {
    setAccount({ ...account, repeatPassword: event.target.value });
  };
  const onBlurPassword = () => {
    validatePassword();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //    Make the API call to your backend here
    fetch("http://localhost:8080/account/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Account already exist", {
            position: "top-center",
            autoClose: 1000,
          });
          throw new Error("Account already exist");
        }
        return response.json();
      })

      .then((data) => {
        setAccount(data);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("account", JSON.stringify(data));
        toast.success("LoggedIn Successfully", {
          position: "top-center",
          autoClose: 1000,
          onClose: () => {
            navigate("/home");
          },
        });
      })
      .catch((error) => {
        // Handle errors, if any

        console.error("Error:", error);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col my-5">
          {/* <!-- Pills navs --> */}
          <ToastContainer />
          <ul
            className="nav nav-pills nav-justified mb-3"
            id="ex1"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <a
                className="nav-link1"
                id="tab-login"
                data-mdb-toggle="pill"
                href="login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >
                Login
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link1"
                id="tab-register"
                data-mdb-toggle="pill"
                href="register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
              >
                Register
              </a>
            </li>
          </ul>
          {/* <!-- Pills navs --> */}

          {/* <!-- Pills content --> */}
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="tab-login"
            >
              <form onSubmit={handleSubmit} className="my-5">
                {/* <!-- Name input --> */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="accountNumber">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    className="form-control"
                    placeholder="Enter Account Number"
                    value={account.accountNumber}
                    onChange={onChangeAccountNumber}
                    data-testid="AccountNumber"
                    required
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="AccountHolderName">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    id="AccountHolderName"
                    className="form-control"
                    placeholder="Enter Account Holder Name"
                    value={account.accountHolderName}
                    onChange={onChangeAccountHolderName}
                    required
                  />
                </div>
                 {/* <!-- Username input --> */}
                <label className="form-label" htmlFor="mobileNumber">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  className={`form-control ${
                    mobileNumberError ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Mobile Number"
                  value={account.mobileNumber}
                  onChange={onChangeMobileNumber}
                  onBlur={onBlurMobileNumber}
                  required
                />
                {mobileNumberError && (
                  <div className="invalid-feedback">{mobileNumberError}</div>
                )}
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="registerEmail">
                    Email
                  </label>
                  <input
                    type="email"
                    id="registerEmail"
                    className="form-control"
                    placeholder="Enter Email"
                    value={account.email}
                    onChange={onChangeEmail}
                    required
                  />
                </div>
                {/* <!-- Address input --> */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Enter Address"
                    value={account.address}
                    onChange={onChangeAddress}
                    required
                  />
                </div>
                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="registerPassword">
                    Password
                  </label>
                  <input
                type="password"
                id="registerPassword"
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                placeholder="Enter Password"
                value={account.password}
                onChange={onChangePassword}
                onBlur={onBlurPassword}
                required
              />
            </div>
            
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="registerRepeatPassword">
                Repeat password
              </label>
              <input
                type="password"
                id="registerRepeatPassword"
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                placeholder="Enter the Password for Confirmation"
                value={account.repeatPassword}
                onChange={onChangeRepeatPassword}
                onBlur={onBlurPassword}
                required
              />
              {passwordError && (
                <div className="invalid-feedback">{passwordError}</div>
              )}
            </div>
                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-3"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
          {/* <!-- Pills content --> */}
        </div>
        <div className="col pic-Col-6"></div>
      </div>
    </div>
  );
}
