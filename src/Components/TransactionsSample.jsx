
import React ,{useState} from 'react'
// import styles from "./Transactions.module.scss";

function TransactionsSample() {
  const [value, setValue] = useState('')

  return (
    <div >
      hello
      <input 
      type='text'
      value={value}
      onChange={
        (e) => {setValue(e.target.value)
          console.log(value)
      }}/>

    </div>
  )
}

export default TransactionsSample