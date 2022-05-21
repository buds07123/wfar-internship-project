import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true

const Vmgo = () => {

  const [data, setData] = useState([])

  const getAllContent = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllContent`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getAllContent().then((data) => {
      setData(data.content)
    })
  }, [])

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="wfar-entry">
                <div className="wfar-img-content">
                  <img className="img-fluid" src="assets/img/mission.png" alt="Mission" />
                </div>
                <div className="wfar-content text-center mt-3">
                  <h3 className="h3 mb-4">MISSION</h3>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#mission"
                    className="btn btn-rounded btn-warning"
                  >
                    <span className="btn-icon-left text-warning">
                      <i className="fa fa-eye color-warning" />
                    </span>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="wfar-entry">
                <div className="wfar-img-content">
                  <img className="img-fluid" src="assets/img/vision.png" alt="Vision" />
                </div>
                <div className="wfar-content text-center mt-3">
                  <h3 className="h3 mb-4">VISION</h3>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#vision"
                    className="btn btn-rounded btn-warning"
                  >
                    <span className="btn-icon-left text-warning">
                      <i className="fa fa-eye color-warning" />
                    </span>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="wfar-entry">
                <div className="wfar-img-content">
                  <img className="img-fluid" src="assets/img/goals.png" alt="Goals" />
                </div>
                <div className="wfar-content text-center mt-3">
                  <h3 className="h3 mb-4">GOALS</h3>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#goals"
                    className="btn btn-rounded btn-warning"
                  >
                    <span className="btn-icon-left text-warning">
                      <i className="fa fa-eye color-warning" />
                    </span>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="wfar-entry">
                <div className="wfar-img-content">
                  <img className="img-fluid" src="assets/img/objectives.png" alt="Objectives" />
                </div>
                <div className="wfar-content text-center mt-3">
                  <h3 className="h3 mb-4">OBJECTIVES</h3>
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#objectives"
                    className="btn btn-rounded btn-warning"
                  >
                    <span className="btn-icon-left text-warning">
                      <i className="fa fa-eye color-warning" />
                    </span>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Mission Modal */}
      <div className="modal fade" id="mission">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="h4 modal-title">MISSION</h4>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row p-3 justify ">
                <p className="fs-15 ">
                  {data.mission}
                </p>
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
      </div>
      {/* Vision Modal */}
      <div className="modal fade" id="vision">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="h4 modal-title">VISION</h4>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row p-3 justify ">
                <p className="fs-15 ">
                  {data.vision}
                </p>
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
      </div>
      {/* Goals Modal */}
      <div className="modal fade" id="goals">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="h4 modal-title">GOALS</h4>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row p-3 justify ">
                <span className="fs-15">
                  <p>{data.goals}</p>
                </span>
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
      </div>
      {/* Objectives Modal */}
      <div className="modal fade" id="objectives">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="h4 modal-title">OBJECTIVES</h4>
              <button type="button" className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row p-3 justify ">
                <span className="fs-15">
                  <p>{data.objectives}</p>
                </span>
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
      </div>
    </React.Fragment>
  );
};

export default Vmgo;
