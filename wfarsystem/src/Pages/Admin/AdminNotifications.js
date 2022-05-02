import React from "react";

import Notificationsbanner from "../../Components/NotificationsBanner";

const AdminNotifications = () => {
  return (
    <>

      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">NOTIFICATIONS</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            {/* Notifications banner*/}
            <Notificationsbanner />
            <div className="col-xl-12">
              <div className="card user-card">
                <div className="card-body pt-2 pb-1">
                  <div className="notification">
                    <div className="media pt-3 pb-3">
                      <div className="user-media mr-3 rounded-circle">
                        <img src="assets/img/user-sample.png" alt />
                      </div>
                      <div className="media-body">
                        <h5 className="h5 m-b-5">John Bautista</h5>
                        <p className="mb-0 text-info">Admin</p>
                        <p className="mb-0">04:30 PM | 04/19/22</p>
                      </div>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <span className="mb-0">
                          Admin promoted you to Area Chair.
                        </span>
                      </li>
                    </ul>
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

export default AdminNotifications;
