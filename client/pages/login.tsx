import { NextPage } from 'next'
import Head from 'next/head'

import { GuestOnly } from '../components/GuestOnly'
import { LayoutDefault } from '../components/LayoutDefault'
import { LoginPageForm } from '../components/LoginPageForm'

const LoginPage: NextPage = () => {
  return (
    <GuestOnly>
      <LayoutDefault>
        <Head>
          <title>Sign in</title>
        </Head>

        <div className="flex h-full w-full sm:items-center sm:justify-center sm:pb-48 sm:pt-8">
          <div className="h-full w-full rounded bg-white p-8 sm:h-auto sm:w-auto sm:shadow-lg">
            <h1 className="text-2xl font-bold">Sign in</h1>

            <LoginPageForm />
          </div>
        </div>
      </LayoutDefault>
    </GuestOnly>
  )
}

export default LoginPage
