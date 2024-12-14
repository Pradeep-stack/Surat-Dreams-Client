import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const UserInfo = () => {
  const location = useLocation();
  const { user } = location.state || {};
 return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header text-center bg-primary text-white">
            <h3>User Information</h3>
          </div>
          <div className="card-body">
            User Information Display
            <div className="mb-3">
              <h5><strong>Name:</strong> {user.name}</h5>
            </div>
            <div className="mb-3">
              <h5><strong>Email:</strong> {user.email}</h5>
            </div>
            <div className="mb-3">
              <h5><strong>Phone:</strong> {user.phone}</h5>
            </div>
            <div className="mb-3">
              <h5><strong>City:</strong> {user.city}</h5>
            </div> 
            {/* Edit Button */}
            <div className="text-center">
              <button className="btn btn-warning">
                <Link to="/">Go Back To Homepage</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};


export default UserInfo;
