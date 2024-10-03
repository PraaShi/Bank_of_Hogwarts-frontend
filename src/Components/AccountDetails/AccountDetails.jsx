import React, { useContext, useEffect, useState } from "react";
import styles from "./AccountDetails.module.scss";
import {
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  AccountDataProvider,
  AllAccountProvider,
  AuthDataProvider,
} from "../../Layouts/HomeLayout/HomeLayout";
import axios from "axios";

function AccountDetails() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const authData = useContext(AuthDataProvider);
  const [accType, setAccType] = useState([]);
  const [branch, setBranch] = useState([]);
  const {accountDetails,setAccountDetails} = useContext(AccountDataProvider);
  
  const {allAccounts} = useContext(AllAccountProvider)
  
  const handleTabsChange = (index) => {
    setActiveTabIndex(index);
  };


  useEffect(() => {
    console.log(allAccounts[0]?.accountTypeId, "acounttttt");
    if (allAccounts[0]?.accountTypeId) {
      console.log("if statement");
      getAccountType();
      getBranchInfo();
    }
  }, [allAccounts]);

  const getAccountType = () => {
    allAccounts.map((acc) => {
      const url = `https://localhost:7135/api/accountType/${acc.accountTypeId}`;
      // console.log(url);
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        })
        .then((result) => {
          // console.log("acountsss", result.data);
          setAccType((prev) => [...prev, result.data]);
        })
        .catch((error) => {
        })
        .finally(() => {
        });
    });
  };

  const getBranchInfo = () => {
    allAccounts.map((acc) => {
      const url = `https://localhost:7135/api/branch/${acc.branchId}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        })
        .then((result) => {
          // console.log("acountsss", result.data);
          setBranch((prev) => [
            ...prev,
            {
              branchName: result.data.branchName,
              ifscCode: result.data.ifscCode,
            },
          ]);
        })
        .catch((error) => {
        })
        .finally(() => {
        });
    });
  };

  // Handle copy functionality
  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        alert("Copied to clipboard!");
      },
      (error) => {
        console.error("Failed to copy text: ", error);
      }
    );
  };

  useEffect(() => {
  //   setAccountDetails((prev) => ({
  //     ...prev,
  //     accountId: allAccounts[activeTabIndex]?.accountId,
  //   })
  
  // );
  setAccountDetails(allAccounts[activeTabIndex])
    // console.log(allAccounts[activeTabIndex]?.accountId)
  }, [activeTabIndex, allAccounts]);


  return (
    <div className={styles.container}>
      {allAccounts?.length != 0 ? (
      <Tabs
        isFitted
        variant="enclosed"
        onChange={handleTabsChange}
        index={activeTabIndex}
      >
        <TabList className={styles.tablist} mb="1em">
          {allAccounts &&
            allAccounts?.map((acc, index) => (
              <Tab
                className={`${styles.tab} ${
                  activeTabIndex === index ? styles.activeTab : ""
                }`}
              >
                <img src="/assests/card.png" />
                <img src="/assests/whitecard.png" />
                <div>Account {index + 1}</div>
              </Tab>
            ))}
        </TabList>
        <TabPanels className={styles.tabPanels}>
          {allAccounts?.map((acc, index) => (
            <TabPanel className={styles.tabPanel} key={acc.accountNumber}>
              <div className={styles.mainDetails}>
                <div className={styles.balance}>
                  <p>Available Balance</p>
                  <div>
                    <img src="/assests/rupee.svg" />
                    {acc.balance}
                  </div>
                </div>

                {acc.status === "Active" ? (
                  <div className={styles.statusActive}>
                    <p>Account Status</p>
                    <div>
                      <img src="/assests/dot.svg" />
                      {acc.status}
                    </div>
                  </div>
                ) : acc.status === "  PendingApproval" ? (
                  <div className={styles.statusPeding}>
                    <p>Account Status</p>
                    <div>
                      <img src="/assests/dotOrange.svg" />
                      {acc.status}
                    </div>
                  </div>
                ) : (
                  <div className={styles.statusInactive}>
                    <p>Account Status</p>
                    <div>
                      <img src="/assests/dotRed.svg" />
                      {acc.status}
                    </div>
                  </div>
                )}

                <div className={styles.accType}>
                  <p>Account Type</p>
                  <div>{accType[index]}</div>
                </div>
                <div className={styles.cibil}>
                  <p>Cibil Score</p>
                  <div>
                    <img src="/assests/cibil.svg" />
                    {acc.cibilScore}
                  </div>
                </div>
              </div>
              <div className={styles.addedDetails}>
                <div className={styles.accNum}>
                  <p>Account Number</p>
                  <div>
                    {acc.accountNumber}
                    <img src="/assests/copy.svg"  alt="Copy"
                      onClick={() => handleCopy(branch[index]?.ifscCode)}
                      style={{ cursor: "pointer" }}/>
                  </div>
                </div>
                <div className={styles.ifsc}>
                  <p>IFSC Code</p>
                  <div>
                    {branch[index]?.ifscCode}
                    <img src="/assests/copy.svg"  alt="Copy"
                      onClick={() => handleCopy(branch[index]?.ifscCode)}
                      style={{ cursor: "pointer" }}/>
                  </div>
                </div>
                <div className={styles.branch}>
                  <p>Branch</p>
                  <div>{branch[index]?.branchName}</div>
                </div>
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      ) : (<div className={styles.noAcc}><h2>No Accounts Found</h2></div>)}
    </div>
  );
}

export default AccountDetails;
