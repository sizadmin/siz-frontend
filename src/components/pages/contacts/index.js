import React, { useState, useEffect } from 'react';

import styles from './index.module.css';
import ApiService from '../../../utils/middleware/ApiService';

import Header from './../../organisms/Navbar';
import { useSelector } from 'react-redux';
import ActivityLoader from '../../atom/ActivityLoader/ActivityLoader';
import { ContactLisTable } from './ContactListTable';
import ContactListPopup from './ContactListPopup';
import Notification from '../../organisms/Notification/notification';
import CreateContactPopup from './CreateContactPopup';

const Contacts = () => {
  const [contactListData, setContactListData] = useState([]);
  const [showCreateContactPopup, setShowCreateContactPopup] = useState(false);

  const [showLoader, setShowLoader] = useState(false);
  const [propsData, setPropsData] = useState({
    name: '',
    isActive: false,
    phone_number: [],
    select_all: false,
  });

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    isActive: false,
    phone_number: '',
  });
  const [showCreateContactListPopup, setShowCreateContactListPopup] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [SuccessMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    async function data() {
      getContactLists();
    }
    data();
  }, []);

  const deleteContactList = (formData) => {
    let header = {
      Token: userInfo.token,
    };
    ApiService.del('/v1/contact_list/' + formData._id, header, {}, (res, err) => {
      if (res !== null) {
        setShowLoader(false);
        setSuccessMsg('Contact List Deleted successfully');
        setShowSuccessMsg(true);
        setShowCreateContactListPopup(false);
        getContactLists();
      } else {
        console.log(err);
        setShowLoader(false);
      }
    });
  };

  const getContactLists = () => {
    setShowLoader(true);

    let url = `/v1/contact_list`;
    let header = {
      Token: userInfo.token,
    };

    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        setContactListData(res.results);
        setShowLoader(false);
      } else {
        console.log(err);
        setShowLoader(false);
      }
    });
  };

  const syncContacts = () => {
    setShowLoader(true);

    let url = `/v1/marketing_users/sync_contacts`;
    let header = {
      Token: userInfo.token,
    };

    ApiService.get(url, {}, header, (res, err) => {
      if (res !== null) {
        setShowSuccessMsg(true);
        setSuccessMsg('Contact Synchronization Started');
        setShowLoader(false);
      } else {
        console.log(err);
        setShowLoader(false);
      }
    });
  };

  const handleUserPopup = () => {
    setShowCreateContactListPopup(true);
  };

  const showCreateContact = () => {
    setShowCreateContactPopup(true);
  };

  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      {showSuccessMsg && <Notification show={showSuccessMsg} msg={SuccessMsg} type="success" />}
      <Header />
      <div className="container-fluid cont-padd">
        <div className="d-flex row justify-content-between p-3">
          <h6>Contact List</h6>
          <div>
            <button className={[styles.applyBtn, 'mr-3'].join(' ')} onClick={showCreateContact}>
              Contacts New Contact
            </button>

            <button className={styles.applyBtn} onClick={syncContacts}>
              Sync Contacts
            </button>

            <button className={[styles.applyBtn, 'ml-3'].join(' ')} onClick={handleUserPopup}>
              Create New Contact List
            </button>
          </div>
        </div>
        {showCreateContactListPopup && (
          <ContactListPopup
            show={showCreateContactListPopup}
            hide={() => setShowCreateContactListPopup(false)}
            propsData={propsData}
            getContactLists={getContactLists}
            isNew={true}
            setSuccessMsg={setSuccessMsg}
            setShowSuccessMsg={setShowSuccessMsg}
            deleteContactList={(e) => deleteContactList(e)}
          />
        )}

        {showCreateContactPopup && (
          <CreateContactPopup
            show={showCreateContactPopup}
            hide={() => setShowCreateContactPopup(false)}
            propsData={userData}
            isNew={true}
            setSuccessMsg={setSuccessMsg}
            setShowSuccessMsg={setShowSuccessMsg}
          />
        )}

        <div>
          <ContactLisTable data={contactListData} getContactLists={getContactLists} deleteContactList={(e) => deleteContactList(e)} />
        </div>
      </div>
    </>
  );
};

export default Contacts;
