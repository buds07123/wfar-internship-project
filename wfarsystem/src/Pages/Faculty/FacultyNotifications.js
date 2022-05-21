import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import Notificationsbanner from "../../Components/NotificationsBanner";
import axios from 'axios';
const { io } = require("socket.io-client");
const socket = io("http://localhost:4000");
axios.defaults.withCredentials = true

const FacultyNotifications = () => {

  const location = useLocation()
  const emp_id = location.state.empId
  const empIdHeader = location.state.empIdHeader

  const [admin,setAdmin] = useState([])

  const adminData = async () => {
    const res = await axios.get(`http://localhost:4000/api/adminData`).catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    adminData().then((data) => {
      setAdmin(data.admin)
    })
  },[])

  const [getNotifs, setNotifs] = useState([])

  const notifs = async () => {

    if(emp_id){
      const res = await axios.get(`http://localhost:4000/api/getAllNotif/${emp_id}`).catch(err => console.log(err))

      return res.data
    }else if(empIdHeader){
      const res = await axios.get(`http://localhost:4000/api/getAllNotif/${empIdHeader}`).catch(err => console.log(err))

      return res.data
    }
  }

  useEffect(() => {
    notifs().then((data) => {
      setNotifs(data.notifs)
    })
  }, [])

  useEffect(() => {
    if(emp_id){
      socket.emit("emp_id", emp_id)

      socket.emit("send_notif", {
        id: emp_id
      })
    }else if(empIdHeader){
      socket.emit("emp_id", empIdHeader)

      socket.emit("send_notif", {
        id: empIdHeader
      })
    }

    socket.on("receive_notif", (data) => {
      console.log("notiiffff")
      notifs().then((data) => {
        setNotifs(data.notifs)
      })
    })
  },[])


  return (
    <React.Fragment>
    
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">NOTIFICATIONS</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            {/* Notifications banner*/}
            <Notificationsbanner />
             
            <div className="col-xl-12">
              <div className="card user-card">
                <div className="card-body pt-2 pb-1">

                  {getNotifs.map((notif) => {
                    return (
                      <div className="notification">
                        <div className="media pt-3 pb-3">
                          <div className="user-media mr-3 rounded-circle">
                            <img src={admin.picture} alt />
                          </div>
                          <div className="media-body">
                            <h5 className="h5 m-b-5">{admin.first_name} {admin.middle_name} {admin.last_name}</h5>
                            <p className="mb-0 text-info">Admin</p>
                            <p className="mb-0">{notif.time} | {notif.dateToday}</p>
                          </div>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <span className="mb-0">{notif.message}</span>
                          </li>
                        </ul>
                      </div>
                    )
                  })}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FacultyNotifications;
