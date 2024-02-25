import React, { useState } from "react";

import styles from "./filter.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { CustomSelect } from "../../atom/CustomSelect/CustomSelect";
import moment from "moment";

const DrycleanerFilters = ({
  formData,
  applyFilter,
  clearFilter,
  updateFormData,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleEnter = (e) => {
    if (e.key === "Enter") applyFilter();
  };
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  //   order_number: "",
  //     renter_name: "",
  //     pickupDate: "",
  //     deliveryDate: "",
  //     order_status: "",
  //     payment_status: "",
  return (
    <div className={[styles.filterBlock, "expand-collapse"].join(" ")}>
      <div
        className="expand-collapse-header cursor d-flex justify-content-between align-items-center"
        onClick={handleToggle}
      >
        <h6>Add Filters</h6>
        {/* <img src={isExpanded ? downArrow : upArrow} alt="expandedIcon" /> */}
      </div>
      {isExpanded && (
        <div className="expand-collapse-content">
          <hr />

          <div className="col-md-12 row d-flex p-3">
            <div className="col-md-4">
              <span>Order Number</span>
              <br />
              <div className="mt-2">
                <input
                  style={{ height: 40, width: "93%" }}
                  value={formData.order_number}
                  onChange={(e) =>
                    updateFormData("order_number", e.target.value)
                  }
                  onKeyDown={(e) => handleEnter(e)}
                />
              </div>
            </div>

            <div className="col-md-4">
              <span>Pickup Date</span>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className={"mt-2"}>
                  <DatePicker
                    label="Order Pickup Date"
                    value={
                      formData.pickupDate !== "" && formData.pickupDate !== null
                        ? dayjs(formData.pickupDate)
                        : null
                    }
                    slotProps={{ textField: { size: "small" } }}
                    onChange={(e) =>
                      updateFormData(
                        "pickupDate",
                        moment(dayjs(e).toString()).format("YYYY-MM-DD")
                      )
                    }
                  />
                </div>
              </LocalizationProvider>
            </div>

            <div className="col-md-4">
              <span className="mb-2">Delivery Date</span>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className={"mt-2"}>
                  <DatePicker
                    label="Order Delivery Date"
                    value={
                      formData.deliveryDate !== "" &&
                      formData.deliveryDate !== null
                        ? dayjs(formData.deliveryDate)
                        : null
                    }
                    slotProps={{ textField: { size: "small" } }}
                    onChange={(e) =>
                      updateFormData(
                        "deliveryDate",
                        moment(dayjs(e).toString()).format("YYYY-MM-DD")
                      )
                    }
                  />
                </div>
              </LocalizationProvider>
            </div>

            <div className="col-md-4 mt-3">
              <span>Customer Name</span>
              <br />
              <div className="mt-2">
                <input
                  style={{ height: 40, width: "93%" }}
                  value={formData.renter_name}
                  onChange={(e) =>
                    updateFormData("renter_name", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-md-4 mt-3">
              <span>Payment Status</span>
              <br />
              <div className="mt-2">
                <CustomSelect
                  options={[
                    { value: true, label: "Paid" },
                    { value: false, label: "Un-paid" },
                  ]}
                  value={formData.payment_status}
                  onChange={(e) => updateFormData("payment_status", e.value)}
                />
              </div>
            </div>
            {/* <div className="col-md-4 mt-3">
              <span>Order Status</span>
              <br />
              <div className="mt-2">
                <CustomSelect
                  options={[
                    { value: "fulfilled", label: "Fulfilled" },
                    {
                      value: "pickedup_drycleaner",
                      label: "Pickedup By Drycleaner",
                    },
                    { value: "delivered", label: "Delivered" },
                    { value: "completed", label: "Completed" },
                    { value: "cancelled", label: "Cancelled" },
                  ]}
                  value={formData.order_status}
                  onChange={(e) => updateFormData("order_status", e.value)}
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

export default DrycleanerFilters;
