
import React from 'react'
import { useAccount, useConnect } from 'wagmi'

function WalletDialog() {

  const {connect,connectors} = useConnect();

  return (
    <div className='h-full w-full fixed left-0 top-0 flex justify-center items-center bg-opacity-50'>
     <div className='rounded-sm p-8 bg-slate-100 w-1/4 h-96 flex justify-center flex-col gap-3 items-center '>

      {connectors.map((connector,index)=>{
        return <button disabled={!connector.ready} key={index} className='w-36 p-2 rounded-lg bg-blue-500 hover:bg-green-500 font-bold text-white' onClick={()=>{ connect({connector})}}>{connector.name}</button>
      })}

     </div>
    </div>
  )
}

export default WalletDialog