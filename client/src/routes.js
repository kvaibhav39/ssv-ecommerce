import { Navigate } from "react-router-dom";
import Layout from "./component/Layout/MainLayout";
import UsersListPage from "./pages/User/UsersListPage";
import Page404 from "./pages/Page404/Page404";
import CreateOrderPage from "./pages/Orders/CreateOrderPage";
import { OrderUpdateForm } from "./pages/Orders/CreateOrderPage";
import OrderListPage from "./pages/Orders/OrderListPage";
import UserDetailPage from "./pages/User/UserDetailPage";
import { routes } from "../src/constants";

const getRoutes = () => {
  return [
    {
      path: routes.homepage,
      element: <Layout />,
      children: [
        { path: routes.usersByPage, element: <UsersListPage /> },
        { path: routes.userDetail, element: <UserDetailPage /> },
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
