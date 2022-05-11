import React,{useState,useEffect} from "react";

import axios from "axios";
axios.defaults.withCredentials = true

const YearSemSelection = ({setYear,setSem}) => {

  const [data, setData] = useState([])

  //Display User Data
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/api/getAllBatch`)
      .catch(err => console.log(err))

    return res.data
  }

  useEffect(() => {
    getData().then((data) => {
      setData(data.batch)
    })
  }, [])

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
                  <select className="form-control default-select form-control-lg" onChange={e => setYear(e.target.value)}>
                    <option selected disabled hidden>
                      Select year
                    </option>
                    {data.map((batch) => {
                      return (
                        <>
                          <option value={batch.school_year}>{batch.school_year}</option>
                        </>
                      )
                    })}
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
                  <select className="form-control default-select form-control-lg" onChange={e => setSem(e.target.value)}>
                    <option selected disabled hidden>
                      Select sem
                    </option>
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
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
