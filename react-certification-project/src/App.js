import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import Orders from "./Components/Orders";
import Product from "./Components/Product";
import Users from "./Components/Users";

const App = () => {
  const isLoggedIn = sessionStorage.getItem("isLogin");
  const [login, setLogin] = useState(false);

  return (
    <Router>
      <NavBar login={login} setLogin={setLogin} />
      <Routes>
        <Route path="/login" element={<Login setLogin={setLogin} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Product />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/*"
          element={
            !isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/orders" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
