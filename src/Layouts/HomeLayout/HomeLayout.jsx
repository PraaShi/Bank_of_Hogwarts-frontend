import React, { createContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./HomeLayout.module.scss";
import Footer from "../../Components/Footer/Footer";
import { publicRoutes } from "../../Lib/config";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export const AuthDataProvider = createContext();
export const AccountDataProvider = createContext();
export const AllAccountProvider = createContext();
function HomeLayout() {
  const [authData, setAuthData] = useState();
  const [accountDetails, setAccountDetails] = useState();
  const [allAccounts, setAllAccounts] = useState([])
  const [updateAccounts, setUpdateAccounts] = useState(0)
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = {
      token: localStorage.getItem("jwtToken"),
      customerId: localStorage.getItem("customerId"),
    };

    setAuthData(data);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      const found = publicRoutes.some(
        (item) =>
          item.toLowerCase() === location.pathname.toString().toLowerCase()
      );
      if (!found) {
        //  navigate("/auth");

        toast({
          //toast
          title: "Please Login",
          description: "login to continue",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      }
    }
  });

  useEffect(() => {
    if (authData?.token) {
      const url = `https://localhost:7135/api/customer/${authData?.customerId}/getaccounts`;
      console.log(url);
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        })
        .then((result) => {
          setAllAccounts(result.data.$values);

        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
        });
    }
  }, [authData,updateAccounts]);

  return (
    <div className={styles.container}>
          <AllAccountProvider.Provider
        value={{allAccounts,updateAccounts, setUpdateAccounts}} 
      >
      <AccountDataProvider.Provider
        value={{ accountDetails, setAccountDetails }}
      >
        <AuthDataProvider.Provider value={authData}>
          <div className={styles.navbar}>
            <NavBar />
          </div>
          <div className={styles.main}>
            <Outlet />
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </AuthDataProvider.Provider>
      </AccountDataProvider.Provider>
      </AllAccountProvider.Provider>
    </div>
  );
}

export default HomeLayout;
