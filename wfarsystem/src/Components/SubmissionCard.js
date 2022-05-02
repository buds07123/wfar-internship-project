import React from "react";
import { Link } from "react-router-dom";

const Submissioncard = () => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <div className="wfar-entry">
            <div className="wfar-img-content">
              <img className="img-fluid" src="assets/img/file.png" alt />
            </div>
            <div className="wfar-content text-center mt-3">
              <h4 className="h4">
                <Link to="/AdminIndividualFaculty" className="text-primary">Gariel Galang</Link>
              </h4>
              <h4 className="h4">Area Chair</h4>
              <Link to="/AdminIndividualFaculty" className="btn btn-rounded btn-warning">
                <span className="btn-icon-left text-warning">
                  <i className="fa fa-eye color-warning" />
                </span>
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Submissioncard;
