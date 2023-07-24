import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import styles from "./index.module.css";
import { OrderTable } from "./TableComponent";
import Filters from "./FIlters";
import ApiService from "../../../utils/middleware/ApiService";
import moment from "moment";
import dayjs from "dayjs";
import Header from "./../../organisms/Navbar"
const Dashboard = () => {
  const [getOrdersdata, setOrdersdata] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [propsData, setPropsData] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [lenderName, setLenderName] = useState("");
  const [renterName, setRenterName] = useState("");
  const [renterLName, setRenterLName] = useState("");

  const [lenderLName, setLenderLName] = useState("");

  const [sortOrderByOrder, setSortOrderByOrder] = useState("-order_number");

  useEffect(() => {
    async function data() {
      getOrders();
    }
    data();
  }, [sortOrderByOrder]);

  const getOrders = () => {
    setShowLoader(true);

    let url = `/v1/dashboard/getorders?`;

    if (startDate !== null) url += `&start_date=${startDate}T00:00:00.000Z`;

    if (endDate !== null) url += `&end_date=${endDate}T23:59:59.000Z`;
    if (lenderName !== "") url += `&lender_name=${lenderName}`;
    if (renterName !== "") url += `&renter_name=${renterName}`;

    if (renterLName !== "") url += `&renter_Lname=${renterLName}`;

    if (sortOrderByOrder !== "") url += `&sortByOrder=${sortOrderByOrder}`;

    ApiService.get(url, {}, {}, (res, err) => {
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
  const updateSorting = async (e) => {
    setSortOrderByOrder(e);

    getOrders();
  };

  const applyFilter = () => {
    getOrders();
  };

  const closeFilter = () => {};

  const clearFilter = () => {

    setStartDate(null);
    setEndDate(null);
    setLenderName("");
    setRenterName("");
    setRenterLName("");
    setLenderLName("");
  };

  return (
    <>
      {/* {showLoader && <ActivityLoader show={showLoader} />} */}
      <Header />
      <div className="container cont-padd">
        <Filters
          startDate={startDate}
          endDate={endDate}
          renterName={renterName}
          lenderName={lenderName}
          renterLName={renterLName}
          lenderLName={lenderLName}
          updateRenterName={(e) => setRenterName(e)}
          updateLenderName={(e) => setLenderName(e)}
          updateRenterLName={(e) => setRenterLName(e)}
          updateLenderLName={(e) => setLenderLName(e)}
          updateStartDate={(e) =>
            setStartDate(moment(dayjs(e).toString()).format("YYYY-MM-DD"))
          }
          updateEndDate={(e) =>
            setEndDate(moment(dayjs(e).toString()).format("YYYY-MM-DD"))
          }
          applyFilter={() => applyFilter()}
          closeFilter={() => closeFilter()}
          clearFilter={() => clearFilter()}
        />
        <OrderTable
          data={getOrdersdata}
          sortOrderByOrder={sortOrderByOrder}
          changeSort={(e) => updateSorting(e)}
        />
      </div>
    </>
  );
};

export default Dashboard;
