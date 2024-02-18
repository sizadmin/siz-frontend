import OrdersDashboard from "./../../../assets/svgs/OrdersDashboard.svg";
import OrdersCompletedIcon from "./../../../assets/svgs/OrdersCompletedIcon.svg";
export const cardsData = [
  {
    title: "Total Orders",
    icon: OrdersDashboard,
    field: "",
    class: "totalOrdersCountStyle",
  },
  {
    title: "Orders Pending For Pickup",
    icon: OrdersDashboard,
    field: "",
    class: "pendingOrdersCountStyle",
  },
  {
    title: "Orders Completed",
    icon: OrdersCompletedIcon,
    field: "",
    class: "completedOrdersCountStyle",
  },
  {
    title: "Cancelled",
    icon: "",
    field: "",
    class: "cancelledOrdersCountStyle",
  },
];
