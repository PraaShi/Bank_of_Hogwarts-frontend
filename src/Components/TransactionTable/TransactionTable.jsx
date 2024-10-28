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
import "jspdf-autotable";
import logo from "/assests/logoName.png";

function TransactionTable({ sliceValue, transactionDetail }) {
  const detail = useContext(DetailContext) || transactionDetail;
  const { accountDetails } = useContext(AccountDataProvider);
  const slice = sliceValue ? sliceValue : detail.length;

  // Function to generate PDF
const generatePDF = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true, 
  });

  doc.setFillColor("#cdd6d5"); 
  doc.rect(10, 10, 190, 30, "F"); 

  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255); 
  doc.setFont("helvetica", "bold");
  doc.text("Bank of Hogwarts", 14, 28);

  doc.addImage(logo, "PNG", 160, 12, 30, 25, undefined, "FAST"); // Adjust logo size and position with compression

  doc.setFontSize(12);
  doc.setTextColor(40); // Dark gray text color
  const accountData = [
    ["Account Number", accountDetails?.accountNumber],
    ["Balance", accountDetails?.balance],
    // ["Created At", accountDetails?.createdAt],
    ["CIBIL Score", accountDetails?.cibilScore],
    ["Downloaded Date",new Date()]
  ];

  doc.autoTable({
    startY: 55,
    body: accountData, 
    theme: "plain", 
    styles: {
      cellPadding: 5,
      fontSize: 11,
      textColor: [44, 62, 80], 
    },
    margin: { left: 60 },
  });

  doc.setLineWidth(0.5);
  doc.line(
    14,
    doc.lastAutoTable.finalY + 5,
    196,
    doc.lastAutoTable.finalY + 5
  ); 

  const transactionTableStartY = doc.lastAutoTable.finalY + 10; 

  const headers = [["Type", "Amount", "Description", "Date"]];
  const rows = detail.map((transaction) => [
    transaction.credit ? "Credit" : "Debit",
    transaction.credit ? transaction.credit : transaction.debit,
    transaction.description,
    transaction.transactionDate,
  ]);

  doc.autoTable({
    startY: transactionTableStartY, 
    head: headers,
    body: rows, 
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 2,
      lineColor: [44, 62, 80],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [44, 62, 80], 
      textColor: [255, 255, 255], 
      fontStyle: "bold",
    },
    didDrawPage: function (data) {
      doc.setDrawColor(0);
      doc.rect(10, 10, 190, 280);
    },
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, 180, 290); 
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 290); 
  }

  doc.save("transactions.pdf");
};


  return (
    <>
      {detail?.length !== 0 ? (
        <>
          {/* PDF Download Button */}
          <Button
            onClick={generatePDF}
            colorScheme="blue"
            mb={1}
            className={styles.download}
          >
            <img src="/assests/pdf.svg" />
          </Button>
          <TableContainer className={styles.table}>
            <Table variant="simple">
              <TableCaption></TableCaption>
              <Thead>
                <Tr>
                  <Th>Type</Th>
                  <Th className={styles.amount}>Amount</Th>
                  <Th className={styles.description}>Description</Th>
                  <Th className={styles.date}>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {detail.slice(0, slice).map((option, index) => (
                  <Tr key={index}>
                    <Td
                      className={`${
                        option.credit ? styles.credit : styles.debit
                      }`}
                    >
                      <div />
                      <div>{option.credit ? "Credit" : "Debit"}</div>
                    </Td>
                    <Td className={styles.amount}>
                      {option.credit ? option.credit : option.debit}
                    </Td>
                    <Td className={styles.description}>
                      <Tooltip label={option.description}>
                        {option.description}
                      </Tooltip>
                    </Td>
                    <Td className={styles.date}>
                      {option.transactionDate}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <h2 className={styles.empty}>No Transactions Found.</h2>
      )}
    </>
  );
}

export default TransactionTable;