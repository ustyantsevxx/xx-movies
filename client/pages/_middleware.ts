import axios from 'axios'
import type { NextFetchEvent, NextRequest } from 'next/server'

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  const { token } = req.cookies

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}
