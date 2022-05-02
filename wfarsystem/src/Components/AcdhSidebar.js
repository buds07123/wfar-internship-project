import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AcdhSidebar = () => {
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
                            <NavLink exact to="/ACDHProfile"><i className="fa fa-cog" aria-hidden="true" /></NavLink>
                        </div>
                        <h5 className="h5 name"><span className="font-w400">Hello,</span> Cruz</h5>
                    </div>
                    <ul className="metismenu" id="menu">
                        <li className="nav-label first">Main Menu</li>
                        <li
                            className={
                                isSideClicked === "Dashboard" ? "mm-active" : ""
                            }
                        >
                            <NavLink exact to="/ACDH"
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
                            <NavLink exact to="/ACDHProfile"
                                className="ai-icon"
                                aria-expanded="false" onClick={
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
                            <NavLink exact to="/ACDHNotifications"
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
                                isSideClicked === "Submissions" ? "mm-active" : ""
                            }
                        >
                            <NavLink exact to="/ACDHOwnSubmissions"
                                className="ai-icon"
                                aria-expanded="false"
                                onClick={
                                    () => { setSideClicked("Submissions") }
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
                            <NavLink exact to="/ACDHArchives"
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
                        <li className="nav-label">MONITOR</li>
                        <li
                            className={
                                isSideClicked === "Request" ? "mm-active" : ""
                            }
                        >
                            <NavLink exact to="/ACDHAccountRequest"
                                className="ai-icon"
                                aria-expanded="false"
                                onClick={
                                    () => { setSideClicked("Request") }
                                }
                            >
                                <i className="flaticon-019-add-user" />
                                <span className="nav-text">Account Request/s</span>
                            </NavLink>
                        </li>
                        <li
                            className={
                                isSideClicked === "Handle" ? "mm-active" : ""
                            }
                        >
                            <NavLink exact to="/ACDHAllHandle"
                                className="ai-icon"
                                aria-expanded="false"
                                onClick={
                                    () => { setSideClicked("Handle") }
                                }
                            >
                                <i className="flaticon-381-user-9" />
                                <span className="nav-text">Handle Faculty</span>
                            </NavLink>
                        </li>
                        <li className="nav-label">GENERATE</li>
                        <li
                            className={
                                isSideClicked === "Report" ? "mm-active" : ""
                            }
                        >
                            <NavLink exact to="/ACDHReport"
                                className="ai-icon"
                                aria-expanded="false"
                                onClick={
                                    () => { setSideClicked("Report") }
                                }
                            >
                                <i className="flaticon-119-printer" />
                                <span className="nav-text">Report</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AcdhSidebar;
