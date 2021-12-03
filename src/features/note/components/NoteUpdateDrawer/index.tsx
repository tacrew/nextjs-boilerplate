import { PencilIcon } from '@heroicons/react/solid'
import * as z from 'zod'

import { Button } from '@/components/element'
import { Form, FormDrawer, FormFieldText } from '@/components/form'

import { Note } from '../../types'

import { useNote, useUpdateNote, UpdateNoteDTO } from '../../hooks'

type UpdateDiscussionProps = {
  noteId: Note['id']
}

const schema = z.object({
  title: z.string().min(1, 'Required'),
  content: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
})

export const UpdateDiscussion = ({ noteId }: UpdateDiscussionProps) => {
  const noteQuery = useNote({ noteId })
  const updateNoteMutation = useUpdateNote()

  return (
    <FormDrawer
      isDone={updateNoteMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="w-4 h-4" />} size="sm">
          Update Note
        </Button>
      }
      title="Update Discussion"
      submitButton={
        <Button
          form="update-discussion"
          type="submit"
          size="sm"
          isLoading={updateNoteMutation.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<UpdateNoteDTO['data'], typeof schema>
        id="update-discussion"
        onSubmit={async (values) => {
          await updateNoteMutation.mutateAsync({
            data: values,
            noteId,
          })
        }}
        options={{
          defaultValues: {
            title: noteQuery.data?.title,
            content: noteQuery.data?.content,
            category: noteQuery.data?.category,
          },
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
