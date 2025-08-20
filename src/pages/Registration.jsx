import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import LoadingSpinner from "../components/common/Loader";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { registerUser, uploadImage, whatsAppApiSend } from "../api/user";
import { userValidation } from "../utils/userValidation";
import "../assets/styles/newStall.css";
import sdLogo from "../assets/images/sd-logo.png";
import ieLogo from "../assets/images/ie-logo.png";
import registrationImg from "../assets/images/registration.png";

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
        city: cityName,
      };

      const response = await registerUser(userData);

      if (response?.data) {
        // await sendWhatsAppMessage(response.data);
        resetForm();
        setModalShow(true);
        toast.success("Registration successful!");
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
    <div>
      <ConfirmationModal show={modalShow} onHide={() => setModalShow(false)} />

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
          Buyer & Agent
        </div>
        <div className="image-center">
          <img src={registrationImg} width="700px" alt="Entry Card" />
        </div>
        <div className="stall-no">
          Please enter your details below to Register.
        </div>

        <div className="search-form">
          <form onSubmit={handleSubmit}>
            {/* <div className="field"> */}
              <input
                type="text"
        className={`field`}
                id="name"
                name="name"
                placeholder="Enter Your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            {/* </div> */}

            {/* Phone Field */}
            {/* <div className="field"> */}
              <input
                type="text"
                className={`field`}
                id="phone"
                name="phone"
                placeholder="Enter Your Mobile Number"
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

            {/* Company Field */}
            {/* <div className="field"> */}
              <input
                type="text"
              className={`field`}
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
            {/* </div> */}

            {/* User Type */}
            <select
              className="field"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                Select User Type
              </option>
              <option value="buyer">Buyer</option>
              <option value="agent">Agent</option>
            </select>

            {/* Location Fields */}

            {/* <label className="form-label fw-bold">State*</label> */}
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
              />
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
            </div>
            {/* <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold"></label>
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
                <label className="form-label fw-bold"></label>
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
            </div> */}

            {/* Profile Picture */}
            <div>
              {/* <label className="form-label fw-bold">
                Profile Picture{" "}
                {profilePicture && <span className="text-success">✓</span>}
                {imgLoading && <LoadingSpinner size="sm" className="ms-2" />}
              </label> */}
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

            {/* Submit Button */}

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

            {/* Links */}
          </form>
          <div
            className="text text-center"
            style={{ width: "max-content", marginLeft: "-90px" }}
          >
            Already registered?{" "}
            <Link to="/download-page" style={{ color: "#e8be62" }}>
              {" "}
              Download Your Entry Card
            </Link>{" "}
            |{" "}
            <Link to="vendor-registration" style={{ color: "#e8be62" }}>
              {" "}
              Exhibitor registration
            </Link>
          </div>
          <div className="text text-center mt-20 mb-20">
            {" "}
            on 1st & 2nd September 2025 | SHREE GANGA VALLEY | BITHOOR ROAD, KANPUR
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
