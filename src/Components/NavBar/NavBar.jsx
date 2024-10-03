import React, { useContext, useEffect, useState } from 'react'
import styles from './NavBar.module.scss'
import { Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthDataProvider } from '../../Layouts/HomeLayout/HomeLayout';

function NavBar({logOut}) {
    const authData= useContext(AuthDataProvider);
    const options = [{link:'/about',name:"ABOUT US"},{link:'/myprofile',name:"MY PROFILE"},{link:'/transactions',name:"TRANSACTIONS"},{link:'/loan',name:"LOAN"}]
const [update, setUpdate] = useState(0)
  const navigate = useNavigate();


    useEffect(() =>{
        console.log('removed auth', authData)
        setUpdate(prev => prev + 1)

    }, [authData?.token])
    return (
    <div className={styles.container}>
        <div><Link to='/'>Bank Of Hogwarts</Link></div>
        <div  className={styles.options}>
            {
                options.map((option,index) =>

                    <div key={index}><Link to={option.link}> {option.name}</Link></div>
                )
            }
        </div>
        <div className={styles.btn}>
            <Button variant='outline'><Link to='/createAccount'>NEW ACCOUNT</Link></Button>
            { authData?.token ? (
                 <Button onClick={logOut}><Link>LOGOUT</Link></Button>
            ):(
                <Button><Link to='/auth'>LOGIN</Link></Button>
            )}
           
        </div>
    </div>
  );
}

export default NavBar