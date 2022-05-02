import React from "react";

const FeaturesSlider = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body p-4">
              <h3 className="h3 card-intro-title mb-4">
                Create, Manage, Monitor
              </h3>
              <h5 className="h5 mb-4">
                Learn more about the features of Web-based WFAR Management
                System.
              </h5>
              <div className="bootstrap-carousel">
                <div
                  data-ride="carousel"
                  className="carousel slide"
                  id="carouselCaptions"
                >
                  <ol className="carousel-indicators">
                    <li
                      className="active"
                      data-slide-to={0}
                      data-target="#carouselCaptions"
                    ></li>
                    <li
                      data-slide-to={1}
                      data-target="#carouselCaptions"
                      className
                    />
                    <li
                      data-slide-to={2}
                      data-target="#carouselCaptions"
                      className
                    />
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        className="d-block w-100"
                        src="assets/img/sample/img1.jpg"
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <h5 className="h5">
                          Improves Productivity, Accuracy and Timeliness
                        </h5>
                        <p>
                          The system will enable the faculty members to submit
                          their accomplishment reports with less hassle, and
                          helps the Department Head to automate reports to save
                          countless hours of sifting through mounds of paperwork
                          in search for data and results.
                        </p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src="assets/img/sample/img2.jpg"
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <h5 className="h5">
                          Identifies Potential Problems Early
                        </h5>
                        <p>
                          The system will allow the Admin and Department Head to
                          closely monitor the faculty members' accomplishment
                          reports and notify them about of what are still
                          lacking.
                        </p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src="assets/img/sample/img3.jpg"
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <h5 className="h5">Increase Communication</h5>
                        <p>
                          Because the WFAR System is used by the entire
                          department, there will be improved communication
                          between admin, department head and other faculty
                          members which helps to identify problem areas and
                          discover mutually agreeable solutions faster.
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    data-slide="prev"
                    href="#carouselCaptions"
                    className="carousel-control-prev"
                  >
                    <span className="carousel-control-prev-icon" />{" "}
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    data-slide="next"
                    href="#carouselCaptions"
                    className="carousel-control-next"
                  >
                    <span className="carousel-control-next-icon" />{" "}
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeaturesSlider;
