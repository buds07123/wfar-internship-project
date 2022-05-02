import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LandingPageHeader from "../Components/LandingPageHeader";

const UserSignUp = () => {
  //LOAD SELECTED PROFILE PICTURE
  const [image, setImage] = useState(null);

  const loadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  //SWITCH TO SIGN IN PAGE
  const [page, setPage] = useState(false);
  const navigate = useNavigate();

  function routeChange(e) {
    setTimeout(function () {
      navigate("/UserSignIn");
    }, 1000);
  }

  //ENABLE SUBMIT BUTTON
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      {/* Content  */}
      <div
        className={page ? "container-start" : "container-start sign-up-mode"}
        style={{ height: "188vh" }}
      >
        <div className="forms-container">
          <div className="signin-signup">
            {/*SIGN UP*/}
            <form action="#" className="form sign-up-form">
              <h2 className="title">SIGN UP </h2>
              <p>Fill out the form to give us your account information.</p>
              <div className="profile-pic">
                <label className="label" for="file">
                  <span className="span">
                    <i className="fa fa-pencil"></i>&nbsp;Add Photo
                  </span>
                </label>
                <input
                  id="file"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={loadImage}
                />
                <img
                  src={image === null ? "assets/img/user-sample.png" : image}
                  id="addprofilephoto"
                />
              </div>
              <br />
              <div className="input-field">
                <i className="fa-solid fa-id-card"></i>
                <input type="text" placeholder="Employee Number" required />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="First Name" required />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Middle Name (Not required)" />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Last Name" required />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Name Extension (Not required)" />
              </div>
              <div class="select">
                <select class="select textIndent" name="position" id="position">
                  <option selected disabled hidden>
                    &#xf2c1; &nbsp;&nbsp; Select your Position
                  </option>
                  <option value="Faculty">&#xf2c1; &nbsp;&nbsp; Faculty</option>
                  <option value="Area Chair">&#xf2c1; &nbsp;&nbsp; Area Chair</option>
                  <option value="Department Head">
                    &#xf2c1; &nbsp;&nbsp; Department Head
                  </option>
                </select>
              </div>
              <div class="select">
                <select class="select textIndent" name="position" id="position">
                  <option selected disabled hidden>
                    &#xf2c1; &nbsp;&nbsp; Select your Department
                  </option>
                  <option value="BSIT">&#xf2c1; &nbsp;&nbsp; BSIT</option>
                  <option value="BLIS">&#xf2c1; &nbsp;&nbsp; BLIS</option>
                </select>
              </div>
              <div class="sign">
                <label class="-label" for="file">
                  <span>
                    <i class="icon-copy fa fa-cloud-upload" aria-hidden="true"></i>
                    &nbsp;Upload Photo
                  </span>
                </label>
                <input
                  id="file"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={loadImage}
                />

                <img
                  src={image === null ? "assets/img/signature.png" : image}
                  id="addprofilephoto"
                />
              </div>
              <div class="input-field">
                <i class="fas fa-user-circle"></i>
                <input type="text" placeholder="Username" required />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email address" required />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" required />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Confirm Password" required />
              </div>
              <label class="signup_span">
                <input
                  type="checkbox"
                  onClick={() => {
                    setIsChecked(!isChecked);
                  }}
                />
                <p>
                  &nbsp; I agree to the{" "}
                  <a href="terms" data-toggle="modal" data-target="#terms">
                    Terms and Conditions
                  </a>
                  .
                </p>
              </label>
              <input
                type="submit"
                className={
                  isChecked ? "btn-lpage btn-start" : "btn-lpage btn-start disabled"
                }
                value="Sign Up"
              />
            </form>
          </div>
        </div>

        {/*PAGE INFO FOR SIGN IN AND UP*/}
        <div className="panels-container" style={{ marginTop: "-5%" }}>
          <div className="panel left-panel">
            <div className="content">
              <button
                className="btn-lpage"
                id="sign-up-btn"
                style={{ visibility: "hidden" }}
              ></button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3 className="text-white">One of us?</h3>
              <p>Sign in to your account and upload your weekly accomplishments.</p>
              <button
                className="btn-lpage btn-start transparent"
                id="sign-in-btn"
                onClick={() => {
                  setPage(!page);
                  routeChange();
                }}
              >
                Sign In
              </button>
            </div>
            <img src="assets/img/register.png" className="image" alt="" />
          </div>
        </div>

        {/* Terms and Conditions Modal */}
        <div className="modal fade" id="terms">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="h5 modal-title">WFARMS Terms and Conditions</h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <h5 className="h5 text-primary d-inline">Last updated: April 20, 2022</h5>
                <form>
                  <div className="row p-3 justify ">
                    <p className="fs-15 ">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum."
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger light"
                      data-dismiss="modal"
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
