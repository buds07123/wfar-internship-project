import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const FacultySidebar = () => {
  // CHANGE HIGHLIGHTED BUTTON ON SIDEBAR
  const [isSideClicked, setSideClicked] = useState("--");

  return (
    <React.Fragment>
      {/* Sidebar */}
      <div className="deznav">
        <div className="deznav-scroll">
          <div className="main-profile">
            <div className="image-bx">
              <img src="assets/img/user-sample.png" alt />
              <NavLink exact to="/FacultyProfile">
                <i className="fa fa-cog" aria-hidden="true" />
              </NavLink>
            </div>
            <h5 className="h5 name">
              <span className="font-w400">Hello,</span> Cruz
            </h5>
          </div>
          <ul className="metismenu" id="menu">
            <li className="nav-label first">Main Menu</li>
            <li
              className={
                isSideClicked === "home" ? "mm-active" : ""
              }
            >
              <NavLink exact to="/Faculty"
                className="ai-icon"
                aria-expanded="false"
                onClick={
                  () => { setSideClicked("home") }
                }
              >
                <i className="flaticon-141-home" />
                <span className="nav-text">Home</span>
              </NavLink>
            </li>
            <li
              className={
                isSideClicked === "profile" ? "mm-active" : ""
              }
            >
              <NavLink exact to="/FacultyProfile"
                className="ai-icon"
                aria-expanded="false"
                onClick={
                  () => { setSideClicked("profile") }
                }
              >
                <i className="flaticon-153-user" />
                <span className="nav-text">Profile</span>
              </NavLink>
            </li>
            <li
              className={
                isSideClicked === "notifications" ? "mm-active" : ""
              }
            >
              <NavLink exact to="/FacultyNotifications"
                className="ai-icon"
                aria-expanded="false"
                onClick={
                  () => { setSideClicked("notifications") }
                }
              >
                <i className="flaticon-381-notification" />
                <span className="nav-text">Notifications</span>
              </NavLink>
            </li>
            <li className="nav-label">MANAGE</li>
            <li
              className={
                isSideClicked === "submissions" ? "mm-active" : ""
              }
            >
              <NavLink exact to="/FacultyOwnSubmissions"
                className="ai-icon"
                aria-expanded="false"
                onClick={
                  () => { setSideClicked("submissions") }
                }
              >
                <i className="flaticon-381-file-1" />
                <span className="nav-text">My WFAR Submissions</span>
              </NavLink>
            </li>
            <li
              className={
                isSideClicked === "Archives" ? "mm-active" : ""
              }
            >
              <NavLink exact to="/FacultyArchives"
                className="ai-icon"
                aria-expanded="false"
                onClick={
                  () => { setSideClicked("Archives") }
                }
              >
                <i className="ti-archive" />
                <span className="nav-text">Archives</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FacultySidebar;
