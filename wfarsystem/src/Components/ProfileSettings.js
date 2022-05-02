import React from "react";

const ProfileSettings = () => {
  return (
    <React.Fragment>
      <div className="col-xl-8">
        <div className="card">
          <div className="card-header  bg-light-blue">
            <h4 className="h4 card-intro-title">GENERAL ACCOUNT SETTINGS</h4>
          </div>
          <div className="card-body">
            <div className="profile-tab">
              <div className="custom-tab-1">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a href="#profile-settings" data-toggle="tab" className="nav-link">
                      Profile Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#account-settings" data-toggle="tab" className="nav-link">
                      Account Credentials
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div id="profile-settings" className="tab-pane active show">
                    <div className="pt-3">
                      <div className="settings-form">
                        <div className="pt-4 border-bottom-1 pb-3">
                          <h5 className="h5 text-primary">Edit Profile Information</h5>
                        </div>
                        <form>
                          <div className="form-row">
                            <label>Employee Number :</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={2018107260}
                                readOnly
                              />
                              <input
                                className="btn btn-primary"
                                name="Edit"
                                type="button"
                                defaultValue="Edit"
                              />
                            </div>
                            <label>First Name :</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Juan"
                                readOnly
                              />
                              <input
                                className="btn btn-primary"
                                name="Edit"
                                type="button"
                                defaultValue="Edit"
                              />
                            </div>
                            <label>Middle Name (Not required) :</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Middle name"
                                readOnly
                              />
                              <input
                                className="btn btn-primary"
                                name="Edit"
                                type="button"
                                defaultValue="Edit"
                              />
                            </div>
                            <label>Last Name :</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="dela Cruz"
                                readOnly
                              />
                              <input
                                className="btn btn-primary"
                                name="Edit"
                                type="button"
                                defaultValue="Edit"
                              />
                            </div>
                            <label>Name Extension (Not required) :</label>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name Extension"
                                readOnly
                              />
                              <input
                                className="btn btn-primary"
                                name="Edit"
                                type="button"
                                defaultValue="Edit"
                              />
                            </div>
                            <div className="form-group mb-0 ml-auto pt-3">
                              <input
                                type="submit"
                                className="btn btn-success col-md-12"
                                defaultValue="Save and Update"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div id="account-settings" className="tab-pane fade">
                    <div className="pt-3">
                      <div className="settings-form">
                        <div className="pt-4 border-bottom-1 pb-3">
                          <h5 className="h5 text-primary">Edit Account Credentials</h5>
                        </div>
                        <form>
                          <div className="form-row">
                            <label>Email Address :</label>
                            <div className="input-group mb-3">
                              <input
                                className="form-control"
                                type="email"
                                placeholder="juandelacruz@gmail.com"
                                readOnly
                              />
                              <input
                                className="btn btn-primary"
                                name="Edit"
                                type="button"
                                defaultValue="Edit"
                              />
                            </div>
                            <label>Username :</label>
                            <div className="input-group mb-5">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="juandelacruz"
                                readOnly
                              />
                              <input
                                className="btn btn-primary"
                                name="Edit"
                                type="button"
                                defaultValue="Edit"
                              />
                            </div>
                            <div className="input-group mb-3">
                              <h4 className="text-muted mb-0">
                                <a
                                  href="changePassword"
                                  data-toggle="modal"
                                  data-target="#changePassword"
                                >
                                  <i className="flaticon-381-key" />
                                  &nbsp;Change password
                                </a>
                              </h4>
                            </div>
                            <div className="form-group mb-0 ml-auto pt-3">
                              <input
                                type="submit"
                                className="btn btn-success col-md-12"
                                defaultValue="Save and Update"
                              />
                            </div>
                          </div>
                        </form>
                        {/* Change Password Modal */}
                        <div className="modal fade" id="changePassword">
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="h5 modal-title">Change Password</h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                >
                                  <span>×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <h5 className="h5 text-primary d-inline">Enter:</h5>
                                <form>
                                  <div className="row mt-4 sp4">
                                    <label>Old Password*</label>
                                    <div className="input-group mb-2">
                                      <input
                                        type="password"
                                        className="form-control"
                                        required
                                      />
                                    </div>
                                    <label>New Password*</label>
                                    <div className="input-group mb-2">
                                      <input
                                        type="password"
                                        className="form-control"
                                        required
                                      />
                                    </div>
                                    <label>Confirm New Password*</label>
                                    <div className="input-group mb-5">
                                      <input
                                        type="password"
                                        className="form-control"
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-danger light"
                                      data-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                    <button type="submit" className="btn btn-success">
                                      Save and Update
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default ProfileSettings;
