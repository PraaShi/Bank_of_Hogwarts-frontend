import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./MyProfile.module.scss";
import Profile from "../Profile/Profile";
import History from "../History/History";
import AccountDetails from "../AccountDetails/AccountDetails";
import { RequestDeactivationBack, RequestDeactivationFront } from "../RequestDeactivation/RequestDeactivation";
import Help from "../Help/Help";
import { ChangePinBack, ChangePinFront } from "../ChangePin/ChangePin";
import { useNavigate } from "react-router-dom";
import { AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";



function MyProfile() {
  const [value, setvalue] = useState(false);
  const [request, setrequest] = useState(false);

  const authData = useContext(AuthDataProvider);

  

  const navigate = useNavigate()


  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <Profile  />
      </div>
      <div className={styles.transaction}>
        <AccountDetails />
        <History />
      </div>
      <div className={styles.add}>
        <div className={styles.cardFlip}>
          <div
            className={`${styles.cardFlipInner} ${value ? styles.rotate : ""}`}
          >
            <ChangePinFront setvalue={setvalue} />
            <ChangePinBack setvalue={setvalue} />
          </div>
        </div>
        <div className={styles.cardFlip}>
          <div
            className={`${styles.cardFlipInner} ${styles.appear} ${request ? styles.rotate : ""}`}
          >
            <RequestDeactivationFront setrequest={setrequest}/>
            <RequestDeactivationBack setrequest={setrequest} />
          </div>
        </div>
        <Help />
      </div>
    </div>
  );
}

export default MyProfile;
