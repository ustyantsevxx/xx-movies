import axios from 'axios'
import { getCookie } from 'cookies-next'
import { FC, useRef } from 'react'

export const WaitAuth: FC = props => {
  const token = getCookie('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  console.log(123)

  return <>{props.children}</>
}
