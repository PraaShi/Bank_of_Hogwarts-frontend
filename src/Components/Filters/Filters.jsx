import React, { useContext, useEffect } from "react";
import styles from "./Filters.module.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { FilterValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import { formatFormikDate } from "../../Lib/Predifined";
import { FilterContext } from "../History/History";

function Filters() {
  const initialValues = {
    type: "all", //default
    timePeriod: "all",
    startDate: null,
    endDate: null,
  };

  const context =
    useContext(FilterContext);


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
      label: "All",
      value: "all",
    },
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Last 10",
      value: "lastTen",
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
      {({ values, errors ,setFieldValue,resetForm}) => {
        useEffect(() => {
          console.log(values.type);
          context?.setTtype(values.type);
        }, [values.type]);

        useEffect(() => {
          console.log(values.timePeriod,"hellllll")
          context?.setTperiod(values.timePeriod);
        }, [values.timePeriod]);

        useEffect(() => {
          context?.setTstartDate(formatFormikDate(values.startDate));
        }, [values.startDate]);

        useEffect(() => {
          console.log(errors.endDate)
          if(errors.endDate ==undefined){
            console.log(formatFormikDate(values.endDate))
            context?.setTendDate(formatFormikDate(values.endDate));
          }
          else{
            context?.setTendDate(null)
          }

        }, [values.endDate,errors.endDate]);

        useEffect(() => {
          // setFieldValue(initialValues)
          resetForm();
        }, [context?.clearFilters])
        

        return (
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
        );
      }}
    </Formik>
  );
}

export default Filters;
