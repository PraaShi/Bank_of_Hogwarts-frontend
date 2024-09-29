import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./Layouts/HomeLayout/HomeLayout";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import Home from "./Components/Home/Home";
import "./App.scss";
import About from "./Components/About/About";
import MyProfile from "./Components/MyProfile/MyProfile";
import Login from "./Components/Login/Login";
import CustomerRegister from "./Components/CustomerRegister/CustomerRegister";
import EmployeeRegister from "./Components/EmployeeRegister/EmployeeRegister";
import AccountRegister from "./Components/AccountRegister/AccountRegister";
// import Transactions from './Components/Transactions/Transactions';
import TransactionsSample from "./Components/TransactionsSample";
import Transactions from "./Components/Transactions/Transactions";
import Loan from "./Components/Loan/Loan";
import LoanTypes from "./Components/LoanTypes/LoanTypes";
import LoanHistory from "./Components/LoanHistory/LoanHistory";
import HelpContent from "./Components/HelpContent/HelpContent";
import ApplyLoan from "./Components/ApplyLoan/ApplyLoan";

function App() {
  return (
    <Router>
    <Routes>

      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="customerRegister" element={<CustomerRegister />} />
        <Route path="employeeRegister" element={<EmployeeRegister />} />
        <Route path="accountRegister" element={<AccountRegister />} />
      </Route>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/help" element={<HelpContent />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/createAccount" element={<AccountRegister />} />
        <Route path="/applyLoan" element={<ApplyLoan />} />
      </Route>
    </Routes>
    </Router>
  );
}

export default App;
