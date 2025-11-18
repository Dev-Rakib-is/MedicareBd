import { Route, Routes } from "react-router";
import "./App.css";
import Unauthorized from "./page/Unauthorized";
import Home from "./page/Home";
import RootLayouts from "./layoouts/RootLayouts";
import Login from "./page/Login";
import { Registration } from "./page/Registration";
import BookAppointment from "./page/BookAppointment";
import DoctorDetails from "./page/DoctorDetails";

function App() {
  return (
    <Routes>
      <Route element={<RootLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/doctor-details" element={<DoctorDetails />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Route>
    </Routes>
  );
}

export default App;
