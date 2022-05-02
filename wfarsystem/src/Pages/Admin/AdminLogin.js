import React from "react";

const AdminLogin = () => {
  return (
    <React.Fragment>
      <div>
        <img className="wave" src="assets/img/wave.png" />
        <div className="container">
          <div className="img">
            <img src="assets/img/login1.png" />
          </div>
          <div className="login-content">
            <form className="login-form" action="#">
              <div className="text-center mb-4 logo">
                <img src="assets/img/cict-logo.png" alt />
              </div>
              <h3 className="h3 text-center mb-3">SIGN IN TO YOUR ACCOUNT</h3>
              <div className="input-div one">
                <div className="i">
                  <i className="ti-user" />
                </div>
                <div className="div">
                  <input type="text" className="input" placeholder="Username or Email" />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="ti-lock" />
                </div>
                <div className="div">
                  <input type="password" className="input" placeholder="Password" />
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
