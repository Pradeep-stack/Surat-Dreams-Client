import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import LoadingSpinner from "../components/common/Loader";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { registerUser, uploadImage } from "../api/user";
import { vendorValidation } from "../utils/vendorValidation";
import Logoimg from "../assets/images/logo.png";
import "../assets/styles/style.css";
import sdLogo from "../assets/images/sd-logo.png";
import ieLogo from "../assets/images/ie-logo.png";
import registrationImg from "../assets/images/registration.png";

const VendorRegistration = () => {
  // Initial state values
  const initialState = {
    name: "",
    phone: "",
    company: "",
    email: "",
    password: "",
    userType: "admin",
  };

  // Form state
  const [formData, setFormData] = useState(initialState);
  const [profilePicture, setProfilePicture] = useState(null);
  const [countryId] = useState(101); // India
  const [stateId, setStateId] = useState(0);
  const [stateName, setStateName] = useState("");
  const [cityId, setCityId] = useState(0);
  const [cityName, setCityName] = useState("");
  const [userType, setUserType] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
  });

  // Reset all form state
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
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!vendorValidation(formData, setErrors)) return;

    setLoading(true);
    try {
      const userData = {
        ...formData,
        profile_pic: profilePicture,
        userType,
        state: stateName,
        city: cityName,
      };

      const response = await registerUser(userData);

      if (response?.data) {
        setModalShow(true);
        toast.success("Registration successful!");
        resetForm(); // Clear all form state after success
      } else {
        const errorMsg =
          response?.response?.data?.message || "Registration failed";
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
      <ConfirmationModal show={modalShow} onHide={() => setModalShow(false)} />

      {/* <div className="container mt-4">
        <div className="logo-box text-center mb-4">
          <img src={Logoimg} alt="Company Logo" className="img-fluid" />
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm mb-5">
            <div className="reg-form-header text-center py-2">
                <h4 className="mb-0">Exhibitor Owner/Staff Registration</h4>
              </div>
              
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                
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

               
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">
                      Email*
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email && "is-invalid"}`}
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

              
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

              
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Exhibitor Type*
                    </label>
                    <select
                      className="form-select"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      required
                    >
                      <option value="">Select Exhibitor Type</option>
                      <option value="member">Member</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>

                
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

            
                  <div className="text-center">
                    <p className="mb-0">
                      Already registered?{" "}
                      <Link to="/download-page" className="text-primary">
                        Download Your Card
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container mt-4">
        <div className="header">
          <div className="logo1">
            <img src={sdLogo} />
          </div>
          <div className="logo2">
            <img src={ieLogo} />
          </div>
        </div>

        <div
          className="stall-no"
          style={{ fontSize: "28px", marginTop: "100px" }}
        >
          Exhibitor Owner / Staff Registration
        </div>

        <div className="image-center">
          <img src={registrationImg} width="700px" alt="Entry Card" />
        </div>

        <div className="stall-no">
          Please enter your details below to Register.
        </div>

        <div className="search-form">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            {/* <div className="field"> */}
              <input
                type="text"
                className={`field`}
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            {/* </div> */}

            {/* Phone */}
            {/* <div className="field"> */}
              <input
                type="text"
               className={`field`}
                name="phone"
                placeholder="Enter Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={10}
                pattern="[0-9]{10}"
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            {/* </div> */}

            {/* Email */}
            {/* <div className="field"> */}
              <input
                type="email"
                className={`field`}
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            {/* </div> */}

            {/* Company */}
            {/* <div className="field"> */}
              <input
                type="text"
             className={`field`}
                name="company"
                placeholder="Enter Company Name"
                value={formData.company}
                onChange={handleChange}
                required
              />
              {errors.company && (
                <div className="invalid-feedback">{errors.company}</div>
              )}
            {/* </div> */}

            {/* Staff Type */}
            {/* <div className="field"> */}
            <select
              className="field"
              name="staffType"
              value={formData.staffType}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Select User Type
              </option>
              <option value="owner">Owner</option>
              <option value="staff">Staff</option>
            </select>
            {errors.staffType && (
              <div className="invalid-feedback">{errors.staffType}</div>
            )}
            {/* </div> */}

            {/* Location */}
            <div className="custom-state-select mb-3">
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
              {errors.state && (
                <div className="invalid-feedback">{errors.state}</div>
              )}
            </div>
            <div className="custom-state-select mb-3">
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
              {errors.city && (
                <div className="invalid-feedback">{errors.city}</div>
              )}
            </div>

            {/* Profile Picture */}
            <div>
              <input
                type="file"
                className="field"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p style={{ color: "white" }}>
                Maximum file size: 1MB (JPEG/PNG)
              </p>
              <br />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="form-button"
              disabled={loading}
              style={{ marginTop: "-25px" }}
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
          </form>

          {/* Links */}
          <div
            className="text text-center"
            style={{ width: "max-content", marginLeft: "-90px" }}
          >
            Already registered?{" "}
            <Link to="/download-page" style={{ color: "#e8be62" }}>
              Download Your Entry Card
            </Link>{" "}
            |{" "}
            <Link to="/" style={{ color: "#e8be62" }}>
              Buyer & Agent Registration
            </Link>
          </div>
          <div className="text text-center mt-20 mb-20">
            12 - 13 Aug 2025 | India Expo Mart | Greater Noida
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegistration;
