import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../../screens/dashboard/index.jsx";
import Login from "../../screens/login/index.jsx";
import OrderList from "../../screens/orderList/index.jsx";
import Layout from "../../components/layout/index.jsx";
import ProtectRoute from "../protectedRoute/index.jsx";

const Main = () => {

  return (
    <Router>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/orderlist"
            element={
              <Layout>
                <OrderList />
              </Layout>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Main;
