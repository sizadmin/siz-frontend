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
import CardComponent from "../../organisms/CardsComponent/CardComponent";
import { SideNavbar } from "../../atom/SidenavBar/SidenavBar";
import { Pagination } from "../../organisms/PaginationComponent/Pagination";
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
  const [lendersList, setLendersList] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    async function data() {
      getOrders(pageNumber, pageSize);
      getLendersList();
    }
    data();
  }, [sortOrderByOrder]);

  const getLendersList = () => {
    // setShowLoader(true);

    let url = `/v1/lenders`;
    let header = {
      Token: userInfo.token,
    };

    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        console.log(res, "res.data[0].data");
        setLendersList(
          res[0].data.map((e) => {
            return { label: e.name, value: e._id };
          })
        );
        // setShowLoader(false);
      } else {
        console.log(err);
        // setShowLoader(false);
      }
    });
  };
  const getOrders = (pageNumber, pageSize) => {
    setShowLoader(true);

    let url = `/v1/dashboard/getorders?`;

    if (startDate !== null) url += `&start_date=${startDate}T00:00:00.000Z`;
    if (startDate == null && userRole !== "Admin")
      url += `&start_date=2023-11-01T00:00:00.000Z`;

    if (userInfo.loggedUser?.role?.role_name !== "Admin") {
      // console.log(userInfo.loggedUser, "userInfo.loggedUser");
      // setLenderName(userInfo?.loggedUser?.first_name);
      url += `&lender_name=${userInfo.loggedUser.first_name} ${userInfo.loggedUser.last_name}`;
      //url += `&lender_name=Diana Ganeeva`;
    } else if (lenderName !== "") url += `&lender_name=${lenderName}`;

    if (endDate !== null) url += `&end_date=${endDate}T23:59:59.000Z`;
    if (renterName !== "") url += `&renter_name=${renterName}`;

    if (paymentStatus !== "" && paymentStatus !== null)
      url += `&payment_status=${paymentStatus}`;

    if (renterLName !== "") url += `&renter_Lname=${renterLName}`;

    if (orderType !== "" && orderType !== null)
      url += `&order_type=${orderType}`;

    if (sortOrderByOrder !== "") url += `&sortByOrder=${sortOrderByOrder}`;

    if (pageNumber) url += `&page=${pageNumber}`;

    if (pageSize) url += `&pageSize=${pageSize}`;

    let header = {
      Token: userInfo.token,
    };

    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        setOrdersdata(res.data[0].data);
        setMetadata(res.aggregatedData);
        setPagination(res.data[0].metadata);
        setShowLoader(false);
      } else {
        console.log(err);
        setShowLoader(false);
      }
    });
  };
  const updateSorting = async (e) => {
    setSortOrderByOrder(e);

    getOrders(pageNumber, pageSize);
  };

  const applyFilter = () => {
    let pageNumber = 1;
    setPageNumber(pageNumber);
    getOrders(pageNumber, pageSize);
  };

  const closeFilter = () => {};

  const clearFilter = () => {
    let pageNumber = 1;
    setPageNumber(pageNumber);
    setStartDate(null);
    setEndDate(null);
    setLenderName("");
    setRenterName("");
    setRenterLName("");
    setLenderLName("");
    setPaymentStatus(null);
    setOrderType(null);
    getOrders(pageNumber, pageSize);
  };

  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      <SideNavbar route={window.location.pathname} />

      <div className="container-fluid cont-padd customContainer">
        <Header />

        {/* {userInfo.loggedUser?.lender_info !== null &&
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
          )} */}
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
          lendersList={lendersList}
        />

        <CardComponent data={metadata} userRole={userRole} />
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
          <>
            <div style={{ overflow: "auto" }}>
              <OrderTable
                data={getOrdersdata}
                sortOrderByOrder={sortOrderByOrder}
                changeSort={(e) => updateSorting(e)}
                getOrders={getOrders}
              />
            </div>
          </>
        )}
        {pagination !== null &&
          pagination.length > 0 &&
          pagination[0].total && (
            <Pagination
              itemsPerPage={pageSize}
              pageNumber={pageNumber}
              total={pagination !== null && pagination[0].total}
              fetchData={(pageNumber, pageSize) => {
                setPageNumber(pageNumber);
                setPageSize(pageSize);
                getOrders(pageNumber, pageSize);
              }}
            />
          )}
      </div>
    </>
  );
};

export default Dashboard;
