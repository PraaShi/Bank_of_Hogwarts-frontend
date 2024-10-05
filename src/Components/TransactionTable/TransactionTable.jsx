import React from "react";
import styles from "./TransactionTable.module.scss";
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
import { useState, createContext, useContext } from "react";
import { DetailContext } from "../History/History";
import { AccountDataProvider } from "../../Layouts/HomeLayout/HomeLayout";

import jsPDF from "jspdf"; // Import jsPDF
import 'jspdf-autotable';
import logo from '/assests/logoName.png'

function TransactionTable({sliceValue, transactionDetail}) {
  const detail = useContext(DetailContext) || transactionDetail;
  const {accountDetails} = useContext(AccountDataProvider)
  const slice  = sliceValue ? sliceValue : detail.length;
  console.log(accountDetails, 'transaction table')

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
  
    doc.text('Transaction Report', 14, 36);
    doc.setFontSize(12);
  
    // Table headers and body
    const headers = [['Type', 'Amount', 'Description', 'Date']];
    const rows = detail.map((transaction) => [
      transaction.credit ? "Credit" : "Debit",
      transaction.credit ? transaction.credit : transaction.debit,
      transaction.description.length > 15
        ? transaction.description.slice(0, 15) + "..."
        : transaction.description,
      transaction.transactionDate,
    ]);
  
    // Use autoTable to generate table and add border to each page
    doc.autoTable({
      startY: 60, // Position table after the header for the first page
      head: headers,
      body: rows,
      theme: 'grid', // Table style: 'striped', 'grid', 'plain'
      styles: { 
        fontSize: 10, 
        cellPadding: 3,
        lineColor: [44, 62, 80],
        lineWidth: 0.2
      },
      headStyles: { 
        fillColor: [44, 62, 80], // Dark header background
        textColor: [255, 255, 255], // White header text
        fontStyle: 'bold'
      },
    });
  
    // Save the PDF
    doc.save('transactions.pdf');
  };

  return (
    <>
    { detail?.length != 0 ? (
       <>
       {/* PDF Download Button */}
       <Button onClick={generatePDF} colorScheme="blue" mb={1} className={styles.download}>
        <img src="/assests/pdf.svg" />
       </Button>
    <TableContainer className={styles.table}>

      <Table variant="simple">
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th className={styles.amount}>Amount</Th>
            <Th className={styles.description}>Discription</Th>
            <Th className={styles.date}>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {detail.slice(0,slice).map((option, index) => (
            <Tr key={index}>
              <Td
                className={`${
                  option.credit ? styles.credit : styles.debit
                }`}
              >
                <div />
                <div>{option.credit ? "Credit" : "Debit"}</div>
              </Td>
              <Td className={styles.amount}>{option.credit ? option.credit : option.debit}</Td>
              <Td className={styles.description}> <Tooltip
                  label={option.description}
                  aria-label="Full description"
                  hasArrow
                  placement="top"
                >
                  <span>
                    {option.description.split(" ").length > 4
                      ? option.description.split(" ").slice(0, 4).join(" ") + "..."
                      : option.description}
                  </span>
                </Tooltip></Td>
              <Td className={styles.date}>{option.transactionDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </>
    ) : (<div className={styles.noAcc}><h2>Either Account is Closed or No Transaction Found</h2></div>)}
    </>
        
  );
}

export default TransactionTable;
