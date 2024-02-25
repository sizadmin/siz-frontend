import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import React, { useEffect, useState } from "react";
import ApiService from "../../../utils/middleware/ApiService";
// import ModalPopup from "./modalPopup";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
import moment from "moment";
import styles from "./index.module.css";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import deleteIcon from "./../../../assets/imgs/deleteIcon.jpeg";
import OrderPopup from "./OrderPopup";

const OrdersTable = (props) => {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [propsData, setPropsData] = useState();
  const [orderDetailsStatus, setorderDetailsStatus] = useState({});
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const { userInfo } = useSelector((state) => state.user);

  const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
  const [userRole, setUserRole] = useState(
    userInfo?.loggedUser?.role?.role_name
  );

  const handleShowDetails = (user) => {
    setPropsData({
      product_delivery_date_to_lender:
        user?.order_status_extra?.[0]?.product_delivery_date_to_lender,
      ...user,
    });
    setShowCreateUserPopup(true);
  };

  return (
    <>
      {showCreateUserPopup && (
        <OrderPopup
          show={showCreateUserPopup}
          hide={() => setShowCreateUserPopup(false)}
          propsData={propsData}
          getOrders={props.getOrders}
          rolesData={props.rolesData}
          lendersData={props.lendersData}
          isNew={false}
        />
      )}
      <Table className={styles.tableShadow}>
        <Thead>
          <Tr>
            <Th
              colSpan="3"
              style={{
                textAlign: "center",
                background: "#DBEAFE",
                color: "#1E40AF",
                height: 50,
              }}
            >
              ORDER DETAILS
            </Th>
            <Th
              colSpan="3"
              style={{
                textAlign: "center",
                background: "#FCE7F3",
                color: "#9D174D",
                height: 50,
              }}
            >
              PICKUP
            </Th>
            <Th
              colSpan="3"
              style={{
                textAlign: "center",
                background: "#D1FAE5",
                color: "#1F2937",
                height: 50,
              }}
            >
              DELIVERY
            </Th>
          </Tr>
        </Thead>
        <Thead>
          {/* <Tr>
            <Th colSpan="3">New Order</Th>
            <Th colSpan="3">New Order2</Th>
            <Th colSpan="4">New Order3</Th>
          </Tr> */}
          <Tr style={{ color: "#6B7280", background: "#F9FAFB" }}>
            <Th style={{ width: 100, background: "#DBEAFE", color: "#1E40AF" }}>
              ORDER ID
            </Th>
            <Th
              style={{
                background: "#DBEAFE",
                color: "#1E40AF",
              }}
            >
              Brand
            </Th>
            <Th
              style={{
                background: "#DBEAFE",
                color: "#1E40AF",
              }}
            >
              STATUS
            </Th>
            <Th style={{ background: "#FCE7F3", color: "#9D174D" }}>
              PICKUP DATE
            </Th>

            {/* <Th>ITEM</Th> */}
            <Th style={{ background: "#FCE7F3", color: "#9D174D" }}>
              CUSTOMER NAME & PHONE NUMBER
            </Th>
            <Th style={{ background: "#FCE7F3", color: "#9D174D" }}>
              PICKUP ADDRESS
            </Th>
            {/* delivery block */}
            <Th style={{ background: "#D1FAE5", color: "#1F2937" }}>
              DELIVERY DATE
            </Th>
            <Th style={{ background: "#D1FAE5", color: "#1F2937" }}>
              CUSTOMER NAME & PHONE NUMBER
            </Th>
            <Th style={{ background: "#D1FAE5", color: "#1F2937" }}>
              DELIVERY ADDRESS
            </Th>

            <Th>PAYMENT STATUS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.data.length === 0 ? (
            <>
              <Tr>
                <Td colSpan="10">
                  <div className="w-100 text-center">No Orders Found</div>
                </Td>
              </Tr>
            </>
          ) : (
            <>
              {props.data.length > 0 &&
                props.data.map((order, i) => (
                  <React.Fragment key={i}>
                    <Tr
                      style={{ borderBottom: "1px solid #e7d9d9" }}
                      onClick={() => handleShowDetails(order)}
                    >
                      <Td>{order.order_number}</Td>
                      <Td>
                        {order?.order_items !== undefined &&
                          order?.order_items[0]?.vendor}
                      </Td>

                      <Td
                        style={{
                          whiteSpace: "nowrap",
                          fontSize: "small",
                          textTransform: "capitalize",
                        }}
                      >
                        {order.order_status === "fulfilled" && (
                          <span className={styles.orderStatusFullFilled}>
                            Pickup Pending
                          </span>
                        )}
                        {order.order_status === "delivered" && (
                          <span className={styles.orderStatusDelivered}>
                            Delivery Pending
                          </span>
                        )}
                        {order.order_status === "cancelled" && (
                          <span className={styles.orderStatusCancelled}>
                            Cancelled
                          </span>
                        )}
                        {order.order_status === "pickedup_drycleaner" && (
                          <span className={styles.orderStatusPickedUp}>
                            Picked Up
                          </span>
                        )}
                        {order.order_status === "completed" && (
                          <span className={styles.orderStatusCompleted}>
                            Delivered
                          </span>
                        )}
                      </Td>
                      <Td style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                        {order.pickup_by_dry_cleaner_from_renter !== "" &&
                        order.pickup_by_dry_cleaner_from_renter !== null
                          ? moment(
                              order.pickup_by_dry_cleaner_from_renter
                            ).format("DD-MMM-YY")
                          : "-"}
                      </Td>
                      {/* <Td style={{ fontSize: "small" }}>
                        {order.order_details.line_items
                          ? order.order_details.line_items.length
                          : "-"}
                      </Td> */}
                      <Td style={{ fontSize: "small" }}>
                        {order.order_details?.customer?.first_name}{" "}
                        {order.order_details?.customer?.last_name}
                        <br />
                        <i>{order?.order_details?.phone}</i>
                      </Td>
                      <Td style={{ fontSize: "small" }}>
                        {order?.order_details?.customer?.default_address &&
                          order?.order_details?.customer?.default_address
                            .address1}{" "}
                        {order?.order_details?.customer?.default_address &&
                          order?.order_details?.customer?.default_address
                            .address2}{" "}
                        {order?.order_details?.customer?.default_address &&
                          order?.order_details?.customer?.default_address
                            .city}{" "}
                        {order?.order_details?.customer?.default_address &&
                          order?.order_details?.customer?.default_address
                            .country_name}{" "}
                      </Td>
                      <Td style={{ fontSize: "small" }}>
                        <span>
                          {order?.order_status_extra?.[0]
                            ?.product_delivery_date_to_lender
                            ? moment(
                                order?.order_status_extra?.[0]
                                  ?.product_delivery_date_to_lender
                              ).format("MM/DD/YYYY")
                            : "-"}
                        </span>
                      </Td>
                      <Td>
                        
                      </Td>
                      <Td style={{ fontSize: "small" }}>
                        {order?.lender_address ? order?.lender_address : "-"}
                      </Td>

                      
                      <Td style={{ fontSize: "small" }}>
                        {order.drycleaner_payment === true ? "Paid" : "Un-paid"}
                      </Td>
                    </Tr>
                  </React.Fragment>
                ))}
            </>
          )}
        </Tbody>
      </Table>
    </>
  );
};

export { OrdersTable };
