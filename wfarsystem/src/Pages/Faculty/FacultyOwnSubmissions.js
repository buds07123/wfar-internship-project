import React from "react";
import { Link } from "react-router-dom";

import FacultySubmissionCard from "../../Components/FacultySubmissionCard";
import YearSemSelection from "../../Components/YearSemSelection";

const FacultyOwnSubmissions = () => {
  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header ">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">WFAR SUBMISSIONS</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4 className="h4">Hi, welcome back!</h4>
                <h6 className="h6 mt-3">
                  Upload your individual weekly accomplishment reports with ease.
                </h6>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <Link to="/FacultyUpload">
                <button type="button" className="btn btn-rounded btn-secondary">
                  <span className="btn-icon-left text-secondary">
                    <i className="fa fa-upload" />
                  </span>
                  Upload WFAR
                </button>
              </Link>
            </div>
          </div>
          {/* School year, Sem Selection */}
          <YearSemSelection />
          <div className="row">
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
              {/* Submissioncard Component */}
              <FacultySubmissionCard />
            </div>
            {/* Submissioncard Sample without using the Component */}
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="wfar-entry">
                    <div className="wfar-img-content">
                      <img className="img-fluid" src="assets/img/file.png" alt />
                    </div>
                    <div className="wfar-content text-center mt-3">
                      <h4 className="h4">
                        <Link to="/FacultyIndividualView" className=" text-primary">Week 2</Link>
                      </h4>
                      <h4 className="h4">April 4, 2022 to April 8, 2022</h4>
                      <div className="bootstrap-badge mb-5">
                        <span className="badge light badge-info">
                          Status: For Checking
                        </span>
                      </div>
                      <Link
                        to="/FacultyIndividualView"
                        className="btn btn-rounded btn-warning"
                      >
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
            {/* Submissioncard Sample without using the Component */}
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="wfar-entry">
                    <div className="wfar-img-content">
                      <img className="img-fluid" src="assets/img/file.png" alt />
                    </div>
                    <div className="wfar-content text-center mt-3">
                      <h4 className="h4">
                        <Link to="/FacultyIndividualView" className=" text-primary">Week 3</Link>
                      </h4>
                      <h4 className="h4">April 4, 2022 to April 8, 2022</h4>
                      <div className="bootstrap-badge mb-5">
                        <span className="badge light badge-danger">
                          Status: With Revisions
                        </span>
                      </div>
                      <Link
                        to="/FacultyIndividualView"
                        className="btn btn-rounded btn-warning"
                      >
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FacultyOwnSubmissions;
