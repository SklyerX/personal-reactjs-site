import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./index.scss";
import General from "./Pages/General/General";
import Projects from "./Pages/Projects/Projects";
import Skills from "./Pages/Skills/Skills";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/general"
          element={
            <>
              <Navbar />
              <Sidebar />
              <General />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <Sidebar />
              <Projects />
            </>
          }
        />
        <Route
          path="/skills"
          element={
            <>
              <Navbar />
              <Sidebar />
              <Skills />
            </>
          }
        />
        <Route path="/*" element={<Navigate to="/general" />} />
      </Routes>
    </Router>
  );
}

export default App;
