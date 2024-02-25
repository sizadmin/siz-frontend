import OrdersDashboard from "./../../../assets/svgs/OrdersDashboard.svg";
import OrdersCompletedIcon from "./../../../assets/svgs/OrdersCompletedIcon.svg";
export const cardsData = [
  {
    id: 0,
    title: "Total Orders",
    class: "totalCount",
    field: "total",
    // icon: OrdersDashboard,
  },
  {
    id: 1,
    title: "Pending For Pickup",
    class: "pendingCount",
    field: "fulfilled",
    // icon: OrdersDashboard,
  },
  {
    id: 2,
    title: "Picked Up",
    class: "pickedUp",
    field: "pickedup_drycleaner",
    // icon: OrdersDashboard,
  },
  {
    id: 3,
    title: "Pending For Delivery",
    class: "pendingDelivery",
    field: "pickedup_drycleaner",
    // icon: OrdersDashboard,
  },
  {
    id: 4,
    title: "Delivered",
    class: "delivered",
    field: "completed",
    // icon: OrdersCompletedIcon,
  },
  {
    id: 5,
    title: "Cancelled",
    class: "cancelled",
    field: "cancelled",
  },
];
