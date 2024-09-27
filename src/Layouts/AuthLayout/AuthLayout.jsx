import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './AuthLayout.module.scss'

function AuthLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <div className={styles.loginimage}>
            <img src='/assests/login.png'></img>
        </div>
        <div className={styles.main}>
            <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout