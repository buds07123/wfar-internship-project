import React from "react";

const YearSemSelection = () => {
  return (
    <React.Fragment>
      <div className="row page-titles mx-0 mt-4 bg-white p-3">
        <div className="col-sm-12 p-md-0 justify-content-sm-center mt-2 mt-sm-0 d-flex">
          <h3 className="h3 p-2">SCHOOL YEAR: 2021-2022 - First Semester</h3>
        </div>
        <div className="col-sm-6 p-md-0">
          <div className="col-sm-12 p-md-0 justify-content-sm-start mt-2 mt-sm-0 d-flex">
            <div className="basic-form ">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text">School Year</label>
                  </div>
                  <select className="form-control default-select form-control-lg">
                    <option selected disabled hidden>
                      Select year
                    </option>
                    <option value={1}>2021-2022</option>
                    <option value={2}>2020-2021</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-6 p-md-0">
          <div className="col-sm-12 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
            <div className="basic-form ">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text">Semester</label>
                  </div>
                  <select className="form-control default-select form-control-lg">
                    <option selected disabled hidden>
                      Select sem
                    </option>
                    <option value={1}>First Semester</option>
                    <option value={2}>Second Semester</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default YearSemSelection;
