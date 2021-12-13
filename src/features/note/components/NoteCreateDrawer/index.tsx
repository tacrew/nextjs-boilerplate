import { PencilIcon } from '@heroicons/react/solid'
import * as z from 'zod'

import { Button } from '@/components/element'
import { Form, FormDrawer, FormFieldText } from '@/components/form'

import { useCreateNote, CreateNoteDTO } from '@/features/note/hooks'

const schema = z.object({
  title: z.string().min(1, 'Required'),
  content: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
})

export const NoteCreateDrawer = () => {
  const createNoteMutation = useCreateNote({})

  return (
    <FormDrawer
      isDone={createNoteMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="w-4 h-4" />} size="sm">
          追加
        </Button>
      }
      title="Note作成"
      submitButton={
        <Button
          form="create-note"
          type="submit"
          size="sm"
          isLoading={createNoteMutation.isLoading}
        >
          作成
        </Button>
      }
    >
      <Form<CreateNoteDTO['data'], typeof schema>
        id="create-note"
        onSubmit={async (values) => {
          await createNoteMutation.mutateAsync({
            data: values,
          })
        }}
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
              label="Content"
              error={formState.errors['content']}
              registration={register('content')}
            />
            <FormFieldText
              label="Category"
              error={formState.errors['category']}
              registration={register('category')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  )
}
