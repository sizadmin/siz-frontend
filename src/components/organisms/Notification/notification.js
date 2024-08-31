// Example usage in a component

import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = (props) => {
  useEffect(() => {
    if (props.show) {
      toast[props.type](props.msg, {
        position: "top-right",
        autoClose: 5000, // Set the duration
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Notification;
