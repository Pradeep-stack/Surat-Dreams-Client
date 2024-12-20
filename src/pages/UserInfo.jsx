import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UserInfo = ({ user }) => {
  // const location = useLocation();
  // const { user } = location.state || {};
  // console.log("user", user)
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center bg-success text-white">
              <h3>User Information</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h5>
                    <strong>Registration ID:</strong> {user?.id}
                  </h5>
                </div>
                <div className="col-md-6 mb-3">
                  <h5>
                    <strong>Phone:</strong> {user?.phone}
                  </h5>
                </div>
                <div className="col-md-6 mb-3">
                  <h5>
                    <strong>Name:</strong> {user?.name}
                  </h5>
                </div>

                <div className="col-md-6 mb-3">
                  <h5>
                    <strong>City:</strong> {user?.city}
                  </h5>
                </div>
                <div className="col-md-6 mb-3">
                  <h5>
                    <strong>Company:</strong> {user?.company}
                  </h5>
                </div>
              </div>
              {/* Edit Button */}
              <div className=" d-flex flex-row justify-content-center gap-3">  <div className="text-center mt-4">
                <button className="btn btn-warning">
                  <Link to="/">Go Back To Register</Link>
                </button>
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-warning">
                  <Link to="/download-page">Download Another Card</Link>
                </button>
              </div></div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
