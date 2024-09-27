import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Tbody, Tr, Td, Th, Thead } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 

const LoanTypes = () => {
  const [loanTypes, setLoanTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const tokenData = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchLoanTypes = async () => {
    try {
      const response = await axios.get("https://localhost:7135/api/LoanOptions", {
        headers: {
          Authorization: `Bearer ${tokenData}`,
        },
      });
      const data = response.data;
  
      if (data && Array.isArray(data.$values)) {
        setLoanTypes(data.$values);
      } else {
        console.error("Expected an array in $values but got", typeof data.$values);
        setLoanTypes([]); 
      }
    } catch (error) {
      console.error("Error fetching loan types:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchLoanTypes();
  }, []);

  const handleApplyClick = (loanTypeId) => {
    navigate(`/loan-application/${loanTypeId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Available Loan Types</h2>
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Loan Type ID</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Interest Rate</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
        {Array.isArray(loanTypes) && loanTypes.length > 0 ? (
  loanTypes.map((loanType) => (
    <Tr key={loanType.loanTypeId}>
      <Td>{loanType.loanTypeId}</Td>
      <Td>{loanType.loanType}</Td>
      <Td>{loanType.loanAmount}</Td>
      <Td>{loanType.interestRate}%</Td>
      <Td>
        <Button
          colorScheme="teal"
          onClick={() => handleApplyClick(loanType.loanTypeId)}
        >
          Apply
        </Button>
      </Td>
    </Tr>
  ))
) : (
  <Tr>
    <Td colSpan="5">No loan types available</Td>
  </Tr>
)}
        </Tbody>
      </Table>
    </div>
  );
};

export default LoanTypes;
