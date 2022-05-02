import React, { useState } from "react";

import ProfileSettings from "../../Components/ProfileSettings";
import Profileoverview from "../../Components/ProfileOverview";

const AcdhProfile = () => {
  const [image, setImage] = useState(null);

  const loadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">MY PROFILE</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="profile card card-body px-3 pt-3 pb-0">
                <div className="profile-head">
                  <div className="photo-content">
                    <div className="user-cover-photo" />
                  </div>
                  <div className="profile-info">
                    <div className="profile-photo">
                      <div className="avatar-upload">
                        <div className="avatar-edit">
                          <input
                            type="file"
                            id="imageUpload"
                            accept=".png, .jpg, .jpeg"
                            onChange={loadImage}
                          />
                          <label htmlFor="imageUpload" />
                        </div>
                        <div className="avatar-preview">
                          <div id="imagePreview">
                            <img
                              src={image === null ? "assets/img/user-sample.png" : image}
                              id="avatar"
                              className="img-fluid rounded-circle"
                              alt="Avatar"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile-details">
                      <div className="profile-name px-3 pt-2">
                        <h4 className="h4 text-primary mb-0">Juan dela Cruz</h4>
                        <p>Area chair</p>
                      </div>
                      <div className="ml-auto">
                        <button className="btn btn-danger">
                          <i className="flaticon-381-trash-1" />
                          &nbsp;Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Overview */}
            <Profileoverview />
            {/* General Account Settings */}
            <ProfileSettings />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AcdhProfile;
