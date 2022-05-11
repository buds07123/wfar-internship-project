import React, { useEffect, useState } from "react";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import Wfarbanner from "../../Components/WfarBanner";

import MUIDataTable from 'mui-datatables'
import axios from "axios";
axios.defaults.withCredentials = true

const AdminPromoteDemote = () => {
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
  //     var categoryIndex = 2;
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
  }, [updateTable])

  const [id,setID] = useState('')
  const [updatedPosition,setUpdatedPosition] = useState('')

  const toPromote = async (e) => {
    e.preventDefault()

    const formData = {
      updatedPosition
    }

    await axios.post(`http://localhost:4000/api/toPromote/${id}`,formData)
    .then(res => {
      setUpdateTable(updateTable + 1)
    })
  }

  const [idDemoted, setIdDemoted] = useState('')
  const [count, setCount] = useState(0)

  const toDemote = async () => {
    await axios.put(`http://localhost:4000/api/toDemote/${idDemoted}`)
    .then(res => {
      setUpdateTable(updateTable + 1)
    })
  }

  useEffect(() => {
    toDemote()
  },[count])

  const columns = [
    {
      name: "emp_number",
      label: "Employee Number",
    },
    {
      name: "fname",
      label: "Faculty Name",
    },
    {
      name: "updatedPosition",
      label: "Position"
    },
    {
      name: "course",
      label: "Department",
    },
    {
      name: "promotedOrDemoted",
      label: "Status",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const state = data[dataIndex].updatedPosition;
          if (state === "Faculty") {
            return (
              <span className="badge light badge-danger">Demoted</span>
            );
          } else {
            return (
              <span className="badge light badge-success">Promoted</span>
            )
          }
        }
      }
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite: (dataIndex,rowIndex) => {
          return (
            <div className="d-flex">
              <button
                type="button"
                data-toggle="modal"
                data-target="#promote"
                className="btn btn-success btn-xs sharp mr-1"
                onClick={e => {
                  setID(data[dataIndex]._id)
                  setUpdatedPosition(data[dataIndex].updatedPosition)
                }}
              >
                <i className="ti-arrow-up" />
              </button>
              <button
                type="button"
                className="btn btn-danger btn-xs sharp"
                onClick={e => {
                  setIdDemoted(data[dataIndex]._id)
                  setCount(count + 1)
                }}
              >
                <i className="ti-arrow-down" />
              </button>
            </div>
          )
        }
      }
    }
  ]

  const options={
    selectableRows: false,
    sort: true,
    sortOrder: { name: 'fname', direction: 'asc' }
  }

  return (
    <>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">ACCOUNT MANAGEMENT</h5>
          </div>
        </div>
        <div className="container-fluid">
          {/* Wfar Banner*/}
          <Wfarbanner />
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header  bg-light-blue">
                  <h4 className="h4 card-intro-title">
                    ACCOUNT PROMOTION AND DEMOTION
                  </h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    {/* <!-- Create the drop down filter --> */}
                    {/* <div className="category-filter">
                      <select id="categoryFilter" className="form-control">
                        <option value="">Show All</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Department Head">Department Head</option>
                      </select>
                    </div> */}
                    {/* <!-- Set up the datatable --> */}
                    <MUIDataTable columns={columns} data={data} options={options} />
                    {/* <form>
                      <table
                        id="filterTable"
                        className="table"
                        style={{ minWidth: "845px" }}
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Employee Number</th>
                            <th scope="col">Faculty Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Department</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2018107260</td>
                            <td>Juan dela Cruz</td>
                            <td>Department Head</td>
                            <td>BSIT</td>
                            <td>
                              <span className="badge light badge-success">
                                Promoted
                              </span>
                            </td>
                            <td>
                              <div className="d-flex">
                                <button
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#promote"
                                  className="btn btn-success btn-xs sharp mr-1"
                                >
                                  <i className="ti-arrow-up" />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-xs sharp"
                                >
                                  <i className="ti-arrow-down" />
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2018234541</td>
                            <td>Maria Bautista</td>
                            <td>Faculty</td>
                            <td>BLIS</td>
                            <td>
                              <span className="badge light badge-danger">Demoted</span>
                            </td>
                            <td>
                              <div className="d-flex">
                                <button
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#promote"
                                  className="btn btn-success btn-xs sharp mr-1"
                                >
                                  <i className="ti-arrow-up" />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-xs sharp"
                                >
                                  <i className="ti-arrow-down" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Promote Modal */}
      <div className="modal fade" id="promote">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="h5 modal-title">Account Promotion</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="h5 text-primary d-inline">Promote as:</h5>
              <form onSubmit={toPromote}>
                <div className="row mt-4 sp4">
                  <select className="form-control default-select form-control-lg"
                   onChange={(e) => setUpdatedPosition(e.target.value)}
                   value={updatedPosition}
                   >
                    <option value selected disabled hidden>
                      Choose a position
                    </option>
                    <option value="Department Head">Department Head</option>
                    <option value="Area Chair">Area Chair</option>
                  </select>
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
                    Promote
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPromoteDemote;
