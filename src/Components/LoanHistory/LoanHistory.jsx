import React, { useContext, useEffect, useState } from "react";
import styles from "./LoanHistory.module.scss";
import FormikControl from "../../Forms/Formik/FormikControl";
import { Form, Formik } from "formik";
import {
  AllAccountProvider,
  AuthDataProvider,
} from "../../Layouts/HomeLayout/HomeLayout";
import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tooltip, 
} from "@chakra-ui/react";
import { formatDate } from "../../Lib/Predifined";
import axios from "axios";

export default function LoanHistory() {
  const authData = useContext(AuthDataProvider);
  const { allAccounts } = useContext(AllAccountProvider);
  const [activeAccounts, setActiveAccounts] = useState();
  const [selectedAcc, setSelectedAcc] = useState({});
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [LoanHistory, setLoanHistory] = useState([]);
  const initialValue = {
    account: "",
  };

  useEffect(() => {
    //set  active acc
    const acc = allAccounts.filter((acc) => acc.status === "Active");
    setActiveAccounts(acc);
    console.log(acc);
  }, [allAccounts]);

  useEffect(() => {
    //set Dropdown Options
    if (activeAccounts && activeAccounts.length > 0) {
      const options = activeAccounts.map((account, index) => ({
        label: `Account ${index + 1}`, // You can customize the label as needed
        value: account.accountId, // Use the transactionId or any other identifier as the value
      }));

      setDropDownOptions(options);
      console.log(options);
    }
  }, [activeAccounts]);

  useEffect(() => {
    if (selectedAcc?.accountId) {
      const url = `https://localhost:7135/api/accountActions/${selectedAcc?.accountId}/loan-history`;
      console.log(url);
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        })
        .then((result) => {
          setLoanHistory(result.data.$values);
          console.log(result.data.$values, "see");
        })
        .catch((error) => {
          console.log(error);
          setLoanHistory([]);
        })
        .finally(() => {});
    }
  }, [selectedAcc]);

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Formik initialValues={initialValue}>
          {({ values }) => {
            useEffect(() => {
              const account = allAccounts?.find(
                (acc) => acc.accountId === values.account
              );
              setSelectedAcc(account);
            }, [values.account]);
            return (
              <Form className={styles.form}>
                <FormikControl
                  control="select"
                  name="account"
                  placeholder="Choose Account"
                  dropDownOptions={dropDownOptions}
                  variant="filled"
                  fieldStyle={styles.selectField}
                  focusBorderColor="gray.400"
                />
              </Form>
            );
          }}
        </Formik>
        <div>Acc.No : {selectedAcc?.accountNumber}</div>
        <div>Bal : {selectedAcc?.balance}</div>
      </div>
      <div>
        <TableContainer className={styles.table}>
          <Table variant="simple">
            <TableCaption></TableCaption>
            <Thead>
              <Tr>
                <Th>Loan Type</Th>
                <Th className={styles.amount}>Amount</Th>
                <Th className={styles.description}>Interest Rate</Th>
                <Th className={styles.date}>Tenure</Th>
                <Th className={styles.date}>Application Date</Th>
                <Th className={styles.date}>Application Status</Th>
                <Th className={styles.date}>Loan Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {LoanHistory.map((option, index) => (
                <Tr key={index}>
                  <Td className={styles.amount}>
                    {option.loanType}
                  </Td>
                  <Td className={styles.amount}>
                    {option.loanAmount}
                  </Td>
                  <Td className={styles.amount}>
                    {option.interestRate}
                  </Td>
                  <Td className={styles.amount}>
                    {option.tenure}
                  </Td>
                  <Td className={styles.amount}>
                    {formatDate(option.applicationDate)}
                  </Td>
                  <Td className={styles.date}>{option.loanApplicationStatus}</Td>
                  <Td
                    className={`${
                      option.loanStatus=='Disbursed' ? styles.credit : styles.debit
                    }`}
                  >
                    <div />
                    <div>{option.loanStatus}</div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
