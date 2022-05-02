import React from "react";
import { Outlet } from "react-router-dom";

import LandingPageHeader from "./Components/LandingPageHeader";

const User = () => {
    return (
        <React.Fragment>
            <div>

                {/* HEADER  */}
                <LandingPageHeader />
                {/* End  */}

                <Outlet />

            </div>
        </React.Fragment>
    )
}

export default User
