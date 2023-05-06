import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import '../globals.css'
import { WagmiProvider } from '../services/wagmiContext'


function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiProvider>
      <NextHead>
        <title>wagmi</title>
      </NextHead>

      {mounted && <Component {...pageProps} />}
    </WagmiProvider>
  )
}

export default App
