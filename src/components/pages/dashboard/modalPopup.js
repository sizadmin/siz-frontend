import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./index.module.css";
import ApiService from "../../../utils/middleware/ApiService";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import moment from "moment/moment";
import { CustomSelect } from "../../atom/CustomSelect/CustomSelect";
function ModalPopup(props) {
  const handleClose = () => props.hide();
  const [getOrdersdata, setOrdersdata] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState(props?.propsData?.order);

  useEffect(() => {
    // setShowLoader(true);
    // getOrderDetails();
  }, []);
  const onChangeSelect = (e, field) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [field]: e.value,
      };
    });
  };
  const onChangeVal = (e, field) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [field]: e.target.value,
      };
    });
  };
  const updateDate = (e, field) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [field]:e == null ? null : moment(dayjs(e).toString()).format("YYYY-MM-DD"),
      };
    });
  };
  const updateOrderDetails = () => {
    setShowLoader(true);
    ApiService.put(
      "/v1/order-status/updateCustomFields/",
      formData,
      {},
      (res, err) => {
        if (res !== null) {
          // setOrdersdata(res.data[0]);
          setShowLoader(false);
          handleClose();
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
      <Modal
        show={props.show}
        onHide={() => handleClose}
        dialogClassName="modal-90w"
        className="my-modal modal-90w"
      >
        <Modal.Header>
          <Modal.Title className={styles.third_titile}>
            Order Details
          </Modal.Title>
          <button
            onClick={handleClose}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          {/* {getOrdersdata === undefined ? (
            <span>No data found.</span>
          ) : ( */}
          <div className="row col-md-12 p-4">
            <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
              <h6 className={styles.third_titile}> Order Type :</h6>
              <div className={styles.modalElementDivStyle}>
                <CustomSelect
                  options={[
                    { value: "Confirmed Order", label: "Confirmed Order" },
                    { value: "Fitting", label: "Fitting" },
                  ]}
                  value={formData.order_type}
                  onChange={(e) => onChangeSelect(e, "order_type")}
                />
              </div>
            </div>
            <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
              <h6 className={styles.third_titile}>Date of fitting:</h6>
              <div className={styles.modalElementDivStyle}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className={"mt-6"}>
                    <DatePicker
                      label="Select Order Start Date *"
                      value={
                        formData.fitting_date !== "" &&
                        dayjs(formData.fitting_date)
                      }
                      onChange={(e) => updateDate(e, "fitting_date")}
                    />
                  </div>
                </LocalizationProvider>
              </div>
            </div>
            <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
              <h6 className={styles.third_titile}>
                Pick up by drycleaner from renter:
              </h6>
              <div className={styles.modalElementDivStyle}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className={"mt-2"}>
                    <DatePicker
                      label="Select Date "
                      value={
                        (formData.pickup_by_dry_cleaner_from_renter !== "") &&
                        dayjs(formData.pickup_by_dry_cleaner_from_renter)
                      }
                      onChange={(e) =>
                        updateDate(e, "pickup_by_dry_cleaner_from_renter")
                      }
                    />
                  </div>
                </LocalizationProvider>
              </div>
            </div>
            <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
              <h6 className={styles.third_titile}>
                Return date by drycleaner to lender :
              </h6>
              <div className={styles.modalElementDivStyle}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className={"mt-2"}>
                    <DatePicker
                      label="Select Date"
                      value={
                        formData.returned_to_lender_by_dry_cleaner !== "" &&
                        dayjs(formData.returned_to_lender_by_dry_cleaner)
                      }
                      onChange={(e) =>
                        updateDate(e, "returned_to_lender_by_dry_cleaner")
                      }
                    />
                  </div>
                </LocalizationProvider>
              </div>
            </div>
            <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
              <h6 className={styles.third_titile}>Returned to Lender:</h6>
              <div className={styles.modalElementDivStyle}>
                <CustomSelect
                  options={[
                    { value: true, label: "Yes" },
                    { value: false, label: "No" },
                  ]}
                  value={formData.returned_to_lender}
                  onChange={(e) => onChangeSelect(e, "returned_to_lender")}
                />
              </div>
            </div>
            <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
              <h6 className={styles.third_titile}>Rental Fees:</h6>
              <div className={styles.modalElementDivStyle}>
                <input
                  type="text"
                  className={styles.customInputStyle}
                  value={formData.rental_fees}
                  onChange={(e) => onChangeVal(e, "rental_fees")}
                />
              </div>
            </div>
            <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
              <h6 className={styles.third_titile}>Expenses:</h6>
              <div className={styles.modalElementDivStyle}>
                <input
                  type="text"
                  className={styles.customInputStyle}
                  value={formData.expenses}
                  onChange={(e) => onChangeVal(e, "expenses")}
                />
              </div>
            </div>
            <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
              <h6 className={styles.third_titile}>Profit:</h6>
              <div className={styles.modalElementDivStyle}>
                <input
                  type="text"
                  className={styles.customInputStyle}
                  value={formData.profit}
                  onChange={(e) => onChangeVal(e, "profit")}
                />
              </div>
            </div>
            <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
              <h6 className={styles.third_titile}>Lender's share:</h6>
              <div className={styles.modalElementDivStyle}>
                <input
                  type="text"
                  className={styles.customInputStyle}
                  value={formData.lenders_share}
                  onChange={(e) => onChangeVal(e, "lenders_share")}
                />
              </div>
            </div>
            <div className={["col-md-6", styles.modalElementStyle].join(" ")}>
              <h6 className={styles.third_titile}>Payment Status:</h6>
              <div className={styles.modalElementDivStyle}>
                <CustomSelect
                  options={[
                    { value: true, label: "Paid" },
                    { value: false, label: "Un-paid" },
                  ]}
                  value={formData.payment_status}
                  onChange={(e) => onChangeSelect(e, "payment_status")}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={updateOrderDetails}
            style={{
              background: "rgb(175, 16, 16)",
              borderColor: "rgb(175, 16, 16)",
            }}
          >
            Update
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPopup;
