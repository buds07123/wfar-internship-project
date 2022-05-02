import React from "react";
import { NavLink } from 'react-router-dom';

import LandingPageFooter from "../Components/LandingPageFooter";
import LandingPageHeader from "../Components/LandingPageHeader";

const LandingPage = () => {
  return (
    <>
        {/* HOME  */}
        <section className="home" id="home">
          <div className="content">
            <h1>Web-based Faculty Accomplishment Report</h1>
            <p>Upload your individual weekly accomplishment reports with ease.</p>
            <NavLink to='/UserSignUp' className="home-btn">Get Started</NavLink>
          </div>
          <div className="image">
            <img src="assets/img/img1.png" alt="Landing-Page-Illustration" />
          </div>
        </section>
        {/* End */}

        {/* FEATURES */}
        <section className="features" id="features">
          <div className="heading">
            <h1>FEATURES</h1>
            <p>
              Our goal is to make it quick and simple for professors to upload weekly
              accomplishments to an organized platform where they can be managed and
              accessed on the go.
            </p>
          </div>

          <div className="row">
            <div className="image">
              <img src="assets/img/illustration-features-tab-1.svg" alt="Feature" />
            </div>
            <div className="content">
              <h1>Improves Productivity, Accuracy and Timeliness</h1>
              <p>
                The system will enable the faculty members to submit their accomplishment
                reports with less hassle, and helps the Department Head to automate
                reports to save countless hours of sifting through mounds of paperwork in
                search for data and results.
              </p>
              <NavLink to='/UserSignUp' className="btn-start">Experience it now</NavLink>
            </div>

            <div className="content">
              <h1>Identifies Potential Problems Early</h1>
              <p>
                The system will allow the Admin and Department Head to closely monitor the
                faculty members' accomplishment reports and notify them about of what are
                still lacking.
              </p>
              <NavLink to='/UserSignUp' className="btn-start">Get access</NavLink>
            </div>
            <div className="image">
              <img src="assets/img/illustration-features-tab-2.svg" alt="Feature" />
            </div>

            <div className="image">
              <img src="assets/img/illustration-features-tab-1.svg" alt="Feature" />
            </div>
            <div className="content">
              <h1>Increase Communication</h1>
              <p>
                Because the WFAR System is used by the entire department, there will be
                improved communication between admin, department head and other faculty
                members which helps to identify problem areas and discover mutually
                agreeable solutions faster.
              </p>
              <NavLink to='/UserSignUp' className="btn-start">Sign up now</NavLink>
            </div>
          </div>
        </section>
        {/* End */}

        {/* ADVANTAGES */}
        <section className="advantages" id="advantages">
          <div className="sub-heading">
            <h1>College of Information and Communications Technology</h1>
            <p>
              Bulacan State University's College of Information and Communications
              Technology has been providing quality ICT education since 1989.
            </p>
          </div>
          <div className="box-container">
            <div className="box">
              <img src="assets/img/cict-logo.png" alt="" />
              <h3>CICT Facebook Page</h3>
              <br />
              <a href="https://www.facebook.com/BulsuCICT.official" className="btn-start">
                Visit
              </a>
            </div>
            <div className="box">
              <img src="assets/img/cursor.png" alt="" />
              <h3>CURSOR Publication</h3>
              <br />
              <a href="https://www.facebook.com/cursorpub" className="btn-start">
                Visit
              </a>
            </div>
            <div className="box">
              <img src="assets/img/bulsu-og.jpg" alt="" />
              <h3>BSU Facebook Page</h3>
              <br />
              <a href="https://www.facebook.com/bulsuofficial" className="btn-start">
                Visit
              </a>
            </div>
          </div>
        </section>
        {/* End */}

        {/* FOOTER  */}
        <LandingPageFooter/>
        {/* End */}
    </>
  );
};

export default LandingPage;
