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
import moment from "moment";
import _ from "lodash";
import OrdersDashboard from "./../../../assets/svgs/OrdersDashboard.svg";
import { AdminCardsData } from "./adminCards";

const filterList = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "thisWeek" },
];
const DashboardNew = () => {
  const [showLoader, setShowLoader] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  const [selectedFilter, setSelectedFilter] = useState(filterList[0]);

  const [dashboardData, setDashboardData] = useState(null);
  const [cardsData1, setCardsData] = useState([]);

  useEffect(() => {
    if(userInfo.loggedUser.role.role_name === "Admin") setCardsData(AdminCardsData);
    if(userInfo.loggedUser.role.role_name === "Dry Cleaner" ) setCardsData(cardsData);
    if(userInfo.loggedUser.role.role_name === "Lender" ) setCardsData(cardsData);

    console.log(userInfo.loggedUser.role.role_name,cardsData1)
    async function data() {
      getDashboardData();
    }
    data();
  }, []);

  const getDashboardData = (filter) => {
    setShowLoader(true);

    let url = `/v1/dashboard/getDashboardData?`;

    let start_date = moment();

    let end_date = moment();

    if (filter === "today") {
      start_date = moment().format("YYYY-MM-DD");
      end_date = moment().format("YYYY-MM-DD");
    } else {
      start_date = start_date.subtract(3, "days");
      start_date = start_date.format("YYYY-MM-DD");

      end_date = end_date.add(3, "days");
      end_date = end_date.format("YYYY-MM-DD");
    }

    // let start_date = moment().subtract(3,'days')
    // let end_date = moment().add(3,'days')

    url += `&start_date=${start_date}T00:00:00`;
    url += `&end_date=${end_date}T23:59:59`;

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
  const updateFilter = (e) => {
    setSelectedFilter(e.value);
    getDashboardData(e.value);
  };

  const returnVal = (itm) => {
    let val = _.find(dashboardData, { _id: itm.field });
    return val !== undefined ? val.count : 0;
  };
  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      <SideNavbar route={window.location.pathname} />

      <div className="container-fluid cont-padd customContainer">
        <Header />
        <div className="d-flex flex-column">
          <div
            className="d-flex mb-2"
            style={{ marginLeft: "auto", width: "200px" }}
          >
            <CustomSelect
              options={filterList}
              value={selectedFilter.value}
              onChange={(e) => updateFilter(e)}
            />
          </div>
          <div className="d-flex row flex-wrap">
            {cardsData1.map((item) => {
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
                      {returnVal(item)}
                    </span>
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt={item.title}
                        style={{ height: 30, width: 30, marginLeft: "auto" }}
                      />
                    )}
                  </div>
                </>
              );
            })}
            {/* {userInfo.loggedUser.role.role_name === "Admin" && (
              <>
                <div className={styles.cardOuter}>
                  <span className={styles.cardTitleStyle}>Pending Orders</span>
                  <span
                    className={[
                      styles.cardTitleCountStyle,
                      styles.pendingCount,
                    ].join(" ")}
                  >
                    {returnVal({ field: "new_order" })}
                  </span>

                  <img
                    src={OrdersDashboard}
                    alt={"icon-pending"}
                    style={{ height: 30, width: 30, marginLeft: "auto" }}
                  />
                </div>
                <div className={styles.cardOuter}>
                  <span className={styles.cardTitleStyle}>Drycleaner Unpaid Orders</span>
                  <span
                    className={[
                      styles.cardTitleCountStyle,
                      styles.pendingCount,
                    ].join(" ")}
                  >
                    {returnVal({ field: "unpaid" })}
                  </span>

                  <img
                    src={OrdersDashboard}
                    alt={"icon-pending"}
                    style={{ height: 30, width: 30, marginLeft: "auto" }}
                  />
                </div>
              </>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNew;
