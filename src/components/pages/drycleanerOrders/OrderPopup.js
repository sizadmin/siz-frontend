import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./index.module.css";
import ApiService from "../../../utils/middleware/ApiService";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
import _ from "lodash";
import moment from "moment/moment";
import { CustomSelect } from "../../atom/CustomSelect/CustomSelect";
import {
  emailRegx,
  handleCustomErrorMsg,
  handleIsRequiredError,
  phoneNumberRegx,
} from "../../../utils/Helper";
import Notification from "../../organisms/Notification/notification";
import CloseIcon from "./../../../assets/svgs/Close_icon.svg";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import GalleryComponent from "../../atom/GalleryComponent/GalleryComponent";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

function OrderPopup(props) {
  const handleClose = () => props.hide();
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState(props?.propsData);
  const [showLenderInfo, setShowLenderInfo] = useState(false);

  const [showLenderBankInfo, setShowLenderBankInfo] = useState(false);

  const [isRequiredError, setIsRequiredError] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  useEffect(() => {}, []);

  const onChangeSelect = (e, field) => {
    if (field === "role") {
      let findRole = props.rolesData.find((role) => role.value === e.value);

      if (findRole && findRole.label === "Lender") {
        setShowLenderInfo(true);
        setShowLenderBankInfo(true);
      } else {
        setShowLenderInfo(false);

        setShowLenderBankInfo(false);
      }
    }
    setFormData((prevData) => {
      return {
        ...prevData,
        [field]: e.value,
      };
    });
  };

  const updateDate = (e, field) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [field]:
          e == null ? null : moment(dayjs(e).toString()).format("YYYY-MM-DD"),
      };
    });
  };

  const updateOrder = () => {
    setIsRequiredError(false);
    setShowLoader(true);
    let payload = {};
    payload._id = formData._id;
    payload.order_status = formData.order_status;
    payload.drycleaner_payment = formData.drycleaner_payment;
    payload.pickup_by_dry_cleaner_from_renter =
      formData.pickup_by_dry_cleaner_from_renter;
    // payload.rental_end_date =
    //   formData.product_delivery_date_to_lender;

    ApiService.post(
      "/v1/order-status/updateOrderByDryCleaner",
      payload,
      {},
      (res, err) => {
        if (res !== null) {
          setSuccessMsg("Order updated successfully");
          setShowSuccessMsg(true);
          setTimeout(() => {
            setShowLoader(false);
            handleClose();
          }, 3000);
          props.getOrders();
        } else {
          console.log(err);
          setShowLoader(false);
        }
      }
    );
  };
  return (
    <>
      {showLoader && <ActivityLoader show={showLoader} />}
      {showSuccessMsg && (
        <Notification show={showSuccessMsg} msg={SuccessMsg} type="success" />
      )}
      <Modal
        show={props.show}
        onHide={() => handleClose}
        dialogClassName="modal-90w"
        className="my-modal modal-90w"
      >
        <Modal.Header className="align-items-center">
          <Modal.Title
            className={[
              styles.third_titile,
              "d-flex justify-content-between align-items-center",
            ].join(" ")}
          >
            {props.isNew === true ? "Create Order" : "Edit Order"}
          </Modal.Title>
          <img
            src={CloseIcon}
            alt="close popup icon"
            className="cursor"
            onClick={handleClose}
          />
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h6 className={[styles.third_titile, "mb-2"].join(" ")}>
                Order Items :
              </h6>

              <Table className={styles.tableShadow}>
                <Thead>
                  <Tr style={{ background: "#af1010", color: "white" }}>
                    <Th style={{ width: 40 }}>#</Th>
                    <Th>Product Image</Th>
                    <Th>Name</Th>
                    <Th>Brand </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {formData?.order_details?.line_items.length === 0 ? (
                    <>
                      <Tr>
                        <Td colSpan="8">
                          <div className="w-100 text-center">
                            No Items Found
                          </div>
                        </Td>
                      </Tr>
                    </>
                  ) : (
                    <>
                      {formData?.order_details?.line_items.length > 0 &&
                        formData?.order_details?.line_items.map((item, i) => (
                          <React.Fragment key={i + "_items"}>
                            <Tr style={{ borderBottom: "1px solid #e7d9d9" }}>
                              <Td>{i + 1}</Td>
                              <Td>
                                <div
                                  style={{
                                    height: 80,
                                    width: 80,
                                    boxShadow:
                                      "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    margin: "auto",
                                  }}
                                >
                                  <GalleryComponent
                                    images={
                                      item.images !== undefined &&
                                      item.images.length > 0
                                        ? item.images
                                        : []
                                    }
                                  />
                                </div>
                              </Td>
                              <Td style={{ fontSize: "small" }}>
                                {item.title ? item.title : "-"}
                              </Td>
                              <Td style={{ fontSize: "small" }}>
                                {item.vendor ? item.vendor : "-"}
                              </Td>
                            </Tr>
                          </React.Fragment>
                        ))}
                    </>
                  )}
                </Tbody>
              </Table>
            </div>

            <br />
            <h6>Order Details:</h6>
            <div className="row col-md-12 p-4">
              <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
                <h6 className={styles.third_titile}>Order ID:</h6>
                <div className={styles.modalElementDivStyle}>
                  {/* <input
                    type="text"
                    className={styles.customInputStyle}
                    value={formData._id}
                    disabled={true}
                  /> */}
                  {formData._id}
                </div>
              </div>

              <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
                <h6 className={styles.third_titile}>Pickup Date:</h6>
                <div className={styles.modalElementDivStyle}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className={"mt-6"}>
                      <DatePicker
                        label="Select Order Pickup Date *"
                        value={
                          formData.pickup_by_dry_cleaner_from_renter !== "" &&
                          dayjs(formData.pickup_by_dry_cleaner_from_renter)
                        }
                        onChange={(e) =>
                          updateDate(e, "pickup_by_dry_cleaner_from_renter")
                        }
                      />
                    </div>
                  </LocalizationProvider>
                  {/* {formData.pickup_by_dry_cleaner_from_renter
                    ? formData.pickup_by_dry_cleaner_from_renter
                    : "-"} */}
                </div>
              </div>
              <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
                <h6 className={styles.third_titile}>Order Status:</h6>
                <div className={styles.modalElementDivStyle}>
                  <CustomSelect
                    options={[
                      { value: "fulfilled", label: "Fulfilled" },
                      {
                        value: "pickedup_drycleaner",
                        label: "Pickedup By Drycleaner",
                      },
                      { value: "delivered", label: "Delivered" },
                      { value: "completed", label: "Completed" },
                      { value: "cancelled", label: "Cancelled" },
                    ]}
                    value={formData.order_status}
                    onChange={(e) => onChangeSelect(e, "order_status")}
                  />
                  {(formData.order_status === null ||
                    formData.order_status === "") &&
                    isRequiredError === true && (
                      <div>{handleIsRequiredError()}</div>
                    )}
                </div>
              </div>
              <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
                <h6 className={styles.third_titile}>Items:</h6>
                <div className={styles.modalElementDivStyle}>
                  {formData.order_details.line_items
                    ? formData.order_details.line_items.length
                    : "-"}
                </div>
              </div>
              <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
                <h6 className={styles.third_titile}>Customer Info:</h6>
                <div className={styles.modalElementDivStyle}>
                  {formData.order_details?.customer?.first_name}{" "}
                  {formData.order_details?.customer?.last_name}
                  <br />
                  <i>{formData?.order_details?.phone}</i>
                </div>
              </div>
              <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
                <h6 className={styles.third_titile}>Pickup Address:</h6>
                <div className={styles.modalElementDivStyle}>
                  {formData?.lender_address ? formData?.lender_address : "-"}
                </div>
              </div>
              <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
                <h6 className={styles.third_titile}>Delivery Address:</h6>
                <div className={styles.modalElementDivStyle}>
                  {formData?.order_details?.customer?.default_address &&
                    formData?.order_details?.customer?.default_address
                      .address1}{" "}
                  {formData?.order_details?.customer?.default_address &&
                    formData?.order_details?.customer?.default_address
                      .address2}{" "}
                  {formData?.order_details?.customer?.default_address &&
                    formData?.order_details?.customer?.default_address
                      .city}{" "}
                  {formData?.order_details?.customer?.default_address &&
                    formData?.order_details?.customer?.default_address
                      .country_name}{" "}
                </div>
              </div>

              {/* <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
                <h6 className={styles.third_titile}>Delivery Date:</h6>
                <div className={styles.modalElementDivStyle}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className={"mt-6"}>
                      <DatePicker
                        label="Select Order Start Date *"
                        value={
                          formData.pickup_by_dry_cleaner_from_renter !== "" &&
                          dayjs(formData.pickup_by_dry_cleaner_from_renter)
                        }
                        onChange={(e) =>
                          updateDate(e, "pickup_by_dry_cleaner_from_renter")
                        }
                      />
                    </div>
                  </LocalizationProvider>
                  {formData?.order_status_extra?.[0]
                    ?.product_delivery_date_to_lender
                    ? moment(
                        formData?.order_status_extra?.[0]
                          ?.product_delivery_date_to_lender
                      ).format("MM/DD/YYYY")
                    : "-"}{" "}
                </div>
              </div> */}
              <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
                <h6 className={styles.third_titile}>Delivery Date:</h6>
                <div className={styles.modalElementDivStyle}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className={"mt-6"}>
                      <DatePicker
                        label="Select Date "
                        value={
                          formData.product_delivery_date_to_lender !== "" &&
                          formData.product_delivery_date_to_lender !== undefined
                            ? dayjs(formData.product_delivery_date_to_lender)
                            : ""
                        }
                        onChange={(e) =>
                          updateDate(e, "product_delivery_date_to_lender")
                        }
                      />
                    </div>
                  </LocalizationProvider>
                </div>
              </div>
              <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
                <h6 className={styles.third_titile}>
                  Dry Cleaner Payment Status:
                </h6>
                <div className={styles.modalElementDivStyle}>
                  <CustomSelect
                    options={[
                      { value: true, label: "Paid" },
                      { value: false, label: "Un-paid" },
                    ]}
                    value={formData.drycleaner_payment}
                    onChange={(e) => onChangeSelect(e, "drycleaner_payment")}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={updateOrder}
            style={{
              background: "rgb(175, 16, 16)",
              borderColor: "rgb(175, 16, 16)",
            }}
          >
            {props.isNew === true ? "Save" : "Update"}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderPopup;
