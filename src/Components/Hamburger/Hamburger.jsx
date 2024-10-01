import React, { useContext } from "react";
import styles from "./Hamburger.module.scss";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthDataProvider } from "../../Layouts/HomeLayout/HomeLayout";

export default function Hamburger() {
  const authData = useContext(AuthDataProvider);
  const options = [
    { link: "/about", name: "ABOUT US" },
    { link: "/transactions", name: "TRANSACTIONS" },
    { link: "/loan", name: "LOAN" },
    { link: "/myprofile", name: "MY PROFILE" },
  ];

  const [menuV, setMenuV] = useState(false);
  const option = (e) => {
    setMenuV((prev) => !prev);
  };
  const navigate = useNavigate();
  const logOut = (e) => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("customerId");
    navigate("/");
  };

  return (
    <div className="contianer" show={menuV} onClick={options}>
      <div className="hamb">
        <img src="/assests/menu.svg" className="hamb_icon" />
        <img src={logo} className="logo1207" />
        <img src="/assests/corss.svg" className="cross_icon" />
      </div>
      <div className={styles.options}>
        {options.map((option, index) => (
          <div key={index}>
            <Link to={option.link}> {option.name}</Link>
          </div>
        ))}
      </div>
      <div className={styles.btn}>
        <Button variant="outline">
          <Link to="/createAccount">NEW ACCOUNT</Link>
        </Button>
        {authData?.token ? (
          <Button onClick={logOut}>
            <Link>LOGOUT</Link>
          </Button>
        ) : (
          <Button>
            <Link to="/auth">LOGIN</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
