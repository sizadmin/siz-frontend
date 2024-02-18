import React, { useContext, useEffect, useState } from "react";
import Logo from "./../../../assets/imgs/LOGO.jpeg";
import UserIcon from "./../../../assets/svgs/Avatar.svg";

import SideNavbarIcon from "./../../../assets/svgs/sidebar-left.svg";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "./index.module.css";
import { navData } from "./navData";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { setUser } from "../../../utils/redux/actions";
import { Reset_DATA } from "../../../utils/redux/actions/commonActions";

const SideNavbar = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useHistory();

  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      <div className="justify-content-between d-flex pt-2 pb-2 pl-2">
        {open && <img src={Logo} alt="logo" className={styles.logoStyle} />}

        <img
          src={SideNavbarIcon}
          alt="SideNavbarIcon"
          className={styles.SideNavbarIcon}
          onClick={toggleOpen}
        />
      </div>
      <div className="d-flex flex-column">
        <div className="mt-5">
          {navData.map((item) => {
            return (
              <>
                {item.text === "Users" &&
                userInfo.loggedUser.role.role_name !== "Admin" ? (
                  <></>
                ) : (
                  <NavLink
                    key={item.id}
                    className={[
                      window.location.pathname === item.link &&
                        styles.activeRoute,
                      "p-2 align-items-center d-flex ",
                      styles.sideitem,
                    ].join(" ")}
                    to={item.link}
                  >
                    <img
                      src={item.icon}
                      alt={item.icon}
                      className={styles[item.class]}
                    />
                    {open && (
                      <span className={styles.linkText}>{item.text}</span>
                    )}
                  </NavLink>
                )}
              </>
            );
          })}
        </div>
        <div className={styles.userInfoOuter}>
          <img
            src={UserIcon}
            alt={"userIcon"}
            className={styles.userIconStyle}
          />
          {open && (
            <>
              <div className="d-flex flex-column">
                <span
                  className={styles.usernameStyle}
                  title={`${userInfo.loggedUser.first_name} ${userInfo.loggedUser.last_name}`}
                >
                  {userInfo.loggedUser.first_name}{" "}
                  {userInfo.loggedUser.last_name}
                </span>
                <span
                  className={styles.emailStyle}
                  title={userInfo.loggedUser.email}
                >
                  {userInfo.loggedUser.email}
                </span>
              </div>
              {/* <span className={styles.dotStyles}>...</span> */}
              <DropdownButton id="dropdown-item-button" title="...">
                <Dropdown.Item as="button">Profile</Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => {
                    setUser({
                      userInfo: {},
                    });
                    Reset_DATA({});
                    navigate.push("/");
                  }}
                >
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export { SideNavbar };
