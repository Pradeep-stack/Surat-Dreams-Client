import { useState, useRef } from "react";
import { getUser } from "../api/user";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/style.css";
import Logoimg from "../assets/images/logo.png";
import { imgBaseUrl } from "../config";
import { whatsAppApiSend } from "../api/user";
import sdLogo from "../assets/images/sd-logo.png";
import ieLogo from "../assets/images/ie-logo.png";
import entryCard from "../assets/images/entry-card.png";
const DownloadPage = () => {
  const [id, setId] = useState("");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(null);
  const printRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await getUser(id);
      if (response?.data) {
        setDetails(response.data);
        sendMessage(response.data, response.data.badge_image_url);
      } else {
        toast.error("User not found");
      }
    } catch (err) {
      setError("Failed to fetch user details");
      toast.error("An error occurred while fetching user details");
    } finally {
      setLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDownload = async (badgeUrl) => {
    try {
      // 1. Get secure URL
      const response = await fetch(
        `${imgBaseUrl}/secure-download?url=${encodeURIComponent(badgeUrl)}`
      );

      if (!response.ok) throw new Error("Failed to get download URL");

      const { url } = await response.json();

      // 2. Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = "AdmitCard.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Download failed");
      console.error("Download error:", error);
    }
  };

  const sendMessage = async (itme, imageUrl) => {
    if (!itme) return;
    try {
      const whatsAppData = {
        countryCode: "+91",
        phoneNumber: itme.phone,
        type: "Template",
        template: {
          name: "entry_pass_with_image",
          languageCode: "en_US",
          headerValues: [imageUrl],
          bodyValues: [itme.name, itme.id],
        },
      };
      await whatsAppApiSend(whatsAppData);
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      toast.error("Error sending WhatsApp message: " + error.message);
    }
  };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Admit Card</title>
          <style>
            body { margin: 0; padding: 0; }
            img { max-width: 100%; height: auto; }
            @page { size: auto; margin: 0; }
          </style>
        </head>
        <body>
          <img src="${details?.badge_image_url}" alt="Admit Card" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };


  if (details) {
    return (
      <div className="registration-page2">
        {details.id && (
          <div className="container mt-5">
            <div className="text-center">
              <button
                onClick={() => handleDownload(details.badge_image_url)}
                className="btn btn-success me-2"
              >
                <i className="fas fa-download me-2"></i> Download
              </button>
              {/* <button 
                onClick={handlePrint} 
                className="btn btn-primary me-2"
              >
                <i className="fas fa-print me-2"></i> Print
              </button> */}
              <button
                onClick={() => setDetails(null)}
                className="btn btn-secondary"
              >
                <i className="fas fa-search me-2"></i> Search Again
              </button>
            </div>

            <div className="mt-3 printable-area" ref={printRef}>
              {!imageLoaded && (
                <div className="text-center my-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Loading image...</p>
                </div>
              )}
              <img
                src={details?.badge_image_url}
                alt="Admit Card"
                className="img-fluid d-block mx-auto"
                onLoad={handleImageLoad}
                onError={() => toast.error("Failed to load image")}
                style={{ display: imageLoaded ? "block" : "none" }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mt-5">
        <div className="header">
          <div className="logo1">
            <img src={sdLogo} />
          </div>
          <div className="logo2">
            <img src={ieLogo} />
          </div>
        </div>
        <div
          className="image-center"
          style={{  marginTop: "90px" }}
        >
          <img src={entryCard} width="700px" alt="Entry Card" />
        </div>
        <div className="stall-no">
          Please enter your details below to download your Entry Card.
        </div>

        <div className="search-form">
          <input
            type="text"
            className="field"
            placeholder="ENTER YOUR MOBILE NUMBER"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            pattern="[0-9]{10}"
            maxLength="10"
          />
          <button className="form-button" onClick={handleSubmit}>
           {loading ? "Loading...":"Click here"} 
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="text text-center">
          Still can’t find your admit card?{" "}
          <a href="mailto:info@suratdreams.com" style={{ color: "#e8be62" }}> Contact support</a> for help.
        </div>
        <div className="text text-center mt-20 mb-20">
          {" "}
          12 - 13 Aug 2025 | India Expo Mart | Greater Noida
        </div>
        {/* <form  style={{ padding: "20px" }}>
        <div className="form-group mb-3">
          <label htmlFor="imageId" className="fw-bold mb-2">
            Enter Registered Phone Number:
          </label>
          <input
            type="tel"
            id="imageId"
            className="form-control"
            placeholder="Enter 10-digit Phone Number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            pattern="[0-9]{10}"
            maxLength="10"
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

    

        <div className="text-center mt-4">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/" className="btn btn-outline-primary">
              <i className="fas fa-user-plus me-2"></i> Buyer/Agent Registration
            </Link>
            <Link to="/vendor-registration" className="btn btn-outline-primary">
              <i className="fas fa-user-plus me-2"></i> Exhibitor Registration
            </Link>
          </div>
        </div>
      </form> */}
      </div>
    </>
  );
};

export default DownloadPage;
