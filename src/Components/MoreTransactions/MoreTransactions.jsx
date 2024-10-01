import React, { useContext, useState } from "react";
import styles from "./MoreTransactions.module.scss";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Filters from "../Filters/Filters";
import TransactionTable from "../TransactionTable/TransactionTable"
import { FilterContext } from "../History/History";

function MoreTransactions({ isOpen, onOpen, onClose}) {
  const context = useContext(FilterContext)
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} >
        {overlay}
        <ModalContent maxW="70vw" height="70vh" className={styles.container}>
          <ModalHeader>
            <h2>Transaction</h2> 
            <div className={styles.filters}>
            <Filters />  
            <img
                src="/assests/clearFilters.svg"
                onClick={() => context?.clearFilter()}
              />
              </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className={styles.scroll}>
            <TransactionTable  />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MoreTransactions;
