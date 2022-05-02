import React from "react";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from 'jquery';

import Wfarbanner from "../../Components/WfarBanner";
import { render } from "@testing-library/react";

class AcdhReport extends React.Component {
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
      var categoryIndex = 0;
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
          <div className="sub-header">
            <div className="d-flex align-items-center flex-wrap mr-auto">
              <h5 className="h5 dashboard_bar">REPORT GENERATION</h5>
            </div>
          </div>
          <div className="container-fluid">
            {/* Wfar Banner*/}
            <Wfarbanner />
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header  bg-light-blue">
                    <div className="col-xl-8 col-lg-12">
                      <h4 className="h4 card-title">
                        SUMMARY OF FACULTY WHO COMPLETED THE REQUIREMENTS
                      </h4>
                    </div>
                    <div className="col-xl-4 col-lg-12 justify-content-sm-end d-flex">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      {/* <!-- Create the drop down filter --> */}
                      <div className="category-filter" >
                        <select id="categoryFilter" className="form-control" >
                          <option value="">Show All</option>
                          <option value="Week 1">Week 1</option>
                          <option value="Week 2">Week 2</option>
                          <option value="Week 3">Week 3</option>
                          <option value="Week 4">Week 4</option>
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
                              <th scope="col">Week No.</th>
                              <th scope="col">Date Completed</th>
                              <th scope="col">Faculty Name</th>
                              <th scope="col">Email Address</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Week 1</td>
                              <td>03/01/2022</td>
                              <td>John Reyes</td>
                              <td>johnreyes@gmail.com</td>
                              <td>
                                <span className="badge light badge-success">OK</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Week 1</td>
                              <td>03/02/2022</td>
                              <td>Maria Bautista</td>
                              <td>mariabautista@gmail.com</td>
                              <td>
                                <span className="badge light badge-success">OK</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Week 2</td>
                              <td>03/03/2022</td>
                              <td>Juan dela Cruz</td>
                              <td>juandelacruz@gmail.com</td>
                              <td>
                                <span className="badge light badge-success">OK</span>
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
};

export default AcdhReport;
