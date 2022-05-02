import React from "react";
import { Link } from "react-router-dom";

import Wfarbanner from "../../Components/WfarBanner";
import YearSemSelection from "../../Components/YearSemSelection";

const AcdhAllHandle = () => {
  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header ">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">HANDLE FACULTY</h5>
          </div>
        </div>
        <div className="container-fluid">
          {/* Wfar Banner*/}
          <Wfarbanner />
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="h4">WFAR Submissions from all handle Faculty</h4>
                    <span>Monitor and easily check all of your handle submissions.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* School year, Sem Selection */}
          <YearSemSelection />
          <div className="row">
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="wfar-entry">
                    <div className="wfar-img-content">
                      <img className="img-fluid" src="assets/img/file.png" alt />
                    </div>
                    <div className="wfar-content text-center mt-3">
                      <h4 className="h4">
                        <Link to="/AcdhIndividualHandle" className="text-primary">
                          Lorraine E. Tolentino
                        </Link>
                      </h4>
                      <h4 className="h4">Faculty</h4>
                      <Link
                        to="/AcdhIndividualHandle"
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
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="wfar-entry">
                    <div className="wfar-img-content">
                      <img className="img-fluid" src="assets/img/file.png" alt />
                    </div>
                    <div className="wfar-content text-center mt-3">
                      <h4 className="h4">
                        <Link to="/AcdhIndividualHandle" className="text-primary">
                          Melvin Delos Reyes, MSIT
                        </Link>
                      </h4>
                      <h4 className="h4">Faculty</h4>
                      <Link
                        to="/AcdhIndividualHandle"
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
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="wfar-entry">
                    <div className="wfar-img-content">
                      <img className="img-fluid" src="assets/img/file.png" alt />
                    </div>
                    <div className="wfar-content text-center mt-3">
                      <h4 className="h4">
                        <Link to="/AcdhIndividualHandle" className="text-primary">
                          Teresita S. Mangahas, MECpE
                        </Link>
                      </h4>
                      <h4 className="h4">Faculty</h4>
                      <Link
                        to="/AcdhIndividualHandle"
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

export default AcdhAllHandle;
