// src/components/ProfileEdit.js
import React, { useEffect, useState } from "react";
import styles from "./UserMessages.module.css";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
// import Notification from '../../organisms/Notification/notification';
import { useDispatch, useSelector } from "react-redux";
import ApiService from "../../../utils/middleware/ApiService";
// import { setUser } from '../../../utils/redux/actions';
import moment from "moment";

const UserMessages = () => {
  const [formData, setFormData] = useState([]);

  const [showLoader, setShowLoader] = useState(true);
  const { userInfo } = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function data() {
      let header = {
        Token: userInfo.token,
      };
      ApiService.get("/v1/userMessages/", {}, header, (res, err) => {
        if (res !== null) {
          setFormData(res.results);
          setShowLoader(false);
        } else {
          console.log(err);
          setShowLoader(false);
        }
      });
    }
    data();
    setTimeout(() => {
      const element = document.getElementById("myDiv");
      element.scrollTop = element.scrollHeight;
    }, 2000);
  }, []);

  useEffect(() => {
    async function fetchChatUsers() {
      let header = {
        Token: userInfo.token,
      };
      let url = "/v1/marketing_users/getChatUsers";
      if (searchText !== "") {
        url = url + "?name=" + searchText;
      }
      ApiService.get(url, {}, header, (res, err) => {
        if (res !== null) {
          setUserList(res.results);
          setShowLoader(false);
        } else {
          console.log(err);
          setShowLoader(false);
        }
      });
    }
    fetchChatUsers();
  }, [searchText]);

  const handleUserChange = (e) => {
    setSearchText(e.target.value);
  };
  const onSelectUser = (user) => {
    setShowLoader(true)
    setSelectedUser(user);
    let header = {
      Token: userInfo.token,
    };
    let url = "/v1/getChatByUser/" + user.phone_number;
    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        setFormData(res.messages);

        setShowLoader(false);
      } else {
        console.log(err);
        setShowLoader(false);
      }
    });
  };

  const sendMessage = () => {
    setShowLoader(true);

    console.log(selectedUser);
    let header = {
      Token: userInfo.token,
    };
    let url = "/v1/sendWhatsappMessage";
    let payload = {
      phone: selectedUser.phone_number,
      message: message,
    };
    setMessage("");
    ApiService.post(url, payload, header, (res, err) => {
      if (res !== null) {
        let url = "/v1/getChatByUser/" + selectedUser.phone_number;
        ApiService.get(url, {}, header, (res, err) => {
          if (res !== null) {
            setFormData(res.messages);

            setShowLoader(false);
          } else {
            console.log(err);
            setShowLoader(false);
          }
        });
      } else {
        console.log(err);
        setShowLoader(false);
      }
    });
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      {/* {showSuccessMsg && <Notification show={showSuccessMsg} msg={SuccessMsg} type="success" />}
      {showErrorMsg && <Notification show={showErrorMsg} msg={ErrorMsg} type="error" />} */}

      <div className="container-fluid cont-padd base-container">
      <div className="text-center mb-3"> <i>****** Please note these are the messages received on whatsapp broadcast number from here we can't initiate message.
        <br/> Messages can be sent through using the templates only and should be responded within 24 hrs of message received Otherwise meta won't deliver the reply to user.******</i></div>

        <div className="d-flex">
          <div className={styles.leftContainer}>
            <div className="w-100">
              <input className="w-100 mb-2" style={{border:'0.3px solid grey'}} placeholder="Search User" value={searchText} onChange={handleUserChange} />
            </div>
            {userList.map((user) => {
              return (
                <div className={styles.userContainer} onClick={() => onSelectUser(user)}>
                  {/* <img src={require("../../../assets/imgs/profile_thumb.jpg")} className={styles.logoDefault} /> */}
                  <span className="ml-2">
                    {user.name} 
                  </span>
                  {/* <br /> */}
                  {/* <i style={{fontSize:12}}> {user.phone_number}</i>
                  {console.log(user)} */}
                </div>
              );
            })}
          </div>
          <div className="d-flex flex-column w-100">
            <div className={styles.whatsappPreview}>
              <div className={styles.whatsappHeader}>
                <img src={require("../../../assets/imgs/LOGO.jpeg")} alt="Profile" className={styles.profileImage} />
                <div className={styles.profileInfo}>
                  <h4 style={{ lineHeight: 1 }}>
                    {Object.keys(selectedUser).length === 0 && "SIZ"} {selectedUser?.name}{" "}
                    <img src={require("../../../assets/imgs/verified.png")} alt="verified" className={styles.verifiedIcon} />
                  </h4>
                  {/* <span className={styles.status}>Online</span> */}
                </div>
                {/* <div className={styles.whatsappActions}>
                  <span className="mt-2">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" height="20">
                      <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
                    </svg>
                  </span>
                  <span>
                    <img src={require('../../../assets/imgs/video.png')} alt="verified" className={styles.verifiedIcon} />
                  </span>
                </div> */}
              </div>
              <div className={styles.whatsappMessage} id="myDiv">
                {formData.map((msg, index) => {
                  return (
                    <>
                      {msg.name === "SIZ" ? (
                        <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                          <span className="mr-2">{moment(msg.createdAt).format("DD-MM, hh:mm A")}</span>
                          <img src={require("../../../assets/imgs/siz_thumb.png")} className={[styles.logoDefault, "mb-1"].join(" ")} />
                        </div>
                      ) : (
                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                          <img src={require("../../../assets/imgs/profile_thumb.jpg")} className={styles.logoDefault} />

                          <span className="ml-2">
                            {msg.name}, {msg.phone_number}, {moment(msg.createdAt).format("DD-MM, hh:mm A")}
                          </span>
                        </div>
                      )}

                      <div
                        className={styles.messageContent}
                        key={index}
                        style={msg.name === "SIZ" ? { marginLeft: "auto", background: "#ae0f0f", color: "white" } : { marginRight: "auto" }}
                      >
                        {msg.imageUrl ? (
                          <img src={msg.imageUrl} style={{ height: 500 }} />
                        ) : (
                          <span className={styles.headerContent}>{msg.message}</span>
                        )}
                      </div>
                    </>
                  );
                })}

                {formData.length === 0 && <span className="text-center d-block">No messages</span>}
              </div>
              <div className={styles.sendMsgContainer}>
                <input
                  type="text"
                  className={styles.sendMsgInput}
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={onEnterPress}
                  style={{border:'0.3px solid grey'}}
                />
                <img
                  src={require("../../../assets/imgs/send.png")}
                  className={[styles.sendIcon, "cursor"].join(" ")}
                  alt="send_icon"
                  onClick={sendMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMessages;
