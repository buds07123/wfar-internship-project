import React, { useState,useEffect } from 'react'
import axios from "axios";

axios.defaults.withCredentials = true

export default function AdminProfileoverview() {

    const [admin, setAdmin] = useState('')

    const adminData = async () => {
        const res = await axios.get('http://localhost:4000/api/getAdminInfo').catch(err => console.log(err))

        return res.data
    }

    useEffect(() => {
        adminData().then((data) => setAdmin(data.admin))
    }, [])

    return (
        <React.Fragment>
            <div className="col-xl-4">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="overview">
                                    <h5 className="h5 text-primary d-inline">Overview</h5>
                                </div>
                                <div className="profile-personal-info">
                                    <p className="mt-3 fs-14">Employee Number:</p>
                                    <p className="mt-2 fs-14">Full Name:</p>
                                    <div className="d-flex">
                                        <h3 className="font-w600">{admin.first_name} {admin.middle_name} {admin.last_name}</h3>
                                    </div>
                                    <p className="mt-2 fs-14">Position: </p>
                                    <div className="d-flex">
                                        <h3 className="font-w600">*Admin*</h3>
                                    </div>
                                    <p className="mt-2 fs-14">Username:</p>
                                    <div className="d-flex">
                                        <h3 className="font-w600">{admin.username}</h3>
                                    </div>
                                    <p className="mt-2 fs-14">Email address:</p>
                                    <div className="d-flex">
                                        <h3 className="font-w600">{admin.email}</h3>
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
