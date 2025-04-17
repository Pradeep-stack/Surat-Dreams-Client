
import {QRCodeSVG } from 'qrcode.react';
import PropTypes from 'prop-types';

const UserQRCard = ({ user }) => {
  // Prepare the data to be encoded in QR code
  const qrData = JSON.stringify({
    id: user?.id,
    name: user?.name,
    company: user?.company,
    phone: user?.phone,
    city: user?.city,
    profile: user?.profile_pic,
    timestamp: user?.createdAt
  }, null, 2);

  return (
      <QRCodeSVG 
          value={qrData} 
          size={133}
          level="H"
          includeMargin={true}
          fgColor="#2c3e50"
          bgColor="#ffffff"
        />
  );
};


UserQRCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    company: PropTypes.string,
    phone: PropTypes.number,
    city: PropTypes.string,
    profile_pic: PropTypes.string,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  }).isRequired
};

export default UserQRCard;

