import React, { useContext, useEffect, useState } from "react";
import styles from "./AccountRegister.module.scss";
import { Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { AccountRegisterValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import { AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";
import axios from "axios";

function AccountRegister() {
  const [branches, setBranches] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [accountTypeOptions, setAccountTypeOptions] = useState([]);
  const authData = useContext(AuthDataProvider);

  const toast = useToast();
  const navigate = useNavigate();

  const initialValues = {
    newPin: null,
    confirmPin: null,
    customerId: null,
    accountType: null,
    branchId: null,
  };

  // const url = `https://localhost:7135/api/customer/${authData?.customerId}/createAccounts`;

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
    if (authData?.customerId) {
      const url = `https://localhost:7135/api/accountType/allAccountTypes`;
      console.log(url);
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        })
        .then((result) => {
          setAccountTypes(result.data.$values);
          console.log(result.data, "branchesss");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
  }, [authData]);

  useEffect(() => {
    const options = accountTypes.map((accountData) => {
      return {
        value: accountData.accountTypeId,
        label: accountData.accountTypeName,
      };
    });
    setAccountTypeOptions(options);
    console.log(options);
  }, [accountTypes]);

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

  const onSubmit = (values) => {
    const data = {
      pin: values.newPin,
      customerId: authData.customerId,
      accountTypeId: values.accountType,
      branchId: values.branchId,
      balance: 0,
    };
    const url = `https://localhost:7135/api/customer/${authData?.customerId}/createAccounts`;
    console.log(url);
    axios
      .post(url, data)
      .then((result) => {
        console.log(result);

        toast({
          title: "Registered Successfully.",
          description: "Kindly wait for approval",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/myprofile");
      })
      .catch((error) => {
        console.log(error);

        toast({
          title: "Registered Unsuccessful.",
          description: "Try after a while",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <div className={styles.container}>
      <h2>Start Your Journey!</h2>
      <div className={styles.frame}>
        <h2>Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={AccountRegisterValidation}
          onSubmit={onSubmit}
        >
          <Form className={styles.form}>
            <FormikControl
              control="select"
              name="accountType"
              placeholder="Account Type"
              dropDownOptions={accountTypeOptions}
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            />

            <FormikControl
              control="select"
              name="branchId"
              placeholder="Branch"
              dropDownOptions={branchOptions}
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            />

            {/* <FormikControl
              control="input"
              name="balance"
              placeholder="Balance"
              type="number"
              variant="filled"
              fieldStyle={styles.inputField}
              focusBorderColor="gray.400"
            /> */}
            <div className={styles.wrapper}>
              <FormikControl
                control="input"
                name="newPin"
                placeholder="PIN"
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
            </div>
            <Button type="submit" className={styles.loginbtn}>
              Register
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AccountRegister;
