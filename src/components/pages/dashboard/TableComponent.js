import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import React, { useEffect, useState } from "react";
import ApiService from "../../../utils/middleware/ApiService";
import ModalPopup from "./modalPopup";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
import moment from "moment";
import styles from "./index.module.css";
const OrderTable = (props) => {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [propsData, setPropsData] = useState();

  const handleShowDetails = (order) => {
    setPropsData({
      order_id: order.order_id,
      shopify_order_number: order.order_number,
    });
    setShowDetailsPopup(true);
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
        />
      )}
      <h6>Showing {props.data.length} Records</h6>
      <Table className={styles.tableShadow}>
        <Thead>
          <Tr style={{ background: "#af1010", color: "white" }}>
            <Th style={{ width: 40 }}>#</Th>
            <Th>Delivery Details</Th>
            <Th
            className="cursor"
              onClick={() =>
                props.changeSort(
                  props.sortOrderByOrder === "-order_number"
                    ? "order_number"
                    : "-order_number"
                )
              }
            >
              Order Number
              <br />
              {props.sortOrderByOrder === "-order_number" ? (
                <i style={{ fontSize: 24 }} className="fa fa-sort-down"></i>
              ) : (
                <i style={{ fontSize: 24 }} className="fa fa-sort-up"></i>
              )}
            </Th>
            <Th>Renter Name</Th>
            <Th>Product Details</Th>
            <Th>Renter Address.</Th>
            <Th>Lendar Name</Th>
            <Th>Pickup Details</Th>
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
                    <Tr style={{ borderBottom: "1px solid #e7d9d9" }}>
                      <Td>
                        {i + 1}
                        <br />
                        {renderStatus(order)}
                      </Td>
                      <Td>
                        {order?.order_status?.length > 0 && (
                          <>
                            <span>
                              {order?.order_status?.[0]
                                ?.product_delivery_date !== null
                                ? moment(
                                    order?.order_status?.[0]
                                      ?.product_delivery_date
                                  ).format("MM/DD/YYYY")
                                : "-"}
                            </span>
                            <br />
                            <span>
                              {
                                order?.order_status?.[0]
                                  ?.product_delivery_timeslot
                              }
                            </span>
                          </>
                        )}
                      </Td>
                      <Td>
                        <a
                          href={order?.order_details?.order_status_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {order.order_number}
                        </a>
                      </Td>
                      <Td>
                        {order.order_details?.customer?.first_name}{" "}
                        {order.order_details?.customer?.last_name}
                        <br />
                        <i>{order?.order_details?.phone}</i>
                      </Td>
                      <Td> {order?.order_details?.line_items?.[0]?.name}</Td>
                      <Td>
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
                      
                      <Td>{order?.lender_name}</Td>
                      <Td>
                        {order?.order_status?.length > 0 && (
                          <>
                            <span>
                              {order?.order_status?.[0]?.product_pickup_date !==
                              null
                                ? moment(
                                    order?.order_status?.[0]
                                      ?.product_pickup_date
                                  ).format("MM/DD/YYYY")
                                : "-"}
                            </span>
                            <br />
                            <span>
                              {
                                order?.order_status?.[0]
                                  ?.product_pickup_timeslot
                              }
                            </span>
                          </>
                        )}
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

export { OrderTable };
