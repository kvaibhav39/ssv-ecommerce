import { aboutIcon, dashboardIcon, userIcon } from "./icons";

export const routes = {
  homepage: "/",
  all: "*",

  // users: "/users",
  // usersByPage: "/users/page/:page_number",
  // userDetail: "/users/:id/:page_number",

  orders: "/orders",
  createOrder: "/orders/create",
  updateOrder: "/orders/update/:orderId",
};
export const sidebarLink = [
  {
    id: 2,
    linkClassName: "orders",
    linkTo: routes.orders,
    icon: aboutIcon,
    title: "Order",
  },
  // {
  //   id: 3,
  //   linkClassName: "users",
  //   linkTo: `${routes.users}/page/1`,
  //   icon: userIcon,
  //   title: "Users",
  // },
];
