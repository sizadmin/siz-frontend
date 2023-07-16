import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import React, { useEffect, useState } from "react";
import ApiService from "../../../utils/middleware/ApiService";
import ModalPopup from "./modalPopup";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";

const OrderTable = () => {
  const [getOrdersdata, setOrdersdata] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [propsData, setPropsData] = useState();

  useEffect(() => {
    getOrders();
  }, []);

  const handleShowDetails = (order) => {
    setPropsData({
      order_id: order.order_id,
      shopify_order_number: order.order_number,
    });
    setShowDetailsPopup(true);
  };

  const getOrders = () => {
    setShowLoader(true);
    ApiService.get("/v1/dashboard/getorders", {}, {}, (res, err) => {
      if (res !== null) {
        setOrdersdata(res.data);
        console.log(res.data);
        setShowLoader(false);
      } else {
        console.log(err);
        setShowLoader(false);
      }
    });
  };

  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}

      {showDetailsPopup && (
        <ModalPopup
          show={showDetailsPopup}
          hide={() => setShowDetailsPopup(false)}
          propsData={propsData}
        />
      )}
      <Table>
        <Thead>
          <Tr style={{ background: "#af1010", color: "white" }}>
            <Th style={{ width: 40 }}>#</Th>
            <Th>OrderID</Th>
            <Th>Shopify Order Number</Th>
            <Th>Renter Name</Th>
            <Th>Product Details</Th>
            <Th>Renter Email</Th>
            <Th>Renter Phone No.</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {getOrdersdata.length === 0 ? (
            <span>No Orders Found</span>
          ) : (
            <>
              {getOrdersdata.length > 0 &&
                getOrdersdata.map((order, i) => (
                  <>
                    <Tr style={{ borderBottom: "1px solid #e7d9d9" }}>
                      <Td>{i + 1}</Td>
                      <Td onClick={() => handleShowDetails(order)}>
                        {order.order_id}
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
                      </Td>
                      <Td> {order?.order_details?.line_items?.[0]?.name}</Td>
                      <Td>{order?.email}</Td>
                      <Td>{order?.order_details?.phone}</Td>
                      <Td>{order?.total_price}</Td>
                    </Tr>
                  </>
                ))}
            </>
          )}
        </Tbody>
      </Table>
    </>
  );
};

export { OrderTable };
