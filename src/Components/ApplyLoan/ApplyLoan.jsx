import styles from "./ApplyLoan.module.scss";
import { Formik, Form } from "formik";
import { ApplyLoanValidation} from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { AllAccountProvider, AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";

function ApplyLoan({ isOpen, onOpen, onClose ,onSubmit, activeAccounts}) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [branches, setBranches] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const authData = useContext(AuthDataProvider);
const [accountOptions, setAccountOptions] = useState([])

const initialValues={
  purpose:'',
  accountId:null,
}
console.log('aplyyy',activeAccounts)

useEffect(() => {
  const options = activeAccounts?.map((acc) => {
    return { label: acc.accountNumber, value: Number(acc.accountId)}
  });
  setAccountOptions(options)
  console.log(accountOptions,'this')
},[activeAccounts])



  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent maxW="40vw" height="60vh" className={styles.container}>
          <ModalHeader>
            <h2>Purpose</h2>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={ApplyLoanValidation}
              onSubmit={onSubmit}
            >
              
              <Form className={styles.form}>
              <FormikControl
                    control="select"
                    name="accountId"
                    placeholder="Choose Account"
                    dropDownOptions={accountOptions}
                    variant="filled"
                    fieldStyle={styles.selectField}
                    focusBorderColor="gray.400"
                  />
                <FormikControl
                  control="textarea"
                  name="purpose"
                  placeholder="Enter the reason why you apply for a loan"
                  type="text"
                  variant="filled"
                  fieldStyle={styles.inputField}
                  focusBorderColor="gray.400"
                />
                <Button type="submit" className={styles.btn}>
                  Submit
                </Button>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ApplyLoan;
