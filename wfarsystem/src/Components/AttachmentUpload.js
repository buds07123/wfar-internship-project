import React, { useState } from "react";

const AttachmentUpload = ({setMeet_screenshots}) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
  
    setMeet_screenshots(event.target.files)

    const imagesArray = selectedFilesArray.map((file) => {

      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  return (
    <React.Fragment>
      <div className="row page-titles mx-0">
        <div className="col-sm-12 p-md-0 justify-content-sm-end mt-sm-0 d-flex">
          <label className="btn btn-rounded btn-secondary">
            <input
              className="d-none"
              type="file"
              name="meet_screenshots"
              onChange={onSelectFile}
              multiple
            />
            <span className="btn-icon-left text-secondary">
              <i className="fa fa-plus" />
            </span>
            Add Image/s
          </label>
        </div>

        <div className="col-sm-6 p-md-0">
          <div className="col-sm-12 p-md-0 justify-content-sm-start mt-2 mt-sm-0 d-flex">
            <div className="images">
              {selectedImages &&
                selectedImages.map((image, index) => {
                  return (
                    <div key={image} className="image">
                      <img className="img-upload" src={image} alt="upload" />
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          setSelectedImages(selectedImages.filter((e) => e !== image))
                        }
                      >
                        <i className="fa fa-trash" />
                        &nbsp;Delete
                      </button>
                      <p>{index + 1}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AttachmentUpload;
