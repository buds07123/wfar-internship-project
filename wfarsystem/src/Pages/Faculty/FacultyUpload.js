import React from "react";

import Wfarbanner from "../../Components/WfarBanner";
import Wfarupload from "../../Components/WfarUpload";

const FacultyUpload = () => {
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
          <Wfarupload />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FacultyUpload;
