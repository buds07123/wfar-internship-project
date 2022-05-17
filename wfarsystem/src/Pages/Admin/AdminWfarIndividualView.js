import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from 'jquery';
import { render } from "@testing-library/react";

import MUIDataTable from 'mui-datatables'
import axios from "axios";
axios.defaults.withCredentials = true

const AdminWfarIndividualView = () => {
  const location = useLocation()
  const wfarId = location.state.wfarId
  const weekNo = location.state.weekNo

  const [tableData, setTableData] = useState([])
  const [meet_screenshots, setMeet_screenshots] = useState([])
  const [act_screenshots, setAct_screenshots] = useState([])

  //Display Wfar Data
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

  return (
    <>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">WEEKLY SUBMISSION</h5>
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
                  <div className="table-responsive">
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

    </>
  );
};

export default AdminWfarIndividualView;
