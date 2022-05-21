import React, { useEffect, useState } from "react";

import Vmgo from "../../Components/Vmgo";
import Announcement from "../../Components/Announcement";
import FeaturesSlider from "../../Components/FeaturesSlider";
import axios from "axios";
axios.defaults.withCredentials = true
const AdminDashboard = () => {

   //FACULTY
   const [data, setData] = useState([])
   const getData = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllFaculty`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getData().then((data) => {
      setData(data.empData)
    })
  }, [])

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

  
  //Display User Data
  const [sub, setSub] = useState([])
  const totalSub = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllActiveUser`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    totalSub().then((data) => {
      setSub(data.empData)
    })
  }, [])
  
  return (
    <>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">DASHBOARD</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="form-head mb-sm-2 d-flex flex-wrap align-items-center">
            <h2 className="font-w600 title mr-auto ">Overview</h2>
          </div>
          <div className="card welcome-note card-primary">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="welcome-note-left col-md-4">
                  <img src="assets/img/banner-img.png" alt />
                </div>
                <div className="col-md-8">
                  <h3 className="h3">Welcome back, Admin!</h3>
                  <p className="fs-18 text-justify">
                    Take a glance at how the faculties are performing through their
                    weekly submissions. Here is a visual representation of your data
                    that allows you to quickly view and compare different numbers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-sm-6 m-t35">
              <div className="card dash-card">
                <div className="card-body text-center dash-icons">
                  <img className="mb-3 top-icon" src="assets/img/total-1.png" alt />
                  <h2 className="text-black mb-2 font-w600">{data.length}</h2>
                  <p className="mb-0 fs-14">Total Faculty</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 m-t35">
              <div className="card dash-card">
                <div className="card-body text-center dash-icons">
                  <img className="mb-3 top-icon" src="assets/img/total-2.png" alt />
                  <h2 className="text-black mb-2 font-w600">{AC.length}</h2>
                  <p className="mb-0 fs-13">Total Area Chair</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 m-t35">
              <div className="card dash-card">
                <div className="card-body text-center dash-icons">
                  <img className="mb-3 top-icon" src="assets/img/total-3.png" alt />
                  <h2 className="text-black mb-2 font-w600">{DH.length}</h2>
                  <p className="mb-0 fs-14">Total Department Head</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 m-t35">
              <div className="card dash-card">
                <div className="card-body text-center dash-icons">
                  <img className="mb-3 top-icon" src="assets/img/total-4.png" alt />
                  <h2 className="text-black mb-2 font-w600">{sub.length}</h2>
                  <p className="mb-0 fs-14">Total Submissions</p>
                </div>
              </div>
            </div>
          </div>
          {/* Announcement */}
          <Announcement />
          {/* Vmgo */}
          <Vmgo />
          {/* FeaturesSlider */}
          <FeaturesSlider />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
