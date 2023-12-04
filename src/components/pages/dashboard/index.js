import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import styles from "./index.module.css";
import { OrderTable } from "./TableComponent";
import Filters from "./FIlters";
import ApiService from "../../../utils/middleware/ApiService";
import moment from "moment";
import dayjs from "dayjs";
import Header from "./../../organisms/Navbar";
import { useSelector } from "react-redux";
import { LendarTableComponent } from "./LendarTableComponent";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
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
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderType, setOrderType] = useState(null);

  const [sortOrderByOrder, setSortOrderByOrder] = useState("-order_number");
  const { userInfo } = useSelector((state) => state.user);
  const [userRole, setUserRole] = useState(
    userInfo?.loggedUser?.role?.role_name
  );

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

    if (userInfo.loggedUser?.role?.role_name !== "Admin") {
      // console.log(userInfo.loggedUser, "userInfo.loggedUser");
      // setLenderName(userInfo?.loggedUser?.first_name);
      url += `&lender_name=${userInfo.loggedUser.first_name} ${userInfo.loggedUser.last_name}`;
      // url += `&lender_name=Diana Ganeeva`;
    } else if (lenderName !== "") url += `&lender_name=${lenderName}`;

    if (endDate !== null) url += `&end_date=${endDate}T23:59:59.000Z`;
    if (renterName !== "") url += `&renter_name=${renterName}`;

    if (paymentStatus !== "" && paymentStatus !== null)
      url += `&payment_status=${paymentStatus}`;

    if (renterLName !== "") url += `&renter_Lname=${renterLName}`;

    if (orderType !== "" && orderType !== null)
    url += `&order_type=${orderType}`;

    if (sortOrderByOrder !== "") url += `&sortByOrder=${sortOrderByOrder}`;
    let header = {
      Token: userInfo.token,
    };

    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        setOrdersdata(res.data);
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
    setPaymentStatus(null);
    setOrderType(null);
    getOrders();
  };

  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      <Header />
      <div className="container-fluid cont-padd">
        {userInfo.loggedUser?.lender_info !== null &&
          userInfo.loggedUser?.lender_info !== undefined && (
            <div className={[styles.lenderInfoBlock, "row"].join(" ")}>
              <div className="col-md-3 d-flex flex-column">
                <span>Name:</span>
                <span>{userInfo.loggedUser?.lender_info?.name}</span>
              </div>
              <div className="col-md-3 d-flex flex-column">
                <span>Email:</span>
                <span>{userInfo.loggedUser?.lender_info?.email}</span>
              </div>
              <div className="col-md-3 d-flex flex-column">
                <span>Phone Number:</span>
                <span>
                  {userInfo.loggedUser?.lender_info?.phone_number_call}
                </span>
              </div>
              <div className="col-md-3 d-flex flex-column">
                <span>Address:</span>
                <span>{userInfo.loggedUser?.lender_info?.address}</span>
              </div>
            </div>
          )}
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
          userRole={userRole}
          paymentStatus={paymentStatus}
          setPaymentStatus={(e) => setPaymentStatus(e)}
          orderType={orderType}
          setOrderType={(e) => setOrderType(e)}
        />
        {userRole === "Lender" && (
          <div style={{ overflow: "auto" }}>
            <LendarTableComponent
              data={getOrdersdata}
              sortOrderByOrder={sortOrderByOrder}
              changeSort={(e) => updateSorting(e)}
            />
          </div>
        )}
        {userRole === "Admin" && (
          <OrderTable
            data={getOrdersdata}
            sortOrderByOrder={sortOrderByOrder}
            changeSort={(e) => updateSorting(e)}
            getOrders={getOrders}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
