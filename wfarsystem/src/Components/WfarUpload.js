import React from "react";
import AttachmentUpload from "./AttachmentUpload";

const Wfarupload = () => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header bg-light-blue">
              <div className="col-xl-7 col-lg-12">
                <h4 className="h4 card-title">
                  Please complete the WFAR information below.
                </h4>
              </div>
              <div className="col-xl-5 col-lg-12">
                <input
                  type="button"
                  className="addEntry float-right btn btn-secondary"
                  defaultValue="Add Entry"
                />
              </div>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form className="form" action="#" method="post" id="form">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Week No.</label>
                    <div className="col-sm-9">
                      <select className="form-control default-select form-control-lg">
                        <option selected disabled hidden>
                          Select a week
                        </option>
                        <option>Week 1</option>
                        <option>Week 2</option>
                        <option>Week 3</option>
                        <option>Week 4</option>
                        <option>Week 5</option>
                        <option>Week 6</option>
                        <option>Week 7</option>
                        <option>Week 8</option>
                        <option>Week 9</option>
                        <option>Week 10</option>
                        <option>Week 11</option>
                        <option>Week 12</option>
                        <option>Week 13</option>
                        <option>Week 14</option>
                        <option>Week 15</option>
                        <option>Week 16</option>
                        <option>Week 17</option>
                        <option>Week 18</option>
                      </select>
                    </div>
                  </div>
                  <div className="wfar-entry" id="entry">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Date of Class/ Accomplishment
                      </label>
                      <div className="col-sm-9">
                        <input type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Subject being Taught
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control input-default "
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Course, Year and Section
                      </label>
                      <div className="col-sm-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Course"
                        />
                      </div>
                      <div className="col mt-2 mt-sm-0">
                        <input
                          type="number"
                          min={0}
                          max={4}
                          className="form-control input-default "
                          placeholder="Year"
                        />
                      </div>
                      <div className="col mt-2 mt-sm-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Section"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">No. of Attendees</label>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          min={0}
                          oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                          className="form-control input-default "
                          placeholder="No. of Attendees"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Link of MS Teams Recordings
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control input-default "
                          placeholder="Link of MS Teams Recordings"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Learning Activities
                      </label>
                      <div className="col-sm-9">
                        <textarea className="form-control" rows={4} defaultValue={""} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Attachments</label>
                      <div className="col-sm-9">
                        <div className="card shadow-sm w-100">
                          <div className="bg-light-blue card-header d-flex justify-content-between">
                            <h6 className="h6">Team Meet Screenshot/s</h6>
                          </div>
                          <div
                            className="card-body d-flex flex-wrap align-items-center"
                            id="container"
                          >
                            <AttachmentUpload />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label" />
                      <div className="col-sm-9">
                        <div className="card shadow-sm w-100">
                          <div className="bg-light-blue card-header d-flex justify-content-between">
                            <h6 className="h6">Provided Activity Screenshot/s</h6>
                            
                          </div>
                          <div className="card-body d-flex flex-wrap justify-content-start"
                            id="act-container">
                              <AttachmentUpload />
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="new-entry pb-5" />
                  <div className="card-footer">
                    <button
                      type="submit"
                      className="card-link float-right btn btn-primary"
                    >
                      <i className="fa fa-cloud-upload" />
                      &nbsp;Save and Upload
                    </button>
                    <button className="card-link float-right btn btn-success mr-4">
                      <i className="fa fa-save" />
                      &nbsp;Save
                    </button>
                  </div>
                </form>
                <form id="copy"></form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wfarupload;
