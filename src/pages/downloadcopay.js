import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import cardImage from "../assets/images/card.jpg";
// import barCode from "../assets/images/qr.jpg";
import { getUser } from "../api/user";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/style.css";
import Congratulations from "../components/common/Congratulations";
import UserQRCard from "../components/UserQRCard";
// import { uploadImage } from "../api/user";
// import { whatsAppApiSend } from "../api/user";
import Logoimg from "../assets/images/logo.png";
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
      console.log("response.data", response.data);
      // if (response.data.userType === "user") {
      //   setTimeout(() => {
      //     handleImageUpload(response.data);
      //   }, 2000); // Delay for 2 seconds before calling handleImageUpload
      // } else {
      //   setLoading(false);
      // }
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

  // const handleDownload = () => {
  //   const element = printRef.current;
  //   html2canvas(element, {
  //     useCORS: true,
  //     allowTaint: false,
  //   }).then((canvas) => {
  //     // Get the context of the canvas
  //     const context = canvas.getContext("2d");
  //     const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  //     let cropX = canvas.width;
  //     let cropY = canvas.height;
  //     let cropWidth = 0;
  //     let cropHeight = 0;

  //     // Find the boundaries of the non-white content
  //     for (let y = 0; y < canvas.height; y++) {
  //       for (let x = 0; x < canvas.width; x++) {
  //         const index = (y * canvas.width + x) * 4; // RGBA index
  //         const [r, g, b, a] = [
  //           imageData.data[index],
  //           imageData.data[index + 1],
  //           imageData.data[index + 2],
  //           imageData.data[index + 3],
  //         ];

  //         // Check if pixel is not white
  //         if (!(r === 255 && g === 255 && b === 255 && a === 255)) {
  //           cropX = Math.min(cropX, x);
  //           cropY = Math.min(cropY, y);
  //           cropWidth = Math.max(cropWidth, x);
  //           cropHeight = Math.max(cropHeight, y);
  //         }
  //       }
  //     }

  //     // Adjust crop dimensions
  //     cropWidth -= cropX;
  //     cropHeight -= cropY;

  //     // Create a new cropped canvas
  //     const croppedCanvas = document.createElement("canvas");
  //     croppedCanvas.width = cropWidth;
  //     croppedCanvas.height = cropHeight;
  //     const croppedContext = croppedCanvas.getContext("2d");

  //     // Draw the cropped image
  //     croppedContext.drawImage(
  //       canvas,
  //       cropX,
  //       cropY,
  //       cropWidth,
  //       cropHeight,
  //       0,
  //       0,
  //       cropWidth,
  //       cropHeight
  //     );

  //     // Generate the image URL and trigger download
  //     const croppedImage = croppedCanvas.toDataURL("image/png");
  //     const link = document.createElement("a");
  //     link.href = croppedImage;
  //     link.download = "EntryCard.png";
  //     link.click();
  //   });
  // };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = details?.badge_image_url;
    link.setAttribute('download', 'badge_image.png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // const handleImageUpload = async (prop) => {
  //   const element = printRef.current;
  //   const canvas = await html2canvas(element, {
  //     useCORS: true,
  //     allowTaint: false,
  //   });

  //   // Get the context of the canvas
  //   const context = canvas.getContext("2d");
  //   const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  //   let cropX = canvas.width;
  //   let cropY = canvas.height;
  //   let cropWidth = 0;
  //   let cropHeight = 0;

  //   // Find the boundaries of the non-white content
  //   for (let y = 0; y < canvas.height; y++) {
  //     for (let x = 0; x < canvas.width; x++) {
  //       const index = (y * canvas.width + x) * 4;
  //       const [r, g, b, a] = [
  //         imageData.data[index],
  //         imageData.data[index + 1],
  //         imageData.data[index + 2],
  //         imageData.data[index + 3],
  //       ];

  //       if (!(r === 255 && g === 255 && b === 255 && a === 255)) {
  //         cropX = Math.min(cropX, x);
  //         cropY = Math.min(cropY, y);
  //         cropWidth = Math.max(cropWidth, x);
  //         cropHeight = Math.max(cropHeight, y);
  //       }
  //     }
  //   }

  //   // Adjust crop dimensions
  //   cropWidth -= cropX;
  //   cropHeight -= cropY;

  //   // Create cropped canvas
  //   const croppedCanvas = document.createElement("canvas");
  //   croppedCanvas.width = cropWidth;
  //   croppedCanvas.height = cropHeight;
  //   const croppedContext = croppedCanvas.getContext("2d");

  //   croppedContext.drawImage(
  //     canvas,
  //     cropX,
  //     cropY,
  //     cropWidth,
  //     cropHeight,
  //     0,
  //     0,
  //     cropWidth,
  //     cropHeight
  //   );
  //   const croppedImage = croppedCanvas.toDataURL("image/png");
  //   const link = document.createElement("a");
  //   link.href = croppedImage;
  //   link.download = `EntryCard${prop.id}.png`;
  //   link.click();
  //   try {
  //     const blob = await (await fetch(croppedImage)).blob();
  //     const formData = new FormData();
  //     formData.append("image", blob, `EntryCard${prop.id}.png`);
  //     const response = await uploadImage(formData);

  //     if (response?.Location) {
  //       // Assuming the response contains the URL of the uploaded image
  //       sendMessage(prop, response.Location);
  //     } else {
  //       toast.error("Upload failed");
  //     }
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     toast.error("Failed to upload image");
  //   }
  // };

  // const sendMessage = async (itme, imageUrl) => {
  //   if (!itme) return;
  //   try {
  //     const whatsAppData = {
  //       countryCode: "+91",
  //       phoneNumber: itme.phone,
  //       type: "Template",
  //       template: {
  //         name: "entry_pass_with_image",
  //         languageCode: "en_US",
  //         headerValues: [imageUrl],
  //         bodyValues: [itme.name, itme.id],
  //       },
  //     };
  //     await whatsAppApiSend(whatsAppData);
  //   } catch (error) {
  //     console.error("Error sending WhatsApp message:", error);
  //     toast.error("Error sending WhatsApp message: " + error.message);
  //   }
  // };



  // if (user) {
  //   return (
  //     <div className="container mt-5">
  //       <h2 className="text-center mb-4">Download Your Entry Card</h2>
  //       {/* <UserInfo user={user} /> */}
  //       {/* Card Preview */}
  //       {user.id && (
  //         <div>
  //           <div className="row">
  //           <div className="text-center">
  //             <p>Click below to download the card:</p>
  //             <button onClick={handleDownload} className="btn btn-success me-2">
  //               <i className="fas fa-download me-2"></i> Download
  //             </button>
  //             <button onClick={() => window.location.reload()} className="btn btn-success me-2">
  //               <i className="fas fa-download me-2"></i> Search Again
  //             </button>
  //           </div>
          
           
  //           </div>
  //           {/* <div className="text-center">
  //             <p>Click below to download the card:</p>
  //             <button onClick={handlePrint} className="btn btn-success me-2">
  //               <i className="fas fa-download me-2"></i> Print
  //             </button>
  //           </div> */}

  //           {/* Printable Card Section */}

  //           <div className="mt-3 " ref={printRef}>
  //             <div className="admit-card">
  //               <img src={cardImage} className="card-img" alt="Card" />
  //               <div className="admit-card-info">
  //                 <div className="row">
  //                   <div className="col-md-2 mb-3">
  //                     <h4>
  //                       <strong>
  //                         ID &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
  //                       </strong>
  //                     </h4>
  //                   </div>
  //                   <div className="col-md-10 mb-3">
  //                     <h4>
  //                       <strong>{user?.id}</strong>
  //                     </h4>
  //                   </div>
  //                   <div className="col-md-2 mb-3">
  //                     <h4>
  //                       <strong> Name &nbsp;:</strong>
  //                     </h4>
  //                   </div>
  //                   <div className="col-md-10 mb-3">
  //                     <h4>
  //                       <strong>{user?.name}</strong>
  //                     </h4>
  //                   </div>
  //                   <div className="col-md-2 mb-3">
  //                     <h4>
  //                       <strong> Comp &nbsp;:</strong>
  //                     </h4>
  //                   </div>
  //                   <div className="col-md-10 mb-3">
  //                     <h4>
  //                       <strong>{user?.company}</strong>
  //                     </h4>
  //                   </div>
  //                   <div className="col-md-2 mb-3">
  //                     <h4>
  //                       <strong> City &nbsp;&nbsp;&nbsp;&nbsp;:</strong>
  //                     </h4>
  //                   </div>
  //                   <div className="col-md-10 mb-3">
  //                     <h4>
  //                       <strong>{user?.city}</strong>
  //                     </h4>
  //                   </div>
  //                 </div>
  //               </div>
  //               {details?.profile_pic && (
  //                 <img
  //                   src={details?.profile_pic}
  //                   className="profile"
  //                   alt="Profile pic"
  //                 />
  //               )}
  //               {/* <img src={barCode} className="qr" alt="QR Code" /> */}
  //               <din className="qr">
  //                 {" "}
  //                 <UserQRCard user={user} />
  //               </din>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  // if (details && details.userType === "owner") {
  //   return <Congratulations details={details} />;
  // }

  if (details && details.userType !== "owner") {
    return (
      <div className="registration-page2">
        {details.id && (
          <div className="container mt-5">
            <div className="text-center">
              <p>Click below to download the entry card:</p>
              <button onClick={handleDownload} className="btn btn-success me-2">
                <i className="fas fa-download me-2"></i> Download
              </button>
              <button onClick={() => window.location.reload()} className="btn btn-success me-2">
                <i className="fas fa-download me-2"></i> Search Again
              </button>
            </div>

            <div className="mt-3" ref={printRef}>
               <img src="https://indusglobal.s3.ap-south-1.amazonaws.com/admitcards/998778-1746248147658.png" alt="" className="logo" /> 
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="registration-page2">
      <div className="container ">
        <div className="logo-box">
          <img src={Logoimg} alt="" />
        </div>
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
            <div className="align-items-center d-flex justify-content-center">
            <button type="submit" className="user-info-btn mt-3">
              {loading ? "Genrating..." : "Submit"}
            </button>
            </div>
           
            <div className="text-center mt-3">
              <Link to="/">
                <i className="fas fa-user-plus me-2"></i> Buyer/Agent Registration
              </Link>
              <Link to="/vendor-registration" >
                <i className="fas fa-user-plus me-2"></i> Exhibitor Owner/Staff Registration
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
