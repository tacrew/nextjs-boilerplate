import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'
import * as z from 'zod'

import {
  Form,
  FormFieldText,
  FormFieldNumber,
  FormFieldSelect,
} from '@/components/form'
import { Button } from '@/components/element'

const PLANS = ['free', 'premium'] as const

const schema = z.object({
  email: z.string().nonempty('必須入力です').email('不正なメールアドレスです'),
  plan: z.enum(PLANS),
  age: z
    .number({ invalid_type_error: '数値を入力してください' })
    .int('整数値を入力してください')
    .min(20, '20以上を入力してください')
    .max(150, '150以下を入力してください'),
})

type FormVO = z.infer<typeof schema>

const FakeForm = ({ hideSubmit = false }: { hideSubmit?: boolean }) => {
  return (
    <Form<FormVO>
      schema={schema}
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2))
      }}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <FormFieldText
            label="メールアドレス"
            error={formState.errors['email']}
            registration={register('email')}
          />
          <FormFieldNumber
            label="年齢"
            error={formState.errors['age']}
            registration={register('age', { valueAsNumber: true })}
          />
          <FormFieldSelect
            label="契約プラン"
            error={formState.errors['plan']}
            registration={register('plan')}
            options={PLANS.map((type) => ({
              label: type,
              value: type,
            }))}
          />

          {!hideSubmit && (
            <div>
              <Button type="submit" className="w-full">
                送信
              </Button>
            </div>
          )}
        </>
      )}
    </Form>
  )
}

const meta: ComponentMeta<typeof FakeForm> = {
  title: 'Components/form/Form',
  component: FakeForm,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

export const Empty: ComponentStoryObj<typeof FakeForm> = {}

export const SubmitWithoutInput: ComponentStoryObj<typeof FakeForm> = {
  play: async () => {
    await userEvent.click(screen.getByRole('button', { name: '送信' }))
  },
}

export const SubmitWithValidInput: ComponentStoryObj<typeof FakeForm> = {
  play: async (context) => {
    await userEvent.type(
      screen.getByLabelText(/メールアドレス/),
      'sample@example.com',
      { delay: 30 }
    )
    await userEvent.type(screen.getByLabelText(/年齢/), '20', { delay: 30 })
    await userEvent.selectOptions(screen.getByLabelText(/契約プラン/), [
      'premium',
    ])
    await new Promise((resolve) => setTimeout(resolve, 500))
    await SubmitWithoutInput.play!(context)
  },
}

export const SubmitWithInvalidInput: ComponentStoryObj<typeof FakeForm> = {
  play: async (context) => {
    await userEvent.type(screen.getByLabelText(/メールアドレス/), 'sample', {
      delay: 30,
    })
    await userEvent.type(screen.getByLabelText(/年齢/), '12', { delay: 30 })
    await new Promise((resolve) => setTimeout(resolve, 500))
    await SubmitWithoutInput.play!(context)
  },
}
