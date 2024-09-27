import React from "react";
import styles from "./ApplyLoan.module.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { ApplyLoanValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";

function ApplyLoan() {
  const initialValues = {
    loanType: "",
    purpose: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const dropDownOptions = [
    {
      label: "Home",
      value: "home",
    },
    {
      label: "Personal",
      value: "personal",
    },
    {
      label: "Business",
      value: "business",
    },
    {
      label: "Education",
      value: "education",
    },
    {
      label: "Car",
      value: "car",
    },
  ];

  return (
    <div className={styles.container}>
      <h2>Apply Loan</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={ApplyLoanValidation}
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
          <FormikControl
            control="select"
            name="loanType"
            placeholder="Loan Type"
            dropDownOptions={dropDownOptions}
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
          <FormikControl
            control="input"
            name="purpose"
            placeholder="Purpose"
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
  );
}

export default ApplyLoan;
