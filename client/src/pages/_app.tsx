import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import '../globals.css'
import { WagmiProvider } from '../context/wagmiContext'
import { SpotifyContextProvider } from '../context/AudoPlayerContext'


function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiProvider>
      <SpotifyContextProvider>
        <NextHead>
          <title>Spotify Web3.0</title>
        </NextHead>
        {mounted && <Component {...pageProps} />}
      </SpotifyContextProvider>
    </WagmiProvider>
  )
}

export default App
