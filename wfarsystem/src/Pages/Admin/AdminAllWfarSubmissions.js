import React from "react";
import { Link } from "react-router-dom";

import Wfarbanner from "../../Components/WfarBanner";
import YearSemSelection from "../../Components/YearSemSelection";
import SubmissionCard from "../../Components/SubmissionCard";

const AdminAllWfarSubmissions = () => {
  return (
    <>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">WFAR SUBMISSIONS</h5>
          </div>
        </div>
        <div className="container-fluid">
          {/* Wfar Banner*/}
          <Wfarbanner />
          <div className="row row mx-0">
            <div className="col-lg-12 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <button
                type="button"
                data-toggle="modal"
                data-target="#semester"
                className="btn btn-rounded btn-secondary"
              >
                <span className="btn-icon-left text-secondary">
                  <i className="fa fa-plus" />
                </span>
                Create New Batch
              </button>
            </div>
          </div>
          {/* School year, Sem Selection */}
          <YearSemSelection />
          <div className="row">
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
              {/* Admin Submissioncard Component */}
              <SubmissionCard />
            </div>

            {/* Admin Submissioncard Sample without using the Component */}
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="wfar-entry">
                    <div className="wfar-img-content">
                      <img className="img-fluid" src="assets/img/file.png"/>
                    </div>
                    <div className="wfar-content text-center mt-3">
                      <h4 className="h4">
                        <Link to="/AdminIndividualFaculty" className="text-primary">
                          Juan dela Cruz
                        </Link>
                      </h4>
                      <h4 className="h4">Faculty</h4>
                      <Link
                        to="/AdminIndividualFaculty"
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

            {/* Admin Submissioncard Sample without using the Component */}
            <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="wfar-entry">
                    <div className="wfar-img-content">
                      <img className="img-fluid" src="assets/img/file.png" alt />
                    </div>
                    <div className="wfar-content text-center mt-3">
                      <h4 className="h4">
                        <Link to="/AdminIndividualFaculty" className="text-primary">
                          Rosemarie M. Bautista
                        </Link>
                      </h4>
                      <h4 className="h4">Department Head</h4>
                      <Link
                        to="/AdminIndividualFaculty"
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

      {/* Create New Batch / New Sem Modal */}
      <div className="modal fade" id="semester">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="h5 modal-title">New Batch</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-black font-w600">
                        School Year <span className="required">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="School Year"
                    />
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-black font-w600">
                        Semester<span className="required">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <select className="form-control default-select form-control-lg">
                      <option value selected disabled hidden>
                        Select Semester
                      </option>
                      <option value>First Semester</option>
                      <option value>Second Semester</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-black font-w600">
                        No. of Weeks<span className="required">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <select className="form-control default-select form-control-lg">
                      <option value selected disabled hidden>
                        Select
                      </option>
                      <option value>18 Weeks</option>
                      <option value>15 Weeks</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger light"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAllWfarSubmissions;
