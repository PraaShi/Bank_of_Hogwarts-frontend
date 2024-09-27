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
} from "@chakra-ui/react";
import { useState, createContext, useContext } from "react";
import { DetailContext } from "../History/History";
import { AccountDataProvider } from "../../Layouts/HomeLayout/HomeLayout";

function TransactionTable({sliceValue}) {
  const detail = useContext(DetailContext);
  const {accountDetails} = useContext(AccountDataProvider)
  const slice  = sliceValue ? sliceValue : detail.length;
  console.log(detail)
  return (
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
              <Td className={styles.description}>{option.description.split(' ').length >4 ? option.description.split(' ').slice(0, 4).join(' ')+'...' : option.description}</Td>
              <Td className={styles.date}>{option.transactionDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TransactionTable;