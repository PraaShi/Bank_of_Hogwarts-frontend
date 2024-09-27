import React, { useContext } from "react";
import styles from "./ChangePin.module.scss";
import { Button, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { ChangePinValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import axios from "axios";
import { AccountDataProvider } from "../../Layouts/HomeLayout/HomeLayout";

export function ChangePinBack({ setvalue }) {

  const toast = useToast()
  const {accountDetails} = useContext(AccountDataProvider)
 
  const initialValues = {
    oldPin: "",
    newPin: "",
    confirmPin: "",
  };



  const onSubmit = (values) => {
    console.log(accountDetails.accountId)
    const data={
      oldPin: values.oldPin.toString(),
      newPin: values.newPin.toString(),
      accountId: accountDetails?.accountId.toString()
    }
    console.log(data)
    const url =`https://localhost:7135/api/accountActions/${accountDetails.accountId}/change-pin`
   console.log(url)
    axios.post(url,data)
    .then((result) => {
      console.log(result)
      setvalue(false);

      toast({      
        title: 'Pin Changed Successfully',
        // description: "Kindly login to continue.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

    })
    .catch((error) => {
      console.log(error);
      
      toast({      
        title: 'Pin Change Failed',
        // description: "Kindly login to continue.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    })
  };
  return (
    <div className={styles.container} style={{ transform: "rotateY(180deg)" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={ChangePinValidation}
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
          <FormikControl
            control="input"
            name="oldPin"
            placeholder="Old Pin"
            type="password"
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
          <FormikControl
            control="input"
            name="newPin"
            placeholder="New Pin"
            type="password"
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
          <FormikControl
            control="input"
            name="confirmPin"
            placeholder="Confirm Pin"
            type="password"
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
          <Button type="submit" className={styles.loginbtn}>
            Change
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export function ChangePinFront({ setvalue }) {
  return (
    <div className={styles.container}>
      <div className={styles.front}>
        <h2>
          Kindly Change the PIN frequently to keep your Account Secured !!
        </h2>
        <div />
        <Button onClick={() => setvalue(true)}>Change Pin</Button>
        <div />
      </div>
    </div>
  );
}
