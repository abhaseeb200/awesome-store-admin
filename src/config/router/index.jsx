import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../../components/layout/index.jsx";
import Dashboard from "../../screens/dashboard/index.jsx";
import Login from "../../screens/login/index.jsx";
import OrderList from "../../screens/orderList/index.jsx";
import ProtectRoute from "../protectedRoute/index.jsx";
import OrderDetails from "../../screens/orderDetails/index.jsx";
import ProductList from "../../screens/productList/index.jsx";
import AddProduct from "../../screens/addProduct/index.jsx";
import PageNotFound from "../../screens/pageNotFound/index.jsx";
import ProductDetails from "../../screens/productDetails/index.jsx";

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
          <Route
            path="/orderlist/:paramsDocID"
            element={
              <Layout>
                <OrderDetails />
              </Layout>
            }
          />
          <Route
            path="/productlist"
            element={
              <Layout>
                <ProductList />
              </Layout>
            }
          />
          <Route
            path="/productlist/:productID"
            element={
              <Layout>
                <ProductDetails />
              </Layout>
            }
          />
          <Route
            path="/addProduct"
            element={
              <Layout>
                <AddProduct />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <PageNotFound />
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
