import React, { useContext, useEffect, useState } from 'react'
import styles from "./TransferForm.module.scss";
import { Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { TransferValidation } from "../../Lib/Validator";
import FormikControl from "../../Forms/Formik/FormikControl";
import { AllAccountProvider } from '../../Layouts/HomeLayout/HomeLayout';
import axios from 'axios';

function TransferForm({beneficiary, selectedAcc}) {
  const [beneficiaryOpions, setbeneficiaryOpions] = useState([])
console.log(beneficiary, 'transfer form')

const {setUpdateAccounts} = useContext(AllAccountProvider);
const toast = useToast();

useEffect(() => {
  
    toast({
      title: "Choose an account",
      // description: "Choose",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
 
}, [])

const navigate = useNavigate();
    const initialValues = {
        amount: null,
        pin: "",
        beneficiary: null
      };

      useEffect(() => {
        const options = beneficiary.map((option) => {
          return { label: option.name, value: option.id }
        })
        setbeneficiaryOpions(options)
      },[beneficiary])
      
      const onSubmit = (values) => {
        
        if(values.amount < selectedAcc.balance){
    
        
        const data = {
          beneficiaryId: Number(values.beneficiary),
          amount: Number(values.amount),
          pin: values.pin.toString(),
        };
        console.log(data);
        const url = `https://localhost:7135/api/accountActions/${selectedAcc.accountId}/TransferMoney`;
        console.log(url);
        axios
          .post(url, data)
          .then((result) => {
            console.log(result);
    
            toast({
              title: "Transfer Successful",
              // description: "Kindly login to continue.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            setUpdateAccounts(prev => prev + 1)
            navigate("/myprofile");
          })
          .catch((error) => {
            let error1 = error.response.data.toString().split('\r\n')[0]
        let error2 = error1.split(':')[1]
    
            toast({
              title: "Transfer Unsuccessful",
              description: error2,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
        } else {
          
          toast({
            title: "Transfer Unsuccessful",
            description: "Insufficient Balance",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
      }};
  return (
    <div className={styles.container}>
      <h2>Transfer Money</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={TransferValidation}
        onSubmit={onSubmit}
      >
        <Form className={styles.form}>
        <FormikControl
            control="select"
            name="beneficiary"
            placeholder="Beneficiary"
            dropDownOptions={beneficiaryOpions}
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
          <FormikControl
            control="input"
            name="amount"
            placeholder="Amount"
            type="number"
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
          <FormikControl
            control="input"
            name="pin"
            placeholder="PIN"
            type="password"
            variant="filled"
            fieldStyle={styles.inputField}
            focusBorderColor="gray.400"
          />
          <Button type="submit" className={styles.loginbtn}>
            Transfer
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default TransferForm