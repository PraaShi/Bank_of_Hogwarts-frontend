import React from "react";
import styles from "./EmployeeRegister.module.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { EmployeeRegistorValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";

function EmployeeRegister() {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    position: "",
  };

  const dropDownOptions = [
    {
      label: "AssistantManager",
      value: "assistantManager",
    },
    {
      label: "SeniorOfficer",
      value: "seniorOfficer",
    },
    {
      label: "JuniorOfficer",
      value: "juniorOfficer",
    },
    {
      label: "Teller",
      value: "teller",
    },
    {
      label: "CustomerServiceRepresentative",
      value: "customerServiceRepresentative",
    },
    {
      label: "LoanOfficer",
      value: "loanOfficer",
    },
  ];

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className={styles.container}>
      <h2>Start Your Journey!</h2>
      <div className={styles.frame}>
        <h2>Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={EmployeeRegistorValidation}
          onSubmit={onSubmit}
        >
          <Form className={styles.form}>
            <div className={styles.wrapper}>
              <FormikControl
                control="input"
                name="firstName"
                placeholder="First Name"
                type="text"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />

              <FormikControl
                control="input"
                name="lastName"
                placeholder="Last Name"
                type="text"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />
            </div>

            <FormikControl
              control="input"
              name="phoneNumber"
              placeholder="phonenumber"
              type="text"
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            />

            <FormikControl
              control="input"
              name="email"
              placeholder="Email"
              type="email"
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            />

            <FormikControl
              control="select"
              name="position"
              placeholder="Position"
              dropDownOptions={dropDownOptions}
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            />

            <div className={styles.wrapper}>
              <FormikControl
                control="input"
                name="password"
                placeholder="Password"
                type="password"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />

              <FormikControl
                control="input"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />
            </div>
            <Button type="submit" className={styles.loginbtn}>
              Register
            </Button>
          </Form>
        </Formik>
        <p>
          Already a User? <Link to="/auth">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default EmployeeRegister;
