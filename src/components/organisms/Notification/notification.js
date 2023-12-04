// Example usage in a component

import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = (props) => {
  useEffect(() => {
    if (props.show) {
      toast[props.type](props.msg, {
        position: "top-right",
        autoClose: 3000, // Set the duration
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);
  const handleShowNotification = (type) => {};

  return (
    <div>
      {/* <button
        onClick={() =>
          handleShowNotification("Hello, this is a notification!", "success")
        }
      >
        Show Notification
      </button> */}

      <ToastContainer />
    </div>
  );
};

export default Notification;
