import React, { useState,useEffect } from "react";

import { connect } from "react-redux";
import { withRouter,useHistory } from "react-router-dom";
import { setUser, resetUser } from "../../../../utils/redux/actions";
import { Reset_DATA } from "../../../../utils/redux/actions/commonActions";

import styles from "../index.module.css";
import Logo from "./../../../../assets/imgs/LOGO.jpeg";
import ApiService from "../../../../utils/middleware/ApiService";
import ActivityLoader from "../../../atom/ActivityLoader/ActivityLoader";
const Login = (props) => {
  let history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    props.Reset_DATA();
  });


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    setShowLoader(true);
    var { uname, pass } = document.forms[0];

    let payload = {
      email: uname.value,
      password: pass.value,
    };
    ApiService.post("/v1/login", payload, null, (res, err) => {
      if (res !== null) {
        props.setUser({
          userInfo: res,
        });
        setShowLoader(false);
        if (res.loggedUser.isActive !== true) {
          setErrorMessages({
            message: "You do not have permission Please contact administrator",
          });
          history.push("/");
        } else {
          history.push("/dashboard");
        }
      } else {
        console.log(err);
        setErrorMessages({ message: err.message });
        setShowLoader(false);
      }
    });
  };

  // Generate JSX code for error message
  const renderErrorMessage = () => (
    <label className={styles.error}>{errorMessages.message}</label>
  );

  // JSX code for login form
  const renderForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>Email </label>
          <input type="text" name="uname" required />
        </div>
        <div className={styles.inputContainer}>
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage()}
        </div>
        <div className={styles.buttonContainer}>
          <input type="submit" />
        </div>
      </form>
      <div className="text-center mt-4">
        <a className={styles.link} href="/forgetPassword">
          Forget Password?
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
          <div className={styles.title}>Sign In</div>
          {renderForm}
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({ user: state.user }), {
  setUser,
  resetUser,
  Reset_DATA,
})(withRouter(Login));
