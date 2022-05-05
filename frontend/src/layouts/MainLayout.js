/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import './MainLayout.scss';

const MainLayout = ({ children }) => {

  return (
    <div style={{minHeight:'100%'}}>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
