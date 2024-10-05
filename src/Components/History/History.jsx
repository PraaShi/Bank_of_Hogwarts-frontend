import React, { useState, createContext, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import styles from "./History.module.scss";
import Filters from "../Filters/Filters";
import { Button, useDisclosure } from "@chakra-ui/react";
import MoreTransactions from "../MoreTransactions/MoreTransactions";
import TransactionTable from "../TransactionTable/TransactionTable";
import axios from "axios";
import {
  AccountDataProvider,
  AuthDataProvider,
} from "../../Layouts/HomeLayout/HomeLayout";
import {
  formatFormikDate,
  oneMonthBefore,
  todayDate,
} from "../../Lib/Predifined";

export const DetailContext = createContext();
export const FilterContext = createContext();
function History() {
  const [transaction, setTransaction] = useState([]);
  const [filteredTransaction, setFilteredTransaction] = useState([]);
  const authData = useContext(AuthDataProvider);
  const [Tperiod, setTperiod] = useState("");
  const [Ttype, setTtype] = useState("");
  const [TstartDate, setTstartDate] = useState();
  const [TendDate, setTendDate] = useState();
  const { accountDetails } = useContext(AccountDataProvider);
  const [clearFilters, setClearFilters] = useState(0)


  useEffect(() => {
    console.log(accountDetails?.accountId,"its mee")
    if (accountDetails?.accountId) {
      const url = `https://localhost:7135/api/accountActions/${accountDetails?.accountId}/getTransactions`;
      console.log(url);
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        })
        .then((result) => {
          const data = result.data.$values;
          data.sort(
            (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
          );
          setTransaction(data);
          setFilteredTransaction(data);
        })
        .catch((error) => {
          setTransaction([]);
          setFilteredTransaction([])
          
        })
        .finally(() => {});
    }
  }, [accountDetails]);


  useEffect(() => {  //filter
    var currentTransaction = transaction

    if (Ttype === "credit") {
      currentTransaction = currentTransaction.filter((data) => data.debit === null);
      console.log(currentTransaction, "fiultered setting");
    } 
    if (Ttype === "debit") {
      currentTransaction = currentTransaction.filter((data) => data.credit === null);
    } 
    if (TstartDate != "1970-01-01" && TendDate == "1970-01-01") {
      currentTransaction = currentTransaction.filter(
        (data) => data.transactionDate >= TstartDate
      );
    } 
    if (TendDate != "1970-01-01" && TstartDate == "1970-01-01") {
      currentTransaction = currentTransaction.filter(
        (data) => data.transactionDate <= TendDate
      );
    } 
    if (TstartDate != "1970-01-01" && TendDate != "1970-01-01") {
      currentTransaction = currentTransaction.filter(
        (data) =>
          data.transactionDate <= TendDate && data.transactionDate >= TstartDate
      ); 
    }
    if (Tperiod === "today") {
      const today = todayDate()
      currentTransaction = currentTransaction.filter((data) => data.transactionDate  <= today && data.transactionDate  >= today);
    } 
    if (Tperiod == "lastMonth") {
      const today = todayDate()
      const oneMonth = oneMonthBefore()
      currentTransaction = currentTransaction.filter((data) => data.transactionDate  <= today && data.transactionDate  >= oneMonth);
    } 
    if (Tperiod == "lastTen"){
      currentTransaction = currentTransaction.slice(0,10);
    }
    setFilteredTransaction(currentTransaction)

  }, [TendDate,TstartDate,Tperiod,Ttype])
  


  const clearFilter = () => {

    setClearFilters(prev => prev + 1)
    setFilteredTransaction(transaction);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <FilterContext.Provider
        value={{ setTtype, setTperiod, setTstartDate, setTendDate , clearFilters,clearFilter}}
      >
        <DetailContext.Provider value={filteredTransaction}>
          <div className={styles.container}>
            <div className={styles.filter}>
              <Filters />
              <img
                src="/assests/clearFilters.svg"
                onClick={() => clearFilter()}
              />
            </div>
            <div className={styles.history}>
              <TransactionTable detail={filteredTransaction} sliceValue={1} />
              <div className={styles.more}>
                <Button
                  className={styles.moreBtn}
                  onClick={() => {
                    onOpen();
                  }}
                >
                  More
                </Button>
              </div>
            </div>
          </div>
          <MoreTransactions isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </DetailContext.Provider>
      </FilterContext.Provider>
    </>
  );
}

export default History;
