import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { Button } from "@chakra-ui/react";
import { AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";
import { useNavigate } from "react-router-dom";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Counter({ endValue, duration, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Calculate the increment value and interval duration
    const incrementValue = endValue / (duration / 12); // Increment value based on duration
    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount += incrementValue;
      setCount(Math.min(currentCount, endValue)); // Set count or endValue, whichever is smaller

      if (currentCount >= endValue) {
        clearInterval(interval); // Stop the interval once the target value is reached
      }
    }, 10); // Update every 10ms

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [endValue, duration]);

  return (
    <span>
      {count.toFixed(1)}
      {suffix} {/* Adjust toFixed as per decimal points required */}
    </span>
  );
}

function Home() {
  const authData = useContext(AuthDataProvider);
  const navigate = useNavigate();

  console.log("authhh", authData);
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.slogan}>
          <div>
            Digital Banking
            <br />
            <div>
              Made For
              <Button variant="outline">
                <img src="/assests/stargreen.svg"></img>
              </Button>
            </div>
            Digital Users
          </div>
          <div>
            BankOfHogearts is a all-in-one banking website which make it easy
            for the customer to make things in seconds
          </div>
          <Button
            onClick={() => {
              navigate("/transactions");
            }}
          >
            send money now
          </Button>
        </div>
        <div className={styles.card}>
          <img src="/assests/card1.png"></img>
          <img src="/assests/whitecard1.png"></img>
          <img src="/assests/card1.png"></img>
          <div className={styles.semicircle}></div>
        </div>
        <div className={styles.statistics}>
          <Button variant="outline">
            <img src="/assests/fourdots.svg"></img>
          </Button>
          <div>
            {/* <p>7.5M</p> */}
            <p>
              <Counter endValue={7.5} duration={2000} suffix="M" />
            </p>
            <p>Total Active Accounts</p>
          </div>
          <div>
            {/* <p>2.4%</p> */}
            <p>
              <Counter endValue={2.4} duration={2000} suffix="%" />
            </p>
            <p>Total Daily Transaction</p>
          </div>
        </div>
      </div>

      <div className={styles.phContainer}>
        <h2>Save When You Send Worldwide</h2>
        <div className={styles.faqsContainer}>
          <div className={styles.faqs}>
            <Accordion className={styles.faq}>
              <AccordionItem className={styles.accordionItem}>
                <h2>
                  <AccordionButton
                    sx={{
                      color: "#e8f4e9",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      height: "10vh",
                      borderTop: "none",
                    }}
                    className={styles.accordionButton}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      Why should I choose Bank of Hogwarts over other banks?
                    </Box>
                    <AccordionIcon
                      sx={{ color: "#e8f4e9" }}
                      className={styles.accordionIcon}
                    />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={4}
                  sx={{
                    color: "#e8f4e9",
                    padding: "10px 20px",
                    borderBottom: "1px solid #5b7758",
                  }}
                  className={styles.accordionPanel}
                >
                  Bank of Hogwarts offers personalized banking solutions with
                  cutting-edge technology and world-class customer service. Our
                  unique combination of flexible financial products, competitive
                  interest rates, and 24/7 online support ensures you have
                  everything you need to manage your finances effectively
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton
                    sx={{
                      color: "#e8f4e9",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      height: "10vh",
                      borderTop: "none",
                    }}
                    className={styles.accordionButton}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      What services make Bank of Hogwarts stand out?
                    </Box>
                    <AccordionIcon className={styles.accordionIcon} />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className={styles.accordionPanel}>
                  We provide a comprehensive suite of services, including
                  savings and checking accounts, loan products tailored to your
                  needs, investment opportunities, and secure digital banking.
                  Our seamless mobile and online banking platforms offer you
                  convenience without compromising on security.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton
                    sx={{
                      color: "#e8f4e9",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      height: "10vh",
                      borderTop: "none",
                    }}
                    className={styles.accordionButton}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      How secure is my money with Bank of Hogwarts?
                    </Box>
                    <AccordionIcon className={styles.accordionIcon} />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className={styles.accordionPanel}>
                  Security is our top priority. Bank of Hogwarts uses advanced
                  encryption technologies and multi-factor authentication to
                  protect your financial data. We also provide real-time fraud
                  monitoring and notifications to ensure your assets are
                  safeguarded at all times.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton
                    sx={{
                      color: "#e8f4e9",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      height: "10vh",
                      borderTop: "none",
                    }}
                    className={styles.accordionButton}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      What benefits do I get as a Bank of Hogwarts customer?
                    </Box>
                    <AccordionIcon className={styles.accordionIcon} />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className={styles.accordionPanel}>
                  As a valued customer, you enjoy a range of exclusive benefits,
                  including personalized financial advice, fee-free ATM
                  withdrawals at thousands of locations, and rewards for
                  everyday banking. Plus, our loyalty program offers unique
                  perks for long-term customers.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
          <div className={styles.homePic}>
            <img src="/assests/iPhone2.png" />
          </div>
        </div>
      </div>


      <div className={styles.outerMostSwiper}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className={styles.outerSwiper}
        >
          <SwiperSlide className={styles.innerSwiper}>
            <img src="assests/b5.png" alt="Image 1" />
          </SwiperSlide>
          <SwiperSlide className={styles.innerSwiper}>
            <img src="/assests/b7.png" alt="Image 2" />
          </SwiperSlide>
          <SwiperSlide className={styles.innerSwiper}>
            <img src="/assests/b6.png" alt="Image 3" />
          </SwiperSlide>
          <SwiperSlide className={styles.innerSwiper}>
            <img src="/assests/b2.png" alt="Image 4" />
          </SwiperSlide>
          <SwiperSlide className={styles.innerSwiper}>
            <img src="/assests/b3.png" alt="Image 5" />
          </SwiperSlide>
          <SwiperSlide className={styles.innerSwiper}>
            <img src="/assests/b1.png" alt="Image 6" />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* <div></div> */}
    </div>
  );
}

export default Home;
