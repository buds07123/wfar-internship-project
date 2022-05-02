import React from 'react';

const TopHeader = () => {
    return (
        <React.Fragment>
            {/* Top Header */}
            <div className="nav-header">
                <a href="javascript:void(0)" className="brand-logo">
                    <img src="assets/img/CICT.png" alt="Logo" />
                    <div className="brand-title">
                    <h2 className="h2">WFAR</h2>
                    </div>
                </a>
                <div className="nav-control">
                    <div className="hamburger">
                    <span className="line" /><span className="line" /><span className="line" />
                    </div>
                </div>
                </div>
        </React.Fragment>
    );
}

export default TopHeader;
