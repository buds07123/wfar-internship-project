import React,{useState,useEffect} from "react";
import axios from "axios";
axios.defaults.withCredentials = true

const Announcement = () => {

  const [data, setData] = useState('')

  const getAllContent = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllContent`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getAllContent().then((data) => setData(data.content))
  }, [])

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-xl-3 col-xxl-4">
          <div className="card">
            <div className="card-body">
              <div className="wfar-entry mb-2 mb-xxl-2 mb-md-0">
                <div className="wfar-img-content">
                  <img
                    className="img-fluid"
                    src="assets/img/welcome-back.png"
                    alt
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-xxl-8">
          <div className="card bg-vgradient">
            <div className="card-body vgradient row">
              <div className="col-xl-7 col-sm-6">
                <div className="justify">
                  <h2>ANNOUNCEMENT</h2>
                  <span>
                    {data.announcement}
                  </span>
                </div>
              </div>
              <div className="col-xl-5 col-sm-6">
                <img
                  src="assets/img/announcement.png"
                  alt
                  className="sd-shape"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Announcement;
