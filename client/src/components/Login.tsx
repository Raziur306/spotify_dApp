import React,{useEffect, useState} from 'react'
import WalletDialog from './WalletDialog';
import { useAccount } from 'wagmi';

function Login() {
    const {isConnected,connector} = useAccount();
    const [dialogState,setDialogState] = useState(false);
    const isPaymentProgress = true;

    const handleConnectWallet = ()=>{
        setDialogState(true);
    }


    const handlePayFees = async()=>{

    }

    useEffect(()=>{
        setDialogState(false)
    },[isConnected])



  return (
    <div className='flex w-100vh h-screen  '>
        <div className='m-auto flex gap-2'>
               <button onClick={handlePayFees} className=' rounded-md p-2 font-bold text-white bg-green-500 border-none enabled:hover:bg-green-400' disabled={!isConnected}  type='button' >
                {isPaymentProgress ? (
                    <div className="flex flex-row">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                 <span>  Progress... </span>
                 </div>
              )
            
                 : ('Pay 0.0001ETH')}
                
                
                
                
                
                </button>


               <button  className=' rounded-md p-2 font-bold text-white bg-green-500 border-none enabled:hover:bg-green-400' type='button' onClick={handleConnectWallet} disabled={isConnected}>{isConnected?`Connected (${connector?.name})`:'Connect Wallet'}</button>
        </div>

        {dialogState && <WalletDialog />}


    </div>
  )
}

export default Login