import React from "react";
import Nav from "./components/nav";
import RoutesPaths from "./NavbarRoutes";
import SidebarRoutes from "./SidebarRoutes";

function App() {
  return (
    <>
      <RoutesPaths />
      <SidebarRoutes />
    </>
  );
}

export default App;
