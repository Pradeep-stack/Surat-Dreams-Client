import { useState } from "react";
import "../assets/styles/registration.css";
import { useNavigate } from "react-router-dom";
import { registerUser, uploadImage } from "../api/user";
import LoadingSpinner from "../components/common/Loader";
import { toast } from "react-toastify";
import { vendorValidation } from "../utils/vendorValidation";
import ConfirmationModal from "../components/common/ConfirmationModal";
const VendorRegistration = () => {
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    company: "",
    city: "",
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
    setProfilePicture(response?.Location);
    if(response?.Location) {
      setImgLoading(false);
    }
    console.log("response", response);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!profilePicture ) return toast.error("Please upload a profile picture");
    if (vendorValidation( formData, setErrors)) {
      setLoading(true);
      let userData = { ...formData, profile_pic: profilePicture };
      console.log("userData", userData);
      try {
        const response = await registerUser(userData);
        if (response?.data) {
        //   navigate("/download-page", { state: { user: response.data } });
        setModalShow(true)
         setFormData({
            name: "",
            phone: "",
            company: "",
            city: "",
            userType: "admin",
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
        <ConfirmationModal  show={modalShow}
        onHide={() => setModalShow(false)}/>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-header text-center">
                <h3>Vendor Registration</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
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

                  <div className="mb-3">
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

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
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

                  <div className="mb-3">
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

                  <div className="mb-3">
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
                  {/* <div className="mb-3">
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
                  </div> */}

                  <div className="row">
                    <div className="text-center">
                      {loading ? (
                        <button className="btn btn-secondary w-100">
                          Registering...
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary w-100">
                          Register
                        </button>
                      )}
                    </div>
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
