import React, { useEffect, useState } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";

//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import { render } from "@testing-library/react";
import MUIDataTable from 'mui-datatables'

import axios from "axios";
axios.defaults.withCredentials = true

const AcdhIndividualHandle = () => {
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
  //     var categoryIndex = 3;
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
  const wfar_id = location.state.wfarId
  const wfar_name = location.state.wfarName

  const [data, setTableData] = useState([])

  //Display Wfar Data
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllWfar/${wfar_id}`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getData().then((data) => {
      setTableData(data.empWfar)
      console.log(data.empWfar)
    })
  }, [])


  const columns = [
    {
      name: "week_number",
      label: "Week No."
    },
    {
      name: "start_date",
      label: "Start date"
    },
    {
      name: "end_date",
      label: "End date"
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const state = data[dataIndex].status;
          if (state === "OK") {
            return (
              <span className="badge light badge-success">OK</span>
            );
          } else if (state === "For Checking") {
            return (
              <span className="badge light badge-info">For Checking</span>
            )
          } else if (state === "With Revisions") {
            return(
              <span className="badge light badge-danger">With Revisions</span>
            )
          }
        }
      }
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div className="d-flex">
              <Link to="/AcdhHandleWfarView" state={{
                wfarId: data[dataIndex]._id,
                weekNo: data[dataIndex].week_number,
                status: data[dataIndex].status
              }}>
                <button
                  type="button"
                  className="btn btn-primary mr-1"
                >
                  View
                </button>
              </Link>
            </div>
          )
        }
      }
    }
  ]


  const options={
    selectableRows: false,
    sort: true,
    sortOrder: { name: 'start_date', direction: 'asc' }
  }


  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">HANDLE FACULTY WEEKLY SUBMISSION</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header  bg-light-blue">
                  <h4 className="h4 card-intro-title">{wfar_name}</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    {/* <!-- Create the drop down filter --> */}
                    {/* <div class="category-filter">
                      <select id="categoryFilter" class="form-control">
                        <option value="">Show All</option>
                        <option value="OK">OK</option>
                        <option value="With Revisions">With Revisions</option>
                        <option value="For Checking">For Checking</option>
                      </select>
                    </div> */}
                    <MUIDataTable columns={columns} data={data} options={options} />
                    {/* <form>
                      <table
                        id="filterTable"
                        className="table"
                        style={{ minWidth: "845px" }}
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Week No.</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>April 4, 2022</td>
                            <td>April 8, 2022</td>
                            <td>
                              <span className="badge light badge-success">OK</span>
                            </td>
                            <td>
                              <div className="d-flex">
                                <Link to="/AcdhHandleWfarView">
                                  <button
                                    type="button"
                                    className="btn btn-primary mr-1"
                                  >
                                    View
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>April 11, 2022</td>
                            <td>April 15, 2022</td>
                            <td>
                              <span className="badge light badge-danger">
                                With Revisions
                              </span>
                            </td>
                            <td>
                              <div className="d-flex">
                                <Link to="/AcdhHandleWfarView">
                                  <button
                                    type="button"
                                    className="btn btn-primary mr-1"
                                  >
                                    View
                                  </button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>April 11, 2022</td>
                            <td>April 15, 2022</td>
                            <td>
                              <span className="badge light badge-info">
                                For Checking
                              </span>
                            </td>
                            <td>
                              <div className="d-flex">
                                <Link to="/AcdhHandleWfarView">
                                  <button
                                    type="button"
                                    className="btn btn-primary mr-1"
                                  >
                                    View
                                  </button>
                                </Link>
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
    </React.Fragment>
  );

}
export default AcdhIndividualHandle;
