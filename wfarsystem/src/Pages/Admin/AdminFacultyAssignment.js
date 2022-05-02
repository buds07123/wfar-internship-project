import React from "react";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from 'jquery';

import Wfarbanner from "../../Components/WfarBanner";
import { render } from "@testing-library/react";

class AdminFacultyAssignment extends React.Component {
  componentDidMount() {
    //initialize datatable
    $("document").ready(function () {
      $("#filterTable").dataTable({
        retrieve: true,
        paging: true,
        searching: true,
        orderCellsTop: true,
        language: {
          paginate: {
            next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
            previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
          },
        },
      });

      //Get a reference to the new datatable
      var table = $("#filterTable").DataTable();

      //Take the category filter drop down and append it to the datatables_filter div.
      //You can use this same idea to move the filter anywhere withing the datatable that you want.
      $("#filterTable_filter.dataTables_filter").append($("#categoryFilter"));

      //Get the column index for the Category column to be used in the method below ($.fn.dataTable.ext.search.push)
      //This tells datatables what column to filter on when a user selects a value from the dropdown.
      //It's important that the text used here (Category) is the same for used in the header of the column to filter
      var categoryIndex = 4;
      $("#filterTable th").each(function (i) {
        if ($($(this)).html() == "Category") {
          categoryIndex = i;
          return false;
        }
      });

      //Use the built in datatables API to filter the existing rows by the Category column
      $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        var selectedItem = $("#categoryFilter").val();
        var category = data[categoryIndex];
        if (selectedItem === "" || category.includes(selectedItem)) {
          return true;
        }
        return false;
      });

      //Set the change event for the Category Filter dropdown to redraw the datatable each time
      //a user selects a new filter.
      $("#categoryFilter").change(function (e) {
        table.draw();
      });

      table.draw();
    });
  }

  render() {
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
                    <h4 className="h4 card-intro-title">FACULTY ASSIGNMENT</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      {/* <!-- Create the drop down filter --> */}
                      <div className="category-filter" >
                        <select id="categoryFilter" className="form-control" hidden>
                          <option value="">Show All</option>
                        </select>
                      </div>
                      {/* <!-- Set up the datatable --> */}
                      <form>
                        <table
                          id="filterTable"
                          className="table"
                          style={{ minWidth: "845px" }}
                        >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Employee Number</th>
                              <th scope="col">Faculty Name</th>
                              <th scope="col">Department</th>
                              <th scope="col">Area Chair in Charge</th>
                              <th scope="col">Department Head In Charge</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>2018107260</td>
                              <td>Juan dela Cruz</td>
                              <td>BSIT</td>
                              <td>None</td>
                              <td>Rosemarie M. Bautista, DIT</td>
                              <td>
                                <div className="d-flex">
                                  <button
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#assign"
                                    className="btn btn-success mr-1"
                                  >
                                    Assign
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>2018234541</td>
                              <td>Maria Bautista</td>
                              <td>BLIS</td>
                              <td>Gabriel Galang</td>
                              <td>Rosemarie M. Bautista, DIT</td>
                              <td>
                                <div className="d-flex">
                                  <button
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#assign"
                                    className="btn btn-success mr-1"
                                  >
                                    Assign
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Assign Modal */}
        <div className="modal fade" id="assign">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="h5 modal-title">Faculty Assignment</h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <h5 className="h5 text-primary d-inline">
                  Assign the responsibility of checking to:
                </h5>
                <form>
                  <div className="row mt-4 sp4">
                    <select className="form-control default-select form-control-lg">
                      <option value selected disabled hidden>
                        Select Area Chair
                      </option>
                      <option value>Gabriel M. Galang, MSIT</option>
                      <option value>Josephine R. Bayonito, PhD</option>
                      <option value>Melanie M. Orbeso, MSIT</option>
                    </select>
                    <select className="form-control default-select form-control-lg mt-4">
                      <option value selected disabled hidden>
                        Select Department Head
                      </option>
                      <option value>Rosemarie M. Bautista, DIT</option>
                      <option value>Aaron Paul M. Dela Rosa, MSIT</option>
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
                      Assign
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
};

export default AdminFacultyAssignment;
