import React from "react";
import { Link } from "react-router-dom";

const AcdhSubmissionCard = () => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="wfar-entry">
            <div className="wfar-img-content">
              <img className="img-fluid" src="assets/img/file.png" alt />
            </div>
            <div className="wfar-content text-center mt-3">
              <h4 className="h4">
                <Link to="/AcdhOwnWfarView" className="text-primary">Week 1</Link>
              </h4>
              <h4 className="h4">April 4, 2022 to April 8, 2022</h4>
              <div className="bootstrap-badge mb-5">
                <span className="badge light badge-success">Status: OK</span>
              </div>
              <Link to="/AcdhOwnWfarView" className="btn btn-rounded btn-warning">
                <span className="btn-icon-left text-warning">
                  <i className="fa fa-eye color-warning" />
                </span>
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcdhSubmissionCard;
