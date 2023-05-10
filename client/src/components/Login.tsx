import React, { useEffect, useState } from 'react'
import WalletDialog from './WalletDialog';
import { useAccount, usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { utils } from 'ethers';
import { useRouter } from 'next/router';



const styles = {
    container: `flex w-100vh h-screen`,
    subContainer: `m-auto flex gap-2`,
    payBtnStyle: `rounded-md p-2 font-bold text-white bg-green-500 border-none enabled:hover:bg-green-400`,
    conntectBtnStyle: `rounded-md p-2 font-bold text-white bg-green-500 border-none enabled:hover:bg-green-400`,
    flexRow:`flex flex-row`
}



const Login = () => {
    const { isConnected, connector } = useAccount();
    const [dialogState, setDialogState] = useState(false);
    const address = process.env.NEXT_PUBLIC_OWNER_ACCOUNT_ADDRESS;
    const router = useRouter();


    const handleConnectWallet = () => {
        setDialogState(true);
    }


    //transfer payment
    const { config } = usePrepareSendTransaction({
        request: {
            to: `${address}`,
            value: utils.parseEther('0.00001'),
        }
    });

    const { data, sendTransaction } = useSendTransaction(config);
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash
    })

    const handlePayFees = async () => {
        if (!isLoading) {
            try {
                sendTransaction?.()
            } catch (error) {
                console.log(error);
                console.log(error);
            }
        }

    }

    //when payment successful
    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem('paymentStatus', 'successful');
            router.push('/dashboard')
        }
    }, [isSuccess]);



    useEffect(() => {
        setDialogState(false)
    }, [isConnected])






    return (
        <div className={styles.container} >
            <div className={styles.subContainer}>
                <button onClick={handlePayFees} className={styles.payBtnStyle} disabled={!isConnected} type='button' >
                    {isLoading ? (
                        <div className={styles.flexRow}>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>  Progress... </span>
                        </div>
                    )
                        : ('Pay 0.00001ETH')}

                </button>
                <button className={styles.conntectBtnStyle} type='button' onClick={handleConnectWallet} disabled={isConnected}>{isConnected ? `Connected (${connector?.name})` : 'Connect Wallet'}</button>
            </div>

            {dialogState && <WalletDialog />}


        </div>
    )
}

export default Login