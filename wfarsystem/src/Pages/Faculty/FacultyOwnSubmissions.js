import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import FacultySubmissionCard from "../../Components/FacultySubmissionCard";
import YearSemSelection from "../../Components/YearSemSelection";
axios.defaults.withCredentials = true

const FacultyOwnSubmissions = () => {

  const [year,setYear] = useState('')
  const [sem,setSem] = useState('')

  const [wfarData,setWfarData] = useState([])

  const getFullWfarInfo = async () => {
    const res = await axios.get(`http://localhost:4000/api/getWfarInfo/${year}/${sem}`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getFullWfarInfo().then((data) => {
      setWfarData(data.empId)
    })
  },[year,sem])


  //get weeks
  const [weekNo,setWeekNo] = useState([])

  const getWeeks = async () => {
    const res = await axios.get(`http://localhost:4000/api/findWeekNo/${year}`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getWeeks().then((data) => {
      setWeekNo(data.weeks[0].week_number)
    })
  },[year])

  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header ">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">WFAR SUBMISSIONS</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row page-titles mx-0">
            <div className="col-sm-6 p-md-0">
              <div className="welcome-text">
                <h4 className="h4">Hi, welcome back!</h4>
                <h6 className="h6 mt-3">
                  Upload your individual weekly accomplishment reports with ease.
                </h6>
              </div>
            </div>
            <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
              <Link to="/FacultyUpload" state={{
                  year: year,
                  sem: sem,
                  weekNo: weekNo
                }}>
                <button type="button" className="btn btn-rounded btn-secondary">
                  <span className="btn-icon-left text-secondary">
                    <i className="fa fa-upload" />
                  </span>
                  Upload WFAR
                </button>
              </Link>
            </div>
          </div>
          {/* School year, Sem Selection */}
          <YearSemSelection setYear={setYear} setSem={setSem} />

          {/* <div className="row page-titles mx-0 mt-4 p-3">
            <div class="col-sm-12 p-md-0 justify-content-sm-end pt-5 mt-2 mt-sm-0 d-flex">
              <div class="basic-form ">
                <form>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text">&nbsp;Filter Months:&nbsp;</label>
                    </div>
                    <select class="form-control default-select">
                      <option selected disabled hidden>
                        Select month
                      </option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div> */}

          <div className="row">
            
            {wfarData.map((wfar) => {
              return (
                <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="wfar-entry">
                        <div className="wfar-img-content">
                          <img className="img-fluid" src="assets/img/file.png" alt />
                        </div>
                        <div className="wfar-content text-center mt-3">
                          <h4 className="h4">
                            <Link to="/FacultyIndividualView" className=" text-primary">{wfar.week_number}</Link>
                          </h4>
                          <h4 className="h4"> {wfar.start_date} to {wfar.end_date}</h4>
                          <div className="bootstrap-badge mb-5">
                            <span className="badge light badge-info">
                              Status: {wfar.status}
                            </span>
                          </div>
                          <Link
                            to="/FacultyIndividualView"
                            state={{
                              wfarId: wfar._id,
                              wfarWeekNo: wfar.week_number,
                              wfarStatus: wfar.status,
                              wfarDate: wfar.start_date + " - " + wfar.end_date
                            }}
                            className="btn btn-rounded btn-warning"
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
    </React.Fragment>
  );
};

export default FacultyOwnSubmissions;
