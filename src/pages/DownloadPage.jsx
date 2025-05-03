import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { getUser } from "../api/user";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/style.css";
import Logoimg from "../assets/images/logo.png";
const DownloadPage = () => {
  const [id, setId] = useState("");
  const [details, setDetails] = useState(null);
  const printRef = useRef(); // Ref for printable section
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await getUser(id);
    if (response?.data) {
      setDetails(response.data);
      console.log("response.data", response.data);
      setLoading(false);
    } else {
      toast.error("User not found");
      setLoading(false);
    }
  };

  // Handle Download
  const handleDownload = () => {
    if (!printRef.current) return;
    const element = printRef.current;
    html2canvas(element, {
      useCORS: true,
      allowTaint: false,
    }).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `AdmitCard.png`;
      link.click();
    });
  };
  

  console.log("details", details);

  if (details) {
    return (
      <div className="registration-page2">
        {details.id && (
          <div className="container mt-5">
            <div className="text-center">
              <p>Click below to download the entry card:</p>
              <button onClick={handleDownload} className="btn btn-success me-2">
                <i className="fas fa-download me-2"></i> Download
              </button>
              <button onClick={() => setDetails(null)} className="btn btn-success me-2">
                <i className="fas fa-download me-2"></i> Search Again
              </button>
            </div>

            <div className="mt-3" ref={printRef}>
               <img src={details?.badge_image_url} alt="" className="logo" /> 
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="registration-page2">
      <div className="container ">
        <div className="logo-box">
          <img src={Logoimg} alt="" />
        </div>
        <div className="box-container mb-5">
          <div className="reg-form-header text-center">
            <p>Download Your Entry Card</p>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
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
            <div className="align-items-center d-flex justify-content-center">
            <button type="submit" className="user-info-btn mt-3">
              {loading ? "Genrating..." : "Submit"}
            </button>
            </div>
           
            <div className="text-center mt-3">
              <Link to="/">
                <i className="fas fa-user-plus me-2"></i> Buyer/Agent Registration
              </Link>
              <Link to="/vendor-registration" >
                <i className="fas fa-user-plus me-2"></i> Exhibitor Owner/Staff Registration
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
