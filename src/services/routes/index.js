import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../../Pages/Login";
import DebtList from "../../Pages/DebtList";
const PageRoutes = () => {
  return (
    <Router>
        <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="debtlist" element={<DebtList />} />
        </Routes>
    </Router>
  )
};

export default PageRoutes;
