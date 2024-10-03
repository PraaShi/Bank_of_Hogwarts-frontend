import React, { useState } from "react";
import styles from "./Login.module.scss";
import { Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { loginValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    console.log(values);
    const data = {
      email: values.email,
      password: values.password,
      userType: "Customer",
    };
    const url = "https://localhost:7135/api/auth/login";
    axios
      .post(url, data)
      .then((result) => {
        if(result.data.status == 'Active'){
        toast({       //toast
          title: 'login Successfully.',
          description: "",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        console.log(result);
        const token = result.data.token;
        const customerId = result.data.customerId
        localStorage.setItem("jwtToken", token,1800000); 
        localStorage.setItem("customerId", customerId,1800000) //30 min after the token will go
        navigate("/");
      }else{
        toast({       //toast
          title: 'login UnSuccessfully.',
          description: "Customer is Inactive",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
      })
      .catch((error) => {
        toast({       //toast
          title: 'login failed.',
          description: "",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        console.log(error);
      });
  };

 
  return (
    <div className={styles.container}>
      <h2>Hello Again!</h2>
      <div className={styles.login}>
        <h2>Sign In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidation}
          onSubmit={onSubmit}
        >
          <Form className={styles.form}>
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
              control="input"
              name="password"
              placeholder="Password"
              type="password"
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            />
            <Button type="submit" className={styles.btn}>
              Login
            </Button>
          </Form>
        </Formik>
        <p>
          Not a User? <Link to="/auth/customerRegister">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
