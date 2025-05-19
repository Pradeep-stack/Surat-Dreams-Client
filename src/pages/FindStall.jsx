import { useState } from "react";
import { getUser } from "../api/user";
import { toast } from "react-toastify";
import "../assets/styles/style.css";
import Congratulations from "../components/common/Congratulations";
import Logoimg from "../assets/images/logo.png";
import { updateUser, whatsAppApiSend } from "../api/user";

const DownloadPage = () => {
  const [id, setId] = useState("");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false); // New state to track verification

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUserNotFound(false);

    try {
      const response = await getUser(id);
      if (response?.data) {
        setDetails(response.data);
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(generatedOtp);
        await sendWhatsAppMessage(response.data, generatedOtp);
        setLoading(false);
        // Show Congratulations first, then verification
        toast.success("OTP sent to your WhatsApp number");
        setIsVerified(false);
        setVerificationStep(true);
      } else {
        setUserNotFound(true);
        toast.error("User not found");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const sendWhatsAppMessage = async (userData, otp) => {
    try {
      const whatsAppData = {
        countryCode: "+91",
        phoneNumber: userData.phone,
        type: "Template",
        template: {
          name: "exhibitor_info",
          languageCode: "en_US",
          bodyValues: [otp],
        },
      };
      await whatsAppApiSend(whatsAppData);
    } catch (error) {
      console.error("WhatsApp error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp === generatedOtp) {
      try {
        await updateUserData(details.phone);
        setIsVerified(true);
        setVerificationStep(false);
      } catch (error) {
        toast.error("Verification failed. Please try again.");
      }
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const updateUserData = async (id) => {
    try {
      const data = {
        isWatched: true,
        userType: "exhibitor",
      };
      await updateUser(data, id);
    } catch (error) {
      toast.error("Failed to update user data", error.message);
      throw error; // Re-throw to handle in the calling function
    }
  };

  // Show Congratulations if verified
  if (details && isVerified) {
    return <Congratulations details={details} />;
  }

  // Show verification form if in verification step
  if (verificationStep) {
    return (
      <div className="registration-page2">
        <div className="container">
          <div className="logo-box">
            <img src={Logoimg} alt="" />
          </div>
          <div className="box-container mb-5">
            <div className="reg-form-header text-center">
              <p>Verify OTP</p>
            </div>
            <div style={{ padding: "20px" }}>
              <div className="form-group">
                <label htmlFor="otp" className="fw-bold">
                  Enter OTP sent to your WhatsApp:
                </label>
                <input
                  type="number"
                  id="otp"
                  className="form-control mt-2"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div className="align-items-center d-flex justify-content-center mt-3">
                <button onClick={handleVerifyOtp} className="user-info-btn">
                  Verify OTP
                </button>
              </div>
              <div className="text-center mt-3">
                <button
                  className="btn btn-link"
                  onClick={() => {
                    setVerificationStep(false);
                    setDetails(null);
                  }}
                >
                  Back to Phone Number
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default view - phone number input
  return (
    <div className="registration-page2">
      <div className="container">
        <div className="logo-box">
          <img src={Logoimg} alt="" />
        </div>
        <div className="box-container mb-5">
          <div className="reg-form-header text-center">
            <p>Find Your Stall</p>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
            <div className="form-group">
              <label htmlFor="imageId" className="fw-bold">
                Enter Registered Phone Number:
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
            {userNotFound && (
              <div className="text-danger mt-2 fw-bold">
                Exhibitor not found. Please check the phone number.
              </div>
            )}
            <div className="align-items-center d-flex justify-content-center">
              <button
                type="submit"
                className="user-info-btn mt-3"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
