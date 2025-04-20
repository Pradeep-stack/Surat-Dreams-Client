import { useState } from "react";
import "../assets/styles/style.css";
// import { useNavigate } from "react-router-dom";
import { registerUser, uploadImage } from "../api/user";
import LoadingSpinner from "../components/common/Loader";
import Logoimg from "../assets/images/logo.png";
import { toast } from "react-toastify";
import { userValidation } from "../utils/userValidation";
import { whatsAppApiSend } from "../api/user";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { Link } from "react-router-dom";
const Registration = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    city: "",
    userType: "user",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    company: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    setImgLoading(true);
    const file = e.target.files[0];
    console.log("file", file);
    const formData = new FormData();
    formData.append("image", file);
    const response = await uploadImage(formData);
    console.log("response===", response.message);
    if (response?.message === "Network Error") {
      setImgLoading(false);
      return toast.error("Image Should be less than 1MB");
    }
    setProfilePicture(response?.Location);
    if (response?.Location) {
      setImgLoading(false);
    }
  };

   const sendMessage = async (itme) => {
        if (!itme) return;
        try {
          const whatsAppData = {
            countryCode: "+91",
            phoneNumber: itme.phone,
            type: "Template",
            template: {
              name: "entry_pass_download_info",
              languageCode: "en_US",
              bodyValues: [itme.name, itme.id, "https://surat-dreams.vercel.app/download-page"],
            },
          };
          await whatsAppApiSend(whatsAppData);
        } catch (error) {
          console.error("Error sending WhatsApp message:", error);
          toast.error("Error sending WhatsApp message: " + error.message);
        }
      };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!profilePicture) return toast.error("Please upload a profile picture");
    if (userValidation(formData, setErrors)) {
      setLoading(true);
      let userData = { ...formData, profile_pic: profilePicture };
      try {
        const response = await registerUser(userData);
        if (response?.data) {
          sendMessage(response?.data);
          setModalShow(true)
          // navigate("/download-page", { state: { user: response.data } });
          toast.success("User registered successfully");
        } else {
          console.log("Registration failed", response.response.data.message);
          toast.error("Registration failed phone number already exists");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again." + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="registration-page">
       <ConfirmationModal show={modalShow}
              onHide={() => setModalShow(false)} />
      <div className="container mt-5">
        <div className="logo-box">
          <img src={Logoimg} alt="" />
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="reg-form-container mb-5">
              <div className="reg-form-header text-center">
                <p>Buyer Registration</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                  <div>
                    <label htmlFor="name" className="form-label fw-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label fw-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${
                        errors.phone && formData.phone.length !== 10
                          ? "is-invalid"
                          : ""
                      }`}
                      id="phone"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      maxLength={10}
                    />
                    {errors.phone && formData.phone.length !== 10 && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label fw-bold">
                      Company
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.company ? "is-invalid" : ""
                      }`}
                      id="company"
                      name="company"
                      placeholder="Enter your Company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                    {!formData.company && (
                      <div className="invalid-feedback">{errors.company}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city" className="form-label fw-bold">
                      City
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.city ? "is-invalid" : ""
                      }`}
                      id="city"
                      name="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center w-100 position-relative">
                      <label className="form-label fw-bold">
                        Profile Picture
                      </label>
                      <div
                        className="green-tick"
                        style={{
                          display: "block",
                          color: "green",
                          marginTop: "25px",
                        }}
                      >
                        <span> {profilePicture ? "✔" : ""}</span>
                        <LoadingSpinner loading={imgLoading} />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        style={{ width: "100%" }} // Adjust the width as needed
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="text-center mt-3">
                      {loading ? (
                        <button className="user-info-btn2">
                          Registering...
                        </button>
                      ) : (
                        <button type="submit" className="user-info-btn2">
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <p>
                      Already have registration?{" "}
                      <Link to="/download-page">Download Your Card</Link>  
                    </p>
                  </div>  
                  <div className="text-center mt-3">
                    <p>
                      For vendor registration{" "}
                      <Link to="/vendor-registration">Click Here</Link>  
                    </p>  
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
