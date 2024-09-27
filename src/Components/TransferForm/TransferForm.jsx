import React from 'react'
import styles from "./TransferForm.module.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { TransferValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";

function TransferForm({beneficiary}) {
    const initialValues = {
        amount: "",
        pin: "",
      };

      const beneficiaryList = beneficiary.map((ben) => {
        return {
          label:ben,
          value:ben
        }
      })

      const onSubmit = (values) => {
        console.log(values);
      };
  return (
    <div className={styles.container}>
      <h2>Transfer Money</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={TransferValidation}
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
        <FormikControl
            control="select"
            name="beneficiary"
            placeholder="Beneficiary"
            dropDownOptions={beneficiaryList}
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
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

export default TransferForm