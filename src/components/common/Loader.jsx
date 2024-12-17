import React from "react";
import { RotatingLines } from "react-loader-spinner";
import "./style.css";
const LoadingSpinner = ({ loading, wrapperStyle }) => {
  if (!loading) return null;
  return (
    <div className="fullscreen-loader">
      <div className="loader-overlay"></div>
      <div className="loader-content">
        <RotatingLines
          height={80}
          width={80}
          color="#F2AF58"
          wrapperStyle={wrapperStyle}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#fc1303"
          strokeWidth={5}
          strokeWidthSecondary={5}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
