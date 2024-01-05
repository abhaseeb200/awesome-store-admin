import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../../components/layout/index.jsx";
import Dashboard from "../../screens/dashboard/index.jsx";
import Login from "../../screens/login/index.jsx";
import OrderList from "../../screens/orderList/index.jsx";
import ProtectRoute from "../protectedRoute/index.jsx";
import OrderDetails from "../../screens/orderDetails/index.jsx";
import ProductList from "../../screens/productList/index.jsx";
import PageNotFound from "../../screens/pageNotFound/index.jsx";
import ProductEditor from "../../screens/productEditor/index.jsx";
import CategoryList from "../../screens/categoryList/index.jsx";

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
            path="/productEditor"
            element={
              <Layout>
                <ProductEditor />
              </Layout>
            }
          />
          <Route
            path="/productEditor/:productID"
            element={
              <Layout>
                <ProductEditor />
              </Layout>
            }
          />
          <Route
            path="/categoryList"
            element={
              <Layout>
                <CategoryList />
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
