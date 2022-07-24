import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/esm/Spinner";
import Dashboard from "../../views/Dashboard";
import NavbarMenu from "../layout/NavbarMenu";
import About from "../../views/About";

export default function ProtectedRoute({ element: Component, ...rest }) {
  const {
    authState: { isAuthenticated, authLoading },
  } = useContext(AuthContext);
  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  return isAuthenticated ? (
    <>
      <NavbarMenu />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}
