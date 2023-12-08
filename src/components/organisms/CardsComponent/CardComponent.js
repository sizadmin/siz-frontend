import React from "react";

import styles from "./card.module.css";

const CardComponent = ({ data }) => {
  return (
    <div className={[styles.filterBlock, "expand-collapse"].join(" ")}>
      <div className="expand-collapse-content">
        <div className="col-md-12 row d-flex p-3 justify-content-between">
          <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
            <h4>{data.totalPrice}</h4>
            <h8>Total Price</h8>
          </div>
          <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
            <h4>{data.totalProfit}</h4>
            <h8>Total Profit</h8>
          </div>
          <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
            <h4>{data.totalRentalFees}</h4>
            <h8>Total Rental Fees</h8>
          </div>
          <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
            <h4>{data.totalLendersShare}</h4>
            <h8>Total Lender's Share</h8>
          </div>
          <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
            <h4>{data.totalExpenses}</h4>
            <h8>Total Expenses</h8>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
