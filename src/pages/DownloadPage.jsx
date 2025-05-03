import { useState, useRef } from "react";
import { getUser } from "../api/user";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/style.css";
import Logoimg from "../assets/images/logo.png";
import { imgBaseUrl } from "../config";

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
              <p>Click below to download the entry card:</p>
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
    <div className="registration-page2">
      <div className="container">
        <div className="logo-box">
          <img src={Logoimg} alt="Company Logo" className="img-fluid" />
        </div>
        <div className="box-container mb-5">
          <div className="reg-form-header text-center">
            <h2>Download Your Entry Card</h2>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
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
            
            <div className="text-center mt-4" style={{width: "100%"}}>

              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={loading}
                style={{ paddingInline:"40px" }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Generating...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>

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
          </form>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;