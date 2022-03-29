import { UseFormRegisterReturn } from 'react-hook-form'

export interface InputValidatableProps {
  invalid?: boolean
}

export interface InputHookFormRegisteredProps {
  form?: UseFormRegisterReturn
}

export interface InputBaseProps
  extends InputValidatableProps,
    InputHookFormRegisteredProps {
  id?: string
  placeholder?: string
}

export interface EmailPassword {
  email: string
  password: string
}
