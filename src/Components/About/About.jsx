import React from 'react'
import styles from './About.module.scss'

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.blurBall}>
          <img src="/assests/blurBall.svg" />
        </div>
        <p><span>About Bank of Hogwarts</span><br/><br/>
            Welcome to <span>Bank of Hogwarts</span>, a premier financial institution dedicated to serving the banking needs of individuals and businesses across the magical and non-magical worlds. Founded on the principles of trust, integrity, and excellence, Bank of Hogwarts has grown to become a leading bank, offering a wide range of services designed to meet the diverse needs of our esteemed customers.
            <br/><br/>
            
            At Bank of Hogwarts, we believe in fostering long-term relationships with our clients by delivering exceptional financial solutions that go beyond traditional banking. Whether you are looking to manage personal finances, grow your business, or seek investment opportunities, we are here to provide tailored services that align with your unique requirements.
            <br/><br/>
            Our team of highly skilled professionals works diligently to ensure the highest standards of customer service, security, and confidentiality. From the safety of your savings to the efficiency of your transactions, we are committed to offering innovative and reliable solutions.
            <br/><br/>
            <div className={styles.topic}>Our Vision:</div>
            To be the most trusted and forward-thinking financial institution, creating value for our clients while upholding the highest ethical standards.
            <br/><br/>
            <div className={styles.topic}>Our Mission:</div>
            To empower individuals and businesses with comprehensive banking services, innovative financial products, and unparalleled customer support, ensuring seamless access to financial freedom.
            <br/>
            {/* Core Values:<br/>

            Integrity: We maintain the highest level of honesty and transparency in every interaction.<br/>
            Customer-Centric Approach: Your financial well-being is our top priority.<br/>
            Innovation: We continuously evolve to offer modern banking solutions.<br/>
            Security: We ensure the utmost protection for your assets and data.<br/>
            Excellence: We strive to deliver superior services at every touchpoint.<br/>
            Whether you are a student, a business owner, or an investor, Bank of Hogwarts is your trusted partner in all your financial endeavors. Explore our services, and let us help you achieve your financial goals today.
            <br/> */}
            Thank you for choosing Bank of Hogwarts—where your future is our priority.
        </p>
    </div>
  )
}

export default About