import React from "react";
import { Outlet } from "react-router-dom";

import PageLoader from "./Components/PageLoader";
import TopHeader from "./Components/TopHeader";
import AdminMainHeader from "./Components/AdminMainHeader";
import AdminSidebar from "./Components/AdminSidebar";
import Footer from "./Components/Footer";

const Admin = () => {
  return (
    <React.Fragment>
      <div>
        {/* PageLoader */}
        <PageLoader />

        <div id="main-wrapper">
          {/* Top Header */}
          <TopHeader />

          <div className="header">
            <div className="header-content">
              {/* Main Header */}
              <AdminMainHeader />
            </div>
          </div>
          {/* Sidebar */}
          <AdminSidebar />
          {/* Content */}
          <Outlet />
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Admin;
