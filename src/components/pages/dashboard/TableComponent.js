import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import React, { useEffect, useState } from "react";
import ApiService from "../../../utils/middleware/ApiService";
import ModalPopup from "./modalPopup";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
import moment from "moment";
import styles from "./index.module.css";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
const OrderTable = (props) => {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [propsData, setPropsData] = useState();
  const [orderDetailsStatus, setorderDetailsStatus] = useState({});
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const { userInfo } = useSelector((state) => state.user);
  const [userRole, setUserRole] = useState(
    userInfo?.loggedUser?.role?.role_name
  );

  const handleShowDetails = (order) => {
    setPropsData({
      order_id: order.order_id,
      shopify_order_number: order.order_number,
      order: order,
    });
    setShowDetailsPopup(true);
  };

  const handleCheckboxChange = (orderid) => {
    ApiService.get("/v1/updateToLenderAboutPayment/" + orderid, {}, null);
  };

  const calculateDays = (start, end) => {
    let a = moment(start, "YYYY-MM-DD");
    let b = moment(end, "YYYY-MM-DD");
    //Difference in number of days
    let days = moment.duration(b.diff(a)).asDays();
    return isNaN(days) ? 1 : days;
  };

  const areTodaysDate = (date2) => {
    // const today = moment("2023-11-16"); // current date
    // const next3days = moment("2023-11-16T00:00:00").add(3, "days");
    const today = moment(); // current date
    const next3days = moment().add(3, "days");
    const checkDate = moment(date2);
    const isBetween = checkDate.isBetween(today, next3days);
    if (date2 === undefined) return;
    if (moment(today).isSame(date2, "day") === true) return "#74b074";
    else if (isBetween === true) return "#dfdf58";
  };

  const getOrderDetailsStatus = (productId) => {
    console.log("Get order id : ", productId);
    ApiService.get("/v1/order-status/" + productId, {}, {}, (res, err) => {
      // console.log(res);
      if (res !== null) {
        setorderDetailsStatus(res.data[0]);
        let payload = {
          orderID: res.data[0]?.orderID,
          return_picked_up: "true",
          product_pickup_date: res.data[0]?.product_pickup_date || "",
          product_delivery_date: res.data[0]?.product_delivery_date || "",
          notes: "",
          _id: res.data[0]?._id || "",
          product_pickup_timeslot: res.data[0]?.product_pickup_timeslot || null,
          product_delivery_timeslot:
            res.data[0]?.product_delivery_timeslot || null,
          product_pickup_date_from_renter:
            res.data[0]?.product_pickup_date_from_renter || null,
          product_pickup_timeslot_from_renter:
            res.data[0]?.product_pickup_timeslot_from_renter || null,
        };
        // console.log("Payload ", payload);
        ApiService.post("/v1/order-status/" + productId, payload, null);
        return res;
      } else {
        console.log(err);
      }
    });
  };
  const updateStatus = async (orderid) => {
    let payload = {
      orderID: orderid,
      return_picked_up: "true",
      product_pickup_date: orderDetailsStatus?.product_pickup_date || "",
      product_delivery_date: orderDetailsStatus?.product_delivery_date || "",
      notes: "",
      _id: orderDetailsStatus?._id || "",
      product_pickup_timeslot:
        orderDetailsStatus?.product_pickup_timeslot || null,
      product_delivery_timeslot:
        orderDetailsStatus?.product_delivery_timeslot || null,
      product_pickup_date_from_renter:
        orderDetailsStatus?.product_pickup_date_from_renter || null,
      product_pickup_timeslot_from_renter:
        orderDetailsStatus?.product_pickup_timeslot_from_renter || null,
    };
    // console.log("Payload ", payload);
    ApiService.post("/v1/order-status/" + orderid, payload, null);
  };

  const renderDeliveryDate = (order) => {
    if (order.order_status_extra != null) {
      if (order.order_status_extra.product_delivery_date != null) {
        const deliveryDate = moment(
          order?.order_status_extra?.[0]?.product_delivery_date
        );
        const isToday = deliveryDate.isSame(moment(), "day");
        return (
          <span className={isToday ? "highlighted-date" : ""}>
            {deliveryDate.format("DD-MMM-YYYY")}
          </span>
        );
      } else if (order.rental_start_date != null) {
        const rentalStartDate = moment(order?.rental_start_date);
        const isToday = rentalStartDate.isSame(moment(), "day");
        return (
          <span className={isToday ? "highlighted-date" : ""}>
            {rentalStartDate.format("DD-MMM-YYYY")}
          </span>
        );
      } else {
        return "-";
      }
    }
  };
  const renderProductPickupDateFromRenter = (order) => {
    if (order.order_status_extra != null) {
      if (order.order_status_extra.product_pickup_date_from_renter != null) {
        return moment(
          order?.order_status_extra?.[0]?.product_pickup_date_from_renter
        ).format("DD-MMM-YYYY");
      } else if (order.rental_end_date != null) {
        return moment(order?.rental_end_date).format("DD-MMM-YYYY");
      } else {
        return "-";
      }
    }
  };
  const highlightPickupColumn = (order) => {
    if (order.order_status_extra != null) {
      if (order.order_status_extra.product_pickup_date_from_renter != null) {
        return areTodaysDate(
          order?.order_status_extra?.[0]?.product_pickup_date_from_renter
        );
      } else if (order.rental_end_date != null) {
        return areTodaysDate(order?.rental_end_date);
      }
    }
  };

  const renderStatus = (order) => {
    // return <div className={styles.Completed}></div>
  };

  return (
    <>
      {/* {showLoader && <ActivityLoader show={showLoader} />} */}

      {showDetailsPopup && (
        <ModalPopup
          show={showDetailsPopup}
          hide={() => setShowDetailsPopup(false)}
          propsData={propsData}
          getOrders={props.getOrders}
        />
      )}

      <div style={{ overflow: "auto", width: "180%", height: 520 }}>
        <Table className={styles.tableShadow}>
          <Thead>
            <Tr style={{ color: "#6B7280", background: "#F9FAFB" }}>
              <Th
                colSpan="10"
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
                colSpan="2"
                style={{
                  textAlign: "center",
                  background: "#FCE7F3",
                  color: "#9D174D",
                  height: 50,
                }}
              >
                RENTER DETAILS
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
                LENDER DETAILS
              </Th>
              <Th
                colSpan="5"
                style={{
                  textAlign: "center",
                  //  background: "#FCE7F3",
                  color: "#1F2937",
                  height: 50,
                }}
              >
                PAYMENT DETAILS
              </Th>
            </Tr>
          </Thead>
          <Thead>
            <Tr>
              {/* <Th style={{ width: 40 }}>#</Th> */}
              <Th
                style={{ background: "#DBEAFE", color: "#1E40AF", width: 150 }}
              >
                RENTAL START DATE
              </Th>
              <Th
                style={{ background: "#DBEAFE", color: "#1E40AF", width: 150 }}
              >
                RENTAL END DATE
              </Th>
              <Th
                className="cursor"
                onClick={() =>
                  props.changeSort(
                    props.sortOrderByOrder === "-order_number"
                      ? "order_number"
                      : "-order_number"
                  )
                }
                style={{ background: "#DBEAFE", color: "#1E40AF", width: 70 }}
              >
                ORDER NUMBER
                <br />
                {props.sortOrderByOrder === "-order_number" ? (
                  <i style={{ fontSize: 24 }} className="fa fa-sort-down"></i>
                ) : (
                  <i style={{ fontSize: 24 }} className="fa fa-sort-up"></i>
                )}
              </Th>
              <Th style={{ background: "#DBEAFE", color: "#1E40AF",width:180 }}>
                ORDER STATUS
              </Th>
              <Th style={{ background: "#DBEAFE", color: "#1E40AF" }}>BRAND</Th>
              <Th style={{ background: "#DBEAFE", color: "#1E40AF" }}>ITEM</Th>
              <Th style={{ background: "#DBEAFE", color: "#1E40AF" }}>SIZE</Th>
              <Th style={{ background: "#DBEAFE", color: "#1E40AF" }}>COLOR</Th>
              <Th style={{ background: "#DBEAFE", color: "#1E40AF" }}>
                ORDER TYPE
              </Th>
              <Th style={{ background: "#DBEAFE", color: "#1E40AF" }}>
                DURATION
              </Th>

              <Th style={{ background: "#FCE7F3", color: "#9D174D" }}>
                RENTER NAME & PHONE
              </Th>
              <Th style={{ background: "#FCE7F3", color: "#9D174D" }}>
                RENTER ADDRESS
              </Th>
              {/* <Th>Product Details</Th> */}
              <Th style={{ background: "#D1FAE5", color: "#1F2937" }}>
                LENDER NAME & PHONE
              </Th>
              <Th style={{ background: "#D1FAE5", color: "#1F2937" }}>
                LENDER ADDRESS
              </Th>
              <Th style={{ background: "#D1FAE5", color: "#1F2937" }}>
                DELIVERY TO LENDER
              </Th>

              {/* <Th>Pickup From Lender</Th>

              <Th>Order Date</Th>
              
              <Th>Date of Fitting</Th>
              <Th>Pick up by dry cleaner from renter</Th>
              <Th>Return date by dry cleaner to lender</Th>
              <Th>Return to Lender</Th> */}
              <Th>RENTAL FEES</Th>
              <Th>EXPENSES</Th>
              <Th>LENDER'S SHARE</Th>
              <Th>PROFIT</Th>
              <Th>PAYMENT STATUS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.data.length === 0 ? (
              <>
                <Tr>
                  <Td colSpan="10">
                    <div className="text-center">No Orders Found</div>
                  </Td>
                </Tr>
              </>
            ) : (
              <>
                {props?.data?.length > 0 &&
                  props?.data?.map((order, i) => (
                    <React.Fragment key={i}>
                      <Tr
                        style={{
                          borderBottom: "1px solid #e7d9d9",
                          cursor: "pointer",
                        }}
                        onClick={() => handleShowDetails(order)}
                      >
                        <Td
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: "small",
                            background: areTodaysDate(order?.rental_start_date),
                          }}
                        >
                          {
                            <>
                              <span>{renderDeliveryDate(order)}</span>
                              <br />
                              <span>
                                {
                                  order?.order_status_extra?.[0]
                                    ?.product_delivery_timeslot
                                }
                              </span>
                            </>
                          }
                        </Td>
                        <Td
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: "small",
                            background: highlightPickupColumn(order),
                          }}
                        >
                          {
                            <>
                              <span>
                                {renderProductPickupDateFromRenter(order)}
                              </span>
                              <br />
                              <span>
                                {
                                  order?.order_status_extra?.[0]
                                    ?.product_pickup_timeslot_from_renter
                                }
                              </span>
                              <br />
                            </>
                          }
                        </Td>
                        <Td style={{ fontSize: "small" }}>
                          <a
                            href={order?.order_details?.order_status_extra_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {order.order_number}
                          </a>
                        </Td>
                        <Td>
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
                          {order.order_status === "new_order" && (
                            <span className={styles.orderStatusNewOrder}>
                              New Order
                            </span>
                          )}
                        </Td>
                        <Td>
                          {order?.order_items !== undefined &&
                            order?.order_items[0]?.vendor}{" "}
                        </Td>
                        <Td>
                          {order?.order_items !== undefined &&
                            order?.order_items[0]?.title}
                        </Td>
                        <Td>
                          {order?.order_items !== undefined &&
                            order?.order_items[0]?.variant_title?.split("/")[0]}
                        </Td>
                        <Td>
                          {order?.order_items !== undefined &&
                            order?.order_items[0]?.variant_title?.split("/")[1]}
                        </Td>
                        <Td>{order?.order_type ? order?.order_type : "-"}</Td>
                        <Td>
                          {calculateDays(
                            order?.rental_start_date,
                            order?.rental_end_date
                          )}
                        </Td>

                        <Td style={{ fontSize: "small" }}>
                          {order.order_details?.customer?.first_name}{" "}
                          {order.order_details?.customer?.last_name}
                          <br />
                          {userRole === "Admin" && (
                            <i>{order?.order_details?.phone}</i>
                          )}
                        </Td>

                        {/* <Td style={{ fontSize: "small" }}>
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
                        </Td> */}
                        <Td style={{ fontSize: "small" }}>
                          {" "}
                          {order?.order_details?.line_items?.[0]?.name}
                        </Td>
                        <Td style={{ fontSize: "small" }}>
                          {order?.lender_name} <br /> {order?.lender_phone_call}{" "}
                          <br /> {order?.lender_phone_whatsapp}
                        </Td>
                        <Td style={{ fontSize: "small" }}>
                          {order?.lender_address}
                        </Td>
                        <Td style={{ fontSize: "small" }}>
                          {order?.order_status_extra?.length > 0 && (
                            <>
                              <span>
                                {order?.order_status_extra?.[0]
                                  ?.product_delivery_date_to_lender
                                  ? moment(
                                      order?.order_status_extra?.[0]
                                        ?.product_delivery_date_to_lender
                                    ).format("MM/DD/YYYY")
                                  : "-"}
                              </span>
                              <br />
                              <span>
                                {
                                  order?.order_status_extra?.[0]
                                    ?.product_delivery_timeslot_to_lender
                                }
                              </span>
                              {/* <span>
                                <input
                                  type="checkbox"
                                  disabled={
                                    order?.order_status_extra?.[0]
                                      ?.return_picked_up === "true"
                                      ? true
                                      : false
                                  }
                                  checked={
                                    order?.order_status_extra?.[0]
                                      ?.return_picked_up === "true"
                                      ? true
                                      : false
                                  }
                                  onChange={async (e) => {
                                    handleCheckboxChange(order.order_id);
                                    getOrderDetailsStatus(order.order_id);
                                    //updateStatus(order.order_id);
                                    e.target.disabled = true;
                                    e.target.checked = true;
                                  }}
                                />
                                <label htmlFor="return_picked_up">
                                  Dry Cleaning Complete
                                </label>
                              </span> */}
                            </>
                          )}
                        </Td>
                        {/* <Td style={{ fontSize: "small" }}>
                          {order?.order_status_extra?.length > 0 && (
                            <>
                              <span>
                                {order?.order_status_extra?.[0]
                                  ?.product_pickup_date !== null
                                  ? moment(
                                      order?.order_status_extra?.[0]
                                        ?.product_pickup_date
                                    ).format("DD-MMM-YYYY")
                                  : "-"}
                              </span>
                              <br />
                              <span>
                                {
                                  order?.order_status_extra?.[0]
                                    ?.product_pickup_timeslot
                                }
                              </span>
                            </>
                          )}
                        </Td>
                        
                        <Td>
                          <span>
                            {order?.order_date
                              ? moment(order?.order_date).format("DD-MMM-YYYY")
                              : "-"}
                          </span>
                        </Td>
                       
                     

                   
                        <Td>
                          {order?.fitting_date
                            ? moment(order?.fitting_date).format("DD-MMM-YYYY")
                            : "-"}
                        </Td>
                        <Td>
                          {order?.pickup_by_dry_cleaner_from_renter
                            ? moment(
                                order?.pickup_by_dry_cleaner_from_renter
                              ).format("DD-MMM-YYYY")
                            : "-"}
                        </Td>
                        <Td>
                          {order?.returned_to_lender_by_dry_cleaner
                            ? moment(
                                order?.returned_to_lender_by_dry_cleaner
                              ).format("DD-MMM-YYYY")
                            : "-"}
                        </Td>
                        <Td>
                          {order?.returned_to_lender
                            ? order?.returned_to_lender === true
                              ? "Yes"
                              : "No"
                            : "-"}
                        </Td> */}
                        <Td>{order?.total_price}</Td>
                        <Td>{order?.expenses}</Td>

                        <Td>{order?.lenders_share}</Td>
                        <Td>
                          {Number(
                            order?.total_price -
                              order?.expenses -
                              order?.lenders_share
                          ).toFixed(2)}
                        </Td>
                        <Td>
                          {order?.payment_status === true ? "Paid" : "Un-paid"}
                        </Td>
                      </Tr>
                    </React.Fragment>
                  ))}
              </>
            )}
          </Tbody>
        </Table>
      </div>
    </>
  );
};

export { OrderTable };
