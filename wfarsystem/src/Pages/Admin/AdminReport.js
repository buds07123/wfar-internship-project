import React, { useEffect, useState } from "react";
//Bootstrap and jQuery libraries
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";

import Wfarbanner from "../../Components/WfarBanner";
import { render } from "@testing-library/react";
import MUIDataTable from 'mui-datatables'
import axios from "axios";
axios.defaults.withCredentials = true

const AdminReport = () => {
  // componentDidMount() {
  //   //initialize datatable
  //   $("document").ready(function () {
  //     $("#filterTable").dataTable({
  //       retrieve: true,
  //       paging: true,
  //       searching: true,
  //       orderCellsTop: true,
  //       initComplete: function () {
  //         this.api()
  //           .columns()
  //           .every(function () {
  //             var column = this;
  //             console.log(this.index());
  //             var select = $(
  //               '<select><option selected disabled hidden>Filter results</option><option value="">Select All</option></select>'
  //             )
  //               .appendTo($("thead tr:eq(1) th:eq(" + this.index() + ")"))
  //               .on("change", function () {
  //                 var val = $.fn.dataTable.util.escapeRegex($(this).val());

  //                 column.search(val ? "^" + val + "$" : "", true, false).draw();
  //               });

  //             column
  //               .data()
  //               .unique()
  //               .sort()
  //               .each(function (d, j) {
  //                 select.append('<option value="' + d + '">' + d + "</option>");
  //               });
  //           });
  //       },
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
    const res = await axios.get(`http://localhost:4000/api/getAllWfarReport`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getData().then((data) => {
      setData(data.wfars)
      console.log(data.wfars)
    })
  }, [])

  const columns = [
    {
      name: "fname",
      label: "Faculty Name",
    }
  ]

  // columns.push(
  //   {
  //     name: "fname",
  //     label: "Faculty Name",
  //   }
    
  // )

  data.map((item) => {
    columns.push({
      name: "status",
      label: `${item.week_number} (${item.start_date} - ${item.end_date}) Comments/Remarks`,
      options: {
        customBodyRenderLite: (dataIndex) => {
          const state = item.status;
          if (state === "For Checking") {
            return (
              <span className="badge light badge-warning">
                For Checking
              </span>
            );
          } else if (state === "With Revisions") {
            return (
              <span className="badge light badge-danger">
                With Revisions
              </span>
            );
          } else {
            return (
              <span className="badge light badge-success">
                OK
              </span>
            )
          }
        }
      }
    })
  })

  const options={
    selectableRows: false,
    sort: true,
    sortOrder: { name: 'week_no', direction: 'asc' }
  }

  return (
    <>
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
                {/* <div className="card-header bg-light-blue">
                  <div className="col-xl-7 col-lg-12">
                    <h4 className="h4 card-title">SUMMARY OF COMPLETED REQUIREMENTS</h4>
                  </div>
                  <div className="col-xl-5 col-lg-12">
                    <button
                      type="button"
                      className="float-right btn btn-rounded btn-info"
                    >
                      <span className="btn-icon-left text-info">
                        <i className="fa fa-download color-success" />
                      </span>
                      Download
                    </button>
                    <button
                      type="button"
                      className="float-right mr-1 btn btn-rounded btn-secondary"
                    >
                      <span className="btn-icon-left text-secondary">
                        <i className="fa fa-print color-success" />
                      </span>
                      Print
                    </button>
                  </div>
                </div> */}
                <div className="card-body">
                  <div className="table-responsive">
                    <MUIDataTable columns={columns} data={data} options={options} />
                    {/* <!-- Create the drop down filter --> */}
                    {/* <div className="category-filter">
                      <select id="categoryFilter" className="form-control" hidden>
                        <option value="">Show All</option>
                      </select>
                    </div> */}
                    {/* <!-- Set up the datatable --> */}
                    {/* <form>
                      <table
                        id="filterTable"
                        className="table"
                        style={{ minWidth: "845px" }}
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Faculty Name</th>
                            <th scope="col">
                              Week 1 (Sept 27 - Oct 3) <br /> Comments/Remarks
                            </th>
                            <th scope="col">
                              Week 2 (Oct 4 - Oct 10) <br /> Comments/Remarks
                            </th>
                          </tr>
                          <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Gabriel M. Galang</td>
                            <td>Ok</td>
                            <td>Did not submit WFAR</td>
                          </tr>
                          <tr>
                            <td>Juan dela Cruz</td>
                            <td>Links not working</td>
                            <td>Ok</td>
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
    </>
  );

}

export default AdminReport;
