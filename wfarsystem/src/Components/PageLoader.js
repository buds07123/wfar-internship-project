import React from "react";

const PageLoader = () => {
  return (
    <React.Fragment>
      <div id="preloader">
        <div className="sk-three-bounce">
          <div className="sk-child sk-bounce1" />
          <div className="sk-child sk-bounce2" />
          <div className="sk-child sk-bounce3" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageLoader;
