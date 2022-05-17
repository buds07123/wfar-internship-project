import React, { useEffect, useState } from "react";
//Bootstrap and jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import $ from 'jquery';

import Wfarbanner from "../../Components/WfarBanner";
import { render } from "@testing-library/react";

import MUIDataTable from 'mui-datatables'
import axios from "axios";
axios.defaults.withCredentials = true

const AdminFacultyAssignment = () => {
  const [updateTable, setUpdateTable] = useState(0)
  const [data, setData] = useState([])
  const [empID, setEmpID] = useState('')

  //Display User Data
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllFaculty`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getData().then((data) => {
      setData(data.empData)
    })
  }, [updateTable])

  //AREA CHAIR
  const [AC,setAC] = useState([])
  const getAllAC = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllAC`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getAllAC().then((data) => {
      setAC(data.empData)
    })
  }, [])

  //DEPARTMENT HEAD
  const [DH,setDH] = useState([])
  const getAllDH = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllDH`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getAllDH().then((data) => {
      setDH(data.empData)
    })
  }, [])

  //toAssign
  const [hanldeAC_ID,setHandleID] = useState('')
  const [hanldeDH_ID,setHandleDH_ID] = useState('')
  const [fname,setFName] = useState('')
  const [mname,setMName] = useState('')
  const [lname,setLName] = useState('')
  const [position,setPos] = useState('')
  

  //Edit Asign to..
  const [ac_inCharge,setAc_inCharge] = useState('')
  const [dh_inCharge,setDh_inCharge] = useState('')

  const editAsignTo = async (e) => {
    e.preventDefault()


    if (hanldeAC_ID != "" || hanldeAC_ID == null) {
      //EDIT AC
      const ac_data = {
        ac_inCharge,
        empID,
        fname,
        mname,
        lname,
        position
      }

      await axios.put(`http://localhost:4000/api/editAssignTO/${empID}/${hanldeAC_ID}`, ac_data)
        .then(res => {
          // setUpdateTable(updateTable + 1)
          window.location.reload(false);
        })
    }
    

    if (hanldeDH_ID != "" || hanldeDH_ID == null) {
      // EDIT DH
      const dh_data = {
        dh_inCharge,
        empID,
        fname,
        mname,
        lname,
        position
      }
      await axios.put(`http://localhost:4000/api/editDHAssignTO/${empID}/${hanldeDH_ID}`, dh_data)
        .then(res => {
          // setUpdateTable(updateTable + 1)
          window.location.reload(false);
        })
    } 

  }

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
      name: "course",
      label: "Department",
    },
    {
      name: "ac_inCharge",
      label: "Area Chair in Charge"
    },
    {
      name: "dh_inCharge",
      label: "Department Head In Charge"
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
                data-target="#assign"
                className="btn btn-success mr-1"
                onClick={e => {
                  setEmpID(data[dataIndex]._id)
                  setFName(data[dataIndex].fname)
                  setMName(data[dataIndex].mname)
                  setLName(data[dataIndex].lname)
                  setPos(data[dataIndex].updatedPosition)
                  setAc_inCharge(data[dataIndex].ac_inCharge)
                  setDh_inCharge(data[dataIndex].dh_inCharge)
                  setHandleID(data[dataIndex].handlerAC_ID)
                  setHandleDH_ID(data[dataIndex].handlerDH_ID)
                }}
              >
                Assign
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
                  <h4 className="h4 card-intro-title">FACULTY ASSIGNMENT</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <MUIDataTable columns={columns} data={data} options={options} />
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
              <form onSubmit={editAsignTo}>
                <div className="row mt-4 sp4">

                  <select className="form-control default-select form-control-lg" 
                    onChange={(e) => {
                      setAc_inCharge(e.target.value)
                      const index = e.target.selectedIndex;
                      const el = e.target.childNodes[index]
                      const id = el.getAttribute('data-id');  
                      setHandleID(id)
                    }}
                    defaultValue={ac_inCharge}
                    >

                    <option value={ac_inCharge} disabled hidden>Select Area Chair</option>
                    <option>None</option>
                    {AC.map((ac) => {
                      return (
                        <>
                          <option data-id={ac._id} value={ac.fname +" "+ ac.mname +" "+ ac.lname}>{ac.fname} {ac.mname} {ac.lname}</option>
                        </>
                      )
                    })}
                  </select>

                  <select className="form-control default-select form-control-lg mt-4"
                    onChange={(e) => {
                      setDh_inCharge(e.target.value)
                      const index = e.target.selectedIndex;
                      const el = e.target.childNodes[index]
                      const id = el.getAttribute('data-id');  
                      setHandleDH_ID(id)
                    }}
                    defaultValue={dh_inCharge}
                  >
                    <option value={dh_inCharge} disabled hidden>Select Department Head</option>
                    <option>None</option>
                    {DH.map((dh) => {
                      return (
                        <>
                          <option data-id={dh._id} value={dh.fname +" "+ dh.mname +" "+ dh.lname}>{dh.fname} {dh.mname} {dh.lname}</option>
                        </>
                      )
                    })}
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

};

export default AdminFacultyAssignment;
