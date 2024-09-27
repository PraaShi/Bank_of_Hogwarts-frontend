import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Tbody, Tr, Td, Th, Thead } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoanHistory = () => {
  const [loanHistory, setLoanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const tokenData = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchLoanHistory = async () => {
    try {
      const response = await axios.get(`https://localhost:7135/api/accountActions/${accountid}/loan-history`, {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      setLoanHistory(response.data.$values || []);
    } catch (error) {
      console.error("Error fetching loan history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanHistory();
  }, []);

  const handleApplyLoan = () => {
    navigate("/loan-application");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Loan History</h2>
      {loanHistory.length === 0 ? (
        <p>No loan history found.</p>
      ) : (
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Loan ID</Th>
              <Th>Loan Type</Th>
              <Th>Loan Amount</Th>
              <Th>Interest Rate</Th>
              <Th>Status</Th>
              <Th>Remarks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loanHistory.map((loan) => (
              <Tr key={loan.loanId}>
                <Td>{loan.loanId}</Td>
                <Td>{loan.loanType}</Td>
                <Td>{loan.loanAmount}</Td>
                <Td>{loan.interestRate}%</Td>
                <Td>{loan.status}</Td>
                <Td>{loan.remarks}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Button colorScheme="teal" onClick={handleApplyLoan} mt={4}>
        Apply for a New Loan
      </Button>
    </div>
  );
};

export default LoanHistory;
