import React from 'react'
import styles from './Footer.module.scss'

function Footer() {
    const options = ["Digital Banking","Instant Credit","Instant Debit","Instant Transafer Fund","Loan Availing","Digital Banking","Instant Credit","Instant Debit","Instant Transafer Fund","Loan Availing"]
  return (
    <div className={styles.container}>
        <div className={styles.scrolling}>
            <div className={styles.scrolling_items}>
                {
                    options.map((option,index) => (
                        <div className={styles.content}>
                            <p key={index}>{option}</p>
                            <img src='/assests/star.svg'></img>
                        </div>
                    ))
                }
            </div>
            <div className={styles.scrolling_items}>
                {
                    options.map((option,index) => (
                        <div className={styles.content}>
                            <p key={index}>{option}</p>
                            <img src='/assests/star.svg'></img>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Footer