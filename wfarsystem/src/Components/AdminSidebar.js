import { NavLink } from "react-router-dom";
import React, { useState,useEffect } from 'react';
import axios from "axios";
axios.defaults.withCredentials = true

const AdminSidebar = () => {
  // CHANGE HIGHLIGHTED BUTTON ON SIDEBAR
  const [isSideClicked, setSideClicked] = useState("--");
  const [admin, setAdmin] = useState('')

  const adminData = async () => {
    const res = await axios.get('http://localhost:4000/api/getAdminInfo').catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    adminData().then((data) => setAdmin(data.admin))
  }, [])

  return (
    <React.Fragment>
      {/* Sidebar */}
      <div className="deznav">
        <div className="deznav-scroll">
          <div className="main-profile">
            <div className="image-bx">
              <img src={admin.picture} alt />
              <NavLink exact to="/AdminProfile">
                <i className="fa fa-cog" aria-hidden="true" />
              </NavLink>
            </div>
            <h5 className="h5 name">
              <span className="font-w400">Hello,</span> {admin.last_name}
            </h5>
          </div>
          <ul className="metismenu" id="menu">
            <li className="nav-label first">Main Menu</li>
            <li
              className={
                isSideClicked === "Dashboard" ? "mm-active" : ""
              }
            >
              <NavLink exact to="/Admin"
                className="ai-icon"
                aria-expanded="false"
                onClick={
                  () => { setSideClicked("Dashboard") }
                }
              >
                <i className="flaticon-001-monitor" />
                <span className="nav-text">Dashboard</span>
              </NavLink>
            </li>
            <li
              className={
                isSideClicked === "profile" ? "mm-active" : ""
              }
            >
              <NavLink exact to="/AdminProfile"
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
              <NavLink exact to="/AdminNotifications"
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
                isSideClicked === "Accounts" ? "mm-active" : ""
              }
            >
              <a
                className="has-arrow ai-icon"
                href="javascript:void()"
                aria-expanded="false"
                onClick={
                  () => { setSideClicked("Accounts") }
                }
              >
                <i className="flaticon-028-user-1" />
                <span className="nav-text">Accounts</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <NavLink exact to="/AdminAccountRequest"
                    onClick={
                      () => { setSideClicked("Accounts") }
                    }
                  >Account Request/s</NavLink>
                </li>
                <li>
                  <NavLink exact to="/AdminPromoteDemote"
                    onClick={
                      () => { setSideClicked("Accounts") }
                    }
                  >Promotion and Demotion</NavLink>
                </li>
                <li>
                  <NavLink exact to="/AdminFacultyAssignment"
                    onClick={
                      () => { setSideClicked("Accounts") }
                    }
                  >Faculty Assignment</NavLink>
                </li>
              </ul>
            </li>
            <li
              className={
                isSideClicked === "Submissions" ? "mm-active" : ""
              }
            >
              <NavLink
                exact to="/AdminAllWfarSubmissions"
                className="ai-icon"
                aria-expanded="false"
                onClick={
                  () => { setSideClicked("Submissions") }
                }
              >
                <i className="flaticon-381-file-1" />
                <span className="nav-text">WFAR Submissions</span>
              </NavLink>
            </li>
            <li
              className={
                isSideClicked === "Contents" ? "mm-active" : ""
              }
            >
              <NavLink exact to="/AdminManageContents"
                className="ai-icon"
                aria-expanded="false"
                onClick={
                  () => { setSideClicked("Contents") }
                }
              >
                <i className="flaticon-162-edit" />
                <span className="nav-text">Contents</span>
              </NavLink>
            </li>
            <li className="nav-label">GENERATE</li>
            <li
              className={
                isSideClicked === "Reports" ? "mm-active" : ""
              }
            >
              <a
                className="has-arrow ai-icon"
                href="javascript:void()"
                aria-expanded="false"
                onClick={
                  () => { setSideClicked("Reports") }
                }
              >
                <i className="flaticon-119-printer" />
                <span className="nav-text">Reports</span>
              </a>
              <ul aria-expanded="false">
                <li>
                  <NavLink exact to="/AdminReport"
                    onClick={
                      () => { setSideClicked("Reports") }
                    }
                  >Completed Requirements</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminSidebar;
