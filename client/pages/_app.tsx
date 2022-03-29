import '../assets/css/app.css'
import '../assets/css/background-pattern.css'

import Head from 'next/head'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// import { WaitAuth } from '../components/WaitAuth'

const CustomApp = ({ Component, pageProps }: any) => {
  const [client] = useState(new QueryClient())

  return (
    <>
      <Head>
        <title>XX</title>
      </Head>

      <QueryClientProvider client={client}>
        {false && <ReactQueryDevtools position="top-left" />}

        {/* <WaitAuth> */}
        <Component {...pageProps} />
        {/* </WaitAuth> */}
      </QueryClientProvider>
    </>
  )
}

export default CustomApp
