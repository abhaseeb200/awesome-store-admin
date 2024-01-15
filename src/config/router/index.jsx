import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../../components/layout/index.jsx";
import Dashboard from "../../screens/dashboard/index.jsx";
import Login from "../../screens/login/index.jsx";
import ProtectRoute from "../protectedRoute/index.jsx";
import PageNotFound from "../../screens/pageNotFound/index.jsx";
import CategoryList from "../../screens/categories/index.jsx";
import OrderList from "../../screens/orders/orderList.jsx";
import OrderDetails from "../../screens/orders/orderDetails.jsx";
import ProductList from "../../screens/products/productList.jsx";
import ProductEditor from "../../screens/products/productEditor.jsx";

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
            path="/orders"
            element={
              <Layout>
                <OrderList />
              </Layout>
            }
          />
          <Route
            path="/orders/:paramsDocID"
            element={
              <Layout>
                <OrderDetails />
              </Layout>
            }
          />
          <Route
            path="products"
            element={
              <Layout>
                <ProductList />
              </Layout>
            }
          >
            <Route
              path="create"
              element={
                <Layout>
                  <ProductEditor />
                </Layout>
              }
            />
          </Route>
          <Route
            path="/categories"
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
