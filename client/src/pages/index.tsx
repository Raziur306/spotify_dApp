import { useAccount } from 'wagmi'
import { Login } from '../components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';


function Page() {

  const paymentStatus = localStorage.getItem('paymentStatus');
  const [loading, setLoadingState] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (paymentStatus == 'successful') {
      router.push('/dashboard');
    } else {
      setLoadingState(false);
    }
  })


  return (
    <>
      {!loading && <Login />}
    </>
  )
}

export default Page
