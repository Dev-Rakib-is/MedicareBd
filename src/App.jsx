import { Route, Routes } from "react-router";
import "./App.css";
import Unauthorized from "./page/unauthorized";
import Home from "./page/Home";
import RootLayouts from "./layoouts/RootLayouts";

function App() {
  return (
    <Routes>
      <Route element={<RootLayouts />}>
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}

export default App;
