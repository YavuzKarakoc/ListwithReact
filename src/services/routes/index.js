import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../../Pages/Login";
import DebtList from "../../Pages/DebtList";
const PageRoutes = () => {
  // const [token, setToken] = useState("");
  // // const  token = localStorage.getItem('token');
  // useEffect(() => {
  //   console.log(token);
  // }, []);

  // function RequireUserAuth({ children }) {
  //   setToken(localStorage.getItem("token"));
  //   if (!token) {
  //     return <Navigate to="/" replace />;
  //   }
  //   return children;
  // }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/debtlist" element={<DebtList />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
