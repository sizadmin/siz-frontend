import React from "react";

import styles from "./card.module.css";

const CardComponent = ({ data, userRole }) => {
  return (
    <div className={[styles.filterBlock, "expand-collapse"].join(" ")}>
      <div className="expand-collapse-content">
        <div style={{justifyContent:"center"}} className={[styles.cardDiv, "col-md-12","row","d-flex","p-3"].join(" ")}> 
          {/* start admin view  */}
          {userRole === "Admin" && (
            <>
              <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
                <h4>{data.totalPrice}</h4>
                <h8>Total Rental Price</h8>
              </div>

              <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
                <h4>{data.totalExpenses}</h4>
                <h8>Total Expenses</h8>
              </div>

              <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
                <h4>{data.totalProfit}</h4>
                <h8>Total Gross Profit</h8>
              </div>

              <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
                <h4>{data.totalLendersShare}</h4>
                <h8>Total Lender's Share</h8>
              </div>

              <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
                <h4>{data.totalRentalFees - data.totalLendersShare}</h4>
                <h8>Net Profit</h8>
              </div>
            </>
          )}

          {/* end admin view  */}
          {userRole !== "Admin" && (
            <>
              <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
                <h4>{data.totalPrice}</h4>
                <h8>Total Rental Price</h8>
              </div>

              <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
                <h4>{data.totalExpenses}</h4>
                <h8>Total Expenses</h8>
              </div>

              <div className={[styles.cardStyle, "col-md-2"].join(" ")}>
                <h4>{data.totalLendersShare}</h4>
                <h8>Total Lender's Share</h8>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
