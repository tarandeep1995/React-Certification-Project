import React from "react";
import Logo from "../Utils/logo.png";
import { NavLink } from "react-router-dom";

const NavBar = ({ login, setLogin }) => {
  // Event handler for handling the login/logout action
  const handleLogin = () => {
    sessionStorage.setItem("isLogin", false); // Set 'isLogin' to false in sessionStorage
    setLogin(false); // Update the 'setLogin' state in the parent component
  };

  return (
    <header>
      <div className="navBar">
        <div className="navBarLeft">
          <div className="logo">
            <img src={Logo} alt="Logo" />
            <p className="brandName">Kafene</p>
          </div>
          <nav>
            <NavLink className="navMenu" to="/orders">
              Orders
            </NavLink>
            <NavLink className="navMenu" to="/products">
              Products
            </NavLink>
            <NavLink className="navMenu" to="/users">
              Users
            </NavLink>
          </nav>
        </div>
        {/* Login/Logout link */}
        <NavLink className="navBarRight" to="/login" onClick={handleLogin}>
          {login === true ? "Logout" : "Login"}
        </NavLink>
      </div>
    </header>
  );
};

export default NavBar;
