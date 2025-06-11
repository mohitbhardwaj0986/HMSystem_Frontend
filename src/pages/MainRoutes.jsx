import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "../auth/Login";
import Register from "../auth/Register";

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

      </Routes>
    </>
  );
}

export default MainRoutes;
