import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<Auth authRoute="login" />} />
        <Route exact path="/register" element={<Auth authRoute="register" />} />
        <Route exact path="/*" element={<ProtectedRoute />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
