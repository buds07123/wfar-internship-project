import React from 'react';

const AdminRegister = () => {
    return (
        <React.Fragment>
            <div>
            <img className="wave" src="assets/img/wave.png" />
            <div className="container">
                <div className="img">
                <img src="assets/img/signup.png" />
                </div>
                <div className="register">
                <form className="login-form" action="#">
                    <div className="text-center mb-4 logo">
                    <img src="assets/img/cict-logo.png" alt />
                    </div>
                    <h3 className="h3 text-center mb-3">CREATE YOUR ACCOUNT</h3>
                    <div className="input-div one">
                    <div className="i">
                        <i className="ti-user" />
                    </div>
                    <div className="div">
                        <input type="text" className="input" placeholder="First name" />
                    </div>
                    </div>
                    <div className="input-div one">
                    <div className="i">
                        <i className="ti-user" />
                    </div>
                    <div className="div">
                        <input type="text" className="input" placeholder="Middle name (Not required)" />
                    </div>
                    </div>
                    <div className="input-div one">
                    <div className="i">
                        <i className="ti-user" />
                    </div>
                    <div className="div">
                        <input type="text" className="input" placeholder="Last name" />
                    </div>
                    </div>
                    <div className="input-div one">
                    <div className="i">
                        <i className="ti-user" />
                    </div>
                    <div className="div">
                        <input type="text" className="input" placeholder="Username" required />
                    </div>
                    </div>
                    <div className="input-div one">
                    <div className="i">
                        <i className="ti-email" />
                    </div>
                    <div className="div">
                        <input type="email" className="input" placeholder="Email" required />
                    </div>
                    </div>
                    <div className="input-div pass">
                    <div className="i"> 
                        <i className="ti-lock" />
                    </div>
                    <div className="div">
                        <input type="password" className="input" placeholder="Password" required />
                    </div>
                    </div>
                    <div className="input-div pass">
                    <div className="i"> 
                        <i className="ti-lock" />
                    </div>
                    <div className="div">
                        <input type="password" className="input" placeholder="Confirm password" required />
                    </div>
                    </div>
                    <input type="submit" className="btn-login" defaultValue="Sign up" />
                </form>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

export default AdminRegister;
