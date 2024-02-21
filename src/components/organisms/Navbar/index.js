import React, { useEffect, useState } from "react";
import Styles from "./style.module.css";
import logo from "./../../../assets/imgs/LOGO.jpeg";
import { connect, useSelector } from "react-redux";
import { useLocation, withRouter } from "react-router-dom";
import { setUser, resetUser } from "../../../utils/redux/actions";
import { Reset_DATA } from "../../../utils/redux/actions/commonActions";
import { useHistory } from "react-router-dom";

// import ClientSelect from "./ClientSelect";

const Header = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useHistory();
  const [toggleBar, setToggleBar] = useState(false);
  const [path, setPath] = useState(window.location.pathname);

  return (
    // <nav className="navbar navbar-expand-md navbar-dark" id="banner">
    //   <div className="container-fluid" style={{ paddingLeft: "13px" }}>
    //     {/* <!-- Brand --> */}
    //     <a className="navbar-brand d-md-flex align-items-end" href="/dashboard">
    //       <img src={logo} className={Styles.Icon} alt="brandLogo" />
    //     </a>
    //     {/* <h4 className="title mb-0 d-none d-lg-block">SIZ</h4> */}

    //     <h5 className={["mb-0", Styles.headerText].join(" ")}>
    //       Order Management Dashboard
    //     </h5>
    //     {/* <!-- Toggler/collapsibe Button --> */}
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-toggle="collapse"
    //       data-target="#collapsibleNavbar"
    //       onClick={() => setToggleBar(!toggleBar)}
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     {/* <!-- Navbar links --> */}
    //     <div
    //       className="collapse navbar-collapse"
    //       id="collapsibleNavbar"
    //       style={{ display: toggleBar === true ? "block" : "none" }}
    //     >
    //       <ul className="navbar-nav ml-auto">
    //         {/* change dropdown start  */}
    //         {/* <!-- Dropdown --> */}
    //         <li>
    //           <div className="d-flex flex-column">
    //             <a href="/dashboard" className="m-2">
    //               Orders
    //             </a>
    //           </div>
    //         </li>
    //         <li>
    //           <div className="d-flex flex-column">
    //             {userInfo?.loggedUser.role.role_name === "Admin" && (
    //               <a href="/lendersignup" className="m-2">
    //                 Users
    //               </a>
    //             )}
    //           </div>
    //         </li>

    //         <li>
    //           <div className="d-flex flex-column" style={{ color: "black" }}>
    //             <span>
    //               {userInfo?.loggedUser?.first_name}{" "}
    //               {userInfo?.loggedUser?.last_name}
    //             </span>
    //             <span>{userInfo?.loggedUser?.phone_number}</span>
    //           </div>
    //         </li>
    //         <li className="nav-item dropdown d-lg-block">
    //           {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}

    //           {/* <a href="/"> */}
    //           <button
    //             className="dropdown-item"
    //             style={{
    //               background: "lightgrey",
    //               padding: 9,
    //               borderRadius: 10,
    //             }}
    //             onClick={() => {
    //               props.setUser({
    //                 userInfo: {},
    //               });
    //               props.Reset_DATA({});
    //               navigate.push("/");
    //             }}
    //           >
    //             Logout
    //           </button>
    //           {/* </a> */}
    //           {/* <a
    //             className="nav-link dropdown-toggle"
    //             href="#"
    //             id="navbardrop"
    //             data-toggle="dropdown"
    //           >
    //             <span className="rounded-icons profileIcon">
    //             <i className="fa fa-user" aria-hidden="true"></i>
    //             </span>
    //           </a>
    //           <div className="dropdown-menu">
    //             <a
    //               className="dropdown-item"
    //               href="/"
    //               onClick={() => {
    //                 props.setUser({
    //                   userInfo: {},
    //                 });
    //                 props.Reset_DATA({});
    //               }}
    //             >
    //               Logout
    //             </a>
    //           </div>
    //         </li>

    //         <li className="nav-item d-lg-none d-lg-block">
    //           <b className={Styles.supportText}>
    //             <span className="rounded-icons calenderIcon">
    //               <i className="bi bi-box-arrow-left"></i>
    //             </span>
    //             <span>
    //               <a
    //                 className="dropdown-item"
    //                 href="/"
    //                 onClick={() => {
    //                   props.setUser({
    //                     userInfo: {},
    //                   });
    //                   props.Reset_DATA({});
    //                 }}
    //               >
    //                 Logout
    //               </a>
    //             </span>
    //           </b> */}
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <div className="container-fluid" style={{ padding: "0rem 0rem" }}>
      {path === "/dashboard" && (
        <span className={Styles.pageTitle}>Dashboard</span>
      )}
      {path === "/orders" && (
        <span className={Styles.pageTitle}>Order Management</span>
      )}
      {path === "/users" && (
        <span className={Styles.pageTitle}>User management </span>
      )}
      {path === "/dashboardNew" && (
        <span className={Styles.pageTitle}>Dashboard</span>
      )}
      {path === "/profile" && (
        <span className={Styles.pageTitle}>Profile</span>
      )}
      {path === "/drycleaner" && (
        <span className={Styles.pageTitle}>
          Order Management ( Dry Cleaning )
        </span>
      )}

      <hr />
    </div>
  );
};

export default connect((state) => ({ user: state.user }), {
  setUser,
  resetUser,
  Reset_DATA,
})(withRouter(Header));
