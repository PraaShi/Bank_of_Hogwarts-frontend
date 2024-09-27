import React, { useEffect, useState } from "react";
import styles from "./WithdrawForm.module.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { WithdrawValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";

export function WithdrawForm({accStatus}) {
  const [disabled, setDisabled] = useState(false)
  const initialValues = {
    amount: "",
    pin: "",
  };

  useEffect(()=>{
    accStatus === 'Active' ? setDisabled(false) : setDisabled(true); 
  })
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className={styles.container}>
      <h2>Withdraw Money</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={WithdrawValidation}
        onSubmit={onSubmit}
      >
        <Form className={styles.form} >
          <FormikControl
            control="input"
            name="amount"
            placeholder="Amount"
            type="text"
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
            disabled={disabled}
          />
          <FormikControl
            control="input"
            name="pin"
            placeholder="PIN"
            type="text"
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
            disabled={disabled}

          />
          <Button type="submit" className={styles.btn}>
            Apply
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default WithdrawForm;
