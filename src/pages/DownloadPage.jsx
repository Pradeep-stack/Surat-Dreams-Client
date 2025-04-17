import  { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import cardImage from "../assets/images/card.jpg";
// import barCode from "../assets/images/qr.jpg";
import { getUser } from "../api/user";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/style.css";
import Congratulations from "../components/common/Congratulations";
import UserQRCard from "../components/UserQRCard";
import { uploadImage } from "../api/user";
import { whatsAppApiSend } from "../api/user";
// import { whatsAppApiSend, prepareWhatsAppPayload } from "../api/user";
const DownloadPage = () => {
  const [id, setId] = useState("");
  const [details, setDetails] = useState(null);
  const location = useLocation();
  const { user } = location.state || {};
  const printRef = useRef(); // Ref for printable section
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await getUser(id);
    if (response?.data) {
      setDetails(response.data);
      setLoading(false);
    } else {
      toast.error("User not found");
      setLoading(false);
    }
  };

  // Handle Download
  // const handleDownload = () => {
  //   const element = printRef.current;
  //   html2canvas(element, {
  //     useCORS: true,
  //     allowTaint: false,
  //   }).then((canvas) => {
  //     const image = canvas.toDataURL("image/png");
  //     const link = document.createElement("a");
  //     link.href = image;
  //     link.download = `AdmitCard.png`;
  //     link.click();
  //   });

  // };

  const handleDownload = () => {
    const element = printRef.current;
    html2canvas(element, {
      useCORS: true,
      allowTaint: false,
    }).then((canvas) => {
      // Get the context of the canvas
      const context = canvas.getContext("2d");
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      let cropX = canvas.width;
      let cropY = canvas.height;
      let cropWidth = 0;
      let cropHeight = 0;

      // Find the boundaries of the non-white content
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4; // RGBA index
          const [r, g, b, a] = [
            imageData.data[index],
            imageData.data[index + 1],
            imageData.data[index + 2],
            imageData.data[index + 3],
          ];

          // Check if pixel is not white
          if (!(r === 255 && g === 255 && b === 255 && a === 255)) {
            cropX = Math.min(cropX, x);
            cropY = Math.min(cropY, y);
            cropWidth = Math.max(cropWidth, x);
            cropHeight = Math.max(cropHeight, y);
          }
        }
      }

      // Adjust crop dimensions
      cropWidth -= cropX;
      cropHeight -= cropY;

      // Create a new cropped canvas
      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;
      const croppedContext = croppedCanvas.getContext("2d");

      // Draw the cropped image
      croppedContext.drawImage(
        canvas,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      // Generate the image URL and trigger download
      const croppedImage = croppedCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = croppedImage;
      link.download = "EntryCard.png";
      link.click();
    });
  };

  const handleImageUpload = async () => {
    if (!user) return;
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: false,
    });
  
    // Get the context of the canvas
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  
    let cropX = canvas.width;
    let cropY = canvas.height;
    let cropWidth = 0;
    let cropHeight = 0;
  
    // Find the boundaries of the non-white content
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const [r, g, b, a] = [
          imageData.data[index],
          imageData.data[index + 1],
          imageData.data[index + 2],
          imageData.data[index + 3],
        ];
  
        if (!(r === 255 && g === 255 && b === 255 && a === 255)) {
          cropX = Math.min(cropX, x);
          cropY = Math.min(cropY, y);
          cropWidth = Math.max(cropWidth, x);
          cropHeight = Math.max(cropHeight, y);
        }
      }
    }
  
    // Adjust crop dimensions
    cropWidth -= cropX;
    cropHeight -= cropY;
  
    // Create cropped canvas
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
    const croppedContext = croppedCanvas.getContext("2d");

    croppedContext.drawImage(
      canvas,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );
    const croppedImage = croppedCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = "EntryCard.png"+user.id;
    link.click();
    try {
      const blob = await (await fetch(croppedImage)).blob();
      const formData = new FormData();
      formData.append("image", blob, "EntryCard.png"+user.id);
      const response = await uploadImage(formData);
      
      if (response?.Location) {
        // Assuming the response contains the URL of the uploaded image
        sendMessage(user, response.Location);
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    }
  };
  
   const sendMessage = async (itme, imageUrl) => {
      if (!itme) return;
      try {
        const whatsAppData = {
          countryCode: "+91",
          phoneNumber: itme.phone,
          type: "Template",
          template: {
            name: "welcome_msg",
            languageCode: "en_US",
            headerValues: [imageUrl],
            bodyValues: [itme.name],
          },
        };
        await whatsAppApiSend(whatsAppData);
      } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        toast.error("Error sending WhatsApp message: " + error.message);
      }
    };

    useEffect(() => { 
      if (user) {
        handleImageUpload();
      }
    }, []); // Run this effect when the user prop changes

  if (user) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Download Your Entry Card</h2>
        {/* <UserInfo user={user} /> */}
        {/* Card Preview */}
        {user.id && (
          <div>
            <div className="text-center">
              <p>Click below to download the card:</p>
              <button onClick={handleDownload} className="btn btn-success me-2">
                <i className="fas fa-download me-2"></i> Download
              </button>
            </div>
            {/* <div className="text-center">
              <p>Click below to download the card:</p>
              <button onClick={handlePrint} className="btn btn-success me-2">
                <i className="fas fa-download me-2"></i> Print
              </button>
            </div> */}

            {/* Printable Card Section */}

            <div className="mt-3 " ref={printRef}>
              <div className="admit-card">
                <img src={cardImage} className="card-img" alt="Card" />
                <div className="admit-card-info">
                  <div className="row">
                    <div className="col-md-2 mb-3">
                      <h4>
                        <strong>ID &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>
                      </h4>
                    </div>
                    <div className="col-md-10 mb-3">
                      <h4>
                        <strong>{user?.id}</strong>
                      </h4>
                    </div>
                    <div className="col-md-2 mb-3">
                      <h4>
                        <strong> Name &nbsp;:</strong>
                      </h4>
                    </div>
                    <div className="col-md-10 mb-3">
                      <h4>
                        <strong>{user?.name}</strong>
                      </h4>
                    </div>
                    <div className="col-md-2 mb-3">
                      <h4>
                        <strong> Comp &nbsp;:</strong>
                      </h4>
                    </div>
                    <div className="col-md-10 mb-3">
                      <h4>
                        <strong>{user?.company}</strong>
                      </h4>
                    </div>
                    <div className="col-md-2 mb-3">
                      <h4>
                        <strong> City &nbsp;&nbsp;&nbsp;&nbsp;:</strong>
                      </h4>
                    </div>
                    <div className="col-md-10 mb-3">
                      <h4>
                        <strong>{user?.city}</strong>
                      </h4>
                    </div>
                  </div>
                </div>
                <img
                  src={user?.profile_pic}
                  className="profile"
                  alt="Profile pic"
                  onLoad={() => console.log("Profile pic loaded")}
                />
                {/* <img src={barCode} className="qr" alt="QR Code" /> */}
                <din className="qr"  > <UserQRCard user={user} /></din>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (details && details.userType === "admin") {
    return (
     <Congratulations />
    );
  }

  if (details && details.userType === "user") {
    return (
      <div className="registration-page2">
        {details.id && (
          <div className="container mt-5">
            <div className="text-center">
              <p>Click below to download the entry card:</p>
              <button onClick={handleDownload} className="btn btn-success me-2">
                <i className="fas fa-download me-2"></i> Download
              </button>
            </div>

            <div className="mt-3" ref={printRef}>
              <div className="admit-card">
                <img src={cardImage} className="card-img" alt="Card" />
                <div className="admit-card-info">
                  <div className="row">
                    <div className="col-md-2 mb-3">
                      <h4>
                        <strong>ID &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>
                      </h4>
                    </div>
                    <div className="col-md-10 mb-3">
                      <h4>
                        <strong>{details?.id}</strong>
                      </h4>
                    </div>
                    <div className="col-md-2 mb-3">
                      <h4>
                        <strong> Name &nbsp;:</strong>
                      </h4>
                    </div>
                    <div className="col-md-10 mb-3">
                      <h4>
                        <strong>{details?.name}</strong>
                      </h4>
                    </div>
                    <div className="col-md-2 mb-3">
                      <h4>
                        <strong> Comp &nbsp;:</strong>
                      </h4>
                    </div>
                    <div className="col-md-10 mb-3">
                      <h4>
                        <strong>{details?.company}</strong>
                      </h4>
                    </div>
                    <div className="col-md-2 mb-3">
                      <h4>
                        <strong> City &nbsp;&nbsp;&nbsp;&nbsp;:</strong>
                      </h4>
                    </div>
                    <div className="col-md-10 mb-3">
                      <h4>
                        <strong>{details?.city}</strong>
                      </h4>
                    </div>
                  </div>
                </div>
                <img
                  src={details?.profile_pic}
                  className="profile"
                  alt="Profile pic"
                />
                {/* <img src={barCode} className="qr" alt="QR Code" /> */}
                <din className="qr"  > <UserQRCard user={details} /></din>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="registration-page2">
      <div className="container mt-5">
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
            <button type="submit" className="user-info-btn mt-3">
              {loading ? "Genrating..." : "Generate Card"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
