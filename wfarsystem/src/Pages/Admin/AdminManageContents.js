import React from "react";

const AdminManageContents = () => {
  return (
    <>

      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">CONTENT MANAGEMENT</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="h4">
                      Maintain the WFAR Management System's Contents
                    </h4>
                    <span>
                      Update all important and relevant information to keep the
                      Faculties, Area Chair, and Department Head informed.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">ANNOUNCEMENT</h5>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form>
                      <div className="form-group mb-5">
                        <textarea
                          className="form-control"
                          rows={8}
                          id="announcement"
                          defaultValue={""}
                        />
                      </div>
                      <div className="card-footer d-sm-flex justify-content-sm-end">
                        <input
                          type="submit"
                          className="btn btn-success"
                          defaultValue="Save and Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">VISION</h5>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form>
                      <div className="form-group mb-5">
                        <textarea
                          className="form-control"
                          rows={8}
                          id="vision"
                          defaultValue={""}
                        />
                      </div>
                      <div className="card-footer d-sm-flex justify-content-sm-end">
                        <input
                          type="submit"
                          className="btn btn-success"
                          defaultValue="Save and Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">MISSION</h5>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form>
                      <div className="form-group mb-5">
                        <textarea
                          className="form-control"
                          rows={8}
                          id="mission"
                          defaultValue={""}
                        />
                      </div>
                      <div className="card-footer d-sm-flex justify-content-sm-end">
                        <input
                          type="submit"
                          className="btn btn-success"
                          defaultValue="Save and Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">GOALS</h5>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form>
                      <div className="form-group mb-5">
                        <textarea
                          className="form-control"
                          rows={8}
                          id="goals"
                          defaultValue={""}
                        />
                      </div>
                      <div className="card-footer d-sm-flex justify-content-sm-end">
                        <input
                          type="submit"
                          className="btn btn-success"
                          defaultValue="Save and Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">OBJECTIVES</h5>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form>
                      <div className="form-group mb-5">
                        <textarea
                          className="form-control"
                          rows={8}
                          id="objectives"
                          defaultValue={""}
                        />
                      </div>
                      <div className="card-footer d-sm-flex justify-content-sm-end">
                        <input
                          type="submit"
                          className="btn btn-success"
                          defaultValue="Save and Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminManageContents;
