import React from "react";
import Styles from "./style.module.css";
import logo from "./../../../assets/imgs/LOGO.jpeg";
import { connect, useSelector } from "react-redux";
import { useLocation, withRouter } from "react-router-dom";
import { setUser, resetUser } from "../../../utils/redux/actions";
import { Reset_DATA } from "../../../utils/redux/actions/commonActions";
// import ClientSelect from "./ClientSelect";

const Header = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-md navbar-dark" id="banner">
      <div className="container-fluid" style={{ paddingLeft: "13px" }}>
        {/* <!-- Brand --> */}
        <a
          className="navbar-brand d-md-flex align-items-end"
          href="/dashboard"
        >
          <img src={logo} className={Styles.Icon} alt="brandLogo" />
        </a>
        {/* <h4 className="title mb-0 d-none d-lg-block">SIZ</h4> */}

        <h5 className={["mb-0",Styles.headerText].join(" ")} >Order Management Dashboard</h5>


        {/* <!-- Toggler/collapsibe Button --> */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* <!-- Navbar links --> */}
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            {/* change dropdown start  */}
            {/* <!-- Dropdown --> */}
            <li className="nav-item dropdown  d-none d-lg-block">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}

              <a href="/"><button
                className="dropdown-item"
                
                style={{
                  background: "lightgrey",
                  padding: 9,
                  borderRadius: 10,
                }}
                onClick={() => {
                  props.setUser({
                    userInfo: {},
                  });
                  props.Reset_DATA({});
                }}
              >
                Logout
              </button>
              </a>
              {/* <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbardrop"
                data-toggle="dropdown"
              >
                <span className="rounded-icons profileIcon">
                <i className="fa fa-user" aria-hidden="true"></i>
                </span>
              </a>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  href="/"
                  onClick={() => {
                    props.setUser({
                      userInfo: {},
                    });
                    props.Reset_DATA({});
                  }}
                >
                  Logout
                </a>
              </div>
            </li>

            <li className="nav-item d-lg-none d-lg-block">
              <b className={Styles.supportText}>
                <span className="rounded-icons calenderIcon">
                  <i className="bi bi-box-arrow-left"></i>
                </span>
                <span>
                  <a
                    className="dropdown-item"
                    href="/"
                    onClick={() => {
                      props.setUser({
                        userInfo: {},
                      });
                      props.Reset_DATA({});
                    }}
                  >
                    Logout
                  </a>
                </span>
              </b> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default connect((state) => ({ user: state.user }), {
  setUser,
  resetUser,
  Reset_DATA,
})(withRouter(Header));
