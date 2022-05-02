import React from "react";

const Archivesbanner = () => {
  return (
    <React.Fragment>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h4 className="h4">ALL ARCHIVED SUBMISSIONS</h4>
              <span>
                This is the directory where deleted data is kept. To return the data to
                its original location, click the restore button{" "}
                <i className="fa fa-undo" />.
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Archivesbanner;
