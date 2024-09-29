import React from 'react'
import styles from "./Help.module.scss";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../Forms/Formik/FormikControl";

function Help() {
  return (
    <div className={styles.container}>
      <p>Have Any Queries ?</p>
      <Button><Link to='/help'>Help</Link></Button>
    </div>
  )
}

export default Help