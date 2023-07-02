import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import styles from "./index.module.css";
import Logo from "./../../../assets/imgs/LOGO.jpeg";
// import CHECKED from "./../../../assets/imgs/checked.png";
import Sample1 from "./../../../assets/imgs/sample1.avif";
import moment from "moment";
import ApiService from "../../../utils/middleware/ApiService";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
const productList = [
  {
    title: "Freya Dress",
    sizes: "S/M",
    color: "Black",
    bookingdays: "4 Days",
    startdate: new Date(),
    enddate: new Date(),
  },
];
const Pickup = (props) => {
  let history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [startDate, setStartDate] = useState(
    moment().format("YYYY-MM-DDTHH:mm:ss")
  );
  const [startTime, setStartTime] = useState(
    moment().format("YYYY-MM-DDTHH:mm:ss")
  );

  const [startDateTimeErr, setStartDateTimeErr] = useState("");
  const { productId } = useParams() || null;

  useEffect(() => {
    // console.log("hiii", productId);
  });

  const startDatHandler = (date, e) => {
    setStartDate(date);
  };

 

  const handleSchedule = () => {
    //Prevent page reload
    setShowLoader(true);
    // let { uname, pass } = document.forms[0];

    // let payload = {
    //   email: uname.value,
    //   password: pass.value,
    // };
    // ApiService.post("/v1/login", payload, null, (res, err) => {
    //   if (res !== null) {
    //     props.setUser({
    //       userInfo: res,
    //     });
    //     setShowLoader(false);
    //     if (res.loggedUser.isActive !== true) {
    //       setErrorMessages({
    //         message: "You do not have permission Please contact administrator",
    //       });
    //       history.push("/");
    //     } else {
    //       history.push("/dashboard");
    //     }
    //   } else {
    //     console.log(err);
    //     setErrorMessages({ message: err.message });
    //     setShowLoader(false);
    //   }
    // });
  };

  // Generate JSX code for error message
  // const renderErrorMessage = () => (
  //   <label className={styles.error}>{errorMessages.message}</label>
  // );

  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      <div className="container p-5">
        <div className="d-flex">
          <div className="w-100">
            <div
              className={[
                "d-flex w-100 flex-column p-3",
                styles.block1Outer,
              ].join(" ")}
            >
              <div>
                <img src={Logo} alt="logo" className={styles.logoStyle} />
              </div>
              <div className="d-flex align-items-center mt-3">
                <div>
                  {/* <img
                    src={CHECKED}
                    alt="logo"
                    className={styles.checkedStyle}
                  /> */}
                </div>
                <div>
                  <span>Order #116</span>
                  <br />
                  <h2
                    style={{
                      color: "#333333",
                      fontSize: "1.5714285714em",
                      fontWeight: "normal",
                    }}
                  >
                    Hey Kelly,
                  </h2>
                </div>
              </div>
              <div className={styles.box1style}>
                <h4>Your have received new order</h4>
                <span>You'll receive an email when your order is ready.</span>
              </div>

              <div className={styles.box1style}>
                <h4>Order details</h4>
                <div className="col-md-12 d-flex">
                  <div className="col-md-6">
                    <span className="bold-600">Item Name</span>
                    <br />
                    <span>Freya Dress</span>
                    <br /> <br />
                    <span className="bold-600">Item Color</span>
                    <br />
                    <span>Black</span>
                    <br /> <br />
                    <span className="bold-600">Item Size</span>
                    <br />
                    <span>S/M</span>
                  </div>
                  <div className="col-md-6">
                    <span className="bold-600">Item Rental Duration</span>
                    <br />
                    <span>4 days</span>
                    <br /> <br />
                    <span className="bold-600">Item Rental Start Date</span>
                    <br />
                    <span>{moment().format("MMM DD, YYYY")}</span>
                    <br /> <br />
                    <span className="bold-600">Item Rental End Date</span>
                    <br />
                    <span>{moment().format("MMM DD, YYYY")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="" style={{ width: "70%" }}>
            <div className={styles.productListing}>
              <ul style={{ listStyleType: "none" }}>
                {productList.map((itm, i) => (
                  <li key={`${i}_item`} className={styles.productListing}>
                    <div
                      className="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div
                        className={[styles.prodctThumbnail, "col-md-3"].join(
                          " "
                        )}
                      >
                        <img
                          src={Sample1}
                          alt="sample "
                          style={{ position: "absolute" }}
                          className={styles.productImg}
                        />

                        <span className={styles.imgCount}>
                          <span className={styles.countOuter}>1</span>
                        </span>
                      </div>
                      <div className="col-md-6">
                        <span className="bold-600"> {itm.title}</span>
                        <br />
                        <span> {itm.sizes}</span>/<span> {itm.color}</span>/
                        <span> {itm.bookingdays}</span>
                        <br />
                        <span>
                          Date: {moment(itm.startdate).format("MMM DD, YYYY")}{" "}
                          to{" "}
                        </span>
                        <span>
                          {moment(itm.enddate).format("MMM DD, YYYY")}
                        </span>
                      </div>
                      <div className="bold-600 col-md-3"></div>
                    </div>
                  </li>
                ))}
              </ul>
              <hr style={{ width: "90%", display: "flex", margin: "auto" }} />
              {/* <div className={styles.pricingBlock}>
                <span className={styles.productListingText}>Subtotal</span>
                <span className="bold-600">AED299.00</span>
              </div>
              <div className={styles.pricingBlock}>
                <span>Shipping</span>
                <span className="bold-600">Free</span>
              </div>
              <hr style={{ width: "90%", display: "flex", margin: "auto" }} />
              <div className={styles.pricingBlock}>
                <span className="bold-500">Total</span>
                <span className={[styles.totalAmount, "bold-600"].join(" ")}>
                  AED299.00
                </span>
              </div>

              <hr style={{ width: "90%", display: "flex", margin: "auto" }} /> */}
              <div className={styles.scheduleBlock}>
                <h4 className="bold-500">Pickup Delivery Details</h4>
                <h6>
                  <i>
                    {" "}
                    ** We would like to schedule pickup for the above item
                    before Rental start date. Please select your preffred pickup
                    details
                  </i>
                </h6>
                {/* <div>
                  <span> Select Date</span>
                </div>
                <div>
                  <span> Select Time</span>
                </div> */}
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className={styles.dateTimePickerContainer}>
                      <span style={{ marginRight: 20 }}>
                        Select Pickup Date:
                      </span>
                      <DatePicker
                        label="Select Pickup Date *"
                        onChange={startDatHandler}
                        value={startDate !== "" && dayjs(startDate)}
                      />
                    </div>
                    <div className={styles.timePickerContainer}>
                      <span style={{ marginRight: 20 }}>Select Time Slots</span>{" "}
                      <select className={styles.dropdownStyle}>
                        <option> 9AM - 11AM </option>
                        <option> 11AM - 1PM</option>
                        <option> 1PM - 3PM</option>
                        <option> 3PM - 5PM</option>
                        <option> 5PM - 7PM</option>
                        <option> 7PM - 9PM</option>
                      </select>
                    </div>
                    {startDateTimeErr !== "" && (
                      <span
                        style={{ textAlign: "left", width: "100%" }}
                        className={styles.errorStyle}
                      >
                        {startDateTimeErr !== "" && startDateTimeErr}
                      </span>
                    )}
                  </LocalizationProvider>
                </div>
                <h6 className="mt-3">
                  <i>
                    {" "}
                    ** Please share your Whatsapp location on the same number
                    where you received the order details
                  </i>
                </h6>

                <button
                  className={styles.Savebutton}
                  onClick={() => handleSchedule()}
                >
                  Schedule Pickup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pickup;
