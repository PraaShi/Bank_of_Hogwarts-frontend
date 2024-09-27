import React, { useContext } from 'react'
import styles from './Home.module.scss'
import { Button } from '@chakra-ui/react';
import { AuthDataProvider } from '../../Layouts/HomeLayout/HomeLayout';

function Home() {
  const authData= useContext(AuthDataProvider);

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
        <Button>send money now</Button>
      </div>
      <div className={styles.card}>
        <img src='/assests/card.png'></img>
        <img src='/assests/whitecard.png'></img>
        <img src='/assests/card.png'></img>
        <div className={styles.semicircle}></div>
      </div>
      <div className={styles.statistics}>
        <Button variant='outline'>
          <img src='/assests/fourdots.svg'></img>
        </Button>
        <div>
          <p>7.5M</p>
          <p>Total Active Accounts</p>
        </div>
        <div>
          <p>2.4%</p>
          <p>Total Daily Transaction</p>
        </div>
      </div>
    </div>
  )
}

export default Home