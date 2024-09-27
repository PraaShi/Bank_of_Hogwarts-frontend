import React, { useState, createContext, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import styles from "./History.module.scss";
import Filters from "../Filters/Filters";
import { Button, useDisclosure } from "@chakra-ui/react";
import MoreTransactions from "../MoreTransactions/MoreTransactions";
import TransactionTable from "../TransactionTable/TransactionTable";
import axios from "axios";
import { AccountDataProvider, AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";

export const DetailContext = createContext();
function History() {
  const [transaction, setTransaction] = useState([])
  const authData = useContext(AuthDataProvider);
  const {accountDetails} = useContext(AccountDataProvider)
  useEffect(() => {
    if (accountDetails?.accountId) {
      const url = `https://localhost:7135/api/accountActions/${accountDetails?.accountId}/getTransactions`;
      console.log(url);
      axios
        .get(url
          , {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      )
        .then((result) => {
          setTransaction(result.data.$values);
          console.log(result.data.$values);
        })
        .catch((error) => {
          console.log(error);
          setTransaction([])
        })
        .finally(() => {

        });
    }
  }, [accountDetails]);


  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DetailContext.Provider value={transaction}>
        <div className={styles.container}>
          <div className={styles.filter}>
            <Filters />
          </div>
          <div className={styles.history}>
            <TransactionTable detail={transaction} sliceValue={2} />
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
        <MoreTransactions isOpen={isOpen} onOpen={onOpen} onClose={onClose}  />
      </DetailContext.Provider>
    </>
  );
}

export default History;
