import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/nav.css";
import { FaBars } from "react-icons/fa";
import { MenuItems } from "./navMenu";
import Sidebar from "./sidebar";

function Nav() {
  return (
    <div className="navbar__container">
      <nav className="navbar__items">
        <h1 className="navbar__logo">Sasol</h1>

        <ul className="navbar__menu">
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={item.link} className={item.cName}>
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
