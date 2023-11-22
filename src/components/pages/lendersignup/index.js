import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import styles from "./index.module.css";
import logo from "./../../../assets/imgs/LOGO.jpeg";
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


const LenderSignup = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // You can add validation logic here before sending data to the server
  
    // Assuming you have a function to send registration data to the server
    // registerUser(formData);
  
    // Reset the form after submission
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      <div className="container cont-padd">
        <div className="d-flex">
          <div className="w-100">
            <a
              className="navbar-brand d-md-flex align-items-end"
               href="/dashboard"
            >
              <img src={logo} className={styles.Icon} alt="brandLogo" />
            </a>

            <h5 className={["mb-0",styles.headerText].join(" ")} >Lender Registration</h5>
          </div>
          <div className={styles.box1style}>
            
              <form onSubmit={handleFormSubmit}>
                
              </form>

          </div>
        </div>
      </div>
    </>
  );
};
export default LenderSignup;