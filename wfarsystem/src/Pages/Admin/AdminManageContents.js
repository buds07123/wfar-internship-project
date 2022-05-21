import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true

const AdminManageContents = () => {

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

  const [announcement,setAnnouncement] = useState(data.announcement)
  const [vision,setVision] = useState(data.vision)
  const [mission,setMission] = useState(data.mission)
  const [goals,setGoals] = useState(data.goals)
  const [objectives,setObjectives] = useState(data.objectives)

  const postContent = async (e) => {
    e.preventDefault()

    const formData = {
      announcement,
      vision,
      mission,
      goals,
      objectives
    }

    await axios.put(`http://localhost:4000/api/postContent`,formData)
    .then(e => {
      alert("Successfully Updated!")
    })
  }

  return (
    <>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">CONTENT MANAGEMENT</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="h4">
                      Maintain the WFAR Management System's Contents
                    </h4>
                    <span>
                      Update all important and relevant information to keep the
                      Faculties, Area Chair, and Department Head informed.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">ANNOUNCEMENT</h5>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form onSubmit={postContent}>
                      <div className="form-group mb-5">
                        <textarea
                          className="form-control"
                          rows={8}
                          id="announcement"
                          defaultValue={""}
                          onChange={e => setAnnouncement(e.target.value)}
                          value={announcement}
                        />
                      </div>
                      <div className="card-footer d-sm-flex justify-content-sm-end">
                        <input
                          type="submit"
                          className="btn btn-success"
                          defaultValue="Save and Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">VISION</h5>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form onSubmit={postContent}>
                      <div className="form-group mb-5">
                        <textarea
                          className="form-control"
                          rows={8}
                          id="vision"
                          defaultValue={""}
                          onChange={e => setVision(e.target.value)}
                          value={vision}
                        />
                      </div>
                      <div className="card-footer d-sm-flex justify-content-sm-end">
                        <input
                          type="submit"
                          className="btn btn-success"
                          defaultValue="Save and Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">MISSION</h5>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form onSubmit={postContent}>
                      <div className="form-group mb-5">
                        <textarea
                          className="form-control"
                          rows={8}
                          id="mission"
                          defaultValue={""}
                          onChange={e => setMission(e.target.value)}
                          value={mission}
                        />
                      </div>
                      <div className="card-footer d-sm-flex justify-content-sm-end">
                        <input
                          type="submit"
                          className="btn btn-success"
                          defaultValue="Save and Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">GOALS</h5>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form onSubmit={postContent}>
                      <div className="form-group mb-5">
                        <textarea
                          className="form-control"
                          rows={8}
                          id="goals"
                          defaultValue={""}
                          onChange={e => setGoals(e.target.value)}
                          value={goals}
                        />
                      </div>
                      <div className="card-footer d-sm-flex justify-content-sm-end">
                        <input
                          type="submit"
                          className="btn btn-success"
                          defaultValue="Save and Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">OBJECTIVES</h5>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <form onSubmit={postContent}>
                      <div className="form-group mb-5">
                        <textarea
                          className="form-control"
                          rows={8}
                          id="objectives"
                          defaultValue={""}
                          onChange={e => setObjectives(e.target.value)}
                          value={objectives}
                        />
                      </div>
                      <div className="card-footer d-sm-flex justify-content-sm-end">
                        <input
                          type="submit"
                          className="btn btn-success"
                          defaultValue="Save and Update"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminManageContents;
