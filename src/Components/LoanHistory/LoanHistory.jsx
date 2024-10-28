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
  useDisclosure,
  useToast

} from "@chakra-ui/react";
import { formatDate } from "../../Lib/Predifined";
import axios from "axios";
import LoanRepayment from "../LoanRepayment/LoanRepayment"; 

export default function LoanHistory() {
  const toast = useToast();
  const authData = useContext(AuthDataProvider);
  const { allAccounts } = useContext(AllAccountProvider);
  const [activeAccounts, setActiveAccounts] = useState();
  const [selectedAcc, setSelectedAcc] = useState({});
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [LoanHistory, setLoanHistory] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const initialValue = { account: "" };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const disburseDate = (date) => {
    let newDate = new Date(date).toISOString().split("T")[0];
    if (newDate === "1970-01-01") {
      return "Not yet disbursed";
    }
    return newDate;
  };

  useEffect(() => {
    const acc = allAccounts.filter((acc) => acc.status === "Active");
    setActiveAccounts(acc);
  }, [allAccounts]);

  useEffect(() => {
    if (activeAccounts && activeAccounts.length > 0) {
      const options = activeAccounts.map((account, index) => ({
        label: `Account ${index + 1}`,
        value: account.accountId,
      }));
      setDropDownOptions(options);
    }
  }, [activeAccounts]);

  useEffect(() => {
    if (selectedAcc?.accountId) {
      const url = `https://localhost:7135/api/accountActions/${selectedAcc?.accountId}/loan-history`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        })
        .then((result) => {
          setLoanHistory(result.data.$values);
        })
        .catch(() => {
          setLoanHistory([]);
        });
    }
  }, [selectedAcc]);

  const handleRepayButtonClick = (loan) => {
    setSelectedLoan(loan);
    onOpen();
  };

  const handleRepaymentSubmit = (values) => {
    const { amount, pin, remarks } = values;
    const data = { loanId: selectedLoan.loanId, amount, pin, remarks };
    const url = `https://localhost:7135/api/loanRepay/repay-loan`;
    axios
      .post(url, data)
      .then(() => {
        toast({
          title: "Paid Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log("hello")
        console.log("this",error.response.data.message)
        // setLoanHistory([]);
        toast({       //toast
          title: "Payment Failed",
          description: error.response.data.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      });
    onClose();
  };

  return (
    <div className={styles.container}>
      {/* Filter Section */}
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

      {/* Loan History Table */}
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
                <Th className={styles.date}>Disbursed Date</Th>
                <Th className={styles.date}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {LoanHistory.map((option, index) => (
                <Tr key={index}>
                  <Td className={styles.amount}>{option.loanType}</Td>
                  <Td className={styles.amount}>{option.loanAmount}</Td>
                  <Td className={styles.amount}>{option.interestRate}</Td>
                  <Td className={styles.amount}>{option.tenure}</Td>
                  <Td className={styles.amount}>{formatDate(option.applicationDate)}</Td>
                  <Td className={styles.date}>{option.loanApplicationStatus}</Td>
                  <Td
                    className={`${
                      option.loanFinalStatus === "Closed"
                        ? styles.debit
                        : option.loanStatus === "Disbursed"
                        ? styles.credit
                        : styles.debit
                    }`}
                  >
                    <div />
                    <div>
                      {option.loanFinalStatus === "Closed"
                        ? option.loanFinalStatus
                        : option.loanStatus}
                    </div>
                  </Td>
                  <Td className={styles.amount}>{disburseDate(option.disbursementDate)}</Td>
                  <Td>
                    <Button size="sm" colorScheme="green" onClick={() => handleRepayButtonClick(option)}>
                      Repay
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      {/* Loan Repayment Modal */}
      <LoanRepayment
        isOpen={isOpen}
        onClose={onClose}
        selectedLoan={selectedLoan}
        handleRepaymentSubmit={handleRepaymentSubmit}
      />
    </div>
  );
}
