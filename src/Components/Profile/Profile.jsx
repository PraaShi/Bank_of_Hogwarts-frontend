import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";

function Profile() {
  const [response, setResponse] = useState();
  const authData = useContext(AuthDataProvider);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authData?.token) {
      const url = `https://localhost:7135/api/account/customers/${authData?.customerId}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        })
        .then((result) => {
          setResponse(result.data);
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, [authData]);

  if (loading) {
    return <Spinner size="xl" />; // Display a loading spinner while fetching data
  }

  return (
    <div className={styles.container}>
      <div className={styles.female}>
        {response.gender.toString().toLowerCase() === "female" ? (
          <img
            src="/assests/female.png"
            className={styles.profileicon}
            alt="Female"
          />
        ) : (
          <img
            src="/assests/male.png"
            className={styles.profileicon}
            alt="Male"
          />
        )}
      </div>

      {response && (
        <div className={styles.tags}>
          <div className={styles.tag}>
            <img src="/assests/user.svg" className={styles.icon}></img>
            <div>
              {response.firstName} {response.lastName}
            </div>
          </div>
          <div className={styles.tag}>
            <img src="/assests/gender.svg" className={styles.icon}></img>
            <div>{response.gender}</div>
          </div>
          <div className={styles.tag}>
            <img src="/assests/phone.svg" className={styles.icon}></img>
            <div>{response.contactNumber}</div>
          </div>
          <div className={styles.tag}>
            <img src="/assests/location.svg" className={styles.icon}></img>
            <div>{response.address}</div>
          </div>
          <div className={styles.tag}>
            <img src="/assests/aadhar.svg" className={styles.icon}></img>
            <div>{response.aadharNumber}</div>
          </div>
          <div className={styles.tag}>
            <img src="/assests/pan.svg" className={styles.icon}></img>
            <div>{response.pan}</div>
          </div>
          <div className={`${styles.tag} ${styles.tagemail}`}>
            <img src="/assests/email.svg" className={styles.icon}></img>
            <div>{response.email}</div>
          </div>
          {/* <Button className={styles.edit}>Edit</Button> */}
        </div>
      )}
    </div>
  );
}

export default Profile;
