import React from 'react'
import styles from "./MyLoan.module.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../Forms/Formik/FormikControl";

function MyLoan() {
  return (
    <div className={styles.container}>
      <p>Have Any Queries ?</p>
      <Button><Link to='/loanHistory'>My Loan</Link></Button>
    </div>
  )
}

export default MyLoan