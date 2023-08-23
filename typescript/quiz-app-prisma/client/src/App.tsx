import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./views/Home";
import Questions from "./views/Questions";

// Main component of the application
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />

        {/* Route for the questions page */}
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Router>
  );
}
