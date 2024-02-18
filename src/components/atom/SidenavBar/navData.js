import DashboardIcon from "./../../../assets/svgs/Dashboard_icon.svg";
import OrdersIcon from "./../../../assets/svgs/Order.svg";
import UsersIcon from "./../../../assets/svgs/Users.svg";

export const navData = [
  {
    id: 0,
    icon: DashboardIcon,
    text: "Dashboard",
    link: "/dashboard",
    class:''
  },
  {
    id: 1,
    icon: OrdersIcon,
    text: "Orders",
    link: "/orders",
    class:''
  },
  {
    id: 2,
    icon: UsersIcon,
    text: "Users",
    link: "/users",
    class:'UsersIcon'
  },
//   {
//     id: 3,
//     icon: DashboardIcon,
//     text: "New Dashboard",
//     link: "/dashboardNew",
//     class:''
//   },
];
