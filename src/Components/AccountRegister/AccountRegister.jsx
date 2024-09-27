import React from 'react'
import styles from "./AccountRegister.module.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { AccountRegistorValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";

function AccountRegister() {
    const initialValues = {
        pin: null,
        confirmPin:null,
        customerId:null,
        accountTypeId:null,
        branchId:null,
        balance:null
      };
    
      const dropDownOptions = [
        {
          label: "Savings",
          value: "savings",
        },
        {
          label: "Salary",
          value: "salary",
        },
        {
          label: "Business",
          value: "business",
        },
      ];
    
      const onSubmit = (values) => {
        console.log(values);
      };
  return (
    <div className={styles.container}>
      <h2>Start Your Journey!</h2>
      <div className={styles.frame}>
        <h2>Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={AccountRegistorValidation}
          onSubmit={onSubmit}
        >
          <Form className={styles.form}>
            <div className={styles.wrapper}>
              <FormikControl
                control="input"
                name="pin"
                placeholder="PIN"
                type="text"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />

              <FormikControl
                control="input"
                name="customer"
                placeholder="Customer"
                type="text"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />
            </div>

            <FormikControl
              control="select"
              name="accountType"
              placeholder="Account Type"
              dropDownOptions={dropDownOptions}
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            />

            <FormikControl
              control="select"
              name="branch"
              placeholder="Branch"
              dropDownOptions={dropDownOptions}
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            />

            <FormikControl
              control="input"
              name="balance"
              placeholder="Balance"
              type="text"
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            />
            <Button type="submit" className={styles.loginbtn}>
              Register
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default AccountRegister