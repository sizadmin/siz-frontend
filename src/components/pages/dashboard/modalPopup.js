import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./index.module.css";
import ApiService from "../../../utils/middleware/ApiService";
import ActivityLoader from "../../atom/ActivityLoader/ActivityLoader";
import moment from "moment/moment";
function ModalPopup(props) {
  const handleClose = () => props.hide();
  const [getOrdersdata, setOrdersdata] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    getOrderDetails();
  }, []);
  const getOrderDetails = () => {
    setShowLoader(true);
    ApiService.get(
      "/v1/order-status/" + props.propsData.order_id,
      {},
      {},
      (res, err) => {
        if (res !== null) {
          setOrdersdata(res.data[0]);
          setShowLoader(false);
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
      <Modal show={props.show} onHide={() => handleClose}>
        <Modal.Header>
          <Modal.Title>Order Details</Modal.Title>
          <button
            onClick={handleClose}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          {getOrdersdata === undefined ? (
            <span>No data found.</span>
          ) : (
            <>
              <div className="row">
                <div>
                  <div className="col-md-6 flex-column d-flex mb-3">
                    <span className={[styles.third_titile, "mb-0"].join(" ")}>
                      Order-ID
                    </span>
                    <span>{getOrdersdata.orderID}</span>
                  </div>
                  <div className="col-md-6 flex-column d-flex mb-3">
                    <span className={[styles.third_titile, "mb-0"].join(" ")}>
                      Shopify Order Number
                    </span>
                    <span>{props.propsData.shopify_order_number}</span>
                  </div>
                </div>
                <br /> <br />
                <hr />
                <span className={styles.second_titile}>
                  Order Pickup Details
                </span>
                <div className="col-md-6">
                  <span className={styles.third_titile}> Pickup Date</span>
                  <div>
                    {getOrdersdata.product_pickup_date === null
                      ? "-"
                      : moment(getOrdersdata.product_pickup_date).format(
                          "MMM DD, YYYY"
                        )}
                  </div>
                </div>
                <div className="col-md-6">
                  <span className={styles.third_titile}> Pickup Time Slot</span>
                  <div>
                    {getOrdersdata.product_pickup_timeslot === null ||
                    getOrdersdata.product_pickup_timeslot === ""
                      ? "-"
                      : getOrdersdata.product_pickup_timeslot}
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <span className={styles.second_titile}>
                  Order Delivery Details
                </span>
                <div className="col-md-6">
                  <span className={styles.third_titile}> Delivery Date</span>
                  <div>
                    {getOrdersdata.product_delivery_date === null
                      ? "-"
                      : moment(getOrdersdata.product_delivery_date).format(
                          "MMM DD, YYYY"
                        )}
                  </div>
                </div>
                <div className="col-md-6">
                  <span className={styles.third_titile}>
                    {" "}
                    Delivery Time Slot
                  </span>
                  <div>
                    {getOrdersdata.product_delivery_timeslot === null ||
                    getOrdersdata.product_delivery_timeslot === ""
                      ? "-"
                      : getOrdersdata.product_delivery_timeslot}
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPopup;
