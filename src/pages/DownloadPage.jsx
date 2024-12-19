import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import cardImage from "../assets/images/card.jpg";
import barCode from "../assets/images/qr.jpg";
import { getUser } from "../api/user";
import UserInfo from "./UserInfo";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const DownloadPage = () => {
  const [id, setId] = useState("");
  const [details, setDetails] = useState({});
  const location = useLocation();
  const { user } = location.state || {};
  const printRef = useRef(); // Ref for printable section
  const [loading, setLoading] = useState(false);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await getUser(id);
    if (response?.data) {
      setDetails(response.data);
      setLoading(false);
    } else {
      toast.error("User not found");
      setLoading(false);
    }
  };

  // Handle Print
  // const handlePrint = () => {
  //   const contentToPrint = printRef.current.innerHTML;
  //   const printWindow = window.open("", "", "width=800,height=600");
  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>Print Admit Card</title>
  //         <style>
  //           body {
  //             font-family: Arial, sans-serif;
  //             margin: 20px;
  //           }
  //           .admit-card {
  //             border: 2px solid #000;
  //             padding: 20px;
  //             display: flex;
  //             align-items: center;
  //             justify-content: space-between;
  //             text-align: center;
  //           }
  //           .card-img {
  //             width: 150px;
  //             height: auto;
  //           }
  //           .qr {
  //             width: 100px;
  //             height: auto;
  //           }
  //           .admit-card-info h3 {
  //             margin: 5px 0;
  //             font-size: 18px;
  //             font-weight: bold;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         ${contentToPrint}
  //       </body>
  //     </html>
  //   `);
  //   printWindow.document.close();
  //   printWindow.print();
  //   printWindow.close();
  // };

  // Handle Download
  const handleDownload = () => {
    const element = printRef.current;
    html2canvas(element).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `AdmitCard-${details.id}.png`;
      link.click();
    });
  };

  if (user) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Download Your Admit Card</h2>
        <UserInfo user={user} />
        {/* Card Preview */}
        {user.id && (
          <div>
            <div className="text-center">
              <p>Click below to download the card:</p>
              <button onClick={handleDownload} className="btn btn-success me-2">
                <i className="fas fa-download me-2"></i> Download Card
              </button>
            </div>

            {/* Printable Card Section */}

            <div className="mt-3" ref={printRef}>
              <div className="admit-card">
                <img src={cardImage} className="card-img" alt="Card" />
                <div className="admit-card-info">
                  <p className="user-info">ID  : {user?.id}</p>
                  <p className="user-info">Name: {user?.name}</p>
                  <p className="user-info">Comp: {user?.company}</p>
                  <p className="user-info">City: {user?.city}</p>
                </div>
                <img src={barCode} className="qr" alt="QR Code" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Download Your Admit Card</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <label htmlFor="imageId" className="fw-bold">
              Enter Registred Phone Number:
            </label>
            <input
              type="number"
              id="imageId"
              className="form-control mt-2"
              placeholder="Enter Phone Number"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {loading ? "Genrating..." : "Generate Card"}
          </button>
        </form>
        {details.id && <UserInfo user={details} />}
        {/* Card Preview */}
        {details.id && (
          <div>
            <div className="text-center">
              <p>Click below to download the card:</p>
              <button onClick={handleDownload} className="btn btn-success me-2">
                <i className="fas fa-download me-2"></i> Download Card
              </button>
            </div>

            {/* Printable Card Section */}

            <div className="mt-3" ref={printRef}>
              <div className="admit-card">
                <img src={cardImage} className="card-img" alt="Card" />
                <div className="admit-card-info">
                <p className="user-info">ID  : {user?.id}</p>
                  <p className="user-info">Name: {user?.name}</p>
                  <p className="user-info">Comp: {user?.company}</p>
                  <p className="user-info">City: {user?.city}</p>
                </div>
                <img src={barCode} className="qr" alt="QR Code" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default DownloadPage;
