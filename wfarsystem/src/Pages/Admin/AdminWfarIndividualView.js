import React from "react";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from 'jquery';
import { render } from "@testing-library/react";

class AdminWfarIndividualView extends React.Component {
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
            <h5 className="h5 dashboard_bar">WEEKLY SUBMISSION</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-light-blue">
                  <div className="col-xl-7 col-lg-12">
                    <h4 className="h4 card-title">Week No.</h4>
                  </div>
                  <div className="col-xl-5 col-lg-12">
                    <button
                      type="button"
                      className="float-right btn btn-rounded btn-info"
                    >
                      <span className="btn-icon-left text-info">
                        <i className="fa fa-download" />
                      </span>
                      Download
                    </button>
                    <button
                      type="button"
                      className="float-right mr-1 btn btn-rounded btn-secondary"
                    >
                      <span className="btn-icon-left text-secondary">
                        <i className="fa fa-print" />
                      </span>
                      Print
                    </button>
                  </div>
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
                            <th scope="col">Date</th>
                            <th scope="col">Subject</th>
                            <th scope="col">
                              Course, Year, <br /> Section
                            </th>
                            <th scope="col">No. of Attendees</th>
                            <th scope="col">
                              Link of Meet <br /> Recording
                            </th>
                            <th scope="col">
                              Learning <br /> Activities
                            </th>
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
                        </tbody>
                      </table>
                    </form>
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
                  <a
                    href="assets/img/sample/img1.jpg"
                    data-exthumbimage="assets/img/sample/img1.jpg"
                    data-src="assets/img/sample/img1.jpg"
                    className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                  >
                    <img src="assets/img/sample/img1.jpg" alt className="img-fluid" />
                  </a>
                  <a
                    href="assets/img/sample/img2.jpg"
                    data-exthumbimage="assets/img/sample/img2.jpg"
                    data-src="assets/img/sample/img2.jpg"
                    className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                  >
                    <img src="assets/img/sample/img2.jpg" alt className="img-fluid" />
                  </a>
                  <a
                    href="assets/img/sample/img3.jpg"
                    data-exthumbimage="assets/img/sample/img3.jpg"
                    data-src="assets/img/sample/img3.jpg"
                    className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6"
                  >
                    <img src="assets/img/sample/img3.jpg" alt className="img-fluid" />
                  </a>
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
}
};

export default AdminWfarIndividualView;
