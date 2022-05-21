import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
axios.defaults.withCredentials = true

const GenerateReport = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [empData, setempData] = useState('')

  const employeeData = async () => {
    const res = await axios.get('http://localhost:4000/api/getEmpInfo').catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    employeeData().then((data) => {
      setempData(data.emp)
    })
  },[])

  const location = useLocation()
  const wfar_id = location.state.wfar_id
  const wfarDate = location.state.wfarDate
  const wfar_weekNo = location.state.wfar_weekNo

  const [tableData, setTableData] = useState([])

  //Display Wfar Data
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/api/getFullWfarInfo/${wfar_id}`)
      .catch(err => console.log(err))

    return res.data
  }
  

  useEffect(() => {
    getData().then((data) => {
      setTableData(data.wfarId[0].info)
    })
  }, [])

   //date and time
   const today = new Date()
   const dd = today.getDate()
   const mm = today.getMonth() + 1
   const yyyy = today.getFullYear()

   const dateToday = dd + "/" + mm + "/" + yyyy
   const time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">GENERATE REPORT</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mt-3">
                <div className="card-header">
                  <strong>WFAR REPORT</strong>
                  <button onClick={handlePrint} className="btn btn-secondary">
                    <i className="fa fa-print" />
                    &nbsp;Print
                  </button>
                </div>
                <div ref={componentRef} className="card-body">
                  <div className="row mb-5">
                    <div className="col-sm-12 p-md-0 justify-content-sm-center mt-2 mt-sm-0 d-flex">
                      <img
                        className="mr-2"
                        width={100}
                        src="assets/img/cict-logo.png"
                        alt
                      />
                    </div>
                    <div className="col-sm-12 p-md-0 justify-content-sm-center mt-2 mt-sm-0 d-flex">
                      <h3 className="h6">Bulacan State University</h3>
                    </div>
                    <div className="col-sm-12 p-md-0 justify-content-sm-center mt-2 mt-sm-0 d-flex">
                      <h3 className="h6">
                        College of Informations and Communications Technology
                      </h3>
                    </div>
                    <div className="col-sm-12 p-md-0 justify-content-sm-center mt-2 mt-sm-0 d-flex">
                      <h3 className="h5">
                        Weekly Accomplishment Report A.Y. 2021-2022 - First Semester
                      </h3>
                    </div>
                    <div className="mt-4 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                      <div>
                        <strong>Faculty Name:</strong> {empData.fname} {empData.mname} {empData.lname}
                      </div>
                      <div>
                        <strong>Department:</strong> {empData.course}
                      </div>
                    </div>
                    <div className="col-sm-12 p-md-0 justify-content-sm-center mt-2 mt-sm-0 d-flex">
                      <h3 className="h4 p-4">{wfar_weekNo} ({wfarDate})</h3>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Subject</th>
                          <th>Course, Year, Section</th>
                          <th>No. of Attendees</th>
                          <th>Link of Meet Recording</th>
                          <th>Learning Activities</th>
                        </tr>
                      </thead>
                      <tbody>

                        {tableData.map((data) => {
                          return (
                            <tr>
                              <td>{data.date}</td>
                              <td>{data.subject}</td>
                              <td>{data.course} {data.year}{data.section}</td>
                              <td>{data.attendee}</td>
                              <td>
                                <strong>
                                  {data.recording_link}
                                </strong>
                              </td>
                              <td>
                                {data.activity}
                              </td>
                            </tr>
                          )
                        })}
                        
                      </tbody>
                    </table>
                  </div>
                  <div className="row mb-5">
                    <div className="col-sm-12 p-md-0 justify-content-sm-center mt-2 mt-sm-0 d-flex">
                      <h3 className="h4 p-4">ATTACHMENTS</h3>
                    </div>
                  </div>
                  <div className="table-responsive mb-5">
                    <table className="table table-clear">
                      <thead>
                        <tr>
                          <th>Teams Meet Screenshot</th>
                          <th>Provided Activities</th>
                        </tr>
                      </thead>
                      <tbody>

                        {tableData.map((data) => {
                          return (
                            <>
                              <tr>
                                <td className="text-primary">
                                  <strong>{data.year}{data.section} – {data.subject}</strong>
                                </td>
                              </tr>

                              <tr>
                                <td>
                                  
                                  {data.meet_screenshots.map((item) => {
                                    return (
                                      <img
                                        className="mr-2"
                                        width={180}
                                        src={item}
                                        alt
                                      />
                                    )
                                  })}
                                     
                                </td>

                                {data.act_screenshots.map((item) => {
                                  return (
                                    <td>
                                      <img
                                        className="mr-2"
                                        width={180}
                                        src={item}
                                        alt
                                      />
                                    </td>
                                  )
                                })}

                              </tr>

                            </>
                          )
                        })}
                        
                      </tbody>
                    </table>
                  </div>
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="text-primary">
                          <strong>Prepared by:</strong>
                        </td>
                        <td className="text-primary">
                          <strong>Recommending Approval:</strong>
                        </td>
                        <td className="text-primary">
                          <strong>Approved by:</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            className="logo-compact"
                            width={160}
                            src={empData.signature}
                            alt
                          />
                        </td>
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td>
                          <strong>{empData.fname} {empData.mname} {empData.lname}</strong>
                        </td>
                        <td>
                          <strong>Dr. Digna Evale</strong>
                        </td>
                        <td>
                          <strong>Dr. Keno C. Piad</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Instructor</td>
                        <td>Department Head</td>
                        <td>Dean</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row mb-5">
                    <div className="mt-5 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                      <div>
                        <strong>Print Date:</strong> {dateToday}
                      </div>
                      <div>
                        <strong>Print Time:</strong> {time}
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
  );
};

export default GenerateReport;