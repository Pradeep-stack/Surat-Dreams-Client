import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../assets/styles/style.css";
import Logoimg from "../assets/images/logo.png";

const UserInfo = ({ user }) => {
  // const location = useLocation();
  // const { user } = location.state || {};
  // console.log("user", user)
  return (
    <div className="container mt-5">
      <div className="logo-box">
        <img src={Logoimg} alt="" />
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="reg-form-container text-center mb-5">
            <div className="reg-form-header text-center">
              <p>User Information</p>
            </div>
            <div className="">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="user-info-box">
                    <h5>
                      <strong>Registration ID:</strong> {user?.id}
                    </h5>

                    <h5>
                      <strong>Name:</strong> {user?.name}
                    </h5>

                    <h5>
                      <strong>Company:</strong> {user?.company}
                    </h5>
                  </div>

                </div>
                <div className="col-md-6 mb-3">
                  <div className="user-info-box">
                    <h5>
                      <strong>Phone:</strong> {user?.phone}
                    </h5>
                    <h5>
                      <strong>City:</strong> {user?.city}
                    </h5>
                  </div>
                </div>
              </div>
              {/* Edit Button */}
              <div className="d-flex flex-row justify-content-center gap-3 mb-3">
                <div className="text-center mt-4">
                  <button className="user-info-btn">
                    <Link style={{ color: "white", textDecoration: "none" }} to="/">Go Back To Register</Link>
                  </button>
                </div>
                <div className="text-center mt-4">
                  <button className="user-info-btn">
                    <Link style={{ color: "white", textDecoration: "none" }} to="/download-page">Download Another Card</Link>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
