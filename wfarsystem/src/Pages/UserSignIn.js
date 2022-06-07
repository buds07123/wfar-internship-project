import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import LandingPageHeader from "../Components/LandingPageHeader";

const UserSignIn = () => {
  // SWITCH TO SIGN UP PAGE
  const [page, setPage] = useState(false);
  const history = useNavigate();

  function routeChange(e) {
    setTimeout(function () {
      history("/UserSignUp");
    }, 1000);
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginEmp = async (e) => {
    e.preventDefault()

    try {
      const loginData = {
        username,
        password
      }

      // if (email === loginData.email || email === loginData.username) {
      //   await axios.post("http://localhost:4000/api/login", loginData)
      //   window.location.href = '/Faculty'
      // }

      await axios.post("http://localhost:4000/api/login", loginData)
      window.location.href = '/Faculty'

    } catch (error) {
      console.log(error)
      if (error.response.data.err === "invalid password") {
        alert('Invalid Password.')
      } else if (error.response.data.err === "The email or username is not existing") {
        alert('The email or username is not existing.')
      } else if (error.response.data.err === "Verify your account first in your email account") {
        alert('Your account is not yet activated. Please check your email for verification.')
      }
    }
  }

  const [email_address,setEmail_address] = useState('')
  const [isPassCheck,setPassCheck] = useState('')

  const checkEmail = async (e) => {
    e.preventDefault()

    const emailAdd = {
      email_address
    }

    await axios.post("http://localhost:4000/api/forgotPass", emailAdd)
    .then(res => {
      setPassCheck(res.data)
    })
    .catch(err => {
      if (err.response.data.err === "Verify your account first in your email account") {
        alert('Verify your account first in your email account.')
      } else if (err.response.data.err === "The email or username is not existing") {
        alert('The email is not existing.')
      }
    })
  }

  const [newPassword,setNewPassword] = useState('')
  const [passwordCheck,setPasswordCheck] = useState('')

  const toChangePass = async (e) => {
    e.preventDefault()

    const formData = {
      newPassword,
      passwordCheck
    } 

    await axios.put(`http://localhost:4000/api/toChangeForgotPass/${isPassCheck.employee._id}`, formData)
    .then(res => {
      alert("Password Successfully Updated.")
      window.location.reload();
    })
    .catch(err => {
      alert("Password must be same for verification.")
    })
  }

  return (
    <>
      {/* Content  */}
      <div className={page ? "container-start sign-up-mode" : "container-start"}>
        <div className="forms-container">
          <div className="signin-signup" style={{ marginTop: "-3%" }}>
            {/* SIGN IN */}
            <form onSubmit={loginEmp} className="form sign-in-form">
              <h2 className="title">SIGN IN </h2>
              <p>
                Welcome back, Instructors! <i className="fa-solid fa-hand"></i>
                <br /> Please login to continue.
              </p>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Email address or Username" required />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" required />
              </div>
              {/* <div className="error badge light badge-danger">
                <p><strong>ERROR:</strong> Invalid sign-in credentials. </p>
                <p>Attemps remaining: <strong>3</strong></p>
              </div> */}
              <span className="span">
                <a href="forgotPassword" data-toggle="modal" data-target="#forgotPassword">
                  Forgot Password? 
                </a>
              </span>
              <input
                type="submit"
                value="Sign In"
                className="btn-lpage btn-start"
              />
            </form>
          </div>
        </div>

        {/* PAGE INFO FOR SIGN IN AND UP */}
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3 className="text-white">New here?</h3>
              <p>
                Register and manage your submission of individual weekly accomplishment
                reports with ease.
              </p>
              <button
                className="btn-start transparent"
                id="sign-up-btn"
                onClick={() => {
                  setPage(!page);
                  routeChange();
                }}
              >
                Sign Up
              </button>
            </div>
            <img src="assets/img/login.png" className="image" alt="" />
          </div>
        </div>

        {/* Forgot Password Modal */}
        <div className="modal fade" id="forgotPassword">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="h5 modal-title">Trouble logging in?</h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <h5 className="h5 text-primary d-inline">
                  Enter your registered email and we will send you a link to get back to
                  your account.
                </h5>
                <form onSubmit={checkEmail}>
                  <div className="row mt-4 sp4">
                    <label>Email address:</label>
                    <div className="input-group mb-5">
                      <input type="email" className="form-control" onChange={(e) => setEmail_address(e.target.value)} value={email_address} required />
                    </div>
                  </div>
                  <div className="input-group mb-3 justify-content-sm-end d-flex">
                    {/* <h4 className="text-muted mb-0">
                      <a
                        href="changePassword"
                        data-toggle="modal"
                        data-target="#changePassword"
                        data-dismiss="modal"
                        // onClick={e => alert('hahaha')}
                      >
                        <i className="flaticon-065-right-arrow-1"  />
                        &nbsp;Next
                      </a>
                    </h4> */}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger light"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    
                    <button type="submit"
                      className="btn btn-success"
                      data-toggle="modal"
                      data-target={isPassCheck.employee?.isPass == true ? "#changePassword" : "" } 
                      >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Modal */}
        <div className="modal fade" id="changePassword">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="h5 modal-title">Change Password</h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <h5 className="h5 text-primary d-inline">Enter:</h5>
                <form onSubmit={toChangePass}>
                  <div className="row mt-4 sp4">
                    <label>New Password*</label>
                    <div className="input-group mb-2">
                      <input type="password" className="form-control" onChange={e => setNewPassword(e.target.value)} value={newPassword} required />
                    </div>
                    <label>Confirm New Password*</label>
                    <div className="input-group mb-5">
                      <input type="password" className="form-control" onChange={e => setPasswordCheck(e.target.value)} value={passwordCheck} required />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger light"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      Save and Update
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

export default UserSignIn;
