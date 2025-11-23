import { Route, Routes } from "react-router";
import "./App.css";
import Unauthorized from "./page/Unauthorized";
import Home from "./page/Home";
import RootLayouts from "./layoouts/RootLayouts";
import Login from "./page/Login";
import { Registration } from "./page/Registration";
import BookAppointment from "./page/BookAppointment";
import DoctorDetails from "./page/DoctorDetails";

import { useAuth } from "./contex/AuthContex";

import SettingsLayout from './layoouts/SettingsLayout';
import ProfileSettings from './page/ProfileSettings';
import AccountSettings from './page/AccountSettings';
import PreferenceSettings from './page/PreferenceSettings';
import NotificationSettings from './page/NotificationSettings';
import SecuritySettings from './page/SecuritySettings';

function App() {
  const { loading } = useAuth();

  return (
    <Routes>
      <Route element={<RootLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/doctor-details" element={<DoctorDetails />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        {/* Settings Route */}
        <Route path="setting" element={<SettingsLayout />}>
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="account" element={<AccountSettings />} />
          <Route path="preferences" element={<PreferenceSettings />} />
          <Route path="notifications" element={<NotificationSettings />} />
          <Route path="security" element={<SecuritySettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
