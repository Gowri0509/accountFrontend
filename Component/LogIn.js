import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import "./style.css";

export default function LogIn() {
  const navigate = useNavigate();
  const [logInCreditionals, SetLogInCreditionals] = useState({
    accountNumber: "",
    password: "",
  });
  const [account, setAccount] = useState({});

  const onChangeAccountNumber = (event) => {
    SetLogInCreditionals({
      ...logInCreditionals,
      accountNumber: event.target.value,
    });
  };
  const onChangePassword = (event) => {
    SetLogInCreditionals({
      ...logInCreditionals,
      password: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Make the API call to your backend here
    fetch("http://localhost:8080/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInCreditionals),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("UnAuthorised User", {
            position: "top-center",
            autoClose: 2000,
          });
          throw new Error("Unauthorised User");
        }
        return response.json();
      })
      .then((data) => {
        setAccount(data);
        console.log(data);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("account", JSON.stringify(data));
        toast.success("LoggedIn Successfully", {
          position: "top-center",
          autoClose: 2000,
          onClose: () => {
            navigate("/home");
          }
        })   
         })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error:", error);
      })
      //  .catch((err) => {
      //  toast.error("unAuthorised");
      // });
  };

  return (
    <div className="container">
      <div className="row  gx-5">
        <div className=" col my-5">
          {/* <!-- Pills navs --> */}
          {/* <ToastContainer></ToastContainer> */}
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
                href="#pills-login"
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
              <form onSubmit={handleSubmit}>
                <div className="my-5"></div>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="accountNumber">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    className="form-control"
                    placeholder="Enter Account Number"
                    value={logInCreditionals.accountNumber}
                    onChange={onChangeAccountNumber}
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="loginPassword">
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    className="form-control"
                    placeholder="Enter password"
                    value={logInCreditionals.password}
                    onChange={onChangePassword}
                  />
                </div>

                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign in
                </button>

                {/* <!-- Register buttons --> */}
                <div className="text-center"></div>
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



