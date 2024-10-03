import React, { useContext, useEffect, useState } from "react";
import styles from "./DepositForm.module.scss";
import { Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { DepositValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import axios from "axios";
import { use } from "framer-motion/client";
import { AllAccountProvider } from "../../Layouts/HomeLayout/HomeLayout";

export function DepositForm({ accStatus, selectedAcc }) {
  console.log("wiithdraw", selectedAcc);
  const {setUpdateAccounts} = useContext(AllAccountProvider);

  const toast = useToast();
  const navigate = useNavigate();
  const initialValues = {
    amount: "",
    pin: "",
  };

  // useEffect(() => {
  //   accStatus === "Active" ? setDisabled(false) : setDisabled(true);
  // });
  const onSubmit = (values) => {
    if(!selectedAcc?.accountId){
      toast({
        title: "Choose an account",
        // description: "Choose",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    else{
    const data = {
      accountId: Number(selectedAcc.accountId),
      amount: Number(values.amount),
      pin: values.pin.toString(),
    };
    console.log(data);
    const url = `https://localhost:7135/api/accountActions/${selectedAcc.accountId}/depositFunds`;
    console.log(url);
    axios
      .post(url, data)
      .then((result) => {
        console.log(result);

        toast({
          title: "Deposit Successful",
          // description: "Kindly login to continue.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setUpdateAccounts(prev => prev + 1)
        navigate("/myprofile");
      })
      .catch((error) => {
        console.log(error);
        let error1 = error.response.data.toString().split('\r\n')[0]
        let error2 = error1.split(':')[1]

        toast({
          title: "Deposit Unsuccessful",
          description: error2,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });}
  };
  return (
    <div className={styles.container}>
      <h2>Deposit Money</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={DepositValidation}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          return (
            <Form className={styles.form}>
              <FormikControl
                control="input"
                name="amount"
                placeholder="Amount"
                type="number"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />
              <FormikControl
                control="input"
                name="pin"
                placeholder="PIN"
                type="password"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />
              <Button type="submit" className={styles.btn} isDisabled={false}>
                Deposit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default DepositForm;
