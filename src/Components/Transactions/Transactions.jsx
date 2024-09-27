import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./Transactions.module.scss";
import { Form, Formik } from "formik";
import FormikControl from "../../Forms/Formik/FormikControl";
import {
  Avatar,
  Button,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import WithdrawForm from "../WithdrawForm/WithdrawForm";
import DepositForm from "../DepositForm/DepositForm";
import TransferForm from "../TransferForm/TransferForm";
import BeneficiaryForm from "../BeneficiaryForm/BeneficiaryForm";
import TransactionTable from "../TransactionTable/TransactionTable";
import Filters from "../Filters/Filters";
import { AllAccountProvider } from "../../Layouts/HomeLayout/HomeLayout";

function Transactions() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [search, setSearch] = useState("");
  const [beneficiary, setBeneficiary] = useState([]);
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [accStatus, setAccStatus] = useState("");
  const [activeAccounts, setActiveAccounts] = useState()
  const [selectedAcc, setSelectedAcc] = useState({})

  const allAccounts = useContext(AllAccountProvider);

  useEffect(() => {


      const acc = allAccounts.filter((acc) => acc.status === 'Active');
      setActiveAccounts(acc)
      console.log(acc)

  }, [allAccounts]);

  useEffect(() =>{
    
    if (activeAccounts && activeAccounts.length > 0) {
      const options = activeAccounts.map((account, index) => ({
        label: `Account ${index + 1}`, // You can customize the label as needed
        value: account.accountId, // Use the transactionId or any other identifier as the value
      }));



      setDropDownOptions(options);
      console.log(options);
  }
  },[activeAccounts])

  const initialValue = {
    account: "",
  };

  const membersList = [
    "Praveena Shivaani",
    "Rahul",
    "Rajan",
    "Lavanya",
    "Ram",
    "Janu",
    "Leo",
    "Sona",
    "Ram",
    "Janu",
    "Leo",
    "Sona",
  ];

  useEffect(() => {}, []);

  useEffect(() => {
    if (search === "") {
      setBeneficiary(membersList);
    } else {
      let value = membersList.filter((acc) =>
        acc.toLowerCase().startsWith(search.toLowerCase())
      );
      setBeneficiary(value);
    }

    console.log(search);
  }, [search]);

  const onSubmit = (values) => {
    console.log(values);
    onClose();
  };

  const handleClick = (e) => {
    onOpen();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.filter}>
          <Formik initialValues={initialValue}>
            {({ values }) => {
              useEffect(() => {
                const account = allAccounts?.find(
                  (acc) => acc.accountId === values.account
                );
                setSelectedAcc(account)
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
        <div className={styles.innerContainer}>
          <div className={styles.beneficiary}>
            <div className={styles.beneficiaryHeader}>
              <h2>
                Beneficiaries
                <Button>
                  <img src="/assests/plus.svg" onClick={handleClick} />
                </Button>
              </h2>
              <div />
              <Input
                type="text"
                value={search}
                placeholder="Search beneficiary"
                // ref={countRef}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className={styles.membersContainer}>
              <div className={styles.members}>
                {beneficiary.map((member, index) => (
                  <div key={index}>
                    <Avatar
                      className={`${index % 2 == 0 ? styles.even : styles.odd}`}
                      name={member}
                    />
                    <p>{member}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className={styles.transaction}>
          <div>
            <div className={styles.withdraw}>
              <WithdrawForm />
            </div>
            <div className={styles.deposit}>
              <DepositForm />
            </div>
          </div>
          <div>
            <div className={styles.transfer}>
              <TransferForm beneficiary={membersList}/>
            </div>
          </div>
        </div> */}

          <Tabs isFitted variant="enclosed" className={styles.tab}>
            <TabList className={styles.tablist} mb="1em">
              <Tab><div>Withdraw</div></Tab>
              <Tab>
                <div>Deposite</div>
              </Tab>
              <Tab>
                <div>Transfer</div>
              </Tab>
              <Tab>
                <div>History</div>
              </Tab>
            </TabList>
            <TabPanels className={styles.tabPanels}>
              <TabPanel className={styles.tabPanel}>
                <div className={styles.withdraw}>
                  <WithdrawForm accStatus={accStatus}/>
                </div>
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <div className={styles.deposite}>
                  <DepositForm accStatus={accStatus}/>
                </div>
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <div className={styles.transfer}>
                  <TransferForm beneficiary={membersList} />
                </div>
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <div className={styles.history}>
                  <Filters />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
      <BeneficiaryForm
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default Transactions;
