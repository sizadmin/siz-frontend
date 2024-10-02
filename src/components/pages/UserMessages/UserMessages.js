// src/components/ProfileEdit.js
import React, { useEffect, useState } from 'react';
import styles from './UserMessages.module.css';
import ActivityLoader from '../../atom/ActivityLoader/ActivityLoader';
// import Notification from '../../organisms/Notification/notification';
import { useDispatch, useSelector } from 'react-redux';
import ApiService from '../../../utils/middleware/ApiService';
// import { setUser } from '../../../utils/redux/actions';
import moment from 'moment';

const UserMessages = () => {
  const [formData, setFormData] = useState([]);
  // const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  // const [SuccessMsg, setSuccessMsg] = useState('');
  const [showLoader, setShowLoader] = useState(true);
  const { userInfo } = useSelector((state) => state.user);
  // const [showErrorMsg, setShowErrorMsg] = useState(false);
  // const [ErrorMsg, setErrorMsg] = useState('');
  // const dispatch = useDispatch();

  useEffect(() => {
    async function data() {
      let header = {
        Token: userInfo.token,
      };
      ApiService.get('/v1/userMessages/', {}, header, (res, err) => {
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
      const element = document.getElementById('myDiv');
      element.scrollTop = element.scrollHeight;
    }, 2000);
  }, []);

  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      {/* {showSuccessMsg && <Notification show={showSuccessMsg} msg={SuccessMsg} type="success" />}
      {showErrorMsg && <Notification show={showErrorMsg} msg={ErrorMsg} type="error" />} */}

      <div className="container-fluid cont-padd base-container">
        <div className={styles.whatsappPreview}>
          <div className={styles.whatsappHeader}>
            <img src={require('../../../assets/imgs/LOGO.jpeg')} alt="Profile" className={styles.profileImage} />
            <div className={styles.profileInfo}>
              <h4 style={{ lineHeight: 1 }}>
                Sizters App <img src={require('../../../assets/imgs/verified.png')} alt="verified" className={styles.verifiedIcon} />
              </h4>
              <span className={styles.status}>Online</span>
            </div>
            <div className={styles.whatsappActions}>
              <span className="mt-2">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" height="20">
                  <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
                </svg>
              </span>
              <span>
                <img src={require('../../../assets/imgs/video.png')} alt="verified" className={styles.verifiedIcon} />
              </span>
            </div>
          </div>
          <div className={styles.whatsappMessage} id="myDiv">
            {formData.map((msg,index) => {
              return (
                <div className={styles.messageContent} key={index}>
                  <span className={styles.headerTitle}>{msg.name}</span>
                  <span className={styles.headerTitle}>{msg.phon}</span>
                  <span className={styles.headerContent}>{msg.message}</span>
                  <span className={styles.headerFooter}>{moment(msg.createdAt).format('DD MMM YYYY hh:mm a')}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMessages;
