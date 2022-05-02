import React from "react";
import { Outlet } from "react-router-dom";

import PageLoader from "./Components/PageLoader";
import TopHeader from "./Components/TopHeader";
import AcdhMainHeader from "./Components/AcdhMainHeader";
import AcdhSidebar from "./Components/AcdhSidebar";
import Footer from "./Components/Footer";

const ACDH = () => {
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
              <AcdhMainHeader />
            </div>
          </div>
          {/* Sidebar */}
          <AcdhSidebar />
          {/* Content */}
          <Outlet />
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ACDH;
