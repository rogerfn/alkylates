import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Navbar.scss';
import logo from './logo.png'; 
import userlogo from './user.png';
const Navbar = () => {


  const user = false;

  return (
    <div className="p-2 bg-sasol">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start main-bar">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none  logo-container "
          >
            <img className="logo" src={logo} />  
            <div className="logotype">ALKYLATES</div>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            
            <li>
              <Link
              to ="/"
              className="nav-link px-2">
              Home
              </Link>
            </li>

            <li>
              <Link
              to ="/inputs/"
              className="nav-link px-2">
              Inputs
              </Link>
            </li>

            <li>
              <Link
              to ="/help/"
              className="nav-link px-2">
              Help
              </Link>
            </li>
            

          
          </ul>
          

          <div className="dropdown text-end">
            <a
              href="#"
              className="d-block text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
               <img
                src={user && user.profile && user.profile.picture ? user.profile.picture : userlogo }
                width="40"
          className="rounded-circle me-1 img-thumbnail"
        />
            </a>
            <ul
              className="dropdown-menu text-small"
              aria-labelledby="dropdownUser1"
            >
              
              <li>
                <Link to="/logout" className="dropdown-item">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;
