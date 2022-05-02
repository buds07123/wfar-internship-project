import React from "react";

const Profileoverview = () => {
  return (
    <React.Fragment>
      <div className="col-xl-4">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="overview">
                  <h5 className="h5 text-primary d-inline">Overview</h5>
                </div>
                <div className="profile-personal-info">
                  <p className="mt-3 fs-14">Employee Number:</p>
                  <div className="d-flex">
                    <h3 className="font-w600">2018107260</h3>
                  </div>
                  <p className="mt-2 fs-14">Full Name:</p>
                  <div className="d-flex">
                    <h3 className="font-w600">Juan dela Cruz</h3>
                  </div>
                  <p className="mt-2 fs-14">User Level/Position: </p>
                  <div className="d-flex">
                    <h3 className="font-w600">*Position*</h3>
                  </div>
                  <p className="mt-2 fs-14">Username:</p>
                  <div className="d-flex">
                    <h3 className="font-w600">juandelacruz</h3>
                  </div>
                  <p className="mt-2 fs-14">Email address:</p>
                  <div className="d-flex">
                    <h3 className="font-w600">juandelacruz@gmail.com</h3>
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

export default Profileoverview;
