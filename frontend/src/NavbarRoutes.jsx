import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Homolog from "./pages/homolog";
import Lab from "./pages/lab";

function RoutesPaths() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />

      <Route path="/homolog" element={<Homolog />} />

      <Route path="/lab" element={<Lab />} />
    </Routes>
  );
}

export default RoutesPaths;
