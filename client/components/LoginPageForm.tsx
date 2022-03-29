import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as yup from 'yup'

import { signIn } from '../api/modules/auth'
import { getCurrentUser } from '../api/modules/users/users.service'
import { Button } from '../components/Button'
import { FormGroup } from '../components/FormGroup'
import { InputDefault } from '../components/InputDefault'
import { EmailPassword } from '../types'

type LoginFormFields = EmailPassword & { form: string }

const loginFormYupSchema = yup
  .object({
    form: yup.string(),
    email: yup
      .string()
      .required('Email is required')
      .email('Incorrect email format'),
    password: yup.string().required('Password is required')
  })
  .required()

export const LoginPageForm: FC = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormFields>({
    resolver: yupResolver(loginFormYupSchema)
  })

  const queryClient = useQueryClient()

  const onSubmit = async ({ email, password }: LoginFormFields) => {
    const { message } = await signIn({ email, password })
    if (message) {
      setError('form', { message })
    } else {
      await queryClient.fetchQuery('user', getCurrentUser)
    }
  }

  return (
    <form className="mt-5">
      <FormGroup
        label="Email"
        errorMessage={errors.email?.message}
        input={({ id }) => (
          <InputDefault
            id={id}
            form={register('email')}
            invalid={!!errors.email}
            onInput={() => clearErrors('form')}
          />
        )}
      />

      <FormGroup
        className="mt-4"
        label="Password"
        errorMessage={errors.password?.message}
        input={({ id }) => (
          <InputDefault
            id={id}
            type="password"
            form={register('password')}
            invalid={!!errors.password}
            onInput={() => clearErrors('form')}
          />
        )}
      />

      {!isSubmitting && errors.form && (
        <p className="mt-4 text-xs text-red-500">{errors.form.message}</p>
      )}

      <Button onClick={handleSubmit(onSubmit)} className="mt-5">
        Submit
      </Button>
    </form>
  )
}
