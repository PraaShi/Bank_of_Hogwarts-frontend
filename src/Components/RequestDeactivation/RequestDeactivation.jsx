import React, { useContext, useEffect, useState } from "react";
import styles from "./RequestDeactivation.module.scss";
import { Button, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { RequestDeactivationValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import { AccountDataProvider, AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";
import axios from "axios";

export function RequestDeactivationBack({setrequest}) {
  const [formValues, setFormValues] = useState(null);
  const {accountDetails} = useContext(AccountDataProvider)

  const authData = useContext(AuthDataProvider);
const toast = useToast();

  const initialValues = {

    pin: "",
  };

  const onSubmit = (values) => {
    const data={
      pin: values.pin.toString(),
      accountId: accountDetails.accountId
    }
    console.log(data)
    const url =`https://localhost:7135/api/accountActions/${accountDetails.accountId}/request-deactivation`

   console.log(url,'rd')
    axios.post(url,data)
    .then((result) => {
      console.log(result)
      setrequest(false);

      toast({      
        title: 'Deactivation request sent',
        // description: "Kindly login to continue.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

    })
    .catch((error) => {
      setrequest(false);
      console.log(error.response.data);
      toast({      
        title: 'Failed',
        description: error.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
 
    })
  }

  // useEffect(() => {
  //   if (formValues) {
  //     const url = `https://localhost:7135/api/accountActions/${activeAccount}/request-deactivation`;
  //     console.log(url);
  //     axios
  //       .post(url
  //         ,{ pin: formValues.pin }, {
  //         headers: {
  //           Authorization: `Bearer ${authData?.token}`,
  //         },
  //       }
  //     )
  //       .then((result) => {
  //         setrequest(false);
  //         console.log(hello);
  //         toast({       //toast
  //           title: 'Request Sent.',
  //           description: "",
  //           status: 'success',
  //           duration: 5000,
  //           isClosable: true,
  //         })
  //         console.log(result);
  //       })
  //       .catch((error) => {
  //         console.log("Error during deactivation request:",error);
  //         setTransaction([])
  //         toast({       //toast
  //           title: 'Error Occured.',
  //           description: "",
  //           status: 'error',
  //           duration: 5000,
  //           isClosable: true,
  //         })
  //       })
  //       .finally(() => {

  //       });
  //   }
  // }, [activeAccount]);

 
  return (
    <div className={styles.container} style={{ transform: "rotateY(180deg)" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={RequestDeactivationValidation}
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>

          <FormikControl
            control="input"
            name="pin"
            placeholder="Pin"
            type="password"
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
          <Button type="submit" className={styles.loginbtn}>
            Send
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export function RequestDeactivationFront({setrequest}) {
  return (
    <div className={styles.container}>
      <div className={styles.front}>
        <h2>Request Deactivation</h2>
        <div />
        <Button onClick={() => setrequest(true)}>Request</Button>
        <div />
      </div>
    </div>
  );
}
