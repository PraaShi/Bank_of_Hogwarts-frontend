import React from 'react'
import styles from "./HelpContent.module.scss";

function HelpContent() {
    const qa = [{
        question:'Q: What types of loans are offered by the bank? A: The bank offers the following types of loans:',
        answer:["Personal Loan: Amount up to ₹50,000 with an interest rate of 5.5% for a tenure of 12 months ",
                "Education Loan: Amount up to ₹1,00,000 with an interest rate of 4% for a tenure of 24 months",
                "Home Loan: Amount up to ₹20,00,000 with an interest rate of 6.5% for a tenure of 240 months",
                "Car Loan: Amount up to ₹3,00,000 with an interest rate of 7% for a tenure of 60 months",
                "Business Loan: Amount up to ₹15,00,000 with an interest rate of 8% for a tenure of 36 months"]
    },
    {
        question:'Q: What is the interest rate for different types of loans? A: The interest rates for different loan types are as follows',
        answer:["Personal Loan: 5.5%",
                "Education Loan: 4%",
                "Home Loan: 6.5%",
                "Car Loan: 7%",
                "Business Loan: 8%"]
    },
    {
        question:'Q: What is the maximum tenure for each type of loan? A: The maximum tenure for each loan type is:',
        answer:["Personal Loan: 12 months",
                "Education Loan: 24 months",
                "Home Loan: 240 months",
                "Car Loan: 60 months",
                "Business Loan: 36 months"]
    },
    {
        question:'Q: What are the different types of bank accounts available? A: The bank offers the following types of accounts:',
        answer:["Savings Account: A standard savings account for personal savings.",
                "Salary Account: An account for salaried individuals to receive their monthly salary.",
                "Home Loan: 240 months",
                "Business Account: A dedicated account for business-related transactions.",
                "Fixed Deposit Account: An account to invest a lump sum amount for a fixed period to earn interest"]
    },
    {
        question:'Q: What is a Savings Account? ',
        answer:["A Savings Account is a basic deposit account that allows you to save money securely while earning interest on your balance."]
    },
    {
        question:'Q: What is a Salary Account?',
        answer:["A Salary Account is designed for salaried individuals, allowing them to receive their monthly salary directly into this account"]
    },
    {
        question:'Q: What is a Business Account? ',
        answer:["A Business Account is specifically tailored for business entities to manage their financial transactions efficiently."]
    },
    {
        question:'Q: What is a Fixed Deposit Account?',
        answer:["A Fixed Deposit Account allows you to deposit a lump sum amount for a predetermined period, offering higher interest rates than regular savings accounts"]
    },
    


]
  return (
    <div className={styles.container}>
    {qa.map((data, index) => (
        <div key={index} className={styles.qaSection}>
            <div className={styles.question}>{data.question}</div>
            <div className={styles.answerList}>
                {data.answer.map((value, subIndex) => (
                    <div key={subIndex} className={styles.answer}>
                        {value}
                    </div>
                ))}
            </div>
        </div>
    ))}
</div>
  )
}

export default HelpContent