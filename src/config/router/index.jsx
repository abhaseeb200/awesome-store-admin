import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
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
import Orders from "../../screens/orders/index.jsx";
import Products from "../../screens/products/index.jsx";
import Error from "../../screens/error/index.jsx";

const Main = () => {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     errorElement: <PageNotFound />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <Dashboard />,
  //       },
  //       {
  //         path: "orders",
  //         element: <OrderList />,
  //       },
  //       {
  //         path: "orders/:paramsDocID",
  //         element: <OrderDetails />,
  //       },
  //       {
  //         path: "products",
  //         element: <ProductList />,
  //       },
  //       {
  //         path: "products/create",
  //         element: <ProductEditor />,
  //       },
  //       {
  //         path: "products/:productID/edit",
  //         element: <ProductEditor />,
  //       },
  //       {
  //         path: "categories",
  //         element: <CategoryList />,
  //       },
  //     ],
  //   },
  //   {
  //     path: "login",
  //     element: <Login />,
  //   },w
  // ]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />} errorElement={<Error />}>
          <Route element={<ProtectRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />}>
              <Route index element={<OrderList />} />
              <Route path=":id" element={<OrderDetails />} />
            </Route>
            <Route path="products" element={<Products />}>
              <Route index element={<ProductList />} />
              <Route path="create" element={<ProductEditor />} />
              <Route path=":id/update" element={<ProductEditor />} />
            </Route>
            <Route path="categories" element={<CategoryList />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default Main;
