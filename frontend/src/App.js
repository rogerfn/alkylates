import React from "react";
import MainLayout from "./layouts/MainLayout";
import Inputs from "./containers/inputs/Inputs";
import Home from "./containers/home/Home";
import Login from "./containers/login/Login";
import Logout from "./containers/login/Logout";

import ProtectedRoute from "./components/routes/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/logout" element={<Logout />}></Route>

        <Route path="/" element={
          <ProtectedRoute user={isAuthenticated}>
           <MainLayout>
              <Home />
            </MainLayout>
          </ProtectedRoute>
        
        } />

        <Route path="/inputs" element={
          <ProtectedRoute user={isAuthenticated}>
            <MainLayout>
              <Inputs />
            </MainLayout>
          </ProtectedRoute>
        
        } />



      </Routes>
    </Router>
  );
}

export default App;
