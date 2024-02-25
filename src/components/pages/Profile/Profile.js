// Profile.js
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { SideNavbar } from "../../atom/SidenavBar/SidenavBar";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
import Header from "./../../organisms/Navbar";
import { connect, useSelector } from "react-redux";
import UserIcon from "./../../../assets/svgs/Avatar.svg";
import ApiService from "../../../utils/middleware/ApiService";
import Notification from "../../organisms/Notification/notification";
import { setUser } from "../../../utils/redux/actions";
import { withRouter } from "react-router-dom";
import { Reset_DATA } from "../../../utils/redux/actions/commonActions";

const Profile = (props) => {
  const [showLoader, setShowLoader] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  const [image, setImage] = useState(
    window.sessionStorage.getItem("profilePicture")
  );
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [SuccessMsg, setSuccessMsg] = useState("");


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    setShowLoader(true);
    let payload = {};
    payload._id = userInfo.loggedUser._id;
    payload.profilePicture = image;

    ApiService.put("/v1/user/" + payload._id, payload, {}, (res, err) => {
      if (res !== null) {
        setSuccessMsg("User updated successfully");
        window.sessionStorage.setItem(
          "profilePicture",
          res.loggedUser.profilePicture
        );
        setShowSuccessMsg(true);
        setTimeout(() => {
          setShowLoader(false);
          window.location.reload();
        }, 3000);
      } else {
        console.log(err);
        setShowLoader(false);
      }
    });
  };
  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      <SideNavbar route={window.location.pathname} />
      {showSuccessMsg && (
        <Notification show={showSuccessMsg} msg={SuccessMsg} type="success" />
      )}
      <div className="container-fluid cont-padd customContainer">
        <Header />
        <div className="d-flex flex-column">
          <div className={styles.profile}>
            <img
              className={styles.avatar}
              src={image ? image : UserIcon}
              alt="Profile Avatar"
            />
            <br />
            <br />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <br />
            <button className={styles.uploadBtn} onClick={handleUpload}>
              Upload
            </button>
            <br />
            <br />
            <div className={styles.info}>
              <p className={styles.email}>
                <span> First Name:</span>{" "}
                <span> {userInfo.loggedUser.first_name}</span>
              </p>
              <p className={styles.email}>
                <span> Last Name:</span>{" "}
                <span> {userInfo.loggedUser.last_name}</span>
              </p>
              <p className={styles.email}>
                <span> Username:</span>{" "}
                <span> {userInfo.loggedUser.username}</span>
              </p>

              <p className={styles.email}>
                <span> Email:</span> <span> {userInfo.loggedUser.email}</span>
              </p>
              <p className={styles.email}>
                <span> Phone number:</span>{" "}
                <span> {userInfo.loggedUser.phone_number}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({ user: state.user }), {
  setUser,
})(withRouter(Profile));
