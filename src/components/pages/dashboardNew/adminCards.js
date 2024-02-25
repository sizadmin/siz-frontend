import OrdersDashboard from "./../../../assets/svgs/OrdersDashboard.svg";
import OrdersCompletedIcon from "./../../../assets/svgs/OrdersCompletedIcon.svg";
export const AdminCardsData = [
  {
    id: 0,
    title: "Total Orders",
    class: "totalCount",
    field: "total",
    // icon: OrdersDashboard,
  },
  {
    id: 1,
    title: "Pending Orders",
    class: "pendingCount",
    field: "new_order",
    // icon: OrdersDashboard,
  },
  {
    id: 2,
    title: "Fulfilled Orders",
    class: "pickedUp",
    field: "fulfilled",
    // icon: OrdersDashboard,
  },
  {
    id: 3,
    title: "Cancelled Orders",
    class: "cancelled",
    field: "cancelled",
  },
  {
    id: 4,
    title: "Dry Cleaner Unpaid Orders",
    class: "unpaid",
    field: "unpaid",
  },
  {
    id: 5,
    title: "Drycleaner Pending For Pickup",
    class: "pendingDelivery",
    field: "pickedup_drycleaner",
    // icon: OrdersDashboard,
  },
  {
    id: 6,
    title: "Delivered",
    class: "delivered",
    field: "completed",
    // icon: OrdersCompletedIcon,
  },
];
