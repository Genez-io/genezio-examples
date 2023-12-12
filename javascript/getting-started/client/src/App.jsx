import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AllTasks from "./views/AllTasks";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AllTasks />}
        />
      </Routes>
    </Router>
  );
}
