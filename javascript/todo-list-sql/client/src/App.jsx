import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AllTasks from "./views/AllTasks";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/all-tasks" element={<AllTasks />} />
        <Route path="*" element={<Navigate replace to="/all-tasks" />} />
      </Routes>
    </Router>
  );
}