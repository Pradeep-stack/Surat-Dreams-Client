// Header.jsx
import { ProgressBar } from "react-loader-spinner";
import "./style.css";
const LoadingSpinner = ({ loading, wrapperStyle }) => {
  if (!loading) return null;
  return (
    <div className="mb-3">
       <ProgressBar
  visible={loading}
  height="80"
  width="70"
  color="#4fa94d"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
     
  );
};

export default LoadingSpinner;



