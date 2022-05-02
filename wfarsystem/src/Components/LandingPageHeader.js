import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const LandingPageHeader = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // REMOVE TOGGLE WHEN SCROLL
  window.onscroll = () => {
    document.querySelector("#menu-btn").classList.remove("fa-times");
    document.querySelector("#menu-btn").classList.add("fa-bars");
    document.querySelector(".navbar-start").classList.remove("active");
  };
  return (
    <React.Fragment>
      {/* HEADER  */}
      <header className="header-start">
        <div className="logo">
          <NavLink exact to="/" className="logo">
            <img src="assets/img/wfarlogo.png" alt="Logo" />
          </NavLink>
        </div>
        <nav className={isNavExpanded ? "navbar-start active" : "navbar-start"}>
          <NavLink exact to="/UserSignUp">Sign up</NavLink>
          <NavLink exact to="/UserSignIn" className="navbar-btn-start">Sign in</NavLink>
        </nav>
        <div
          className={isNavExpanded ? "fas fa-times" : "fas fa-bars"}
          id="menu-btn"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        ></div>
      </header>
    </React.Fragment>
  );
};

export default LandingPageHeader;
