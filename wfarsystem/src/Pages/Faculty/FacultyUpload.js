import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Wfarbanner from "../../Components/WfarBanner";
import Wfarupload from "../../Components/WfarUpload";

const FacultyUpload = () => {

  const location = useLocation()
  const year = location.state.year
  const sem = location.state.sem

  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header ">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">UPLOAD</h5>
          </div>
        </div>
        <div className="container-fluid">
          {/* Wfar Banner*/}
          <Wfarbanner />
          {/* Wfar Upload*/}
          <Wfarupload schoolYear={year} sem={sem} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FacultyUpload;
