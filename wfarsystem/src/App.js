
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom";

import User from './User';
import Admin from './Admin';
import ACDH from './ACDH';
import Faculty from './Faculty';

import LandingPage from "./Pages/LandingPage";
import UserSignIn from './Pages/UserSignIn';
import UserSignUp from './Pages/UserSignUp';

import FacultyHome from "./Pages/Faculty/FacultyHome";
import FacultyProfile from "./Pages/Faculty/FacultyProfile";
import FacultyNotifications from "./Pages/Faculty/FacultyNotifications";
import FacultyArchives from "./Pages/Faculty/FacultyArchives";
import FacultyUpload from "./Pages/Faculty/FacultyUpload";
import FacultyOwnSubmissions from "./Pages/Faculty/FacultyOwnSubmissions";
import FacultyIndividualView from "./Pages/Faculty/FacultyIndividualView";

import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminRegister from "./Pages/Admin/AdminRegister";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminAccountRequest from "./Pages/Admin/AdminAccountRequest";
import AdminAllWfarSubmissions from "./Pages/Admin/AdminAllWfarSubmissions";
import AdminFacultyAssignment from "./Pages/Admin/AdminFacultyAssignment";
import AdminIndividualFaculty from "./Pages/Admin/AdminIndividualFaculty";
import AdminManageContents from "./Pages/Admin/AdminManageContents";
import AdminNotifications from "./Pages/Admin/AdminNotifications";
import AdminProfile from "./Pages/Admin/AdminProfile";
import AdminPromoteDemote from "./Pages/Admin/AdminPromoteDemote";
import AdminReport from "./Pages/Admin/AdminReport";
import AdminWfarIndividualView from "./Pages/Admin/AdminWfarIndividualView";

import ACDHAccountRequest from "./Pages/ACDH/ACDHAccountRequest";
import ACDHAllHandle from "./Pages/ACDH/ACDHAllHandle";
import ACDHArchives from "./Pages/ACDH/ACDHArchives";
import ACDHDashboard from "./Pages/ACDH/ACDHDashboard";
import ACDHHandleWfarView from "./Pages/ACDH/ACDHHandleWfarView";
import ACDHIndividualHandle from "./Pages/ACDH/ACDHIndividualHandle";
import ACDHNotifications from "./Pages/ACDH/ACDHNotifications";
import ACDHOwnSubmissions from "./Pages/ACDH/ACDHOwnSubmissions";
import ACDHOwnWfarView from "./Pages/ACDH/ACDHOwnWfarView";
import ACDHProfile from "./Pages/ACDH/ACDHProfile";
import ACDHReport from "./Pages/ACDH/ACDHReport";
import ACDHUpload from "./Pages/ACDH/ACDHUpload";

import PageLoader from "./Components/PageLoader";
import TopHeader from './Components/TopHeader';
import ACDHMainHeader from './Components/AcdhMainHeader';
import FacultyMainHeader from './Components/FacultyMainHeader';
import AdminMainHeader from './Components/AdminMainHeader';
import ACDHSidebar from './Components/AcdhSidebar';
import AdminSidebar from './Components/AdminSidebar';
import FacultySidebar from './Components/FacultySidebar';
import Wfarbanner from "./Components/WfarBanner";
import Wfarupload from "./Components/WfarUpload";
import Footer from "./Components/Footer";
import Vmgo from "./Components/Vmgo";
import Announcement from "./Components/Announcement";
import FeaturesSlider from "./Components/FeaturesSlider";
import ProfileOverview from "./Components/ProfileOverview";
import ProfileSettings from "./Components/ProfileSettings";
import YearSemSelection from "./Components/YearSemSelection";
import SubmissionCard from "./Components/SubmissionCard";
import ACDHSubmissionCard from "./Components/AcdhSubmissionCard";
import FacultySubmissionCard from "./Components/FacultySubmissionCard";
import Notificationsbanner from "./Components/NotificationsBanner";
import Archivesbanner from "./Components/ArchivesBanner";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} >
          <Route index element={<LandingPage />} />
          <Route path="/UserSignIn" element={<UserSignIn />} />
          <Route path="/UserSignUp" element={<UserSignUp />} />
        </Route>

        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminRegister" element={<AdminRegister />} />

        <Route path="/" element={<Admin />} >
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/AdminAccountRequest" element={<AdminAccountRequest />} />
          <Route path="/AdminAllWfarSubmissions" element={<AdminAllWfarSubmissions />} />
          <Route path="/AdminFacultyAssignment" element={<AdminFacultyAssignment />} />
          <Route path="/AdminIndividualFaculty" element={<AdminIndividualFaculty />} />
          <Route path="/AdminManageContents" element={<AdminManageContents />} />
          <Route path="/AdminNotifications" element={<AdminNotifications />} />
          <Route path="/AdminProfile" element={<AdminProfile />} />
          <Route path="/AdminPromoteDemote" element={<AdminPromoteDemote />} />
          <Route path="/AdminReport" element={<AdminReport />} />
          <Route path="/AdminWfarIndividualView" element={<AdminWfarIndividualView />} />
        </Route>

        <Route path="/" element={<Faculty />} >
          <Route path="/Faculty" element={<FacultyHome />} />
          <Route path="/FacultyProfile" element={<FacultyProfile />} />
          <Route path="/FacultyNotifications" element={<FacultyNotifications />} />
          <Route path="/FacultyArchives" element={<FacultyArchives />} />
          <Route path="/FacultyOwnSubmissions" element={<FacultyOwnSubmissions />} />
          <Route path="/FacultyUpload" element={<FacultyUpload />} />
          <Route path="/FacultyIndividualView" element={<FacultyIndividualView />} />
        </Route>

        <Route path="/" element={<ACDH />} >
          <Route path="/ACDH" element={<ACDHDashboard />} />
          <Route path="/ACDHAccountRequest" element={<ACDHAccountRequest />} />
          <Route path="/ACDHAllHandle" element={<ACDHAllHandle />} />
          <Route path="/ACDHArchives" element={<ACDHArchives />} />
          <Route path="/ACDHHandleWfarView" element={<ACDHHandleWfarView />} />
          <Route path="/ACDHIndividualHandle" element={<ACDHIndividualHandle />} />
          <Route path="/ACDHNotifications" element={<ACDHNotifications />} />
          <Route path="/ACDHOwnSubmissions" element={<ACDHOwnSubmissions />} />
          <Route path="/ACDHOwnWfarView" element={<ACDHOwnWfarView />} />
          <Route path="/ACDHProfile" element={<ACDHProfile />} />
          <Route path="/ACDHReport" element={<ACDHReport />} />
          <Route path="/ACDHUpload" element={<ACDHUpload />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
