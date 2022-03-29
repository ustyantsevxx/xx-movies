import { FC, ReactNode, useEffect, useState } from 'react'

import { generateUid } from '../utils'

interface FormGroupRenderPropParams {
  id: string
}

interface FormGroupProps {
  id?: string
  input: (props: FormGroupRenderPropParams) => ReactNode
  errorMessage?: string
  label?: string
  className?: string
}

export const FormGroup: FC<FormGroupProps> = props => {
  const [id, setId] = useState(props.id)

  useEffect(() => {
    setId(props.id ?? generateUid())
  }, [props.id])

  return (
    <fieldset className={props.className}>
      <label htmlFor={id}>{props.label}</label>
      {props.input({ id: id as string })}
      <p className="text-xs text-red-500">{props.errorMessage}</p>
    </fieldset>
  )
}
