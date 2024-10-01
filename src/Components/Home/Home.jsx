import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.scss'
import { Button } from '@chakra-ui/react';
import { AuthDataProvider } from '../../Layouts/HomeLayout/HomeLayout';
import { useNavigate } from 'react-router-dom';

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
      {count.toFixed(1)}{suffix} {/* Adjust toFixed as per decimal points required */}
    </span>
  );
}

function Home() {
  const authData= useContext(AuthDataProvider);
  const navigate = useNavigate()

  console.log('authhh',authData)
  return (
    <div className={styles.container}>
      <div className={styles.slogan}>
        <div>Digital Banking<br/> 
          <div>Made For
            <Button variant='outline'>
                <img src='/assests/stargreen.svg'></img>
            </Button>
          </div>
          Digital Users
        </div>
        <div>BankOfHogearts is a all-in-one banking website which make it easy for the customer to make things in seconds</div>
        <Button onClick={() => {navigate('/transactions')}}>send money now</Button>
      </div>
      <div className={styles.card}>
        <img src='/assests/card1.png'></img>
        <img src='/assests/whitecard1.png'></img>
        <img src='/assests/card1.png'></img>
        <div className={styles.semicircle}></div>
      </div>
      <div className={styles.statistics}>
        <Button variant='outline'>
          <img src='/assests/fourdots.svg'></img>
        </Button>
        <div>
          {/* <p>7.5M</p> */}
          <p><Counter endValue={7.5} duration={2000} suffix="M" /></p>
          <p>Total Active Accounts</p>
        </div>
        <div>
          {/* <p>2.4%</p> */}
          <p><Counter endValue={2.4} duration={2000} suffix="%" /></p>
          <p>Total Daily Transaction</p>
        </div>
      </div>
    </div>
  )
}

export default Home