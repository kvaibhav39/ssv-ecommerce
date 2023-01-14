import { Navigate } from "react-router-dom";
import Layout from "./component/Layout/MainLayout";
import Page404 from "./pages/Page404/Page404";
import CreateOrderPage from "./pages/Orders/CreateOrderPage";
import { OrderUpdateForm } from "./pages/Orders/CreateOrderPage";
import OrderListPage from "./pages/Orders/OrderListPage";
import { routes } from "../src/constants";

const getRoutes = () => {
  return [
    {
      path: routes.homepage,
      element: <Layout />,
      children: [
        { path: routes.orders, element: <OrderListPage /> },
        { path: routes.createOrder, element: <CreateOrderPage /> },
        { path: routes.updateOrder, element: <OrderUpdateForm /> },
        {
          path: routes.homepage,
          element: <Navigate to={routes.orders} />,
        },
      ],
    },
    {
      path: "",
      element: <Page404 />,
      children: [{ path: "*", element: <Page404 /> }],
    },
  ];
};

export default getRoutes;
