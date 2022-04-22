import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Page1 from "./pages/home/Commodities/Page1";
import Page2 from "./pages/home/Commodities/Page2";
import Page3 from "./pages/home/Commodities/Page3";
import Page4 from "./pages/home/Commodities/Page4";
import Page5 from "./pages/home/Commodities/Page5";

function SidebarRoutes() {
  return (
    <>
      <Routes>
        <Route path="/home/page1" element={<Page1 />} />

        <Route path="/home/page2" element={<Page2 />} />

        <Route path="/home/page3" element={<Page3 />} />
        <Route path="/home/page4" element={<Page4 />} />
        <Route path="/home/page5" element={<Page5 />} />
      </Routes>
    </>
  );
}

export default SidebarRoutes;
