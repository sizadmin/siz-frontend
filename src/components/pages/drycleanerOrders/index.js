import React, { useState, useEffect } from "react";

import styles from "./index.module.css";
import ApiService from "../../../utils/middleware/ApiService";
import _ from "lodash";

import Header from "./../../organisms/Navbar";
import { useSelector } from "react-redux";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
import Notification from "../../organisms/Notification/notification";
import { SideNavbar } from "../../atom/SidenavBar/SidenavBar";
import { Pagination } from "../../organisms/PaginationComponent/Pagination";
import { OrdersTable } from "./OrdersTable";
import OrderPopup from "./OrderPopup";
import { cardsData } from "./cardsData";
import DrycleanerFilters from "./DrycleanerFilters";
import moment from "moment";

const DrycleanerOrders = () => {
  const [getOrdersdata, setOrdersdata] = useState([]);
  const [getOrdersdataMetadata, setOrdersdataMetadata] = useState([]);

  const [showLoader, setShowLoader] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [formData, setFormData] = useState({
    order_number: "",
    renter_name: "",
    pickupDate: "",
    deliveryDate: "",
    order_status: "",
    payment_status: "",
  });
  const updateFilters = (field, val) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [field]: val,
      };
    });
  };

  const [showCreateUserPopup, setshowCreateUserPopup] = useState(false);
  // const [orderType, setOrderType] = useState(null);

  const [sortOrderByOrder, setSortOrderByOrder] = useState("-order_number");
  const { userInfo } = useSelector((state) => state.user);

  const [rolesData, setRolesData] = useState([]);
  const [lendersData, setLendersData] = useState([]);

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userRole, setUserRole] = useState(
    userInfo?.loggedUser?.role?.role_name
  );
  const [metadata, setMetadata] = useState({});
  const [pagination, setPagination] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function data() {
      getOrders(pageNumber, pageSize);
      // ApiService.get("/v1/roles", {}, {}, (res, err) => {
      //   if (res !== null) {
      //     setRolesData(
      //       res.results.map((e) => {
      //         return { label: e.role_name, value: e._id };
      //       })
      //     );
      //   } else {
      //     console.log(err);
      //     setShowLoader(false);
      //   }
      // });
    }
    data();
  }, [sortOrderByOrder]);

  const getOrders = (pageNumber, pageSize) => {
    getDashboardData();

    setShowLoader(true);

    let url = `/v1/dashboard/getorders?`;

    if (pageNumber) url += `&page=${pageNumber}`;

    if (pageSize) url += `&pageSize=${pageSize}`;

    let start_date = moment();
    start_date = start_date.subtract(3, "days");
    start_date = start_date.format("YYYY-MM-DD");

    let end_date = moment();
    end_date = end_date.add(3, "days");
    end_date = end_date.format("YYYY-MM-DD");

    // let start_date = moment().subtract(3,'days')
    // let end_date = moment().add(3,'days')

    if (!formData.pickupDate) {
      url += `&start_date=${start_date}T00:00:00`;
      if (!formData.deliveryDate) url += `&end_date=${end_date}T23:59:59`;
    }

    if (formData.pickupDate) url += `&pickupDate=${formData.pickupDate}`;
    if (formData.renter_name !== "")
      url += `&renter_name=${formData.renter_name}`;

    if (formData.payment_status !== "" && formData.payment_status !== null)
      url += `&payment_status=${formData.payment_status}`;

    if (formData.order_number !== "")
      url += `&order_number=${formData.order_number}`;

    if (formData.order_status !== "" && formData.order_status !== null)
      url += `&order_status=${formData.order_status}`;

    let header = {
      Token: userInfo.token,
    };

    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        setOrdersdata(res.data[0].data);
        setMetadata(res.aggregatedData);
        setOrdersdataMetadata(res.data[0].metadata);
        setShowLoader(false);
      } else {
        console.log(err);
        setShowLoader(false);
      }
    });
  };

  const getDashboardData = () => {
    setShowLoader(true);

    let url = `/v1/dashboard/getDashboardData?`;

    if (pageNumber) url += `&page=${pageNumber}`;

    if (pageSize) url += `&pageSize=${pageSize}`;

    let start_date = moment();
    start_date = start_date.subtract(3, "days");
    start_date = start_date.format("YYYY-MM-DD");

    let end_date = moment();
    end_date = end_date.add(3, "days");
    end_date = end_date.format("YYYY-MM-DD");

    // let start_date = moment().subtract(3,'days')
    // let end_date = moment().add(3,'days')

    if (!formData.pickupDate) {
      url += `&start_date=${start_date}T00:00:00`;
      if (!formData.deliveryDate) url += `&end_date=${end_date}T23:59:59`;
    } else {
      url += `&start_date=${formData.pickupDate}T00:00:00`;
      url += `&end_date=${formData.pickupDate}T23:59:59`;
    }

    let header = {
      Token: userInfo.token,
    };

    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        // setOrdersdata(res.data[0].data);
        // setMetadata(res.aggregatedData);
        // setOrdersdataMetadata(res.data[0].metadata);
        setDashboardData(res.data);
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

  const updateStatus = (text) => {
    // "order_status", e.value
    setShowLoader(true);

    let url = `/v1/dashboard/getorders?`;

    if (pageNumber) url += `&page=${pageNumber}`;

    if (pageSize) url += `&pageSize=${pageSize}`;

    let start_date = moment();
    start_date = start_date.subtract(3, "days");
    start_date = start_date.format("YYYY-MM-DD");

    let end_date = moment();
    end_date = end_date.add(3, "days");
    end_date = end_date.format("YYYY-MM-DD");

    if (!formData.pickupDate) {
      url += `&start_date=${start_date}T00:00:00`;
      if (!formData.deliveryDate) url += `&end_date=${end_date}T23:59:59`;
    }

    if (text !== "" && text !== null) url += `&order_status=${text}`;

    let header = {
      Token: userInfo.token,
    };

    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        setOrdersdata(res.data[0].data);
        setMetadata(res.aggregatedData);
        setOrdersdataMetadata(res.data[0].metadata);
        setShowLoader(false);
      } else {
        console.log(err);
        setShowLoader(false);
      }
    });
  };

  const returnVal = (itm) => {
    let val = _.find(dashboardData, { _id: itm.field });
    return val !== undefined ? val.count : 0;
  };

  const applyFilter = () => {
    getOrders(pageNumber, pageSize);
  };
  const clearFilter = () => {
    let pageNumber = 1;
    setPageNumber(pageNumber);
    setFormData((prevData) => {
      return {
        ...prevData,
        order_number: "",
        renter_name: "",
        pickupDate: "",
        deliveryDate: "",
        order_status: "",
        payment_status: "",
      };
    });
    setShowLoader(true);

    let url = `/v1/dashboard/getorders?`;

    if (pageNumber) url += `&page=${pageNumber}`;

    if (pageSize) url += `&pageSize=${pageSize}`;

    let start_date = moment();
    start_date = start_date.subtract(3, "days");
    start_date = start_date.format("YYYY-MM-DD");

    let end_date = moment();
    end_date = end_date.add(3, "days");
    end_date = end_date.format("YYYY-MM-DD");

    if (!formData.pickupDate) {
      url += `&start_date=${start_date}T00:00:00`;
      if (!formData.deliveryDate) url += `&end_date=${end_date}T23:59:59`;
    }

    let header = {
      Token: userInfo.token,
    };

    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        setOrdersdata(res.data[0].data);
        setMetadata(res.aggregatedData);
        setOrdersdataMetadata(res.data[0].metadata);
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
      {showSuccessMsg && (
        <Notification show={showSuccessMsg} msg={SuccessMsg} type="success" />
      )}
      <SideNavbar route={window.location.pathname} />
      <div
        className="container-fluid cont-padd"
        style={{
          display: "grid",
          maxHeight: "100vh",
          overflowY: "auto",
          height: "max-content",
        }}
      >
        <Header />

        <DrycleanerFilters
          formData={formData}
          updateFormData={updateFilters}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
        <div className="d-flex justify-content-center" style={{marginBottom:'2rem'}}>
          {cardsData.map((itm) => {
            return (
              <div
                className={styles.cardOuter}
                onClick={() =>
                  updateStatus(itm.field === "total" ? "" : itm.field)
                }
              >
                <span className={styles.cardTitle}>{itm.title}</span>
                <span className={styles[itm.class]}>{returnVal(itm)}</span>
              </div>
            );
          })}
        </div>
        <div>
          <OrdersTable
            data={getOrdersdata}
            sortOrderByOrder={sortOrderByOrder}
            changeSort={(e) => updateSorting(e)}
            getOrders={getOrders}
            rolesData={rolesData}
          />
          <Pagination
            itemsPerPage={pageSize}
            pageNumber={pageNumber}
            total={getOrdersdataMetadata[0]?.total}
            fetchData={(pageNumber, pageSize) => {
              setPageNumber(pageNumber);
              setPageSize(pageSize);
              getOrders(pageNumber, pageSize);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DrycleanerOrders;
