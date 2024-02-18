import React, { useState, useEffect } from "react";

import styles from "./index.module.css";
import ApiService from "../../../utils/middleware/ApiService";
import dayjs from "dayjs";
import Header from "./../../organisms/Navbar";
import { useSelector } from "react-redux";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
import { SideNavbar } from "../../atom/SidenavBar/SidenavBar";
import { Cards, cardsData } from "./cards";
import { CustomSelect } from "../../atom/CustomSelect/CustomSelect";
const filterList = [
  { label: "Today", value: "today" },
  { label: "Last 7 days", value: "last7days" },
  { label: "Last 30 days", value: "last30days" },
];
const DashboardNew = () => {
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
  const [selectedFilter, setSelectedFilter] = useState(filterList[0]);

  useEffect(() => {
    async function data() {}
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
  const getOrders = () => {
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
    let header = {
      Token: userInfo.token,
    };

    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        setOrdersdata(res.data);
        setMetadata(res.metadata);

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
      <SideNavbar route={window.location.pathname} />

      <div
        className="container-fluid cont-padd customContainer"
      >
        <Header />
        <div className="d-flex flex-column">
          <div className="d-flex mb-2" style={{marginLeft:'auto',width:'200px'}}>
            <CustomSelect
              options={filterList}
              value={selectedFilter.value}
              onChange={(e) => setSelectedFilter(e.value)}
            />
          </div>
          <div className="d-flex row flex-wrap">

          {cardsData.map((item) => {
            return (
              <>
                <div className={styles.cardOuter}>
                  <span className={styles.cardTitleStyle}>{item.title}</span>
                  <span
                    className={[
                      styles.cardTitleCountStyle,
                      styles[item.class],
                    ].join(" ")}
                  >
                    5
                  </span>
                  <img
                    src={item.icon}
                    alt={item.title}
                    style={{ height: 30, width: 30, marginLeft: "auto" }}
                  />
                </div>
              </>
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNew;
