import React, { useContext, useEffect, useState } from "react";
import styles from "./Loan.module.scss";
import LoanTypes from "../LoanTypes/LoanTypes";
import LoanHistory from "../LoanHistory/LoanHistory";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllAccountProvider, AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";
import ApplyLoan from "../ApplyLoan/ApplyLoan";

function Loan() {
  const [loanTypes, setLoanTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAccounts, setActiveAccounts] = useState()
  const navigate = useNavigate();
  const authData = useContext(AuthDataProvider);
  const [selectedLoan, setSelectedLoan] = useState(null)

  const {allAccounts} = useContext(AllAccountProvider);

  const toast = useToast()

  const fetchLoanTypes = () => {
    axios
      .get("https://localhost:7135/api/loanOptions/allLoans", {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      })
      .then((response) => {
        const data = response.data.$values;
        const transformedLoans = data.reduce((acc, { loanType, ...rest }) => {
          acc[loanType] = { ...rest };
          return acc;
        }, {});
        console.log(transformedLoans);
        setLoanTypes(transformedLoans);
      })
      .catch((error) => {
        console.error("Error fetching loan types:", error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };
  useEffect(() => {
    const acc = allAccounts.filter((acc) => acc.status === "Active");
    setActiveAccounts(acc);
    console.log(acc);
  }, [allAccounts]);

  useEffect(() => {
    fetchLoanTypes();
  }, []);

  const onSubmit = (values) =>{
    console.log("jell",values)
    const data = {
      loanTypeId: Number(selectedLoan),
      purpose: values.purpose,
    };
    console.log(data);
    const url = `https://localhost:7135/api/accountActions/${values.accountId}/apply-loan`;
    console.log(url);
    axios
      .post(url, data)
      .then((result) => {
        console.log(result);

        toast({
          title: "Loan Applied Successfully",
          // description: "Kindly login to continue.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);

        toast({
          title: "Can't Apply Loan",
          description: "Try after a while.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
      onClose()
  }

  const handleClick =(id) =>{
    setSelectedLoan(id)
    // console.log(selectedLoan,"noe this")
    onOpen()
  }

  const {onOpen,isOpen,onClose} = useDisclosure()
  return (
    <>
    <div className={styles.container}>
      <img className={styles.dash} src="/assests/dash.svg" />
      <div className={styles.home}>
        <div>
          <h2>We Treat each customer as an individual, not a number</h2>
          <h1>
            We offer clear guidance to help you get the best loan available.
          </h1>
        </div>
        <div className={styles.girlImg}>
          <img src="/assests/girl1.png" />
        </div>
      </div>
      <div className={styles.details}>
        {/* <LoanTypes /> */}
        {/* <LoanHistory /> */}
        <div>
          {/* Home Loan Section */}
          <div className={styles.header}>
            <div>
              <h2>Home Loan</h2>
              <p>Live your best life with Bank Of Hogwarts Home Loan</p>
            </div>
            <div>
              <Button onClick={() => handleClick(loanTypes?.Home?.loanTypeId)}>Apply</Button>
            </div>
          </div>
          <div className={styles.loanDesc}>
            <div>
              <div>
                <img src="/assests/homeLoan1.png" alt="" />
              </div>
              <p>₹{loanTypes?.Home?.loanAmount}</p>
            </div>
            <div>
              <div>
                <img src="/assests/homeLoan2.png" alt="" />
              </div>
              <p>{loanTypes?.Home?.interestRate}%</p>
            </div>
            <div>
              <div>
                <img src="/assests/tenure.png" alt="" />
              </div>
              <p>{loanTypes?.Home?.tenure}M</p>
            </div>
          </div>
        </div>

        <div>
          {/* Personal Loan Section */}
          <div className={styles.header}>
            <div>
              <h2>Personal Loan</h2>
              <p>
                Live your dreams today with a Personal Loan from Bank of
                Hogwarts!
              </p>
            </div>
            <div>
              <Button onClick={() => handleClick(loanTypes?.Personal?.loanTypeId)}>Apply</Button>
            </div>
          </div>
          <div className={styles.loanDesc}>
            <div>
              <div>
                <img src="/assests/personalLoan1.png" alt="" />
              </div>
              <p>₹{loanTypes?.Personal?.loanAmount}</p>
            </div>
            <div>
              <div>
                <img src="/assests/personalLoan2.png" alt="" />
              </div>
              <p>{loanTypes?.Personal?.interestRate}%</p>
            </div>
            <div>
              <div>
                <img src="/assests/tenure2.png" alt="" />
              </div>
              <p>{loanTypes?.Personal?.tenure}M</p>
            </div>
          </div>
        </div>

        <div>
          {/* Education Loan Section */}
          <div className={styles.header}>
            <div>
              <h2>Education Loan</h2>
              <p>Invest in knowledge, reap success with our Education Loans.</p>
            </div>
            <div>
              <Button onClick={() => handleClick(loanTypes?.Education?.loanTypeId)}>Apply</Button>
            </div>
          </div>
          <div className={styles.loanDesc}>
            <div>
              <div>
                <img src="/assests/educationLoan1.png" alt="" />
              </div>
              <p>₹{loanTypes?.Education?.loanAmount}</p>
            </div>
            <div>
              <div>
                <img src="/assests/educationLoan2.png" alt="" />
              </div>
              <p>{loanTypes?.Education?.interestRate}%</p>
            </div>
            <div>
              <div>
                <img src="/assests/tenure.png" alt="" />
              </div>
              <p>{loanTypes?.Education?.tenure}M</p>
            </div>
          </div>
        </div>

        <div>
          {/* Car Loan Section */}
          <div className={styles.header}>
            <div>
              <h2>Car Loan</h2>
              <p>
                Drive your dreams home with a Car Loan from Bank of Hogwarts!
              </p>
            </div>
            <div>
              <Button onClick={() => handleClick(loanTypes?.Car?.loanTypeId)}>Apply</Button>
            </div>
          </div>
          <div className={styles.loanDesc}>
            <div>
              <div>
                <img src="/assests/carLoan1.png" alt="" />
              </div>
              <p>₹{loanTypes?.Car?.loanAmount}</p>
            </div>
            <div>
              <div>
                <img src="/assests/carLoan2.png" alt="" />
              </div>
              <p>{loanTypes?.Car?.interestRate}%</p>
            </div>
            <div>
              <div>
                <img src="/assests/tenure2.png" alt="" />
              </div>
              <p>{loanTypes?.Car?.tenure}M</p>
            </div>
          </div>
        </div>

        <div>
          {/* Business Loan Section */}
          <div className={styles.header}>
            <div>
              <h2>Business Loan</h2>
              <p>
                Take your business to new heights—grow with Bank of Hogwarts!
              </p>
            </div>
            <div>
              <Button onClick={() => handleClick(loanTypes?.Business?.loanTypeId)}>Apply</Button>
            </div>
          </div>
          <div className={styles.loanDesc}>
            <div>
              <div>
                <img src="/assests/businessLoan1.png" alt="" />
              </div>
              <p>₹{loanTypes?.Business?.loanAmount}</p>
            </div>
            <div>
              <div>
                <img src="/assests/businessLoan2.png" alt="" />
              </div>
              <p>{loanTypes?.Business?.interestRate}%</p>
            </div>
            <div>
              <div>
                <img src="/assests/tenure.png" alt="" />
              </div>
              <p>{loanTypes?.Business?.tenure}M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ApplyLoan
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        onSubmit={onSubmit}
        activeAccounts={activeAccounts}
      />
    </>
  );
}

export default Loan;
