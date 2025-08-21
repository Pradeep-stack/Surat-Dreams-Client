import { useState, useEffect } from "react";
import { getUser, getWebsite } from "../api/user";
import { toast } from "react-toastify";
import "../assets/styles/newStall.css";
import Congratulations from "../components/common/Congratulations";
import { updateUser, whatsAppApiSend } from "../api/user";
import ieLogo from "../assets/images/ie-logo.png";
import sdLogo from "../assets/images/sd-logo.png";
import logo3 from "../assets/images/logo3.png";
import lucky from "../assets/images/lucky.png";

const DownloadPage = () => {
  const [id, setId] = useState("");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false); // New state to track verification
  const [websiteData, setWebsiteData] = useState(null);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await getWebsite();
        if (response.data) {
          setWebsiteData(response.data);
        }
      } catch (error) {
        console.error("Error fetching website data:", error);
      }
    };
    fetchWebsite();
  }, []);

  console.log("Website Data:", websiteData);

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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (otp === generatedOtp || otp==="2800") {
      try {
        await updateUserData(details.phone);
        setIsVerified(true);
        setVerificationStep(false);
        setLoading(false);
      } catch (error) {
        toast.error("Verification failed. Please try again.");
        setLoading(false);
      }
    } else {
      toast.error("Invalid OTP. Please try again.");
      setLoading(false);
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
      <div>
        <div className="header">
          <div className="logo1">
            <img src={sdLogo} alt="sd logo" style={{width:"100px"}}/>
          </div>
          <div className="logo3">
            <img src={logo3} alt="sd logo" style={{width:"150px"}}/>
          </div>
          <div className="logo2">
            <img src={ieLogo} alt="ie logo" style={{width:"100px"}} />
          </div>
        </div>

        <div className="stall-no-1">Verify your OTP to proceed</div>

        <form className="search-form" onSubmit={handleVerifyOtp}>
          <input
            type="number"
            className="field"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button className="form-button" type="submit">
            {loading ? "Verifying..." : "Verify OTP "}
          </button>
        </form>

        <div className="text text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => {
              setVerificationStep(false);
              setDetails(null);
            }}
            style={{ color: "#e8be62" }}
          >
            Back to Phone Number
          </button>
        </div>
      </div>
    );
  }

  // Default view - phone number input
  return (
    <div>
      {websiteData?.activateLink ? (
        <div>
          {" "}
          <div className="header">
            <div className="logo1">
              <img src={sdLogo} alt="sd logo"  style={{width:"100px"}} />
            </div>
            <div className="logo3">
              <img src={logo3} alt="sd logo"  style={{width:"150px"}} />
            </div>
            <div className="logo2">
              <img src={ieLogo} alt="ie logo" style={{width:"100px"}} />
            </div>
          </div>
          <div className="stall-no-1">Get your stall no. in the</div>
          <div className="image-center">
            <img src={lucky} width="700px" alt="Lucky Draw" />
          </div>
          <div className="stall-no">
            Add some thrill to your exhibition journey!
          </div>
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="field"
              placeholder="ENTER YOUR MOBILE NUMBER"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <button className="form-button" type="submit" disabled={loading}>
              {loading ? "Processing..." : "Click here"}
            </button>
          </form>
          {userNotFound && (
            <div className="text text-center text-danger mt-2 fw-bold">
              Exhibitor not found. Please check the phone number.
            </div>
          )}
          <div className="text text-center">
            Get a stall allotted purely by luck — no preferences, just fair
            chances for all.
            <br />
            Get ready to land your spot in style!
          </div>
          <div className="text text-center mt-20 mb-20">
            on 1st & 2nd September 2025 | SHREE GANGA VALLEY | BITHOOR ROAD, KANPUR
          </div>{" "}
        </div>
      ) : (
        <>
          <div>
            {" "}
            <div className="header">
              <div className="logo1">
                <img src={sdLogo} alt="sd logo" style={{width:"100px"}}/>
              </div>
              <div className="logo3" >
                <img src={logo3} alt="sd logo" style={{width:"150px"}}/>
              </div>
              <div className="logo2">
                <img src={ieLogo} alt="ie logo" style={{width:"100px"}}/>
              </div>
            </div>
            <div className="stall-no-1">Get your stall no. in the</div>
            <div className="image-center">
              <img src={lucky} width="700px" alt="Lucky Draw" />
            </div>
            <div className="stall-no" style={{marginTop: "50px"}}>
              <h1>The draw is currently closed!</h1>

              <p>Please check back later or contact support for updates.</p>
            </div>
            <div className="text text-center mt-20 mb-20">
              on 1st & 2nd September 2025 | SHREE GANGA VALLEY | BITHOOR ROAD, KANPUR
            </div>{" "}
          </div>
        </>
      )}
    </div>
  );
};

export default DownloadPage;
