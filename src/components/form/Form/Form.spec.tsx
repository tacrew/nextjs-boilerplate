import * as z from 'zod'

import { Button } from '@/components/element'
import { rtlRender, screen, waitFor, userEvent } from '@/test/utils'

import { Form } from '../Form'
import { FormFieldText } from '../index'

const testData = {
  title: 'Hello World',
}

const schema = z.object({
  title: z.string().min(1, 'Required'),
})

test('validなデータが入力された状態でsubmitボタン押下するとsubmit処理が発火される', async () => {
  const handleSubmit = jest.fn()

  rtlRender(
    <Form<typeof testData, typeof schema>
      onSubmit={handleSubmit}
      schema={schema}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <FormFieldText
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />

          <Button name="submit" type="submit" className="w-full">
            Submit
          </Button>
        </>
      )}
    </Form>
  )

  userEvent.type(screen.getByLabelText(/title/i), testData.title)

  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything())
  )
})

test('invalidなデータが入力された状態でsubmitボタン押下してもsubmit処理が発火されない', async () => {
  const handleSubmit = jest.fn()

  rtlRender(
    <Form<typeof testData, typeof schema>
      onSubmit={handleSubmit}
      schema={schema}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <FormFieldText
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />

          <Button name="submit" type="submit" className="w-full">
            Submit
          </Button>
        </>
      )}
    </Form>
  )

  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await screen.findByRole(/alert/i, { name: /required/i })

  expect(handleSubmit).toHaveBeenCalledTimes(0)
})
