import React from "react";

const Wfarbanner = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content">
                <div className="cover-photo" />
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src="assets/img/cict-logo.png"
                    className="img-fluid rounded-circle"
                    alt
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="h4 text-primary mb-0">WEEKLY ACCOMPLISHMENT REPORT</h4>
                    <p>CICT</p>
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

export default Wfarbanner;
