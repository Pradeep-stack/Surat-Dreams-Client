import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/CongratulationsPage.css';
import CongImage from '../../assets/images/congratulations.png';
import Logoimg from "../../assets/images/logo.png";

const CongratulationsPage = ({ details}) => {
    const [celebrate, setCelebrate] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);


    useEffect(() => {
        // Start animation sequence after a short delay
        const timer = setTimeout(() => {
            setCelebrate(true);
            setImageLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    // Create confetti elements
    const renderConfetti = () => {
        if (!celebrate) return null;

        const confetti = [];
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

        for (let i = 0; i < 100; i++) {
            const style = {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                transform: `rotate(${Math.random() * 360}deg)`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
            };

            confetti.push(
                <div key={i} className="confetti" style={style} />
            );
        }

        return confetti;
    };

    return (
        <div className="congratulations-container">
            {celebrate && renderConfetti()}

            <div className="logo-box">
                <img src={Logoimg} alt="" />
            </div>

            <div className="image-container">
                <img
                    src={CongImage}
                    alt="Congratulations"
                    className={`congrats-image ${imageLoaded ? 'animate' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>

            <div className="stall-number-container">
                <div className="stall-number-label">YOUR STALL NUMBER IS</div>
                {details?.stall_number ? 
                <div className="stall-number animate-number">{details?.stall_number}</div>:
                <div className="stall-number2">Your STALL NO is not available yet</div>} 
            </div>
            <div>
             
            </div>
            <div className="button-container mt-5">
                <p>Search Another Stall</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                    Search Again
                </button>
            </div>
        </div>
    );
};
CongratulationsPage.propTypes = {
    details: PropTypes.shape({
        stall_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
};

export default CongratulationsPage;
