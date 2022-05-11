import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {  

  const navigate = useNavigate()

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const adminLogin = async (e) => {
    e.preventDefault()

    const loginData = {
      username,
      password
    }

    await axios.post("http://localhost:4000/api/adminLogin",loginData)
    .then(res => {window.location.href = '/Admin'})
    .catch(err => {
      console.log(err)
      if (err.response.data.err === "invalid password") {
        alert('Invalid Password.')
      } else if (err.response.data.err === "The username is not existing") {
        alert('The username is not existing.')
      }
    })
  }

  return (
    <React.Fragment>
      <div>
        <img className="wave" src="assets/img/wave.png" />
        <div className="container">
          <div className="img">
            <img src="assets/img/login1.png" />
          </div>
          <div className="login-content">
            <form className="login-form" onSubmit={adminLogin}>
              <div className="text-center mb-4 logo">
                <img src="assets/img/cict-logo.png" alt />
              </div>
              <h3 className="h3 text-center mb-3">SIGN IN TO YOUR ACCOUNT</h3>
              <div className="input-div one">
                <div className="i">
                  <i className="ti-user" />
                </div>
                <div className="div">
                  <input type="text" className="input" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" required />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="ti-lock" />
                </div>
                <div className="div">
                  <input type="password" className="input" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" required />
                </div>
              </div>
              <a href="forgotPassword" data-toggle="modal" data-target="#forgotPassword">
                Forgot Password?
              </a>
              <input type="submit" className="btn-login" defaultValue="Sign in" />
            </form>
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
                  <form>
                    <div className="row mt-4 sp4">
                      <label>Email address:</label>
                      <div className="input-group mb-5">
                        <input type="password" className="form-control" required />
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
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminLogin;
