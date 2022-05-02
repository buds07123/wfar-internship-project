import React from "react";

const Vmgo = () => {
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
                  Bulacan State University is a progressive knowledge-generating
                  institution globally recognized for excellent instruction, pioneering
                  research, and responsive community engagements.
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
                  Bulacan State University exists to provide highly competent, ethical and
                  service-oriented professionals that contribute to the sustainable
                  socio-economic growth and development of the nation.
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
                  <p>
                    To realize the vision and mission of the University, the College
                    commits itself to:
                  </p>
                  <p>
                    Produce globally competent, innovative, and ethically responsible
                    computing and Library and Information Science professionals responsive
                    to the challenges of society’s changing needs;
                  </p>
                  <p>
                    Prepare students with quality education in information service,
                    historical and cultural access including current and emerging
                    technologies through excellent instruction, collaborative research,
                    innovative production, and community partnerships;
                  </p>
                  <p>
                    Engage in responsive research programs and quality technology-based
                    extension services delivery with the industry-partners, government
                    organizations, private sectors, educational institutions and other
                    collaborators to foster strong international linkages and
                    partnerships; and
                  </p>
                  <p>
                    Provide faculty and staff development programs to capacitate and
                    create an avenue to contribute to the emerging social, economic and
                    environmental issues of the region and encourage students towards
                    innovation, entrepreneurship, and networking.
                  </p>
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
                  <p>The following are the objectives of the BSIT program:</p>
                  <p>
                    Apply knowledge and technical competencies in various specialization
                    tracks of Information Technology aligned to the responsive region’s
                    specific development needs.
                  </p>
                  <p>
                    Prepare graduates to address various user needs involved in the
                    selection, development, application, integration, and management of
                    computing technologies within an organization through critical
                    thinking and problem solving, being creative, collaborating, and
                    communication effectively.
                  </p>
                  <p>
                    Design, implement, and evaluate the local, regional, national, and
                    global impact of information and communications technology through
                    logical writing, making presentations, conducting collaborative
                    research, performing innovative production, rendering extension
                    services, establishing international linkages and partnerships.
                  </p>
                  <p>
                    Immerse and expose in an actual environment in industry, engage in
                    planning self-learning, and understand professional, ethical, legal,
                    security and social issues and responsibilities in the utilization of
                    information technology towards the realization of sustainable
                    development goals.
                  </p>
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
