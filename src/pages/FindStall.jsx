import { useState } from "react";

import { getUser } from "../api/user";
import { toast } from "react-toastify";
import "../assets/styles/style.css";
import Congratulations from "../components/common/Congratulations";
import Logoimg from "../assets/images/logo.png";
import { updateUser } from "../api/user";
const DownloadPage = () => {
  const [id, setId] = useState("");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUserNotFound(false);
    const response = await getUser(id);
    if (response?.data) {
      setDetails(response.data);
      updateUserData(response.data.phone);
      setLoading(false);
    } else {
      setUserNotFound(true);
      toast.error("User not found");
      setLoading(false);
    }
  };

  // upat data

  const updateUserData = async (id) => {
    try {
      const data = {
        isWatched: true,
      };
      await updateUser(data, id);
      // toast.success("User data updated successfully");
    } catch (error) {
      toast.error("Failed to update user data", error.message);
    }
  };

  if (details) {
    return <Congratulations details={details} />;
  }
  return (
    <div className="registration-page2">
      <div className="container ">
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
            {userNotFound && (
              <div className="text-danger  mt-2 fw-bold">
                Exhibitor not found. Please check the phone number.
              </div>
            )}

            <div className="align-items-center d-flex justify-content-center">
              <button type="submit" className="user-info-btn mt-3">
                {loading ? "Genrating..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
