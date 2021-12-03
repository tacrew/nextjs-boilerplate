import * as React from 'react'
import * as z from 'zod'

import { Button } from '@/components/element'
import { Form, FormFieldText } from '@/components/form'

import { useCreateNote, CreateNoteDTO } from '@/features/note/hooks'

const schema = z.object({
  title: z.string().min(1, 'Required'),
  content: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
})

export const NoteCreateForm = () => {
  const { isLoading, mutateAsync } = useCreateNote({})

  const onSubmit = React.useCallback(
    async (values: CreateNoteDTO['data']) => {
      try {
        await mutateAsync({ data: values })
      } catch (error: any) {
        console.log(error)
      }
    },
    [mutateAsync]
  )

  return (
    <Form<CreateNoteDTO['data'], typeof schema>
      id="create-discussion"
      onSubmit={onSubmit}
      schema={schema}
    >
      {({ register, formState }) => (
        <>
          <FormFieldText
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />

          <FormFieldText
            label="content"
            error={formState.errors['content']}
            registration={register('content')}
          />

          <FormFieldText
            label="category"
            error={formState.errors['category']}
            registration={register('category')}
          />

          <div>
            <Button isLoading={isLoading} type="submit" className="w-6">
              Create
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
