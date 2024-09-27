import React from "react";
import styles from "./Loan.module.scss";
import LoanTypes from "../LoanTypes/LoanTypes";
import LoanHistory from "../LoanHistory/LoanHistory";

function Loan() {
  return (
    <div className={styles.container}>
      <img className={styles.dash} src="/assests/dash.svg" />
      <div className={styles.home}>
        <div>
          <h2>We Treat each customer as an individual, not a number</h2>
          <h1>
            We offer clear guidance to help you get the best loan available.
          </h1>
        </div>
        <div className={styles.girlImg}>
          <img src="/assests/girl1.png" />
        </div>
      </div>
      <div className={styles.details}>
        <LoanTypes />
        <LoanHistory />
      </div>
    </div>
  );
}

export default Loan;
