import { useState } from "react";
import "../assets/styles/style.css";
import { Link } from "react-router-dom";
import { registerUser, uploadImage } from "../api/user";
import Logoimg from "../assets/images/logo.png";
import LoadingSpinner from "../components/common/Loader";
import { toast } from "react-toastify";
import { vendorValidation } from "../utils/vendorValidation";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
const VendorRegistration = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    city: "",
    userType: "admin",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [countryId] = useState(101); // India
  const [stateId, setStateId] = useState(0);
  const [stateName, setStateName] = useState("");
  const [cityId, setCityId] = useState(0);
  const [cityName, setCityName] = useState("");
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
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
    if (response?.message === "Network Error"){
      setImgLoading(false);
      return toast.error("Image Should be less than 1MB");
    }
    setProfilePicture(response?.Location);
    if (response?.Location) {
      setImgLoading(false);
    }
    console.log("response", response);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!profilePicture ) return toast.error("Please upload a profile picture");
    if (vendorValidation(formData, setErrors)) {
      setLoading(true);
      let userData = { ...formData, profile_pic: profilePicture,userType: userType, state: stateName, city: cityName };
      try {
        const response = await registerUser(userData);
        if (response?.data) {
          //   navigate("/download-page", { state: { user: response.data } });
          setModalShow(true)
          setFormData({
            name: "",
            phone: "",
            company: "",
            email: "",
            password: ""
          })
          setProfilePicture(null)
          toast.success("User registered successfully");
        } else {
          console.log("Registration failed", response.response.data.message);
          toast.error(response.response.data.message);
          toast.error("User registered Failed Phone number already exist");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again." + error.message);
      } finally {
        setLoading(false);
        // toast.success("User registered Failed Phone number already exist"); 
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
                <p>Exhibitor Registration</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                  <div>
                    <label htmlFor="name" className="form-label fw-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""
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

                  <div >
                    <label htmlFor="phone" className="form-label fw-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone && formData.phone.length !== 10
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

                  <div >
                    <label htmlFor="email" className="form-label fw-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""
                        }`}
                      id="company"
                      name="email"
                      placeholder="Enter your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {!formData.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label fw-bold">
                      Company
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.company ? "is-invalid" : ""
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
                    <label className="form-label fw-bold">Exhibitor  Type</label>
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      style={{ marginTop: "8px" }}
                    >
                      <option value="">Select Exhibitor  Type</option>
                      <option value="member">Member</option>
                      <option value="exhibitor">Owner</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label fw-bold">State</label>

                    <StateSelect
                      countryid={countryId}
                      value={stateId}
                      onChange={(e) => {
                        setStateId(e.id);
                        setStateName(e.name); // 👈 Save name also
                        setCityId(0); // Reset city
                        setCityName("");
                      }}
                      placeHolder="Select State"
                    />
                  </div>
                  <div>
                    <label className="form-label fw-bold">City</label>
                    <CitySelect
                      countryid={countryId}
                      stateid={stateId}
                      value={cityId}
                      onChange={(e) => {
                        setCityId(e.id);
                        setCityName(e.name); // 👈 Save city name also
                      }}
                      placeHolder="Select City"
                    />
                  </div>
                
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Profile Picture
                    </label>
                    <div className="d-flex justify-content-between align-items-center">
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                        style={{ width: "90%" }} // Adjust the width as needed
                      />
                      <div
                        className="green-tick"
                        style={{
                          display: "block",
                          color: "green",
                          marginLeft: "10px",
                          
                        }}
                      >
                     <span className="mb-3"> {profilePicture? "✔" : ""}</span>  
                       <LoadingSpinner loading={imgLoading} />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="text-center">
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
                      <Link to="/vendor-download">Know Your Stall Number</Link>  
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

export default VendorRegistration;
