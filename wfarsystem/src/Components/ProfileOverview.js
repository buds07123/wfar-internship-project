import React, { useState,useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true

const Profileoverview = () => {

  const [empData, setempData] = useState('')

  const employeeData = async () => {
    const res = await axios.get('http://localhost:4000/api/getEmpInfo').catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    employeeData().then((data) => setempData(data.emp))
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
                  <div className="d-flex">
                    <h3 className="font-w600">{empData.emp_number}</h3>
                  </div>
                  <p className="mt-2 fs-14">Full Name:</p>
                  <div className="d-flex">
                    <h3 className="font-w600">{empData.fname} {empData.mname} {empData.lname}</h3>
                  </div>
                  <p className="mt-2 fs-14">User Level/Position: </p>
                  <div className="d-flex">
                    <h3 className="font-w600">*{empData.position}*</h3>
                  </div>
                  <p className="mt-2 fs-14">Username:</p>
                  <div className="d-flex">
                    <h3 className="font-w600">{empData.username}</h3>
                  </div>
                  <p className="mt-2 fs-14">Email address:</p>
                  <div className="d-flex">
                    <h3 className="font-w600">{empData.email}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profileoverview;
