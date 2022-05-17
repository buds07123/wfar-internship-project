import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AttachmentUpload from "../../Components/AttachmentUpload"
import Act_AttachmentUpload from "../../Components/Act_AttachmentUpload";

//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import MUIDataTable from 'mui-datatables'

import Wfarbanner from "../../Components/WfarBanner";
import Wfarupload from "../../Components/WfarUpload";
import axios from "axios";
axios.defaults.withCredentials = true

const FacultyIndividualView = () => {
  const navigate = useNavigate()

  //wfar_id from page (/FacultyOwnSubmission)
  const location = useLocation()
  const wfar_id = location.state.wfarId
  const wfar_weekNo = location.state.wfarWeekNo
  const wfar_status = location.state.wfarStatus

  const [updateTable, setUpdateTable] = useState(0)
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
      console.log(data.wfarId[0].info)
    })
  }, [updateTable])

  //Display Pictures
  const [meet_Displayscreenshots, setMeet_screenshots] = useState([])
  const [act_Displayscreenshots, setAct_screenshots] = useState([])

  //Edit Wfar
  const [_id, setID] = useState('')
  const [week_number, setWeek_number] = useState('')
  const [date, setDate] = useState('')
  const [subject, setSubject] = useState('')
  const [course, setCourse] = useState('')
  const [year, setYear] = useState('')
  const [section, setSection] = useState('')
  const [attendee, setAttendee] = useState('')
  const [recording_link, setRecording_link] = useState('')
  const [activity, setActivity] = useState('')
  // const [meet_screenshots, setEditMeet_screenshots] = useState([])
  // const [act_screenshots, setEditAct_screenshots] = useState([])
  

  const updateData = async (e) => {
    e.preventDefault()

    const formData = {
      week_number,
      date,
      subject,
      course,
      year,
      section,
      attendee,
      recording_link,
      activity
    }

    // const formData = new FormData()

    // formData.append('week_number', week_number)
    // formData.append('date', date)
    // formData.append('subject', subject)
    // formData.append('course', course)
    // formData.append('year', year)
    // formData.append('section', section)
    // formData.append('attendee', attendee)
    // formData.append('recording_link', recording_link)
    // formData.append('activity', activity)
    // for (const key of Object.keys(meet_screenshots)) {
    //   formData.append('meet_screenshots', meet_screenshots[key])
    // }
    // for (const key of Object.keys(act_screenshots)) {
    //   formData.append('act_screenshots', act_screenshots[key])
    // }

    await axios.put(`http://localhost:4000/api/updateOneWfarInfo/${_id}`, formData)
      .then(res => {
        if (res.data.msg === "Wfar Successfully Updated") {
          alert('Wfar Successfully Updated.')
          setUpdateTable(updateTable + 1)
        }
      })
      .catch(err => {
        alert('failed')
        console.log(err)
      })
  }

  const columns = [
    {
      name: "date",
      label: "Date",
    },
    {
      name: "subject",
      label: "Subject"
    },
    {
      name: "course",
      label: "Course, Year && Section",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const course = tableData[dataIndex].course;
          const year = tableData[dataIndex].year;
          const section = tableData[dataIndex].section;
          return (
            <>
              {course} {year}{section}
            </>
          );
        }
      }
    },
    {
      name: "attendee",
      label: "No. of Attendees"
    },
    {
      name: "recording_link",
      label: "Link of Meet Recording",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const link = tableData[dataIndex].recording_link;
          return (
            <a href={link}>
              <strong>Recording Link</strong>
            </a>
          );
        }
      }
    },
    {
      name: "activity",
      label: "Learning Activities"
    },
    {
      name: "Attachments",
      label: "Attachments",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div className="dropdown ml-auto text-center" onClick={e => {
              setMeet_screenshots(tableData[dataIndex].meet_screenshots)
              setAct_screenshots(tableData[dataIndex].act_screenshots)
            }}>
              <div className="btn-link" data-toggle="dropdown">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    stroke="none"
                    strokeWidth={1}
                    fill="none"
                    fillRule="evenodd"
                  >
                    <rect x={0} y={0} width={24} height={24} />
                    <circle fill="#000000" cx={5} cy={12} r={2} />
                    <circle fill="#000000" cx={12} cy={12} r={2} />
                    <circle fill="#000000" cx={19} cy={12} r={2} />
                  </g>
                </svg>
              </div>
              <div className="dropdown-menu dropdown-menu-right">
                <a
                  className="dropdown-item"
                  href="attachment"
                  data-toggle="modal"
                  data-target="#attachment"
                >
                  Team Meet Screenshot
                </a>
                <a
                  className="dropdown-item"
                  href="actattachment"
                  data-toggle="modal"
                  data-target="#actattachment"
                >
                  Provided Activities
                </a>
              </div>
            </div>
          )
        }
      }
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div className="text-center">
              <button
                onClick={e => {
                  setID(tableData[dataIndex]._id)
                  setWeek_number(tableData[dataIndex].week_number)
                  setDate(tableData[dataIndex].date)
                  setSubject(tableData[dataIndex].subject)
                  setCourse(tableData[dataIndex].course)
                  setYear(tableData[dataIndex].year)
                  setSection(tableData[dataIndex].section)
                  setAttendee(tableData[dataIndex].attendee)
                  setRecording_link(tableData[dataIndex].recording_link)
                  setActivity(tableData[dataIndex].activity)
                }}
                type="button"
                data-toggle="modal"
                data-target="#editEntry"
                className="btn btn-info btn-xs sharp mr-1"
              >
                <i className="fa fa-edit" />
              </button>
            </div>
          )
        }
      }
    }
  ]


  //to delete one wfar record
  const [rowID, setRowID] = useState('')

  const deleteHandle = async () => {
    await axios.put(`http://localhost:4000/api/deleteOneWfar/${wfar_id}/${rowID}`)
  }

  const options = {
    onRowsSelect: (curRowSelected, allRowsSelected) => {
      const arrNum = curRowSelected[0].dataIndex
      setRowID(tableData[arrNum]._id)
      console.log(tableData[arrNum]._id)
    },
    onRowsDelete: (rowsDeleted) => {
      deleteHandle()
      setUpdateTable(updateTable + 1)
    },
    selectableRows: 'single',
    sort: true,
    sortOrder: { name: 'date', direction: 'asc' }
  }

  //Archive Button 
  const ArchiveButton = async (e) => {
    e.preventDefault()

    await axios.put(`http://localhost:4000/api/wfarArchive/${wfar_id}`)
      .then(res => {
        console.log(res)
        navigate("/FacultyOwnSubmissions")
      })
  }

  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">YOUR WEEKLY SUBMISSION</h5>
          </div>
        </div>
        <div className="container-fluid">
          {/* Wfar Banner*/}
          <Wfarbanner />
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-light-blue">
                  <div className="col-xl-7 col-lg-12">
                    <h4 className="h4 card-title">{wfar_weekNo}</h4>
                  </div>
                  <div className="col-xl-5 col-lg-12 justify-content-sm-end d-flex">
                    <div className="dropdown  dropleft mb-1 ">
                      <button
                        type="button"
                        className="btn btn-secondary light sharp ml-auto"
                        data-toggle="dropdown"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          version="1.1"
                        >
                          <g
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <rect x={0} y={0} width={24} height={24} />
                            <circle fill="#000000" cx={5} cy={12} r={2} />
                            <circle fill="#000000" cx={12} cy={12} r={2} />
                            <circle fill="#000000" cx={19} cy={12} r={2} />
                          </g>
                        </svg>
                      </button>
                      <div className="dropdown-menu">
                        <button type="button" className="dropdown-item">
                          <i className="fa fa-print" />
                          &nbsp;Generate report
                        </button>
                        <button type="button" className="dropdown-item">
                          <i className="fa fa-download" />
                          &nbsp;Download
                        </button>
                        <button type="submit" className="btn btn-danger dropdown-item" onClick={ArchiveButton}>
                          <i className="fa fa-archive" />
                          &nbsp;Archive
                        </button>
                        <button
                          type="button"
                          className="dropdown-item"
                          data-toggle="modal"
                          data-target="#resubmitModal"
                        >
                          <i className="fa fa-refresh" />
                          &nbsp;Resubmit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="bootstrap-badge mb-5 text-left">
                  {wfar_status === "OK" ? <span class="badge badge-xl light badge-success">Status: {wfar_status}</span> :
                      wfar_status === "For Checking" ? <span class="badge badge-xl light badge-info">Status: {wfar_status}</span> :
                        <span class="badge badge-xl light badge-danger">Status: {wfar_status}</span>}
                  </div>
                  <div className="table-responsive">
                    {/* <!-- Create the drop down filter --> */}
                    <div className="category-filter">
                      <select id="categoryFilter" className="form-control" hidden>
                        <option value="">Show All</option>
                      </select>
                    </div>

                    {/* <!-- Set up the datatable --> */}

                    <MUIDataTable columns={columns} data={tableData} options={options} />

                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mt-5">
                      <label htmlFor="comment" className="text-black font-w600">
                        All Comment/s
                      </label>
                      <textarea
                        rows={5}
                        className="form-control"
                        name="comment"
                        placeholder="Comment"
                        id="comment"
                        readOnly
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attachments Modal */}
      <div className="modal fade" id="attachment">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="h5 modal-title">Attachments</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="attachments">
                <h5 className="h5 text-primary d-inline">Uploaded Screenshot/s</h5>
                <div className="row mt-4 sp4" id="lightgallery">

                  {meet_Displayscreenshots.map((meet_screenshots) => {
                    return (
                      <a
                        href={meet_screenshots}
                        data-exthumbimage={meet_screenshots}
                        data-src={meet_screenshots}
                        className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                      >
                        <img
                          src={meet_screenshots}
                          alt="Screenshot"
                          className="img-fluid"
                        />
                      </a>
                    )
                  })}
                  
                </div>
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
            </div>
          </div>
        </div>
      </div>
      

      {/* ACT_ATTACHMENT MODAL */}
      <div className="modal fade" id="actattachment">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="h5 modal-title">Attachments</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="attachments">
                <h5 className="h5 text-primary d-inline">Uploaded Screenshot/s</h5>
                <div className="row mt-4 sp4" id="lightgallery">

                  {act_Displayscreenshots.map((act_screenshots) => {
                    return (
                      <a
                        href={act_screenshots}
                        data-exthumbimage={act_screenshots}
                        data-src={act_screenshots}
                        className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                      >
                        <img
                          src={act_screenshots}
                          alt="Screenshot"
                          className="img-fluid"
                        />
                      </a>
                    )
                  })}
                
                </div>
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
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="editEntry">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="h5 modal-title">Edit Entry</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Wfar Upload*/}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header bg-light-blue">
                      <div className="col-xl-7 col-lg-12">
                        <h4 className="h4 card-title">
                          Please complete the WFAR information below.
                        </h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="basic-form">
                        <form className="form" onSubmit={updateData} encType="multipart/form-data" id="form">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Week No.</label>
                            <div className="col-sm-9">
                              <select className="form-control default-select form-control-lg" onChange={(e) => setWeek_number(e.target.value)} value={week_number}>
                                <option selected disabled>
                                  Select a week
                                </option>
                                <option>Week 1</option>
                                <option>Week 2</option>
                                <option>Week 3</option>
                                <option>Week 4</option>
                                <option>Week 5</option>
                                <option>Week 6</option>
                                <option>Week 7</option>
                                <option>Week 8</option>
                                <option>Week 9</option>
                                <option>Week 10</option>
                                <option>Week 11</option>
                                <option>Week 12</option>
                                <option>Week 13</option>
                                <option>Week 14</option>
                                <option>Week 15</option>
                                <option>Week 16</option>
                                <option>Week 17</option>
                                <option>Week 18</option>
                              </select>
                            </div>
                          </div>
                          <div className="wfar-entry" id="entry">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">
                                Date of Class/ Accomplishment
                              </label>
                              <div className="col-sm-9">
                                <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} value={date} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">
                                Subject being Taught
                              </label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  className="form-control input-default "
                                  placeholder="Subject"
                                  onChange={(e) => setSubject(e.target.value)} value={subject}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">
                                Course, Year and Section
                              </label>
                              <div className="col-sm-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Course"
                                  onChange={(e) => setCourse(e.target.value)} value={course}
                                />
                              </div>
                              <div className="col mt-2 mt-sm-0">
                                <input
                                  type="number"
                                  min={0}
                                  max={4}
                                  className="form-control input-default "
                                  placeholder="Year"
                                  onChange={(e) => setYear(e.target.value)}
                                  value={year}
                                />
                              </div>
                              <div className="col mt-2 mt-sm-0">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Section"
                                  onChange={(e) => setSection(e.target.value)}
                                  value={section}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">No. of Attendees</label>
                              <div className="col-sm-9">
                                <input
                                  type="number"
                                  min={0}
                                  onInput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                                  className="form-control input-default "
                                  placeholder="No. of Attendees"
                                  onChange={(e) => setAttendee(e.target.value)}
                                  value={attendee}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">
                                Link of MS Teams Recordings
                              </label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  className="form-control input-default "
                                  placeholder="Link of MS Teams Recordings"
                                  onChange={(e) => setRecording_link(e.target.value)}
                                  value={recording_link}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">
                                Learning Activities
                              </label>
                              <div className="col-sm-9">
                                <textarea className="form-control" rows={4} defaultValue={""} onChange={(e) => setActivity(e.target.value)} value={activity} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Attachments</label>
                              <div className="col-sm-9">
                                <div className="card shadow-sm w-100">
                                  <div className="bg-light-blue card-header d-flex justify-content-between">
                                    <h6 className="h6">Team Meet Screenshot/s</h6>
                                  </div>
                                  <div
                                    className="card-body d-flex flex-wrap align-items-center"
                                    id="container"
                                  >
                                    {/* <AttachmentUpload setEditMeet_screenshots={setEditMeet_screenshots} /> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label" />
                              <div className="col-sm-9">
                                <div className="card shadow-sm w-100">
                                  <div className="bg-light-blue card-header d-flex justify-content-between">
                                    <h6 className="h6">Provided Activity Screenshot/s</h6>

                                  </div>
                                  <div className="card-body d-flex flex-wrap justify-content-start"
                                    id="act-container">
                                    {/* <Act_AttachmentUpload setEditAct_screenshots={setEditAct_screenshots} /> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="new-entry pb-5" />
                          <div className="card-footer">
                            <button
                              type="submit"
                              className="card-link float-right btn btn-primary"
                            >
                              <i className="fa fa-cloud-upload" />
                              &nbsp;Save and Upload
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

      {/*Resubmit Modal */}
      <div className="modal fade" id="resubmitModal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="h5 modal-title">Add a Reply to Comment/Remarks</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <h6 className="fs-14">
                  Please indicate the revision (changes/enhancement) done for this
                  submission.
                </h6>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Comment"
                  defaultValue={""}
                />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger light"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Resubmit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FacultyIndividualView;
