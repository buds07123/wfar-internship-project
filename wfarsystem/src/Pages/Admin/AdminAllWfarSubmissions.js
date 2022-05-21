import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import Wfarbanner from "../../Components/WfarBanner";
import YearSemSelection from "../../Components/YearSemSelection";
import SubmissionCard from "../../Components/SubmissionCard";

import axios from "axios";
axios.defaults.withCredentials = true

const AdminAllWfarSubmissions = () => {

  const navigate = useNavigate()
  const [updateTable, setUpdateTable] = useState(0)
  const [data, setData] = useState([])

  //Display User Data
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllActiveUser`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getData().then((data) => {
      setData(data.empData)
    })
  }, [])

  const [school_year,setSchool_year] = useState('')
  // const [semester,setSemester] = useState('')
  const [week_number,setWeek_number] = useState('')

  const createNewBatch = async (e) => {
    e.preventDefault()

    const formData = {
      school_year,
      week_number
    }

    await axios.post('http://localhost:4000/api/newBatch',formData)
    .then(res => {
      alert('Successfully created.')
      window.location.reload()
    })
  }

  return (
    <>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">WFAR SUBMISSIONS</h5>
          </div>
        </div>
        <div className="container-fluid">
          {/* Wfar Banner*/}
          <Wfarbanner />
          <div className="row row mx-0">
            <div className="col-lg-12 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <button
                type="button"
                data-toggle="modal"
                data-target="#semester"
                className="btn btn-rounded btn-secondary"
              >
                <span className="btn-icon-left text-secondary">
                  <i className="fa fa-plus" />
                </span>
                Create New Batch
              </button>
            </div>
          </div>

          <br></br>
          {/* School year, Sem Selection */}
          {/* <YearSemSelection /> */}
          <div className="row">
            {/* <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6"> */}
              {/* Admin Submissioncard Component */}
              {/* <SubmissionCard />
            </div> */}

            {/* Admin Submissioncard Sample without using the Component */}
            {data.map((emp) => {
              return (
                <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="wfar-entry">
                        <div className="wfar-img-content">
                          <img className="img-fluid" src="assets/img/file.png" />
                        </div>
                        <div className="wfar-content text-center mt-3">
                          <h4 className="h4">
                            <Link to="/AdminIndividualFaculty" className="text-primary">
                              {emp.fname} {emp.mname} {emp.lname}
                            </Link>
                          </h4>
                          <h4 className="h4">{emp.updatedPosition}</h4>
                          <Link
                            to="/AdminIndividualFaculty"
                            className="btn btn-rounded btn-warning"
                            state={{
                              empId: emp._id,
                              fullname: emp.fname + " " + emp.mname + " " + emp.lname
                            }}
                          >
                            <span className="btn-icon-left text-warning">
                              <i className="fa fa-eye color-warning" />
                            </span>
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>

      {/* Create New Batch / New Sem Modal */}
      <div className="modal fade" id="semester">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="h5 modal-title">New Batch</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={createNewBatch}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-black font-w600">
                        School Year <span className="required">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="School Year"
                      onChange={e => setSchool_year(e.target.value)}
                      value={school_year}
                    />
                  </div>
                </div>
                {/* <div className="row mt-3 mb-3">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-black font-w600">
                        Semester<span className="required">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <select className="form-control default-select form-control-lg"
                      onChange={e => setSemester(e.target.value)}
                      defaultValue={semester}
                    >
                      <option value={school_year} selected disabled hidden>
                        Select Semester
                      </option>
                      <option value="First Semester">First Semester</option>
                      <option value="Second Semester">Second Semester</option>
                    </select>
                  </div>
                </div> */}
                <div className="row mt-3 mb-3">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-black font-w600">
                        No. of Weeks<span className="required">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <select className="form-control default-select form-control-lg"
                      onChange={e => setWeek_number(e.target.value)}
                      defaultValue={week_number}
                    >
                      <option value={week_number} selected disabled hidden>
                        Select
                      </option>
                      <option value="18 Weeks">18 Weeks</option>
                      <option value="15 Weeks">15 Weeks</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger light"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAllWfarSubmissions;
