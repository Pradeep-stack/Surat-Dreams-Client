import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../assets/styles/newStall.css";
import CongImage from "../../assets/images/cong.png";
import Logo1 from "../../assets/images/sd-logo.png";
import Logo2 from "../../assets/images/ie-logo.png";

const CongratulationsPage = ({ details }) => {
  const [targetNumber, setTargetNumber] = useState("000");
  const [showRibbon, setShowRibbon] = useState(false);
  const jackpotRef = useRef(null);
  const animationDuration = 3000; // in milliseconds (3 seconds)

  useEffect(() => {
    const stallNum = details?.stall_number?.toString() || "000";
    setTargetNumber(stallNum.padStart(3, "0").slice(0, 3));
  }, [details?.stall_number]);

  useEffect(() => {
    if (!jackpotRef.current) return;

    jackpotRef.current.innerHTML = "";

    targetNumber.split("").forEach((digit) => {
      const wrapper = document.createElement("div");
      wrapper.className = "digit-wrapper";

      const digits = document.createElement("div");
      digits.className = "digits";

      for (let r = 0; r < 3; r++) {
        for (let j = 0; j <= 9; j++) {
          const d = document.createElement("div");
          d.textContent = j;
          digits.appendChild(d);
        }
      }

      wrapper.appendChild(digits);
      jackpotRef.current.appendChild(wrapper);

      const finalDigit = parseInt(digit);
      const digitHeight = 156;
      const scrollOffset = (10 + finalDigit) * digitHeight;

      // Trigger scroll animation
      setTimeout(() => {
        digits.style.transform = `translateY(-${scrollOffset}px)`;
      }, 50);
    });

    // 🟡 Wait until number scroll animation finishes (e.g., 3s)
    const ribbonDelay = setTimeout(() => {
      setShowRibbon(true);
      setTimeout(() => setShowRibbon(false), 6000); // Hide after 6s
    }, animationDuration * 1);

    return () => clearTimeout(ribbonDelay);
  }, [targetNumber]);

  console.log("CongratulationsPage rendered with targetNumber:", details);

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="logo1">
            <img src={Logo1} alt="Logo1" />
          </div>
          <div className="logo2">
            <img src={Logo2} alt="Logo2" />
          </div>
        </div>

        <div className="image-center-1">
          <img src={CongImage} alt="Congratulations" width="600px" />
        </div>

        <h2 className="com-details mt-10 mb-10">{details?.company}</h2>
        <div className="com-details mt-10 mb-10">
          Your Stall Size is : {details?.stall_size} sqft
        </div>
        <div className="stall-no mt-10 mb-20">Your Stall No. is</div>
        <div className="jackpot" ref={jackpotRef}></div>

        <div className="stall-no mt-20">
          {`We're excited to have you onboard for the "International Ethnic Expo" organized by "SURAT DREAMS". `}
          <br />
          Get ready to showcase your collection, connect with top buyers, and
          grow your business.
        </div>

        <div className="event">
          <div className="event-text">
            Event dates: August 11th, 12th, and 13th, 2025
            <br />
            Venue: India Expo Mart, Greater Noida
          </div>
        </div>

        <div className="text">
          Stay tuned for exhibition guidelines, exhibitor passes, and next
          steps!
        </div>

        <div className="another-link" onClick={() => window.location.reload()}>
          <a href="#">See Another</a>
        </div>
      </div>
      <div className={`ribbons ${showRibbon ? "show" : ""}`}></div>
    </>
  );
};

CongratulationsPage.propTypes = {
  details: PropTypes.shape({
    stall_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

CongratulationsPage.defaultProps = {
  details: {
    stall_number: "000",
  },
};

export default CongratulationsPage;
