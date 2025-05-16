// import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import '../../assets/styles/CongratulationsPage.css';
// import CongImage from '../../assets/images/cong.png';

// const CongratulationsPage = ({ details }) => {
//     const [targetNumber, setTargetNumber] = useState("000");
//     const [animationDuration] = useState(3); // Extended duration in seconds

//     useEffect(() => {
//         const stallNum = details?.stall_number?.toString() || "000";
//         setTargetNumber(stallNum.padStart(3, '0').slice(0, 3));
//     }, [details.stall_number]);

//     useEffect(() => {
//         const buildDigits = () => {
//             const jackpot = document.getElementById('jackpot');
//             if (!jackpot) return;

//             jackpot.innerHTML = '';

//             for (let i = 0; i < targetNumber.length; i++) {
//                 const wrapper = document.createElement('div');
//                 wrapper.className = 'digit-wrapper';
//                 const digits = document.createElement('div');
//                 digits.className = 'digits';
//                 digits.style.transition = `top ${animationDuration}s ease-in-out`; 

//                 for (let r = 0; r < 2; r++) {
//                     for (let j = 0; j <= 9; j++) {
//                         const d = document.createElement('div');
//                         d.textContent = j;
//                         digits.appendChild(d);
//                     }
//                 }

//                 wrapper.appendChild(digits);
//                 jackpot.appendChild(wrapper);
//             }

//             const digitWrappers = document.querySelectorAll('.digit-wrapper .digits');
//             digitWrappers.forEach((digit, index) => {
//                 const finalDigit = parseInt(targetNumber[index]);
//                 const scrollOffset = (10 + finalDigit) * 140;
//                 digit.style.top = `-${scrollOffset}px`;
//             });
//         };

//         buildDigits();

//         const confettiTimer = setTimeout(() => {
//             launchConfetti(80);
//         }, animationDuration * 1000); // Match confetti timing with animation

//         return () => {
//             clearTimeout(confettiTimer);
//             document.querySelectorAll('.confetti').forEach(el => el.remove());
//         };
//     }, [targetNumber, animationDuration]);


//     const launchConfetti = (count) => {
//         const shapes = ['circle', 'square', 'star', 'ribbon'];
//         const colors = ['#ffcc00', '#ff4dd2', '#66ff66', '#00ccff', '#ff6666', '#ffffff', '#9933ff'];

//         for (let i = 0; i < count; i++) {
//             const confetti = document.createElement('div');
//             const shape = shapes[Math.floor(Math.random() * shapes.length)];
//             const color = colors[Math.floor(Math.random() * colors.length)];

//             confetti.className = `confetti ${shape}`;
//             confetti.style.background = color;

//             const startX = window.innerWidth / 2;
//             const startY = window.innerHeight / 2;

//             confetti.style.left = `${startX}px`;
//             confetti.style.top = `${startY}px`;

//             const dx = (Math.random() - 0.5) * 600 + 'px';
//             const dy = (Math.random() - 0.5) * 400 + 'px';
//             confetti.style.setProperty('--x', dx);
//             confetti.style.setProperty('--y', dy);

//             document.body.appendChild(confetti);

//             setTimeout(() => {
//                 if (confetti.parentNode) {
//                     confetti.remove();
//                 }
//             }, 3000);
//         }
//     };

//     return (
//         <div className="bodyy">
//             <div className="congrats-container">
//                 <div className="image-center">
//                     <img src={CongImage} alt="Congratulations" />
//                 </div>
//                 <div className="stall-no">YOUR STALL NO. IS</div>
//                 <div className="jackpot" id="jackpot"></div>
//                 <div className="another-link" onClick={() => window.location.reload()}>
//                     <a href="">SEE ANOTHER</a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// CongratulationsPage.propTypes = {
//     details: PropTypes.shape({
//         stall_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     }).isRequired,
// };

// CongratulationsPage.defaultProps = {
//     details: {
//         stall_number: "000"
//     }
// };

// export default CongratulationsPage;
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/CongratulationsPage.css';
import CongImage from '../../assets/images/cong.png';

const CongratulationsPage = ({ details }) => {
    const [targetNumber, setTargetNumber] = useState("000");
    const [animationDuration] = useState(3); // 3 seconds for animation
    const jackpotRef = useRef(null);
    const confettiContainerRef = useRef(null);

    useEffect(() => {
        const stallNum = details?.stall_number?.toString() || "000";
        setTargetNumber(stallNum.padStart(3, '0').slice(0, 3));
    }, [details?.stall_number]);

    useEffect(() => {
        if (!jackpotRef.current) return;

        // Clear previous content
        jackpotRef.current.innerHTML = '';

        // Create digit elements
        targetNumber.split('').forEach((digit) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'digit-wrapper';
            
            const digits = document.createElement('div');
            digits.className = 'digits';
            
            // Create enough digit clones for smooth animation
            for (let r = 0; r < 3; r++) { // Increased from 2 to 3 for better looping
                for (let j = 0; j <= 9; j++) {
                    const d = document.createElement('div');
                    d.textContent = j;
                    digits.appendChild(d);
                }
            }
            
            wrapper.appendChild(digits);
            jackpotRef.current.appendChild(wrapper);

            // Calculate the target position
            const finalDigit = parseInt(digit);
            const digitHeight = 140; // Must match CSS digit height
            const scrollOffset = (10 + finalDigit) * digitHeight;
            
            // Start animation after a small delay to allow DOM rendering
            setTimeout(() => {
                digits.style.transform = `translateY(-${scrollOffset}px)`;
            }, 50);
        });

        // Launch confetti after animation completes
        const confettiTimer = setTimeout(() => {
            launchConfetti(80);
        }, animationDuration * 1000);

        return () => {
            clearTimeout(confettiTimer);
            if (confettiContainerRef.current) {
                confettiContainerRef.current.innerHTML = '';
            }
        };
    }, [targetNumber, animationDuration]);

    const launchConfetti = (count) => {
        if (!confettiContainerRef.current) return;

        const shapes = ['circle', 'square', 'star', 'ribbon'];
        const colors = ['#ffcc00', '#ff4dd2', '#66ff66', '#00ccff', '#ff6666', '#ffffff', '#9933ff'];

        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];

            confetti.className = `confetti ${shape}`;
            confetti.style.background = color;

            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;

            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;

            const dx = (Math.random() - 0.5) * 600 + 'px';
            const dy = (Math.random() - 0.5) * 400 + 'px';
            confetti.style.setProperty('--x', dx);
            confetti.style.setProperty('--y', dy);

            confettiContainerRef.current.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    };

    return (
        <div className="bodyy">
            <div className="congrats-container">
                <div className="image-center">
                    <img src={CongImage} alt="Congratulations" />
                </div>
                <div className="stall-no">YOUR STALL NO. IS</div>
                <div className="jackpot" ref={jackpotRef}></div>
                <div className="another-link" onClick={() => window.location.reload()}>
                    <a href="">SEE ANOTHER</a>
                </div>
                <div ref={confettiContainerRef} className="confetti-container"></div>
            </div>
        </div>
    );
};

CongratulationsPage.propTypes = {
    details: PropTypes.shape({
        stall_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
};

CongratulationsPage.defaultProps = {
    details: {
        stall_number: "000"
    }
};

export default CongratulationsPage;