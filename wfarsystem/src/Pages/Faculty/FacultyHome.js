import React from "react";

import Vmgo from "../../Components/Vmgo";
import Announcement from "../../Components/Announcement";
import FeaturesSlider from "../../Components/FeaturesSlider";

const FacultyHome = () => {
  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">HOME</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-lg-12">
              <div className="welcome-text">
                <h4 className="h4">Hi, welcome back!</h4>
                <h6 className="h6 mt-3">
                  Upload your individual weekly accomplishment reports with ease.
                </h6>
              </div>
            </div>
          </div>
          {/* Announcement */}
          <Announcement />
          {/* Vmgo */}
          <Vmgo />
          {/* FeaturesSlider */}
          <FeaturesSlider />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FacultyHome;
