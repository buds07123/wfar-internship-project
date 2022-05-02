import React from "react";

const Announcement = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-xl-3 col-xxl-4">
          <div className="card">
            <div className="card-body">
              <div className="wfar-entry mb-2 mb-xxl-2 mb-md-0">
                <div className="wfar-img-content">
                  <img
                    className="img-fluid"
                    src="assets/img/welcome-back.png"
                    alt
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-xxl-8">
          <div className="card bg-vgradient">
            <div className="card-body vgradient row">
              <div className="col-xl-7 col-sm-6">
                <div className="justify">
                  <h2>ANNOUNCEMENT</h2>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </span>
                </div>
              </div>
              <div className="col-xl-5 col-sm-6">
                <img
                  src="assets/img/announcement.png"
                  alt
                  className="sd-shape"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Announcement;
