import React, { useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setUser, resetUser } from "../../../../utils/redux/actions";

import styles from "../index.module.css";
import Logo from "./../../../../assets/imgs/LOGO.jpeg";
import ApiService from "../../../../utils/middleware/ApiService";
import ActivityLoader from "../../../atom/ActivityLoader/ActivityLoader";
const ForgetPassword = (props) => {
  const [errorMessages, setErrorMessages] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [showSucessMsg, setShowSucessMsg] = useState(false);

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    setShowLoader(true);
    var { uname } = document.forms[0];
    let payload = {
      email: uname.value,
      host: window.location.host,
    };
    ApiService.post("/v1/forgotPassword", payload, null, (res, err) => {
      if (err === null) {
        setShowSucessMsg({ message: res.message });
        setErrorMessages({ message: "" });
        setShowLoader(false);
        // history.push("/dashboard");
      } else {
        console.log(err);
        setShowSucessMsg({ message: "" });
        setErrorMessages({ message: err.message });
        setShowLoader(false);
      }
    });
  };

  // Generate JSX code for error message
  const renderErrorMessage = () => (
    <label className={styles.error}>{errorMessages.message}</label>
  );

  // Generate JSX code for sucess message
  const renderSuccessMessage = () => (
    <label className={styles.success}>{showSucessMsg.message}</label>
  );

  // JSX code for login form
  const renderForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>Email </label>
          <input type="text" name="uname" required />
        </div>
        <div className={styles.inputContainer}>  {renderErrorMessage()} </div>
        <div className={styles.buttonContainer}>
          <input type="submit" />
        </div>
        <div className={styles.inputContainer}>{renderSuccessMessage()}</div>
      </form>
      <div className='text-center'>
        <a className={styles.link} href="/">
           Login
        </a>
      </div>
    </div>
  );

  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      <div className={styles.app}>
        <img src={Logo} alt="logo" className={styles.logoStyle} />
        <div className={styles.loginForm}>
          <div className={styles.title}>Recover Password</div>
          <div className="mt-3">{renderForm}</div>
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({ user: state.user }), {
  setUser,
  resetUser,
})(withRouter(ForgetPassword));
