import React, { useState } from "react";

import styles from "./filter.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import moment from "moment";
import { CustomSelect } from "../../atom/CustomSelect/CustomSelect";
const Filters = ({
  renterName,
  renterLName,
  lenderLName,
  startDate,
  endDate,
  lenderName,
  updateRenterName,
  updateLenderName,
  updateRenterLName,
  updateLenderLName,
  updateStartDate,
  updateEndDate,
  applyFilter,
  clearFilter,
  userRole,
  paymentStatus,
  setPaymentStatus,
  orderType,
  setOrderType,
  lendersList,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const tomorrow = dayjs("2023-10-31").add(1, "day");

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={[styles.filterBlock, "expand-collapse"].join(" ")}>
      <div className="expand-collapse-header cursor d-flex justify-content-between" onClick={handleToggle}>
        {"Add Filters"}
        <span> ▼</span>
      </div>
      {isExpanded && (
        <div className="expand-collapse-content">
          <hr />

          <div className="col-md-12 row d-flex p-3">
            <div className="col-md-4">
              <span>Start Date</span>

              {userRole === "Admin" ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className={"mt-2"}>
                    <DatePicker
                      label="Select Order Start Date *"
                      value={startDate !== "" && dayjs(startDate)}
                      onChange={(e) => updateStartDate(e)}
                    />
                  </div>
                </LocalizationProvider>
              ) : (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className={"mt-2"}>
                    <DatePicker
                      label="Select Order Start Date *"
                      value={startDate !== "" ? dayjs(startDate):tomorrow}
                      onChange={(e) => updateStartDate(e)}
                      minDate={tomorrow}
                    />
                  </div>
                </LocalizationProvider>
              )}
            </div>

            <div className="col-md-4">
              <span className="mb-2">End Date</span>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className={"mt-2"}>
                  <DatePicker
                    label="Select Order End Date *"
                    value={endDate !== "" && dayjs(endDate)}
                    onChange={(e) => updateEndDate(e)}
                  />
                </div>
              </LocalizationProvider>
            </div>

            <div className="col-md-4">
              <span>Renter Name</span>
              <br />
              <div className="mt-2">
                <input
                  style={{ height: 40, width: "93%" }}
                  value={renterName}
                  onChange={(e) => updateRenterName(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="col-md-4 mt-3">
              <span>Renter Last Name</span>
              <br />
              <div className="mt-2">
                <input
                  style={{ height: 40, width: "93%" }}
                  value={renterLName}
                  onChange={(e) => updateRenterLName(e.target.value)}
                />
              </div>
            </div> */}
            {userRole === "Admin" && (
              <div className="col-md-4 mt-3">
                <span>Lender Name</span>
                <br />
                <div className="mt-2">
                  <CustomSelect
                    options={lendersList}
                    value={orderType}
                    onChange={(e) => updateLenderName(e.label)}
                  />
                </div>
              </div>
            )}
            {userRole === "Lender" && (
              <div className="col-md-4 mt-3">
                <span>Order Type</span>
                <br />
                <div className="mt-2">
                  <CustomSelect
                    options={[
                      { value: "Confirmed Order", label: "Confirmed Order" },
                      { value: "Fitting", label: "Fitting" },
                    ]}
                    value={orderType}
                    onChange={(e) => setOrderType(e.value)}
                  />
                </div>
              </div>
            )}

            <div className="col-md-4 mt-3">
              <span>Payment Status</span>
              <br />
              <div className="mt-2">
                {/* <input
                    style={{ height: 40, width: "93%" }}
                    value={lenderName}
                    onChange={(e) => updateLenderName(e.target.value)}
                  /> */}
                <CustomSelect
                  options={[
                    { value: true, label: "Paid" },
                    { value: false, label: "Un-paid" },
                  ]}
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.value)}
                />
              </div>
            </div>

            {/* <div className="col-md-4 mt-3">
              <span>Lender Last Name</span>
              <br />
              <div className="mt-2">
                <input
                  style={{ height: 40, width: "93%" }}
                  value={lenderLName}
                  onChange={(e) => updateLenderLName(e.target.value)}
                />
              </div>
            </div> */}
          </div>
          <div className="col-md-12 d-flex justify-content-center mt-4 mb-2">
            <div className="col-md-2">
              <button className={styles.applyBtn} onClick={applyFilter}>
                Apply
              </button>
            </div>

            <div className="col-md-2">
              <button className={styles.cancelBtn} onClick={handleToggle}>
                Cancel
              </button>
            </div>
            <div className="col-md-2">
              <button className={styles.cancelBtn} onClick={clearFilter}>
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
