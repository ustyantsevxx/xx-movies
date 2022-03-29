import clsx from 'clsx'
import { FC, FormEventHandler } from 'react'

import { InputBaseProps } from '../types'

interface InputDefaultProps extends InputBaseProps {
  type?: string
  onInput?: FormEventHandler
}

export const InputDefault: FC<InputDefaultProps> = props => {
  return (
    <input
      className={clsx([
        'w-full rounded bg-gray-100 py-2 px-4 placeholder-gray-400 outline-none transition',
        {
          'border-red-500 ring-red-500': props.invalid
        }
      ])}
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onInput={props.onInput}
      {...props.form}
    />
  )
}
