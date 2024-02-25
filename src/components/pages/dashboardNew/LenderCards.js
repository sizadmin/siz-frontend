// import OrdersDashboard from "./../../../assets/svgs/OrdersDashboard.svg";
// import OrdersCompletedIcon from "./../../../assets/svgs/OrdersCompletedIcon.svg";
export const LenderCards = [
  {
    id: 0,
    title: "Total Earning",
    class: "totalCount",
    field: "lendersShare",
    // icon: OrdersDashboard,
  },
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
    id: 3,
    title: "Completed Orders",
    class: "delivered",
    field: "completed",
    // icon: OrdersDashboard,
  },
  {
    id: 4,
    title: "Paid Orders",
    class: "delivered",
    field: "paid",
    // icon: OrdersCompletedIcon,
  },
  {
    id: 5,
    title: "Cancelled/Refunded Orders",
    class: "cancelled",
    field: "cancelled",
  },
];
