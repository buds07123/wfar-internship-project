import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import { render } from "@testing-library/react";

import MUIDataTable from 'mui-datatables'
import axios from "axios";
const { io } = require("socket.io-client");
const socket = io("http://localhost:4000");
axios.defaults.withCredentials = true

const AcdhHandleWfarView = () => {
  // componentDidMount() {
  //   //initialize datatable
  //   $("document").ready(function () {
  //     $("#filterTable").dataTable({
  //       retrieve: true,
  //       paging: true,
  //       searching: true,
  //       orderCellsTop: true,
  //       language: {
  //         paginate: {
  //           next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
  //           previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
  //         },
  //       },
  //     });

  //     //Get a reference to the new datatable
  //     var table = $("#filterTable").DataTable();

  //     //Take the category filter drop down and append it to the datatables_filter div.
  //     //You can use this same idea to move the filter anywhere withing the datatable that you want.
  //     $("#filterTable_filter.dataTables_filter").append($("#categoryFilter"));

  //     //Get the column index for the Category column to be used in the method below ($.fn.dataTable.ext.search.push)
  //     //This tells datatables what column to filter on when a user selects a value from the dropdown.
  //     //It's important that the text used here (Category) is the same for used in the header of the column to filter
  //     var categoryIndex = 4;
  //     $("#filterTable th").each(function (i) {
  //       if ($($(this)).html() == "Category") {
  //         categoryIndex = i;
  //         return false;
  //       }
  //     });

  //     //Use the built in datatables API to filter the existing rows by the Category column
  //     $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
  //       var selectedItem = $("#categoryFilter").val();
  //       var category = data[categoryIndex];
  //       if (selectedItem === "" || category.includes(selectedItem)) {
  //         return true;
  //       }
  //       return false;
  //     });

  //     //Set the change event for the Category Filter dropdown to redraw the datatable each time
  //     //a user selects a new filter.
  //     $("#categoryFilter").change(function (e) {
  //       table.draw();
  //     });

  //     table.draw();
  //   });
  // }

  const location = useLocation()
  const wfarId = location.state.wfarId
  const empID = location.state.empID
  const weekNo = location.state.weekNo
  const status = location.state.status
  const withRevisionComments = location.state.withRevisionComment


  //Display Wfar Data
  const [tableData, setTableData] = useState([])
  const [meet_screenshots, setMeet_screenshots] = useState([])
  const [act_screenshots, setAct_screenshots] = useState([])
  
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/api/getWfarsPerWeek/${wfarId}`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getData().then((data) => {
      setTableData(data.wfar[0].info)
      console.log(data.wfar[0].info)
    })
  }, [])

  const columns = [
    {
      name: "date",
      label: "Date"
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
      label: "Activities"
    },
    {
      name: "meet_screenshots",
      label: "Attachments",
      options: {
        customBodyRenderLite: (dataIndex) => {
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
    }
  ]

  const options={
    selectableRows: false,
    sort: true,
    sortOrder: { name: 'date', direction: 'asc' }
  }

  const setStatustoOk = async (e) => {
    e.preventDefault()

    await axios.put(`http://localhost:4000/api/setStatusOk/${wfarId}`)
    .then(res => {
      //send notif
      socket.emit("emp_id", empID)
      socket.emit("send_notif", { id: empID })
    })
  }

  const [withRevisionComment,setWithRevisionComment] = useState('')

  const setStatusRevise = async (e) => {
    e.preventDefault()

    const formData = {
      withRevisionComment
    }

    await axios.put(`http://localhost:4000/api/setStatusRevise/${wfarId}`,formData)
    .then(e => {
      //send notif
      socket.emit("emp_id", empID)
      socket.emit("send_notif", { id: empID })
    })
  }

  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">
              HANDLE FACULTY WEEKLY SUBMISSION INDIVIDUAL VIEW
            </h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-light-blue">
                  <div className="col-xl-7 col-lg-12">
                    <h4 className="h4 card-title">{weekNo}</h4>
                  </div>
                </div>
                <div className="card-body">
                  <div class="bootstrap-badge mb-5 text-left">
                    {status === "OK" ? <span class="badge badge-xl light badge-success">Status: {status}</span> :
                      status === "For Checking" ? <span class="badge badge-xl light badge-info">Status: {status}</span> :
                        <span class="badge badge-xl light badge-danger">Status: {status}</span>}
                    
                  </div>
                  <div className="table-responsive">
                    {/* <!-- Create the drop down filter --> */}
                    {/* <div className="category-filter">
                      <select id="categoryFilter" className="form-control" hidden>
                        <option value="">Show All</option>
                      </select>
                    </div> */}
                    {/* <!-- Set up the datatable --> */}

                    <MUIDataTable columns={columns} data={tableData} options={options}/>
                    {/* <table
                      id="filterTable"
                      className="table"
                      style={{ minWidth: "845px" }}
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Date</th>
                          <th scope="col">Subject</th>
                          <th scope="col">
                            Course, Year, <br /> Section
                          </th>
                          <th scope="col">
                            No. of <br /> Attendees
                          </th>
                          <th scope="col">
                            Link of Meet <br /> Recording
                          </th>
                          <th scope="col">Learning Activities</th>
                          <th scope="col">Attachments</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>03/03/2022</td>
                          <td>CAP 1 - Capstone Project and Research 1</td>
                          <td>BSIT 3K</td>
                          <td>24</td>
                          <td>
                            <a href="https://bulsumain.sharepoint.com/:v:/s/IT312-BSIT3K/EWku0Ug4rZxHkU1uBjOh6W4Bmi8MY0lxrG1mwhL23ExkAQ?e=Ve2uV">
                              <strong>Recording Link</strong>
                            </a>
                          </td>
                          <td>
                            1. Combined the orientation of IT 312 because there was a
                            curriculum revision meeting held at the school on their
                            supposed schedule. 03/02/2022.
                          </td>
                          <td>
                            <div className="dropdown ml-auto text-center">
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
                                  href="attachment"
                                  data-toggle="modal"
                                  data-target="#attachment"
                                >
                                  Provided Activities
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>03/04/2022</td>
                          <td>CAP 1 - Capstone Project and Research 1</td>
                          <td>BSIT 3A</td>
                          <td>24</td>
                          <td>
                            <a href="https://bulsumain.sharepoint.com/:v:/s/IT312-BSIT3K/EWku0Ug4rZxHkU1uBjOh6W4Bmi8MY0lxrG1mwhL23ExkAQ?e=Ve2uV">
                              <strong>Recording Link</strong>
                            </a>
                          </td>
                          <td>
                            1. Combined the orientation of IT 312 because there was a
                            curriculum revision meeting held at the school on their
                            supposed schedule. 03/02/2022.
                          </td>
                          <td>
                            <div className="dropdown ml-auto text-center">
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
                                  href="attachment"
                                  data-toggle="modal"
                                  data-target="#attachment"
                                >
                                  Provided Activities
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>03/05/2022</td>
                          <td>CAP 1 - Capstone Project and Research 1</td>
                          <td>BSIT 3B</td>
                          <td>24</td>
                          <td>
                            <a href="https://bulsumain.sharepoint.com/:v:/s/IT312-BSIT3K/EWku0Ug4rZxHkU1uBjOh6W4Bmi8MY0lxrG1mwhL23ExkAQ?e=Ve2uV">
                              <strong>Recording Link</strong>
                            </a>
                          </td>
                          <td>
                            1. Combined the orientation of IT 312 because there was a
                            curriculum revision meeting held at the school on their
                            supposed schedule. 03/02/2022.
                          </td>
                          <td>
                            <div className="dropdown ml-auto text-center">
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
                                  href="attachment"
                                  data-toggle="modal"
                                  data-target="#attachment"
                                >
                                  Provided Activities
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table> */}
                  </div>

                  <div className="p-3 mt-5 mb-5">
                    <h4 className="h4 text-primary mb-2">Set Status:</h4>
                    <button type="submit" onClick={setStatustoOk} className="btn btn-success light btn-xs mb-1 mr-2">
                      <span className="mr-2">
                        <i className="fa fa-check" />
                      </span>
                      OK
                    </button>
                    <button
                      className="btn btn-danger light btn-xs mb-1"
                      data-toggle="modal"
                      data-target="#commentModal"
                    >
                      <span className="mr-2">
                        <i className="fa fa-repeat" />
                      </span>
                      With Revisions
                    </button>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group mt-5">
                      <label htmlFor="comment" className="text-black font-w600">
                        All Comment/s
                      </label>
                      <textarea
                        rows={8}
                        className="form-control"
                        name="comment"
                        placeholder="Comment"
                        id="comment"
                        defaultValue={withRevisionComments}
                        readOnly
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* With Revisions Modal */}
      <div className="modal fade" id="commentModal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="h5 modal-title">Add a Comment/Remarks</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={setStatusRevise}>
                <h6 className="fs-14">
                  Please indicate the revision (changes/enhancement) that is required
                  for this submission.
                </h6>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Comment"
                  defaultValue={""}
                  onChange={e => setWithRevisionComment(e.target.value)}
                  value={withRevisionComment}
                />
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-danger light"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
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

                  {meet_screenshots.map((meet_screenshots) => {
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

                  {act_screenshots.map((act_screenshots) => {
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

    </React.Fragment>
  );

}

export default AcdhHandleWfarView;
