import React,{useEffect,useState} from "react";

import Vmgo from "../../Components/Vmgo";
import Announcement from "../../Components/Announcement";
import FeaturesSlider from "../../Components/FeaturesSlider";
import axios from "axios";
axios.defaults.withCredentials = true
const AcdhDashboard = () => {

  const [handleFaculty, setHandleFaculty] = useState([])

  const getFullWfarInfo = async () => {
    const res = await axios.get(`http://localhost:4000/api/handleFaculty`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getFullWfarInfo().then((data) => {
      setHandleFaculty(data.empData[0].assignTo)
    })
  }, [])

  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">DASHBOARD</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-9 col-xxl-9">
              <div className="card welcome-note card-primary">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="ac-welcome-note-left col-md-4">
                      <img src="assets/img/banner-img.png" alt />
                    </div>
                    <div className="col-md-8">
                      <h3 className="h3">Hi, welcome back!</h3>
                      <p className="fs-18 text-justify">
                        Upload your individual weekly accomplishment report and check all
                        your handles submission with ease.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 m-t35">
              <div className="card dash-card">
                <div className="card-body text-center dash-icons">
                  <img className="mb-3 top-icon" src="assets/img/total-1.png" alt />
                  <h2 className="text-black mb-2 font-w600">{handleFaculty.length}</h2>
                  <p className="mb-0 fs-14">Total Handles</p>
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
    </React.Fragment>
  );
};

export default AcdhDashboard;
