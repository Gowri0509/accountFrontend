import logo from './logo.svg';
import './App.css';
import NavBar from './Component/NavBar';
import Transaction from './Component/Transaction';
import Home from './Component/Home';
import React, { Component } from 'react';
import Deposite from './Component/Deposite';
import SendAmountForm from './Component/SendAmountForm';
import { render } from 'react-dom';
import Register from './Component/Register';
import LogIn from './Component/LogIn';
import HomeFirst from './Component/HomeFirst';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Component/PrivateRoute';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomeFirst />} />
        <Route path="/login" element={< LogIn />} />
        <Route path="/register" element={< Register />} />
        <Route
          exact
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/transaction"
          element={
            <PrivateRoute>
              <Transaction />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/deposite"
          element={
            <PrivateRoute>
              <Deposite />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/addAmount"
          element={
            <PrivateRoute>
              <SendAmountForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </>


  );
}

export default App;
