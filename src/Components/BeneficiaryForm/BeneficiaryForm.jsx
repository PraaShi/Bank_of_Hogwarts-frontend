import styles from "./BeneficiaryForm.module.scss";
import { Formik, Form } from "formik";
import { BeneficiaryValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import React, { useState } from "react";
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

function BeneficiaryForm({ isOpen, onOpen, onClose ,onSubmit}) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

const initialValues={
  accountName:'',
  accountNumber:'',
  branch:''
}

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
                  control="input"
                  name="branch"
                  placeholder="Branch"
                  type="text"
                  variant="filled"
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
