import React, { useState,useEffect } from "react";
import AdminProfileSettings from "./AdminProfileSettings";
import AdminProfileoverview from "../../Components/AdminProfileoverview";

import axios from "axios";
axios.defaults.withCredentials = true

const AdminProfile = () => {

  const [admin, setAdmin] = useState('')
  const [image, setImage] = useState('')
  const [picture,setPicture] = useState('')
  const [count,setCount] = useState(0)

  const adminData = async () => {
    const res = await axios.get('http://localhost:4000/api/getAdminInfo').catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    adminData().then((data) => setAdmin(data.admin))
  }, [])

  const loadImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setPicture(event.target.files[0])
    setCount(count + 1)
  };

  const editAdminProfilePic = async () => {

    const formData = new FormData()
    formData.set('picture', picture)

    await axios.put(`http://localhost:4000/api/editAdminProfilePic/${admin._id}`,formData)
    .then(res => {
      if(res.data.msg === "Picture Successfully Updated"){
        alert("Picture Successfully Updated!")
      }
    })
  }

  useEffect(() => {
    if(count >= 1){
      editAdminProfilePic()
    }
    
  },[count])

  return (
    <>
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
                            name="picture"
                            onChange={loadImage}
                          />
                          <label htmlFor="imageUpload" />
                        </div>
                        <div className="avatar-preview">
                          <div id="imagePreview">
                            <img
                              src={image === '' ? admin.picture : image}
                              id="avatar"
                              className="img-fluid rounded-circle"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile-details">
                      <div className="profile-name px-3 pt-2">
                        <h4 className="h4 text-primary mb-0">{admin.first_name} {admin.middle_name} {admin.last_name}</h4>
                        <p>Admin</p>
                      </div>
                      <div className="ml-auto">
                        <button className="btn btn-danger">
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
            <AdminProfileoverview />
            {/* General Account Settings */}
            <AdminProfileSettings />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
