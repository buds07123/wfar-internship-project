import React, { useState, useEffect } from "react";
import axios from 'axios'
axios.defaults.withCredentials = true

export default function AdminProfileSettings() {

    const [editable, setEditable] = useState({});

    const handleEdit = (id) => {
        setEditable({ ...editable, [id]: !editable[id] });
    };

    const [admin, setAdmin] = useState('')

    const adminData = async () => {
        const res = await axios.get('http://localhost:4000/api/getAdminInfo').catch(err => console.log(err))

        return res.data
    }

    useEffect(() => {
        adminData().then((data) => setAdmin(data.admin))
    }, [])

    //Edit Profile
    const [first_name, setFirst_name] = useState(admin.first_name)
    const [middle_name, setMiddle_name] = useState(admin.middle_name)
    const [last_name, setLast_name] = useState(admin.last_name)
    const [username, setUsername] = useState(admin.username)
    const [email, setEmail] = useState(admin.email)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const submitBtn = async (e) => {
        e.preventDefault()

        const formData = {
            first_name,
            middle_name,
            last_name,
            username,
            email
        }

        await axios.put(`http://localhost:4000/api/editAdminProfile/${admin._id}`, formData)
            .then(res => {
                if (res.data.msg === "Successfully Updated") {
                    alert("Successfully Updated!")
                }
            })
    }

    const changePassword = async (e) => {
        e.preventDefault()

        const formData = {
            password,
            newPassword,
            passwordCheck
        }

        await axios.put(`http://localhost:4000/api/adminChangePass/${admin._id}`, formData)
            .then(res => {
                if (res.data.msg == "Password Successfully Updated") {
                    alert("Password Successfully Updated.")
                }
            })
            .catch(err => {
                if (err.response.data.err == "Invalid password.") {
                    alert("Invalid password.")
                } else if (err.response.data.err == "Password must be same for verification") {
                    alert("Password must be same for verification.")
                }
            })
    }

    return (
        <React.Fragment>
            <div className="col-xl-8">
                <div className="card">
                    <div className="card-header  bg-light-blue">
                        <h4 className="h4 card-intro-title">GENERAL ACCOUNT SETTINGS</h4>
                    </div>
                    <div className="card-body">
                        <div className="profile-tab">
                            <div className="custom-tab-1">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a href="#profile-settings" data-toggle="tab" className="nav-link">
                                            Profile Information
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#account-settings" data-toggle="tab" className="nav-link">
                                            Account Credentials
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div id="profile-settings" className="tab-pane active show">
                                        <div className="pt-3">
                                            <div className="settings-form">
                                                <div className="pt-4 border-bottom-1 pb-3">
                                                    <h5 className="h5 text-primary">Edit Profile Information</h5>
                                                </div>
                                                <form onSubmit={submitBtn}>
                                                    <div className="form-row">
                                                        <label>First Name :</label>
                                                        <div className="input-group mb-3">
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                className="form-control"
                                                                placeholder={admin.first_name}
                                                                id="fname"
                                                                disabled={!editable.fname}
                                                                onChange={(e) => setFirst_name(e.target.value)}
                                                                value={first_name}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={() => {
                                                                    handleEdit("fname");
                                                                }}
                                                            >
                                                                <i className="fa fa-edit" />
                                                            </button>
                                                        </div>
                                                        <label>Middle Name (Not required) :</label>
                                                        <div className="input-group mb-3">
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                className="form-control"
                                                                placeholder={admin.middle_name}
                                                                id="mname"
                                                                disabled={!editable.mname}
                                                                onChange={(e) => setMiddle_name(e.target.value)}
                                                                value={middle_name}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={() => {
                                                                    handleEdit("mname");
                                                                }}
                                                            >
                                                                <i className="fa fa-edit" />
                                                            </button>
                                                        </div>
                                                        <label>Last Name :</label>
                                                        <div className="input-group mb-3">
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                className="form-control"
                                                                placeholder={admin.last_name}
                                                                id="lname"
                                                                disabled={!editable.lname}
                                                                onChange={(e) => setLast_name(e.target.value)}
                                                                value={last_name}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={() => {
                                                                    handleEdit("lname");
                                                                }}
                                                            >
                                                                <i className="fa fa-edit" />
                                                            </button>
                                                        </div>
                                                        <div className="form-group mb-0 ml-auto pt-3">
                                                            <input
                                                                type="submit"
                                                                className="btn btn-success col-md-12"
                                                                defaultValue="Save and Update"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="account-settings" className="tab-pane fade">
                                        <div className="pt-3">
                                            <div className="settings-form">
                                                <div className="pt-4 border-bottom-1 pb-3">
                                                    <h5 className="h5 text-primary">Edit Account Credentials</h5>
                                                </div>
                                                <form onSubmit={submitBtn}>
                                                    <div className="form-row">
                                                        <label>Email Address :</label>
                                                        <div className="input-group mb-3">
                                                            <input
                                                                className="form-control"
                                                                autoComplete="off"
                                                                type="email"
                                                                placeholder={admin.email}
                                                                id="email"
                                                                disabled={!editable.email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                value={email}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={() => {
                                                                    handleEdit("email");
                                                                }}
                                                            >
                                                                <i className="fa fa-edit" />
                                                            </button>
                                                        </div>
                                                        <label>Username :</label>
                                                        <div className="input-group mb-5">
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                className="form-control"
                                                                placeholder={admin.username}
                                                                id="username"
                                                                disabled={!editable.username}
                                                                onChange={(e) => setUsername(e.target.value)}
                                                                value={username}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={() => {
                                                                    handleEdit("username");
                                                                }}
                                                            >
                                                                <i className="fa fa-edit" />
                                                            </button>
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <h4 className="text-muted mb-0">
                                                                <a
                                                                    href="changePassword"
                                                                    data-toggle="modal"
                                                                    data-target="#changePassword"
                                                                >
                                                                    <i className="flaticon-381-key" />
                                                                    &nbsp;Change password
                                                                </a>
                                                            </h4>
                                                        </div>
                                                        <div className="form-group mb-0 ml-auto pt-3">
                                                            <input
                                                                type="submit"
                                                                className="btn btn-success col-md-12"
                                                                defaultValue="Save and Update"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                                {/* Change Password Modal */}
                                                <div className="modal fade" id="changePassword">
                                                    <div
                                                        className="modal-dialog modal-dialog-centered"
                                                        role="document"
                                                    >
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="h5 modal-title">Change Password</h5>
                                                                <button
                                                                    type="button"
                                                                    className="close"
                                                                    data-dismiss="modal"
                                                                >
                                                                    <span>×</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <h5 className="h5 text-primary d-inline">Enter:</h5>
                                                                <form onSubmit={changePassword}>
                                                                    <div className="row mt-4 sp4">
                                                                        <label>Old Password*</label>
                                                                        <div className="input-group mb-2">
                                                                            <input
                                                                                type="password"
                                                                                className="form-control"
                                                                                onChange={e => setPassword(e.target.value)}
                                                                                value={password}
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <label>New Password*</label>
                                                                        <div className="input-group mb-2">
                                                                            <input
                                                                                type="password"
                                                                                className="form-control"
                                                                                onChange={e => setNewPassword(e.target.value)}
                                                                                value={newPassword}
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <label>Confirm New Password*</label>
                                                                        <div className="input-group mb-5">
                                                                            <input
                                                                                type="password"
                                                                                className="form-control"
                                                                                onChange={e => setPasswordCheck(e.target.value)}
                                                                                value={passwordCheck}
                                                                                required
                                                                            />
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
