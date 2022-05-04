import React from "react";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from 'jquery';

import Wfarbanner from "../../Components/WfarBanner";
import { render } from "@testing-library/react";

class ACDHAccountRequest extends React.Component {
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
      <React.Fragment>

        {/* Content */}
        <div className="content-body">
          <div className="sub-header ">
            <div className="d-flex align-items-center flex-wrap mr-auto">
              <h5 className="h5 dashboard_bar">ACCOUNT REQUEST/S</h5>
            </div>
          </div>
          <div className="container-fluid">
            {/* Wfar Banner*/}
            <Wfarbanner />
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header bg-light-blue">
                    <h4 className="h4 card-intro-title">ACCOUNT MANAGEMENT</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      {/* <!-- Create the drop down filter --> */}
                      <div className="category-filter" >
                        <select id="categoryFilter" className="form-control">
                          <option value="">Show All</option>
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                      {/* <!-- Set up the datatable --> */}
                      <form>
                        <table className="table" style={{ minWidth: "845px" }} id="filterTable">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Faculty Name</th>
                              <th scope="col">Email Address</th>
                              <th scope="col">Date of Request</th>
                              <th scope="col">Position</th>
                              <th scope="col" >Status</th>
                              <th scope="col" >Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td >John Reyes</td>
                              <td >johnreyes@gmail.com</td>
                              <td >03/01/2022</td>
                              <td >Faculty</td>
                              <td >
                                <span className="badge light badge-warning">
                                  <i className="fa fa-circle text-warning mr-1"></i>
                                  Pending
                                </span>
                              </td>
                              <td >
                                <div className="d-flex">
                                  <button type="button" name="approve" className="btn btn-success btn-xs sharp mr-1"><i className="fa fa-check"></i></button>
                                  <button type="button" name="reject" className="btn btn-danger btn-xs sharp"><i className="fa fa-remove"></i></button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td >Maria Bautista</td>
                              <td >mariabautista@gmail.com</td>
                              <td >03/02/2022</td>
                              <td >Faculty</td>
                              <td >
                                <span className="badge light badge-danger">
                                  <i className="fa fa-circle text-danger mr-1"></i>
                                  Rejected
                                </span>
                              </td>
                              <td >
                                <div className="d-flex">
                                  <button type="button" name="approve" className="btn btn-success btn-xs sharp mr-1"><i className="fa fa-check"></i></button>
                                  <button type="button" name="reject" className="btn btn-danger btn-xs sharp"><i className="fa fa-remove"></i></button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td >Juan dela Cruz</td>
                              <td >juandelacruz@gmail.com</td>
                              <td >03/03/2022</td>
                              <td >Faculty</td>
                              <td >
                                <span className="badge light badge-success">
                                  <i className="fa fa-circle text-success mr-1"></i>
                                  Active
                                </span>
                              </td>
                              <td >
                                <div className="d-flex">
                                  <button type="button" name="approve" className="btn btn-success btn-xs sharp mr-1"><i className="fa fa-check"></i></button>
                                  <button type="button" name="reject" className="btn btn-danger btn-xs sharp"><i className="fa fa-remove"></i></button>
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
      </React.Fragment>
    );
  }
}

export default ACDHAccountRequest;