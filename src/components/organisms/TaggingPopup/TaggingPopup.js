import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import closeIcon from './../../../assets/imgs/cross.png';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import { backendHost as API_URL } from '../../../config/config';
import { useSelector } from 'react-redux';

const TaggingPopup = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    tags: [],
  });

  const customStyles = {
    control: (base) => ({
      ...base,
      height: '100%',
      minHeight: '100%',
      width: '100%',
    }),
    menu: (base) => ({
      ...base,
      width: '100%',
      zIndex: 99999,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '100%',
      maxHeight: '900px',
      overflowY: 'auto',
      padding: '0px 8px',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: 40,
    }),
    input: (provided, state) => ({
      ...provided,
      height: 40,
      padding: 0,
      margin: 0,
    }),
    container: (provided, state) => ({
      ...provided,
      minWidth: '100%',
    }),
  };

  const getContactLists = async (val) => {
    let options = [];
    let url = `/v1/contact_list?value=`;
    try {
      const response = await axios.get(API_URL.getAPIUrl() + url + val, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userInfo.token,
        },
      });
      options = response.data.results.map((res) => ({
        label: res.name, // Adjust according to your API response structure
        value: res._id, // Adjust according to your API response structure
      }));
      return options;
    } catch (error) {
      console.error('Error fetching contact list:', error);
      return [];
    }
  };

  const onChangePermissions = (selectedOptions) => {
    if (!selectedOptions) {
      selectedOptions = [];
    }
    console.log(selectedOptions, 'selectedOptions');
    setFormData((prevData) => ({
      ...prevData,
      tags: selectedOptions,
    }));
  };
  console.log(formData)

  return (
    <Modal show={props.show} dialogClassName="modal-90w" className="my-modal" id="DeletePopup">
      <Modal.Header>
        <Modal.Title className={['d-flex justify-content-between w-100 font-weight-bold'].join(' ')}>{props.headerTitle}</Modal.Title>
        <button type="button" className="custom-close-button" aria-label="Close" onClick={props.onClose}>
          <img src={closeIcon} alt="Close" className={'closeIcon'} />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mt-2">
          <h5>
            {/* <input type="text" placeholder="Enter Tag Name" className="w-100" /> */}
            <CreatableSelect
              className="modal-custom-input"
              onChange={onChangePermissions}
              defaultOptions
              isMulti
              loadOptions={async (inputValue, callback) => {
                if (inputValue === '') {
                  let options = await getContactLists(inputValue);
                  setTimeout(() => {
                    callback(options);
                  }, 1000);
                  callback(options);
                } else {
                  let options = await getContactLists(inputValue);
                  setTimeout(() => {
                    callback(options);
                  }, 1000);
                  callback(options);
                }
              }}
              placeholder="Select Contact List"
              styles={customStyles}
              value={formData?.tags && Array.isArray(formData.tags) && formData.tags.length > 0
                ? formData.tags.map(tag => ({ label: tag.label, value: tag.value }))
                : null // Fallback to the state-managed selected options
              }            />
          </h5>
          <div className="d-flex justify-content-center mt-4 mb-3">
            <button className="btn btn-primary" onClick={props.onDelete}>
              {/* {props.buttonTitle} */}
              Save
            </button>
            <button className="btn btn-secondary ml-3" onClick={props.onClose}>
              Cancel
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TaggingPopup;
