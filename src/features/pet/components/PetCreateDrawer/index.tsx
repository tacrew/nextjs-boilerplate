import { PencilIcon } from '@heroicons/react/solid'
import * as z from 'zod'

import { Button } from '@/components/element'
import {
  Form,
  FormDrawer,
  FormFieldText,
  FormFieldSelect,
  FormFieldRadio,
  FormFieldMultiSelect,
  FormFieldMultiText,
} from '@/components/form'

import { useCreatePet, CreatePetDTO } from '@/features/pet/hooks'
import { Pet, Category, Tag } from '@/api/@types'
import { TupleUnion } from '@/types'

const CATEGORIES: Category[] = [
  { id: 1, name: 'dog' },
  { id: 2, name: 'cat' },
  { id: 3, name: 'rabbit' },
  { id: 4, name: 'snake' },
]

const TAGS: Tag[] = [
  { id: 1, name: 'female' },
  { id: 2, name: 'male' },
  { id: 3, name: 'under 1 month' },
  { id: 4, name: 'under 6 month' },
]

const STATUS_OPTIONS: { label: string; value: NonNullable<Pet['status']> }[] = [
  { label: '問い合わせ可', value: 'available' },
  { label: '問い合わせ中', value: 'pending' },
  { label: '問い合わせ不可', value: 'sold' },
]

const schema = z.object({
  name: z.string().min(1, 'Required'),
  categoryId: z.number(),
  tagIds: z.array(z.number()).nonempty(),
  photos: z.array(z.object({ url: z.string() })),
  status: z
    .enum(
      STATUS_OPTIONS.map((o) => o.value) as TupleUnion<
        NonNullable<Pet['status']>
      >
    )
    .optional(),
})

type FormVO = z.infer<typeof schema>

const generateDTO = ({
  name,
  categoryId,
  tagIds,
  photos,
  status,
}: FormVO): CreatePetDTO => {
  return {
    data: {
      name,
      category: CATEGORIES.find((c) => c.id === categoryId),
      tags: tagIds
        .map((tagId) => TAGS.find((tag) => tag.id === tagId))
        .filter((tag): tag is Tag => tag !== undefined),
      photoUrls: photos.map((photo) => photo.url),
      status,
    },
  }
}

export const PetCreateDrawer = () => {
  const createPetMutation = useCreatePet({})

  return (
    <FormDrawer
      isDone={createPetMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="w-4 h-4" />} size="sm">
          追加
        </Button>
      }
      title="ペット追加"
      submitButton={
        <Button
          form="create-note"
          type="submit"
          size="sm"
          isLoading={createPetMutation.isLoading}
        >
          作成
        </Button>
      }
    >
      <Form<FormVO, typeof schema>
        id="create-note"
        onSubmit={(values) => {
          createPetMutation.mutate(generateDTO(values), {
            onError: (error) => {
              switch (error.response?.status) {
                case 405:
                  return window.alert('invalid input')
                default:
                  return window.alert('unexpected error')
              }
            },
          })
        }}
        schema={schema}
        options={{
          defaultValues: { photos: [{ url: '' }], status: 'available' },
        }}
      >
        {({ register, formState, control }) => {
          return (
            <>
              <FormFieldText
                label="Name"
                error={formState.errors['name']}
                registration={register('name')}
              />
              <FormFieldSelect
                options={CATEGORIES.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                label="Category"
                error={formState.errors['categoryId']}
                registration={register('categoryId', { valueAsNumber: true })}
              />
              <FormFieldMultiSelect
                options={TAGS.map((tag) => ({
                  label: tag.name,
                  value: tag.id,
                }))}
                label="Tag"
                error={formState.errors['tagIds']}
                registration={register('tagIds', { valueAsNumber: true })}
                control={control}
              />
              <FormFieldMultiText<FormVO>
                label="PhotoUrl"
                error={formState.errors['photos']}
                register={register}
                name="photos"
                fieldKey="url"
                defaultValue={{ url: '' }}
                control={control}
              />
              <FormFieldRadio
                label="status"
                error={formState.errors['status']}
                registration={register('status')}
                options={STATUS_OPTIONS}
              />
            </>
          )
        }}
      </Form>
    </FormDrawer>
  )
}
