import styles from "./BeneficiaryForm.module.scss";
import { Formik, Form } from "formik";
import { BeneficiaryValidation } from "../../Lib/Validator";
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
import Filters from "../Filters/Filters";
import axios from "axios";
import { AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";

function BeneficiaryForm({ isOpen, onOpen, onClose ,onSubmit}) {
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

const initialValues={
  accountName:'',
  accountNumber:'',
  branch:null
}
useEffect(() => {
  if (authData?.customerId) {
    const url = `https://localhost:7135/api/branch/allBranch`;
    console.log(url);
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      })
      .then((result) => {
        setBranches(result.data.$values);
        console.log(result.data, "branchesss");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }
}, [authData]);

useEffect(() => {
  const options = branches.map((branchData) => {
    return {
      label: branchData.branchName,
      value: Number(branchData.branchId),
    };
  });
  setBranchOptions(options);
  console.log(options);
}, [branches]);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent maxW="40vw" height="60vh" className={styles.container}>
          <ModalHeader>
            <h2>Add Beneficiary</h2>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={BeneficiaryValidation}
              onSubmit={onSubmit}
            >
              <Form className={styles.form}>
                <FormikControl
                  control="input"
                  name="accountName"
                  placeholder="Account Name"
                  type="text"
                  variant="filled"
                  fieldStyle={styles.inputField}
                  focusBorderColor="gray.400"
                />
                <FormikControl
                  control="input"
                  name="accountNumber"
                  placeholder="Account Number"
                  type="text"
                  variant="filled"
                  fieldStyle={styles.inputField}
                  focusBorderColor="gray.400"
                />
                <FormikControl
                  control="select"
                  name="branch"
                  placeholder="Branch"
                  variant="filled"
                  dropDownOptions={branchOptions}
                  fieldStyle={styles.inputField}
                  focusBorderColor="gray.400"
                />
                <Button type="submit" className={styles.btn}>
                  Add
                </Button>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BeneficiaryForm;
