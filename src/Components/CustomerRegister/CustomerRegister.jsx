import React from "react";
import styles from "./CustomerRegister.module.scss";
import { Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { CustomerRegistorValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import axios from "axios";

function CustomerRegister() {
  const navigate = useNavigate();
  const toast = useToast();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    dob: "",
    aadharNumber: "",
    pan: "",
    address: "",
  };

  const dropDownOptions = [
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Others",
      value: "other",
    },
  ];

  const onSubmit = (values) => {
    const data={
      FirstName:values.firstName,
      MiddleName:values.middleName,
      LastName:values.lastName,
      Gender:values.gender,
      ContactNumber:values.phoneNumber,
      Address:values.address,
      DateOfBirth:values.dob.toISOString().slice(0, 10),
      AadharNumber:values.aadharNumber,
      Pan:values.pan,
      Email: values.email,
      Password: values.password,
    }
    const url ='https://localhost:7135/api/customer/register'
    axios.post(url,data)
    .then((result) => {
      console.log(result)

      toast({       //toast
        title: 'Registered Successfully.',
        description: "Kindly login to continue.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate("/auth")
    })
    .catch((error) => {
      console.log(error)
    })
  };

  return (
    <div className={styles.container}>
      <h2>Start Your Journey!</h2>
      <div className={styles.frame}>
        <h2>Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={CustomerRegistorValidation}
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
                name="middleName"
                placeholder="Middle Name"
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

            <div className={styles.wrapper}>
              <FormikControl
                control="select"
                name="gender"
                placeholder="Gender"
                dropDownOptions={dropDownOptions}
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />

              <FormikControl
                control="date"
                name="dob"
                placeholder="Date Of Birth"
                type="date"
                variant="filled"
                fieldStyle={styles.datePicker}
                focusBorderColor="gray.400"
              />
            </div>

            <div className={styles.wrapper}>
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
            </div>

            <FormikControl
              control="textarea"
              name="address"
              placeholder="Address"
              type="text"
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            />

            <div className={styles.wrapper}>
              <FormikControl
                control="input"
                name="aadharNumber"
                placeholder="Aadhar Number"
                type="text"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />

              <FormikControl
                control="input"
                name="pan"
                placeholder="Pan"
                type="text"
                variant="filled"
                fieldStyle={styles.inputField}
                focusBorderColor="gray.400"
              />
            </div>

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

export default CustomerRegister;
