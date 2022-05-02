import React from "react";
import { Outlet } from "react-router-dom";

import PageLoader from "./Components/PageLoader";
import TopHeader from "./Components/TopHeader";
import FacultyMainHeader from "./Components/FacultyMainHeader";
import FacultySidebar from "./Components/FacultySidebar";
import Footer from "./Components/Footer";

const Faculty = () => {
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
              <FacultyMainHeader />
            </div>
          </div>
          {/* Sidebar */}
          <FacultySidebar />
          {/* Content */}
          <Outlet />
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faculty;
