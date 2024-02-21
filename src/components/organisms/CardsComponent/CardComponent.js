import React, { useState } from "react";

import styles from "./card.module.css";
// import downArrow from "./../../../assets/svgs/down_arrow.svg";
// import upArrow from "./../../../assets/svgs/up_arrow.svg";

const CardComponent = ({ data, userRole }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className=" justify-content-between pl-3 pr-3 row">
        <div
          className={[styles.cardDiv, "col-md-12", "row", "d-flex", "p-3"].join(
            " "
          )}
        >
          {/* start admin view  */}
          {userRole === "Admin" && (
            <>
              <div className={styles.cardOuter}>
                <span className={styles.cardTitleStyle}>
                  Total Rental Price
                </span>
                <span className={[styles.cardTitleCountStyle].join(" ")}>
                  {data.totalPrice}
                </span>
              </div>

              <div className={styles.cardOuter}>
                <span className={styles.cardTitleStyle}>Total Expenses</span>
                <span className={[styles.cardTitleCountStyle].join(" ")}>
                  {data.totalExpenses}
                </span>
              </div>

              <div className={styles.cardOuter}>
                <span className={styles.cardTitleStyle}>
                  Total Gross Profit
                </span>
                <span className={[styles.cardTitleCountStyle].join(" ")}>
                  {data.totalProfit}
                </span>
              </div>

              <div className={styles.cardOuter}>
                <span className={styles.cardTitleStyle}>
                  Total Lender's Share{" "}
                </span>
                <span className={[styles.cardTitleCountStyle].join(" ")}>
                  {data.totalLendersShare}
                </span>
              </div>

              <div className={styles.cardOuter}>
                <span className={styles.cardTitleStyle}>Net Profit </span>
                <span className={[styles.cardTitleCountStyle].join(" ")}>
                  {Number(
                    data.totalPrice -
                      data.totalExpenses -
                      data.totalLendersShare
                  ).toFixed(2)}
                </span>
              </div>
            </>
          )}

          {/* end admin view  */}
          {userRole !== "Admin" && (
            <>
              <div className={styles.cardOuter}>
                <span className={styles.cardTitleStyle}>
                  Total Rental Price
                </span>
                <span className={[styles.cardTitleCountStyle].join(" ")}>
                  {data.totalPrice}
                </span>
              </div>

              <div className={styles.cardOuter}>
                <span className={styles.cardTitleStyle}>Total Expenses</span>
                <span className={[styles.cardTitleCountStyle].join(" ")}>
                  {data.totalExpenses}
                </span>
              </div>

              <div className={styles.cardOuter}>
                <span className={styles.cardTitleStyle}>
                  Total Lender's Share
                </span>
                <span className={[styles.cardTitleCountStyle].join(" ")}>
                  {data.totalLendersShare}
                </span>
              </div>
            </>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default CardComponent;
