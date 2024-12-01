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
import { handleIsRequiredError } from '../../../utils/Helper';

const Products = () => {
  const [formData, setFormData] = useState([]);

  const [showLoader, setShowLoader] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [SuccessMsg, setSuccessMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState('');
  const [isRequiredError, setIsRequiredError] = useState(false);

  const uploadProducts = (user) => {
    if (formData.ids === "" || formData.ids === undefined) {
      setIsRequiredError(true);
      return;
    }
    setIsRequiredError(false);

    setShowLoader(true);
    let header = {
      Token: userInfo.token,
    };
    console.log(formData.ids)
    let id = formData.ids.split(',');
    let url = '/v1/siz-app/uploadProductById/';
    ApiService.post(url, { productid: id }, header, (res, err) => {
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

  const onChangeVal = (e, field) => {
    let inputValue = e.target.value;
    const validInput = inputValue.replace(/[^0-9,]/g, '');

    setFormData((prevData) => {
      return {
        ...prevData,
        [field]: validInput,
      };
    });
  };

  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      {showSuccessMsg && <Notification show={showSuccessMsg} msg={SuccessMsg} type="success" />}
      {showErrorMsg && <Notification show={showErrorMsg} msg={ErrorMsg} type="error" />}

      <div className="container-fluid cont-padd base-container">
        {/* <button variant="primary">Products</button> */}
        {/* <div className="d-flex justify-content-end ml-auto w-100">
          <Button className="btn-primary" onClick={uploadProducts}>
            Upload Products to Web-site
          </Button>
        </div> */}
        <div className={['col-md-12 m-auto'].join(' ')}>
          <h4 className="text-center mt-4 mb-4"> Prouct Upload Form</h4>
          <div className={['col-md-6 m-auto', styles.modalElementStyle].join(' ')}>
            <h6 className={styles.third_titile}>Enter Product Ids by comma separated:</h6>
            <div className={styles.modalElementDivStyle}>
              <textarea type="textarea" rows={4} className={styles.customTextareaStyle} value={formData.ids} onChange={(e) => onChangeVal(e, 'ids')} />
              {(formData.ids === null || formData.ids === '' || formData.ids === undefined) && isRequiredError && <div>{handleIsRequiredError()}</div>}
            </div>

            <div className="d-flex justify-content-center w-100 mt-4">
              <Button className="btn-primary" onClick={uploadProducts}>
                Upload Products to Web-site
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;