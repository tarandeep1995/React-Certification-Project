import React, { useState } from "react";
import "../Styles/Login.css";
import { Navigate } from "react-router-dom";

const Login = ({ setLogin }) => {
  // State variables to manage name, password, and login success
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); //  state to track login success

  // Event handler for updating the name
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Event handler for updating the password
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for handling the login button click
  const handleLogin = (e) => {
    if (name === password) {
      // If the username and password match, set login success state to true
      sessionStorage.setItem("isLogin", true);
      setLoginSuccess(true);
      setLogin(true); // Update the 'setLogin' state in the parent component
      alert("Login Successful");
    } else {
      // If the username and password do not match, show an alert
      alert("Please enter valid credentials!");
    }
  };

  // JSX structure for the Login component
  return (
    <main className="container">
      {loginSuccess && <Navigate to="/orders" />}{" "}
      {/* Redirect to "/orders" if loginSuccess is true */}
      <div>
        <div className="fromDesign" method="post">
          <h1 className="heading">Sign In</h1>
          <input
            type="text"
            name="userName"
            id="userName"
            value={name}
            onChange={handleName}
            placeholder="Enter Username"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            placeholder="Enter Password"
          />
          <input type="submit" onClick={handleLogin} value="Login" />
        </div>
      </div>
    </main>
  );
};

export default Login;
