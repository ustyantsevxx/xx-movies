import { useRouter } from 'next/router'
import { FC } from 'react'

import { useAuth } from '../api/modules/users/users.hooks'

export const GuestOnly: FC = props => {
  const { user } = useAuth()
  const router = useRouter()

  if (user) {
    router.replace('/')
    // eslint-disable-next-line unicorn/no-null
    return null
  }

  return <>{props.children}</>
}
