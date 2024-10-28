

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./LoanRepayment.module.scss";
import { formatDateTime } from "../../Lib/Predifined";

export default function LoanRepayment({ isOpen, onClose, selectedLoan, handleRepaymentSubmit }) {
  const [repaymentHistory, setRepaymentHistory] = useState([]);

  // Fetch Loan Repayment History by Loan ID
  useEffect(() => {
    if (selectedLoan?.loanId) {
      const fetchRepaymentHistory = async () => {
        try {
          const response = await axios.get(
            `https://localhost:7135/api/loanRepay/history/${selectedLoan.loanId}`
          );
          console.log(response.data.$values);
          setRepaymentHistory(Array.isArray(response.data.$values) ? response.data.$values : []);
        } catch (error) {
          console.error("Failed to fetch repayment history", error);
          setRepaymentHistory([]); // Set to empty array in case of failure
        }
      };
      fetchRepaymentHistory();
    }
  }, [selectedLoan]);

  // Generate PDF of the Loan Repayment History Table
  const generatePDF = () => {
    const input = document.getElementById("repaymentTable");

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0); // Adjust the width and height as needed
        pdf.save(`Loan_Repayment_History_${selectedLoan?.loanId}.pdf`);
      })
      .catch((error) => {
        console.error("Failed to generate PDF", error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Repay Loan</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" className={styles.modalBody}>
          {/* Left: Form */}
          <div className={styles.leftSection}>
            <Formik
              initialValues={{ amount: "", pin: "", remarks: "" }}
              onSubmit={handleRepaymentSubmit}
            >
              {({ handleChange, values }) => (
                <Form>
                  <Input
                    placeholder="Amount"
                    name="amount"
                    type="number"
                    value={values.amount}
                    onChange={handleChange}
                    mb={3}
                  />
                  <Input
                    placeholder="PIN"
                    name="pin"
                    type="password"
                    value={values.pin}
                    onChange={handleChange}
                    mb={3}
                  />
                  <Input
                    placeholder="Remarks"
                    name="remarks"
                    type="text"
                    value={values.remarks}
                    onChange={handleChange}
                    mb={3}
                  />
                  <ModalFooter justifyContent="flex-start">
                    <Button type="submit" colorScheme="green" mr={3}>
                      Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </div>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Right: Loan Repayment History Table */}
          <div className={styles.rightSection}>
            <div className={styles.tableHeaderContainer}>
              <h3 className={styles.tableHeader}>Loan Repayment History</h3>
              {/* PDF Download Icon */}
              <img
                src="/assests/pdf.svg"
                alt="Download PDF"
                className={styles.pdfIcon}
                onClick={generatePDF}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </div>
            <Table variant="simple" id="repaymentTable">
              <Thead>
                <Tr>
                  <Th>BALANCE</Th>
                  <Th>AMOUNT PAID</Th>
                  <Th>DATE</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.isArray(repaymentHistory) && repaymentHistory.map((repayment, index) => (
                  <Tr key={index}>
                    <Td>{repayment.loanBalance}</Td>
                    <Td>{repayment.amountPaid}</Td>
                    <Td>{formatDateTime(repayment.paymentDate).dateTime}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
