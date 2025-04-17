
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/layouts/Layout';
// import LandingPage from './pages/LandingPage';
import Register from './pages/Registration';
import VendorRegistration from './pages/VendorRegister';
import UserInfo from './pages/UserInfo';
import DownloadPage from './pages/DownloadPage';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (<>
   <ToastContainer />
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />}/> */}
        <Route path="/" element={<Register />}/>
        <Route path="/vendor-registration" element={<VendorRegistration />}/>
        <Route path="/user-info" element={<UserInfo />}/>
        <Route path="/download-page" element={<DownloadPage />}/>
      </Routes>
    </Router></>
   
  );
};


export default App;