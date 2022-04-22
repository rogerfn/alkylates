import React from "react";
import HomeTabs from "../components/HomeTabs";
import Nav from "../components/nav";
import Sidebar from "../components/sidebar";
import "../styles/home.css";

function Home() {
  return (
    <div className="header__">
      <Nav />
      <Sidebar />
      <div className="home__tabsContainer">
        <HomeTabs />
      </div>
    </div>
  );
}

export default Home;
