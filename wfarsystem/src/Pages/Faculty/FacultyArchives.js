import React, { useEffect, useState } from "react";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from 'jquery';

import Archivesbanner from "../../Components/ArchivesBanner";
import { render } from "@testing-library/react";
import MUIDataTable from 'mui-datatables'
import axios from "axios";
axios.defaults.withCredentials = true

const FacultyArchives = () => {
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

  const [data, setData] = useState([])

  //Display Wfar archive Data
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllArchiveData`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getData().then((data) => {
      setData(data.empData)
      console.log(data.empData)
    })
  }, [])

  // <th scope="col">School Year</th>
  //                           <th scope="col">Semester</th>
  //                           <th scope="col">Week No.</th>
  //                           <th scope="col">Date</th>
  //                           <th scope="col">Status</th>
  //                           <th scope="col">Comments</th>
  //                           <th scope="col">Action</th>

  const columns = [
    {
      name: "school_year",
      label: "School Year",
    },
    {
      name: "semester",
      label: "Semester"
    },
    {
      name: "start_date",
      label: "Start date",
    },
    {
      name: "end_date",
      label: "End date",
    },
    {
      name: "status",
      label: "Status"
    },
    {
      name: "comments",
      label: "Comments"
    },
    {
      name: "Action",
      label: "Action",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div className="text-center">
              <button
                type="button"
                className="btn btn-success btn-xs sharp mr-1"
                onClick={e => {
                  alert(data[dataIndex]._id)
                }}
              >
                <i className="fa fa-undo" />
              </button>
            </div>
          )
        }
      }
    }
  ]

  const options={
    selectableRows: false
  }


  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">ARCHIVES</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            {/* Archives banner */}
            <Archivesbanner />
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    {/* <!-- Create the drop down filter --> */}
                    {/* <div className="category-filter" >
                      <select id="categoryFilter" className="form-control" hidden>
                        <option value="">Show All</option>
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
                            <th scope="col">School Year</th>
                            <th scope="col">Semester</th>
                            <th scope="col">Week No.</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Comments</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2020-2021</td>
                            <td>First Semester</td>
                            <td>Week 1</td>
                            <td>02/15/2021 - 02/19/2021</td>
                            <td>
                              <strong>OK</strong>
                            </td>
                            <td>Excellent and comprehensive work.</td>
                            <td>
                              <div className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-success btn-xs sharp mr-1"
                                >
                                  <i className="fa fa-undo" />
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
    </React.Fragment>
  );

};

export default FacultyArchives;
