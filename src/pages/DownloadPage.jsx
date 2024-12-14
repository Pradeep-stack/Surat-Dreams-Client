import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import cardImage from "../assets/images/card.jpg";
import barCode from "../assets/images/qr.jpg";

const DownloadPage = () => {
  const [id, setId] = useState("");
  const [details, setDetails] = useState({});
  const printRef = useRef(); // Ref for printable section

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate generating dynamic data
    setDetails({
      id: id,
      name: "John Doe", // Placeholder name
      company: "Test Company",
      city: "Test City",
    });
  };

  // Handle Print
  const handlePrint = () => {
    const contentToPrint = printRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Admit Card</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .admit-card {
              border: 2px solid #000;
              padding: 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              text-align: center;
            }
            .card-img {
              width: 150px;
              height: auto;
            }
            .qr {
              width: 100px;
              height: auto;
            }
            .admit-card-info h3 {
              margin: 5px 0;
              font-size: 18px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          ${contentToPrint}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Download Your Admit Card</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="imageId">Enter ID:</label>
          <input
            type="text"
            id="imageId"
            className="form-control"
            placeholder="Enter image ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Generate Card
        </button>
      </form>

      {/* Card Preview */}
      {details.id && (
        <div >
          <div className="text-center">
          <p>Click below to download or print the card:</p>
          <button onClick={handleDownload} className="btn btn-success me-2">
            <i className="fas fa-download me-2"></i> Download Card
          </button>
          </div>
          {/* <button onClick={handlePrint} className="btn btn-secondary">
            <i className="fas fa-print me-2"></i> Print Card
          </button> */}

          {/* Printable Card Section */}

          <div className="mt-3" ref={printRef}>
            <div className="admit-card">
              <img src={cardImage} className="card-img" alt="Card" />
              <div className="admit-card-info">
                <h1>ID No.: {details.id}</h1>
                <h1>Name: {details.name}</h1>
                <h1>Comp: {details.company}</h1>
                <h1>City: {details.city}</h1>
              </div>
              <img src={barCode} className="qr" alt="QR Code" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadPage;
