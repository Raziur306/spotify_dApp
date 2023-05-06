import { useAccount } from 'wagmi'
import { Dashboard, Login } from '../components'


function Page() {
  const { isConnected } = useAccount();
  



  return (
    <>
    {<Login/>}









      {/* <h1>wagmi + Next.js</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )} */}
    </>
  )
}

export default Page
