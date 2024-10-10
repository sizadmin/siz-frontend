import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import React, { useEffect, useState } from 'react';
import ContactListPopup from './ContactListPopup';
import { Digital } from 'react-activity';
import CustomPopup from '../../organisms/CustomPopup/customPopup';
import CreateContactPopup from './CreateContactPopup';
import moment from 'moment';
import { Form } from 'react-bootstrap';
import styles from './index.module.css';
import PaginationComponent from '../../atom/Pagination/Pagination';
import TaggingPopup from '../../organisms/TaggingPopup/TaggingPopup';

const ContactTable = (props) => {
  const [propsData, setPropsData] = useState();
  const [deleteUserData, setDeleteUserData] = useState();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
  const [showTaggingPopup, setShowTaggingPopup] = useState(false);

  // const [totalItems, setTotalItems] = useState(props.data.length);

  const handleShowDetails = (user) => {
    setPropsData({
      ...user,
    });
    setShowCreateUserPopup(true);
  };
  const showDeletePopupFunc = (record) => {
    setShowDeletePopup(true);
    setDeleteUserData(record);
  };

  const onDeleteFunc = () => {
    props.onDelete(deleteUserData);
    setDeleteUserData();
    setShowDeletePopup(false);
  };

  const handleToggle = (e) => {
    props.updateCheckedList(e);
  };

  const handleTags = (user) => {
    setShowTaggingPopup(true);
  };
  // useEffect(()=>{
  //   setTotalItems(props.data.length)
  // },[props.data])
  return (
    <>
      {props.loading && <Digital size={50} color="#af1010" />}

      {showCreateUserPopup && (
        <CreateContactPopup
          show={showCreateUserPopup}
          hide={() => setShowCreateUserPopup(false)}
          propsData={propsData}
          isNew={false}
          // setSuccessMsg={setSuccessMsg}
          // setShowSuccessMsg={setShowSuccessMsg}
        />
      )}
      {showTaggingPopup && (<TaggingPopup show={showTaggingPopup} onDelete={() => onDeleteFunc()} headerTitle={'Add Tagging'} onClose={() => setShowTaggingPopup(false)} />)}
      {!props.loading && (
        <>
          {/* <h6 className="mb-2">Showing {props?.data?.length} Records</h6> */}
          <Table>
            <Thead>
              <Tr style={{ background: '#d1d1d1' }}>
                <Th style={{ width: 40 }}></Th>
                <Th style={{ width: 40 }}>#</Th>
                <Th>Name</Th>
                <Th>Contact Number</Th>
                <Th>Status</Th>
                <Th>Created On</Th>
                <Th>Updated On</Th>
                <Th style={{ width: 60, textAlign: 'center' }}>Edit</Th>
                <Th style={{ width: 60, textAlign: 'center' }}>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props?.data?.length === 0 ? (
                <Tr>
                  <Td colSpan="10">
                    <div className="w-100 text-center">No Contact List Found</div>
                  </Td>
                </Tr>
              ) : (
                <>
                  {props?.data?.results.length > 0 &&
                    props?.data?.results.map((user, i) => (
                      <React.Fragment key={i}>
                        <Tr style={{ borderBottom: '1px solid #e7d9d9' }}>
                          <Td>
                            <Form.Check
                              label={''}
                              checked={props.selectedRec.find((i) => i === user._id) ? true : false}
                              onChange={() => handleToggle(user._id)}
                              className={[styles.checkbtn].join(' ')}
                            />
                          </Td>
                          <Td>{i + 1}</Td>
                          <Td style={{ whiteSpace: 'nowrap', fontSize: 'small' }}>
                            <div className="d-flex justify-content-between">
                              <span>{user.first_name || user.last_name ? user.first_name + ' ' + user.last_name : 'Unknown'}</span>
                              {/* <i className="fa fa-tag" aria-hidden="true" onClick={()=>handleTags(user)}></i> */}
                            </div>
                          </Td>
                          <Td style={{ fontSize: 'small' }}>{user.phone_number || '-'}</Td>
                          <Td style={{ fontSize: 'small' }}>{user.whatsapp_messaging === true ? 'Active ' : 'In-active'}</Td>
                          <Td style={{ fontSize: 'small' }}>{moment(user.createdAt).format('DD MMM YYYY hh:mm a')}</Td>
                          <Td style={{ fontSize: 'small' }}>{moment(user.updatedAt).format('DD MMM YYYY hh:mm a')}</Td>
                          <Td style={{ fontSize: 'small', textAlign: 'center' }}>
                            <i className="fa fa-pencil" aria-hidden="true" style={{ fontSize: 20 }} onClick={() => handleShowDetails(user)}></i>
                          </Td>
                          <Td style={{ fontSize: 'small', textAlign: 'center' }}>
                            <i className="fa fa-trash" aria-hidden="true" style={{ fontSize: 20 }} onClick={() => showDeletePopupFunc(user)}></i>
                          </Td>
                        </Tr>
                      </React.Fragment>
                    ))}
                </>
              )}
            </Tbody>
          </Table>
          <div>
            <PaginationComponent
              currentPage={props?.currentPage}
              totalItems={props?.data?.total ? props?.data?.total : 0}
              itemsPerPage={20}
              handlePageChange={props.handlePageChange}
            />
          </div>
          {showDeletePopup && (
            <CustomPopup
              show={showDeletePopup}
              onDelete={() => onDeleteFunc()}
              headerTitle={'Delete User'}
              bodyMessage={'Are you sure? Do you want to delete this user?'}
              onClose={() => setShowDeletePopup(false)}
              buttonTitle={'Delete'}
            />
          )}
        </>
      )}
    </>
  );
};

export { ContactTable };
