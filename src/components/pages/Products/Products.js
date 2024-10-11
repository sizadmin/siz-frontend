// src/components/ProfileEdit.js
import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';
import ActivityLoader from '../../atom/ActivityLoader/ActivityLoader';
// import Notification from '../../organisms/Notification/notification';
import { useDispatch, useSelector } from 'react-redux';
import ApiService from '../../../utils/middleware/ApiService';
// import { setUser } from '../../../utils/redux/actions';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Notification from '../../organisms/Notification/notification';

const Products = () => {
  const [formData, setFormData] = useState([]);

  const [showLoader, setShowLoader] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [SuccessMsg, setSuccessMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState('');

  const uploadProducts = (user) => {
    setShowLoader(true);
    let header = {
      Token: userInfo.token,
    };
    let url = '/v1/siz-app/recentProducts/';
    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        setShowLoader(false);
        setSuccessMsg('Products Uploaded successfully');
        setShowSuccessMsg(true);
        setTimeout(() => {
          setErrorMsg('');
          setShowSuccessMsg(false);
        }, 3000);
      } else {
        console.log(err);
        setShowLoader(false);
        setErrorMsg('Failed to Upload Product on website');
        setShowErrorMsg(true);

        setTimeout(() => {
          setErrorMsg('');
          setShowErrorMsg(false);
        }, 3000);
      }
    });
  };
  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      {showSuccessMsg && <Notification show={showSuccessMsg} msg={SuccessMsg} type="success" />}
      {showErrorMsg && <Notification show={showErrorMsg} msg={ErrorMsg} type="error" />}

      <div className="container-fluid cont-padd base-container">
        {/* <button variant="primary">Products</button> */}
        <div className="d-flex justify-content-end ml-auto w-100">
          <Button className="btn-primary" onClick={uploadProducts}>
            Upload Products to Web-site
          </Button>
        </div>
      </div>
    </>
  );
};

export default Products;
