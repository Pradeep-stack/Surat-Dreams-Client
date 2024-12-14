import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Sidebar from './Sidebar';
import Footer from '../common/Footer';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Sidebar />
        <main>
          <Outlet /> 
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
