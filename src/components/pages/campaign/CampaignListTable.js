import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import React, { useState } from 'react';
import styles from './index.module.css';
import CampaignListPopup from './CampaignListPopup';

const CampaignListTable = (props) => {

  const [propsData, setPropsData] = useState();

  const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);

  const handleShowDetails = (user) => {
    setPropsData({
      ...user,
      contact_list: { label: user.contact_list.name, value: user.contact_list._id },
      template:user.template ?? null
    });
    setShowCreateUserPopup(true);
  };

  return (
    <>
      {showCreateUserPopup && (
        <CampaignListPopup
          show={showCreateUserPopup}
          hide={() => setShowCreateUserPopup(false)}
          propsData={propsData}
          isNew={false}
          getCampaignLists={props.getCampaignLists}
          deleteCampaign={(e) => {
            props.deleteCampaign(e);
            setShowCreateUserPopup(false);
          }}
        />
      )}
      <h6 className='mb-2'>Showing {props?.data?.length} Records</h6>
      <Table >
        <Thead>
          <Tr style={{ background: '#af1010', color: 'white' }}>
            <Th style={{ width: 40 }}>#</Th>
            <Th>Campaign Name</Th>
            <Th>Status</Th>
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
              {props?.data?.length > 0 &&
                props?.data?.map((user, i) => (
                  <React.Fragment key={i}>
                    <Tr style={{ borderBottom: '1px solid #e7d9d9' }} onClick={() => handleShowDetails(user)}>
                      <Td>{i + 1}</Td>
                      <Td style={{ whiteSpace: 'nowrap', fontSize: 'small' }}>{user.name ? user.name : '-'}</Td>

                      <Td style={{ fontSize: 'small' }}>{user.isActive === true ? 'Active ' : 'In-active'}</Td>
                    </Tr>
                  </React.Fragment>
                ))}
            </>
          )}
        </Tbody>
      </Table>
    </>
  );
};

export { CampaignListTable };
