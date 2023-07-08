import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import styles from "./index.module.css";

const Dashboard = () => {
 
  useEffect(() => {
   
  }, []);
 

  return (
    <>
      {/* {showLoader && <ActivityLoader show={showLoader} />} */}
      <div className="container cont-padd">
       Dashboard is in development mode.
      </div>
    </>
  );
};

export default Dashboard;
