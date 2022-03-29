import { FC } from 'react'

import { LayoutDefaultHeader } from './LayoutDefaultHeader'

export const LayoutDefault: FC = props => {
  return (
    <div className="flex h-full flex-col">
      <LayoutDefaultHeader />
      <main className="mt-[65px] grow pt-8">{props.children}</main>
    </div>
  )
}
