import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    return sessionStorage.getItem("isLoggedIn") ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;