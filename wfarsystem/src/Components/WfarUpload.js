import React, { useEffect, useState } from "react";
import AttachmentUpload from "./AttachmentUpload";
import Act_AttachmentUpload from "./Act_AttachmentUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wfarupload = ({ schoolYear, sem, weekNo }) => {

  const navigate = useNavigate()

  const [week_number, setWeek_number] = useState('')
  const [date, setDate] = useState('')
  const [subject, setSubject] = useState('')
  const [course, setCourse] = useState('')
  const [year, setYear] = useState('')
  const [section, setSection] = useState('')
  const [attendee, setAttendee] = useState('')
  const [recording_link, setRecording_link] = useState('')
  const [activity, setActivity] = useState('')
  const [meet_screenshots, setMeet_screenshots] = useState([])
  const [act_screenshots, setAct_screenshots] = useState([])

  const [school_year, setSchoolYear] = useState(schoolYear)
  const [semester, setSem] = useState(sem)

  const postWfar = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('school_year', school_year)
    formData.append('semester', semester)
    formData.append('week_number', week_number)
    formData.append('date', date)
    formData.append('subject', subject)
    formData.append('course', course)
    formData.append('year', year)
    formData.append('section', section)
    formData.append('attendee', attendee)
    formData.append('recording_link', recording_link)
    formData.append('activity', activity)
    for (const key of Object.keys(meet_screenshots)) {
      formData.append('meet_screenshots', meet_screenshots[key])
    }
    for (const key of Object.keys(act_screenshots)) {
      formData.append('act_screenshots', act_screenshots[key])
    }
    

    //save wfar
    await axios.post("http://localhost:4000/api/postWfar", formData)
      .then(res => {
        alert('WFAR Successfully uploaded.')
        navigate("/FacultyOwnSubmissions")
      })
      .catch(err => { console.log(err) })
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header bg-light-blue">
              <div className="col-xl-7 col-lg-12">
                <h4 className="h4 card-title">
                  Please complete the WFAR information below.
                </h4>
              </div>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={postWfar} className="form" encType="multipart/form-data" id="form">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Week No.</label>
                    <div className="col-sm-9">
                      <select className="form-control default-select form-control-lg" onChange={(e) => setWeek_number(e.target.value)} defaultValue={week_number} required>
                        <option value={week_number} selected disabled>Select a week</option>
                        <option>Week 1</option>
                        <option>Week 2</option>
                        <option>Week 3</option>
                        <option>Week 4</option>
                        <option>Week 5</option>
                        <option>Week 6</option>
                        <option>Week 7</option>
                        <option>Week 8</option>
                        <option>Week 9</option>
                        <option>Week 10</option>
                        <option>Week 11</option>
                        <option>Week 12</option>
                        <option>Week 13</option>
                        <option>Week 14</option>
                        {weekNo === "18 Weeks" ?
                          <>
                            <option>Week 15</option>
                            <option>Week 16</option>
                            <option>Week 17</option>
                            <option>Week 18</option>
                          </> : <option>Week 15</option>}
                        
                      </select>
                    </div>
                  </div>
                  <div className="wfar-entry" id="entry">
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Date of Class/ Accomplishment
                      </label>
                      <div className="col-sm-9">
                        <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} value={date} required />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Subject being Taught
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control input-default "
                          placeholder="Subject"
                          onChange={(e) => setSubject(e.target.value)} value={subject}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Course, Year and Section
                      </label>
                      <div className="col-sm-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Course"
                          onChange={(e) => setCourse(e.target.value)} value={course}
                          required
                        />
                      </div>
                      <div className="col mt-2 mt-sm-0">
                        <input
                          type="number"
                          min={0}
                          max={4}
                          className="form-control input-default "
                          placeholder="Year"
                          onChange={(e) => setYear(e.target.value)}
                          value={year}
                          required
                        />
                      </div>
                      <div className="col mt-2 mt-sm-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Section"
                          onChange={(e) => setSection(e.target.value)}
                          value={section}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">No. of Attendees</label>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          min={0}
                          oninput="this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                          className="form-control input-default "
                          placeholder="No. of Attendees"
                          onChange={(e) => setAttendee(e.target.value)}
                          value={attendee}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Link of MS Teams Recordings
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control input-default "
                          placeholder="Link of MS Teams Recordings"
                          onChange={(e) => setRecording_link(e.target.value)}
                          value={recording_link}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Learning Activities
                      </label>
                      <div className="col-sm-9">
                        <textarea className="form-control" rows={4} defaultValue={""} onChange={(e) => setActivity(e.target.value)} value={activity} required />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Attachments</label>
                      <div className="col-sm-9">
                        <div className="card shadow-sm w-100">
                          <div className="bg-light-blue card-header d-flex justify-content-between">
                            <h6 className="h6">Team Meet Screenshot/s</h6>
                          </div>
                          <div
                            className="card-body d-flex flex-wrap align-items-center"
                            id="container"
                          >
                            <AttachmentUpload setMeet_screenshots={setMeet_screenshots} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label" />
                      <div className="col-sm-9">
                        <div className="card shadow-sm w-100">
                          <div className="bg-light-blue card-header d-flex justify-content-between">
                            <h6 className="h6">Provided Activity Screenshot/s</h6>

                          </div>
                          <div className="card-body d-flex flex-wrap justify-content-start"
                            id="act-container">
                            <Act_AttachmentUpload setAct_screenshots={setAct_screenshots} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="new-entry pb-5" />
                  <div className="card-footer">
                    <button
                      type="submit"
                      className="card-link float-right btn btn-primary"
                    >
                      <i className="fa fa-cloud-upload" />
                      &nbsp;Save and Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wfarupload;
