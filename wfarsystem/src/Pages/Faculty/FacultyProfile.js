import React, { useState,useEffect } from "react";
import axios from "axios";

import Profileoverview from "../../Components/ProfileOverview";
import ProfileSettings from "../../Components/ProfileSettings";

axios.defaults.withCredentials = true

const FacultyProfile = () => {
  

  const [isSideClicked, setSideClicked] = useState("--");

  const [empData, setempData] = useState('')
  const [image, setImage] = useState('');
  const [emp_picture,setEmp_picture] = useState('')
  const [count,setCount] = useState(0)


  const employeeData = async () => {
    const res = await axios.get('http://localhost:4000/api/getEmpInfo').catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    employeeData().then((data) => setempData(data.emp))
  }, [])

  const loadImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setEmp_picture(event.target.files[0])
    setCount(count + 1)
  };

  const editProfilePic = async () => {

    const formData = new FormData()
    formData.set('emp_picture', emp_picture)

    await axios.put(`http://localhost:4000/api/editProfilePic/${empData._id}`,formData)
    .then(res => {
      if(res.data.msg === "Picture Successfully Updated"){
        alert("Picture Successfully Updated!")
      }
    })
  }

  useEffect(() => {
    if(count >= 1){
      editProfilePic()
    }
    
  },[count])

  const deleteAcc = async () => {
    let text = "Are you sure you want to delete this account?";
    if (window.confirm(text) == true) {
      await axios.delete('http://localhost:4000/api/deleteAcc')
      .then(res => {
        window.location.href = '/UserSignIn'
      })
    }
  }

  return (
    <React.Fragment>
      {/* Content */}
      <div className="content-body">
        <div className="sub-header">
          <div className="d-flex align-items-center flex-wrap mr-auto">
            <h5 className="h5 dashboard_bar">MY PROFILE</h5>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="profile card card-body px-3 pt-3 pb-0">
                <div className="profile-head">
                  <div className="photo-content">
                    <div className="user-cover-photo" />
                  </div>
                  <div className="profile-info">
                    <div className="profile-photo">
                      <div className="avatar-upload">
                        <div className="avatar-edit">
                          <input
                            type="file"
                            id="imageUpload"
                            name="emp_picture"
                            onChange={loadImage}
                          />
                          <label htmlFor="imageUpload" />
                        </div>
                        <div className="avatar-preview">
                          <div id="imagePreview">
                            <img
                              src={image === '' ? empData.emp_picture  : image }
                              id="avatar"
                              className="img-fluid rounded-circle"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile-details">
                      <div className="profile-name px-3 pt-2">
                        <h4 className="h4 text-primary mb-0">{empData.fname} {empData.mname} {empData.lname}</h4>
                        <p>{empData.position}</p>
                      </div>
                      <div className="ml-auto">
                        <button className="btn btn-danger" onClick={deleteAcc}>
                          <i className="flaticon-381-trash-1" />
                          &nbsp;Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Overview */}
            <Profileoverview />
            {/* General Account Settings */}
            <ProfileSettings photo={emp_picture} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FacultyProfile;
