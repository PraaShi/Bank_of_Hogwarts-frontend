import React from 'react'
import styles from "./DepositForm.module.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { DepositValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";

function DepositForm() {
    const initialValues = {
        amount: "",
        pin: ""
      };
    
      const onSubmit = (values) => {
        console.log(values);
      };
  return (
    <div className={styles.container}>
        <h2>Deposit Money</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={DepositValidation}
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
        <FormikControl
            control="input"
            name="amount"
            placeholder="Amount"
            type="text"
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
          <FormikControl
            control="input"
            name="pin"
            placeholder="PIN"
            type="text"
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
          <Button type="submit" className={styles.loginbtn}>
            Apply
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default DepositForm