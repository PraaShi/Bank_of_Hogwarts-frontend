import React from "react";
import styles from "./Filters.module.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { FilterValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";

function Filters() {
  const initialValues = {
    type: "",
    timePeriod: "",
    startDate: "",
    endDate: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const dropDownType = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Credit",
      value: "credit",
    },
    {
      label: "Debit",
      value: "debit",
    },
  ];

  const dropDownPeriod = [
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Last 10",
      value: "last10",
    },
    {
      label: "Last Month",
      value: "lastMonth",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FilterValidation}
      onSubmit={onSubmit}
    >
      <Form className={styles.form}>
        <FormikControl
          control="select"
          name="type"
          placeholder="Type"
          variant="filled"
          dropDownOptions={dropDownType}
          fieldStyle={`${styles.inputField} ${styles.selectField}`}
          focusBorderColor="gray.400"
        />
        <FormikControl
          control="select"
          name="timePeriod"
          placeholder="Time Period"
          variant="filled"
          dropDownOptions={dropDownPeriod}
          fieldStyle={`${styles.inputField} ${styles.selectField}`}
          focusBorderColor="gray.400"
        />
        <FormikControl
          control="date"
          name="startDate"
          placeholder="Start Date"
          variant="filled"
          fieldStyle={styles.datePicker}
          focusBorderColor="gray.400"
        />
        <FormikControl
          control="date"
          name="endDate"
          placeholder="End Date"
          variant="filled"
          fieldStyle={styles.datePicker}
          focusBorderColor="gray.400"
        />
      </Form>
    </Formik>
  );
}

export default Filters;
