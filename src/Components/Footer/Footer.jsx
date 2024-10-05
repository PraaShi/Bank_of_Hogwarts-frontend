import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

function Footer() {
  const options = [
    "Digital Banking",
    "Instant Credit",
    "Instant Debit",
    "Instant Transafer Fund",
    "Loan Availing",
    "Digital Banking",
    "Instant Credit",
    "Instant Debit",
    "Instant Transafer Fund",
    "Loan Availing",
  ];
  return (
    <div className={styles.parentContainer}>
      <div className={styles.footer}>
        <div className={styles.details}>
          <h2>Loan</h2>
          <div>
            <Link to='/loan'>Car Loan</Link>
            <Link to='/loan'>Education Loan</Link>
            <Link to='/loan'>Personal Loan</Link>
            <Link to='/loan'>Business Loan</Link>
          </div>
        </div>
        <div className={styles.details}>
          <h2>Transaction</h2>
          <div>
            <Link to='/transactions'>Withdraw</Link>
            <Link to='/transactions'>Deposite</Link>
            <Link to='/transactions'>Transfer</Link>
            <Link to='/transactions'>Add Beneficiary</Link>
          </div>
        </div>
        <div className={styles.details}>
          <h2>Profile</h2>
          <div>
            <Link to='/myprofile'>Change PIN</Link>
            <Link to='/myprofile'>Request Deactivation</Link>
            <Link to='/myprofile'>Apply Loan</Link>
            <Link to='/myprofile'>Account Details</Link>
          </div>
        </div>
        <div className={styles.social}>
          <h2>Social Media</h2>
          <div>
            <div>
              <img src="/assests/insta.svg" />
            </div>
            <div>
              <img src="/assests/fb.svg" />
            </div>
            <div>
              <img src="/assests/twitter.png" />
            </div>
            <div>
              <img src="/assests/web.svg" />
            </div>
          </div>
        </div>
        <div className={styles.contact}>
          <h2>Contact us</h2>
          <div>
            <div>
              <img src="/assests/mail.svg" />
              bankofhogwarts@gmail.com
            </div>
            <div>
              <img src="/assests/loc.svg" />
              Hogwarts
            </div>
            <div>
              <img src="/assests/ph.svg" />
              1400 8600
            </div>
            <Link to='/help'>
              <img src="/assests/help.svg" />
              Help
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.scrolling}>
          <div className={styles.scrolling_items}>
            {options.map((option, index) => (
              <div className={styles.content}>
                <p key={index}>{option}</p>
                <img src="/assests/star.svg"></img>
              </div>
            ))}
          </div>
          <div className={styles.scrolling_items}>
            {options.map((option, index) => (
              <div className={styles.content}>
                <p key={index}>{option}</p>
                <img src="/assests/star.svg"></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
