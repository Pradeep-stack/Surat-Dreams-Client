import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import LoadingSpinner from "../components/common/Loader";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { registerUser, uploadImage, whatsAppApiSend } from "../api/user";
import { userValidation } from "../utils/userValidation";
import Logoimg from "../assets/images/logo.png";
import "../assets/styles/style.css";

const Registration = () => {
  const initialState = {
    name: "",
    phone: "",
    company: "",
    email: "",
    password: "",
  };
  // Form state
  const [formData, setFormData] = useState(initialState);
  

  // UI state
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  
  // Location state
  const [countryId] = useState(101); // India
  const [stateId, setStateId] = useState(0);
  const [stateName, setStateName] = useState("");
  const [cityId, setCityId] = useState(0);
  const [cityName, setCityName] = useState("");
  
  // Other state
  const [profilePicture, setProfilePicture] = useState(null);
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size (1MB limit)
    if (file.size > 1024 * 1024) {
      return toast.error("Image should be less than 1MB");
    }

    setImgLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadImage(formData);
      
      if (response?.Location) {
        setProfilePicture(response.Location);
        toast.success("Image uploaded successfully");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setImgLoading(false);
    }
  };

  // const sendWhatsAppMessage = async (userData) => {
  //   try {
  //     const whatsAppData = {
  //       countryCode: "+91",
  //       phoneNumber: userData.phone,
  //       type: "Template",
  //       template: {
  //         name: "entry_pass_download_info",
  //         languageCode: "en_US",
  //         bodyValues: [
  //           userData.name,
  //           userData.id,
  //           "",
  //         ],
  //       },
  //     };
  //     await whatsAppApiSend(whatsAppData);
  //   } catch (error) {
  //     console.error("WhatsApp error:", error);
  //     // Fail silently - don't show error to user for WhatsApp
  //   }
  // };

  const resetForm = () => {
    setFormData(initialState);
    setProfilePicture(null);
    setUserType("");
    setStateId(0);
    setStateName("");
    setCityId(0);
    setCityName("");
    setErrors({
      name: "",
      phone: "",
      company: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!userValidation(formData, setErrors)) return;
    
    setLoading(true);
    try {
      const userData = { 
        ...formData, 
        profile_pic: profilePicture,
        userType, 
        state: stateName, 
        city: cityName 
      };
      
      const response = await registerUser(userData);
      
      if (response?.data) {
        // await sendWhatsAppMessage(response.data);
        resetForm();
        setModalShow(true);
        toast.success("Registration successful!");
      } else {
        const errorMsg = response?.response?.data?.message || "Registration failed";
        throw new Error(errorMsg);
      }
    } catch (error) {
     console.error("Registration error:", error);
     toast.error("Phone number already exists .!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page">
      <ConfirmationModal 
        show={modalShow} 
        onHide={() => setModalShow(false)} 
      />
      
      <div className="container mt-4">
        <div className="logo-box text-center mb-4">
          <img src={Logoimg} alt="Company Logo" className="img-fluid" />
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 ">
            <div className="card shadow-sm mb-5">
              <div className="reg-form-header text-center py-2">
                <h4 className="mb-0">Buyer/Agent Registration</h4>
              </div>
              
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name && "is-invalid"}`}
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label fw-bold">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone && "is-invalid"}`}
                      id="phone"
                      name="phone"
                      placeholder="Enter 10-digit phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  {/* Company Field */}
                  <div className="mb-3">
                    <label htmlFor="company" className="form-label fw-bold">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.company && "is-invalid"}`}
                      id="company"
                      name="company"
                      placeholder="Enter your company name"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                    {errors.company && (
                      <div className="invalid-feedback">{errors.company}</div>
                    )}
                  </div>

                  {/* User Type */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Registration Type*
                    </label>
                    <select
                      className="form-select"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      required
                    >
                      <option value="">Select Registration Type</option>
                      <option value="buyer">Buyer</option>
                      <option value="agent">Agent</option>
                    </select>
                  </div>

                  {/* Location Fields */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">State*</label>
                      <StateSelect
                        countryid={countryId}
                        value={stateId}
                        onChange={(e) => {
                          setStateId(e.id);
                          setStateName(e.name);
                          setCityId(0);
                          setCityName("");
                        }}
                        placeHolder="Select State"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">City*</label>
                      <CitySelect
                        countryid={countryId}
                        stateid={stateId}
                        value={cityId}
                        onChange={(e) => {
                          setCityId(e.id);
                          setCityName(e.name);
                        }}
                        placeHolder="Select City"
                        className="form-control"
                        disabled={!stateId}
                      />
                    </div>
                  </div>

                  {/* Profile Picture */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      Profile Picture {profilePicture && <span className="text-success">✓</span>}
                      {imgLoading && <LoadingSpinner size="sm" className="ms-2" />}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <div className="form-text">
                      Maximum file size: 1MB (JPEG/PNG)
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mb-3">
                    <button 
                      type="submit" 
                      className="user-info-btn2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Registering...
                        </>
                      ) : (
                        "Register Now"
                      )}
                    </button>
                  </div>

                  {/* Links */}
                  <div className="text-center">
                    <p className="mb-2">
                      Already registered?{" "}
                      <Link to="/download-page" className="text-primary">
                        Download Your Card
                      </Link>
                    </p>
                    <p className="mb-0">
                      For Exhibitor registration{" "}
                      <Link to="/vendor-registration" className="text-primary">
                        Click Here
                      </Link>
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