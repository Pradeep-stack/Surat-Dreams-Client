
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/layouts/Layout';
// import LandingPage from './pages/LandingPage';
import Register from './pages/Registration';
import VendorRegistration from './pages/VendorRegister';
import UserInfo from './pages/UserInfo';
import DownloadPage from './pages/DownloadPage';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import VendorDownload from './pages/VendorDownload';
import FindStall from './pages/FindStall';
const App = () => {
  return (<>
   <ToastContainer />
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />}/> */}
        <Route path="/" element={<Register />}/>
        <Route path="/vendor-registration" element={<VendorRegistration />}/>
        <Route path="/find-stall" element={<FindStall />}/>
        <Route path="/user-info" element={<UserInfo />}/>
        <Route path="/download-page" element={<DownloadPage />}/>
        <Route path="/vendor-download" element={<VendorDownload />}/>
      </Routes>
    </Router></>
   
  );
};


export default App;