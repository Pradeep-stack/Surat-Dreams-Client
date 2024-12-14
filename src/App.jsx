import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import LandingPage from './pages/LandingPage';
import Register from './pages/Registration';
import UserInfo from './pages/UserInfo';
import DownloadPage from './pages/DownloadPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/user-info" element={<UserInfo />}/>
        <Route path="/download-page" element={<DownloadPage />}/>
      </Routes>
    </Router>
  );
};

export default App;
