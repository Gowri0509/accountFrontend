import React from "react";
import "./style.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomeFirst() {
    return (
        <div className="container"> 
            <div className="row">
                <div className="col-6">
              
                    <div className="content"> 
                        <span className="content-text">
                        Our cutting-edge wallet banking app can help you take control of your funds.
                            Learn about a world of seamless payments, quick transactions, and unmatched convenience. Thank you for visiting the banking of the future, available at your fingertips.

                        </span>
                    </div>
                    <div className="mt-5">
                        <Link to="/login">
                            <Button variant="contained">Start Here</Button>
                        </Link>
                    </div>
                </div>
                <div className="col-6 pic-Col-6"></div>
            </div>
        </div>
    );
}
