import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import LandingPageHeader from "../Components/LandingPageHeader";

const UserSignUp = () => {
  //LOAD SELECTED PROFILE PICTURE
  const [image, setImage] = useState('');
  const [imageSignature, setImageSignature] = useState('')

  const [emp_picture, setEmp_picture] = useState('')
  const [emp_number, setEmp_number] = useState('')
  const [fname, setFirst_name] = useState('')
  const [mname, setMiddle_name] = useState('')
  const [lname, setLast_name] = useState('')
  const [name_extension, setName_ex] = useState('')
  const [course, setCourse] = useState('')
  const [signature, setSignature] = useState('')
  const [position, setPosition] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const loadImage = (event) => {
    setEmp_picture(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const signaturePic = (event) => {
    setSignature(event.target.files[0])
    setImageSignature(URL.createObjectURL(event.target.files[0]))
  }

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

  const registerEmp = async (e) => {
    e.preventDefault()

    const formData = new FormData()


    formData.set('emp_picture', emp_picture)
    formData.set('emp_number', emp_number)
    formData.set('fname', fname)
    formData.set('mname', mname)
    formData.set('lname', lname)
    formData.set('name_extension', name_extension)
    formData.set('course', course)
    formData.set('signature', signature)
    formData.set('position', position)
    formData.set('username', username)
    formData.set('email', email)
    formData.set('password', password)
    formData.set('passwordCheck', passwordCheck)

    // const formData = {
    //     emp_picture,
    //     emp_number,
    //     fname,
    //     mname,
    //     lname,
    //     name_extension,
    //     position,
    //     username,
    //     email,
    //     password,
    //     passwordCheck
    // }

    await axios.post("http://localhost:4000/api/register", formData)
      .then(res => {
        if (res.data.msg === "Registration Successful") {
          alert('Registration Successful.')
          navigate("/UserSignIn");
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response.data.err === "Password must atleast 8 characters") {
          alert('Password must atleast 8 characters.')
        } else if (err.response.data.err === "Password must be same for verification") {
          alert('Password must be same for verification.')
        } else if (err.response.data.err === 'The username is taken. Try another.') {
          alert("The username is taken. Try another.")
        } else if (err.response.data.err === 'The email is taken. Try another.') {
          alert("The email is taken. Try another.")
        }
      })
  }

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
            <form onSubmit={registerEmp} className="form sign-up-form">
              <h2 className="title">SIGN UP </h2>
              <p>Fill out the form to give us your account information.</p>
              <div className="profile-pic">
                <label className="label" for="profilePhoto">
                  <span className="span">
                    <i className="fa fa-pencil"></i>&nbsp;Add Photo
                  </span>
                </label>
                <input
                  id="profilePhoto"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={loadImage}
                  name="emp_picture"
                  required
                />
                <img
                  src={image === '' ? "assets/img/user-sample.png" : image}
                  id="addprofilephoto"
                />
              </div>
              <br />
              <div className="input-field">
                <i className="fa-solid fa-id-card"></i>
                <input type="number" onChange={(e) => setEmp_number(e.target.value)} value={emp_number} placeholder="Employee Number" required />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" onChange={(e) => setFirst_name(e.target.value)} value={fname} placeholder="First Name" required />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" onChange={(e) => setMiddle_name(e.target.value)} value={mname} placeholder="Middle Name (Not required)" />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" onChange={(e) => setLast_name(e.target.value)} value={lname} placeholder="Last Name" required />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" onChange={(e) => setName_ex(e.target.value)} value={name_extension} placeholder="Name Extension (Not required)" />
              </div>
              <div class="select">
                <select class="select textIndent" name="position" id="position" onChange={(e) => setPosition(e.target.value)} defaultValue={position} required>
                  <option value={position} selected disabled hidden>
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
                <select class="select textIndent" name="course" id="course" onChange={(e) => setCourse(e.target.value)} defaultValue={course} required>
                  <option value={course} selected disabled hidden>
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
                  onChange={signaturePic}
                  name="signature"
                  required
                />
                <img
                  src={imageSignature === '' ? "assets/img/signature.png" : imageSignature}
                  id="addsignaturephoto"
                />
              </div>
              <div class="input-field">
                <i class="fas fa-user-circle"></i>
                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" required />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email address" required />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" required />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" onChange={(e) => setPasswordCheck(e.target.value)} value={passwordCheck} placeholder="Confirm Password" required />
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
                      "Please read these terms and conditions ("terms and conditions", "terms) carefully before using website (website", "service") operated by WFAR ("us", "we", "our")

                      Conditions of Use
                      By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website accordingly. WFAR only grants use and access of this website, its products, and its services to those who have accepted its terms.

                      Privacy Policy
                      Before you continue using our website, we advise you to read our privacy policy link to privacy policy regarding our user data collection. It will help you better understand our practices.

                      Age Restriction
                      You must be at least 18 (eighteen) years of age before you can use this website. By using this website, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement. WFAR assumes no responsibility for liabilities related to age misrepresentation.

                      Intellectual Property
                      You agree that all materials, products, and services provided on this website are the property of WFAR its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the WFAR's intellectual property in any way, including electronic, digital, or new trademark registrations.
                      You grant WFAR a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company in order to come to an agreement.

                      User Accounts
                      As a user of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.
                      If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly.
                      We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.

                      Applicable Law
                      By visiting this website, you agree that the laws of the location, without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between WFAR and you, or its business partners and associates

                      Disputes
                      Any dispute related in any way to your visit to this website or to products you purchase from us shall be arbitrated by state or federal court [location) and you consent to exclusive jurisdiction and venue of such courts.

                      Indemnification
                      You agree to indemnify WFAR and its affiliates and hold WFAR harmless against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel.

                      Limitation on Liability
                      WFAR is not liable for any damages that may occur to you as a result of your misuse of our website.
                      WFAR reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between WFAR and the user, and this supersedes and replaces all prior agreements regarding the use of this website."
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
