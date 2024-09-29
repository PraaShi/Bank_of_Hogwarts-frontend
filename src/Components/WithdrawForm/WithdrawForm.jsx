import React, { useContext, useEffect, useState } from "react";
import styles from "./WithdrawForm.module.scss";
import { Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { WithdrawValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import axios from "axios";
import { use } from "framer-motion/client";
import { AllAccountProvider } from "../../Layouts/HomeLayout/HomeLayout";

export function WithdrawForm({ accStatus, selectedAcc }) {
  console.log("wiithdraw", selectedAcc);
  const [disabled, setDisabled] = useState(false);
  const [disabed, setDisabed] = useState(false);

  const { setUpdateAccounts } = useContext(AllAccountProvider);

  const toast = useToast();
  const navigate = useNavigate();
  const initialValues = {
    amount: "",
    pin: "",
  };

  useEffect(() => {
    accStatus === "Active" ? setDisabled(false) : setDisabled(true);
  });

  const onSubmit = (values) => {
    if (values.amount < selectedAcc.balance) {
      const data = {
        accountId: Number(selectedAcc.accountId),
        amount: Number(values.amount),
        pin: values.pin.toString(),
      };
      console.log(data);
      const url = `https://localhost:7135/api/accountActions/${selectedAcc.accountId}/withdrawFunds`;
      console.log(url);
      axios
        .post(url, data)
        .then((result) => {
          console.log(result);

          toast({
            title: "Withdraw Successful",
            // description: "Kindly login to continue.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setUpdateAccounts((prev) => prev + 1);
          navigate("/myprofile");
        })
        .catch((error) => {
          console.log(error);

          toast({
            title: "Withdraw Unsuccessful",
            description: "Try after a while.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "Withdraw Unsuccessful",
        description: "Insufficient Balance",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <div className={styles.container}>
      <h2>Withdraw Money</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={WithdrawValidation}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          // useEffect(() => {

          //   if(values.amount > selectedAcc?.balance){
          //     setDisabed(true)
          //   }
          // },[values.amount])
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
                disabled={disabled}
              />
              <FormikControl
                control="input"
                name="pin"
                placeholder="PIN"
                type="password"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
                disabled={disabled}
              />
              <Button type="submit" className={styles.btn} isDisabled={disabed}>
                Withdraw
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default WithdrawForm;
