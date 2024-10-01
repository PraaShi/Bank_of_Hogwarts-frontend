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
  useToast,
} from "@chakra-ui/react";
import WithdrawForm from "../WithdrawForm/WithdrawForm";
import DepositForm from "../DepositForm/DepositForm";
import TransferForm from "../TransferForm/TransferForm";
import BeneficiaryForm from "../BeneficiaryForm/BeneficiaryForm";
import TransactionTable from "../TransactionTable/TransactionTable";
import Filters from "../Filters/Filters";
import { AccountDataProvider, AllAccountProvider, AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";
import axios from "axios";
import { useNavigation } from "react-router-dom";

function Transactions() {
  const toast = useToast()
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [search, setSearch] = useState("");
  const [beneficiary, setBeneficiary] = useState([]);
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [accStatus, setAccStatus] = useState("");
  const [activeAccounts, setActiveAccounts] = useState();
  const [selectedAcc, setSelectedAcc] = useState({});
  const [disabled, setDisabled] = useState(true)
  const [allBeneficiaries, setAllBeneficiaries] = useState([])
  const [transaction, setTransaction] = useState([])
  const authData = useContext(AuthDataProvider);
  const {allAccounts} = useContext(AllAccountProvider);

  

  useEffect(() => {
    if (selectedAcc?.accountId) {
      const url = `https://localhost:7135/api/accountActions/${selectedAcc?.accountId}/getTransactions`;
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
        })
        .catch((error) => {
          setTransaction([])
        })
        .finally(() => {

        });
    }
  }, [selectedAcc]);



  // const navigate = useNavigation();

  useEffect(() => { //disable benificiary button
    if(selectedAcc?.length > 0 || selectedAcc?.accountId){
      setDisabled(false)
      fetchBeneficiaries();
    }
    else{
      setDisabled(true)
    }
  }, [selectedAcc])
  

  useEffect(() => {
    const acc = allAccounts.filter((acc) => acc.status === "Active");
    setActiveAccounts(acc);
  }, [allAccounts]);

  useEffect(() => {
    if (activeAccounts && activeAccounts.length > 0) {
      const options = activeAccounts.map((account, index) => ({
        label: `Account ${index + 1}`, // You can customize the label as needed
        value: account.accountId, // Use the transactionId or any other identifier as the value
      }));

      setDropDownOptions(options);
    }
  }, [activeAccounts]);

  const initialValue = {
    account: "",
  };

  


  const fetchBeneficiaries = () => {
    const url = `https://localhost:7135/api/accountActions/${selectedAcc?.accountId}/beneficiaries`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        })
        .then((result) => {
          const values = result.data.$values.map(value => {
            return {
              name: value.accountName,
              id: value.beneficiaryId
            }
            })
          

          setAllBeneficiaries(values)
        })
        .catch((error) => {
        }).finally(() => {
        })
  }

  useEffect(() => {
    if (search === "") {
      setBeneficiary(allBeneficiaries);
    } else {
      let value = allBeneficiaries.filter((acc) =>
        acc.name.toLowerCase().startsWith(search.toLowerCase())
      );
      setBeneficiary(value);
    }

  }, [search,allBeneficiaries]);

 


  const onSubmit = (values) => {
    const data = {
      accountName:values.accountName,
      accountNumber:values.accountNumber.toString(),
      branchId:Number(values.branch)
    };
    const url = `https://localhost:7135/api/accountActions/${selectedAcc?.accountId}/add-beneficiary`;
    axios
      .post(url, data)
      .then((result) => {

        toast({
          title: "Beneficiary Added",
          // description: "Kindly login to continue.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchBeneficiaries();
      })
      .catch((error) => {

        toast({
          title: "Can't Add Beneficiary",
          description: "Try after a while.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      onClose();
  };

  const handleClick = (e) => {
    if(!disabled){
      onOpen();

    }
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
                      name={member.name.toString()}
                    />
                    <p>{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Tabs isFitted variant="enclosed" className={styles.tab}>
            <TabList className={styles.tablist} mb="1em">
              <Tab>
                <div>Withdraw</div>
              </Tab>
              <Tab>
                <div>Deposit</div>
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
                  <WithdrawForm accStatus={accStatus} selectedAcc={selectedAcc} />
                </div>
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <div className={styles.deposite}>
                  <DepositForm accStatus={accStatus}  selectedAcc={selectedAcc} />
                </div>
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <div className={styles.transfer}>
                  <TransferForm beneficiary={allBeneficiaries}  selectedAcc={selectedAcc} />
                </div>
              </TabPanel>
              <TabPanel className={styles.tabPanel}>
                <div className={styles.history}>
                  <Filters />
                  <TransactionTable transactionDetail = {transaction}/>
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
