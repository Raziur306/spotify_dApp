
import React from 'react'
import { useConnect } from 'wagmi'

const styles = {
  container: `h-full w-full fixed left-0 top-0 flex justify-center items-center bg-opacity-50`,
  subContainer: `rounded-sm p-8 bg-slate-100 w-1/4 h-96 flex justify-center flex-col gap-3 items-center`,
  btnStyle: `w-36 p-2 rounded-lg bg-blue-500 hover:bg-green-500 font-bold text-white`
}



const WalletDialog = () => {
  const { connect, connectors } = useConnect();

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {connectors.map((connector, index) => {
          return <button className={styles.btnStyle} disabled={!connector.ready} key={index} onClick={() => { connect({ connector }) }}>{connector.name}</button>
        })}

      </div>
    </div >
  )
}

export default WalletDialog