'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { getCldImageUrl } from 'next-cloudinary'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  addImageRequest,
  updateImageRequest,
} from '@/lib/actions/image.actions'
import { updateCreditsRequest } from '@/lib/actions/user.actions'
// import { updateCreditsRequest } from '@/lib/actions/user.actions'
import { AspectRatioKey, debounce, deepMergeObjects } from '@/utils'
import {
  ASPECT_RATIO_OPTIONS,
  CREDIT_FEE,
  DEFAULT_VALUES,
  TRANSFORMATION_TYPES,
} from '@/utils/constants'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import CustomField from './custom-field'
import DialogInsufficientCredits from './dialog-insufficient-credits'
import MediaUploader from './media-uploader'
import TransformedImage from './transformed-image'

interface OnImageChangeProps {
  publicId: string
  width: string
  height: string
  secureURL: string
}

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

function TransformationForm({
  action,
  data = null,
  type,
  config = null,
  userId,
  creditBalance,
}: TransformationFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null)
  const [isTransforming, setIsTransforming] = useState(false)
  const [transformationConfig, setTransformationConfig] = useState(config)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const showInputRemoveOrRecolor = type === 'REMOVE' || type === 'RECOLOR'
  const transformationType = TRANSFORMATION_TYPES[type]
  const initialValues =
    data && action === 'Update'
      ? {
          ...data,
        }
      : DEFAULT_VALUES

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  function onSelectFieldHandler(
    value: string,
    onChangeField: (value: string) => void,
  ) {
    const { aspectRatio, height, width } =
      ASPECT_RATIO_OPTIONS[value as AspectRatioKey]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setImage((prevImage: any) => ({
      ...prevImage,
      aspectRatio,
      height,
      width,
    }))

    setNewTransformation(transformationType.config)

    return onChangeField(value)
  }

  function onInputChangeHandler(
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void,
  ) {
    debounce(() => {
      const fieldNameKey = fieldName === 'prompt' ? 'prompt' : 'to'

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setNewTransformation((prevTransformation: any) => ({
        ...prevTransformation,
        [type]: {
          ...prevTransformation[type],
          [fieldNameKey]: value,
        },
      }))

      return onChangeField(value)
    }, 1000)
  }

  function handleTransform() {
    setIsTransforming(true)

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig),
    )

    setNewTransformation(null)

    startTransition(async () => {
      await updateCreditsRequest(userId, CREDIT_FEE)
    })
  }

  function onImageChange({
    publicId,
    secureURL,
    height,
    width,
  }: OnImageChangeProps) {
    setImage((prevImage) => ({
      ...prevImage,
      publicId,
      secureURL,
      height,
      width,
    }))
  }

  const onSubmit = form.handleSubmit(
    async ({ title, aspectRatio, color, prompt }) => {
      if (image) {
        const transformationUrl = getCldImageUrl({
          width: image.width,
          height: image.height,
          src: image.publicId,
          ...transformationConfig,
        })

        const imageData = {
          title,
          publicId: image.publicId,
          transformationType: type,
          width: image.width,
          height: image.height,
          config: transformationConfig,
          secureURL: image.secureURL,
          transformationURL: transformationUrl,
          aspectRatio,
          prompt,
          color,
        }

        if (action === 'Add') {
          try {
            const newImage = await addImageRequest({
              image: imageData,
              path: '/',
              userId,
            })

            if (newImage) {
              form.reset()
              setImage(data)
              router.push(`/transformations/${newImage._id}`)
            }
          } catch (error) {
            console.error(error)
          }
        }

        if (action === 'Update') {
          try {
            const updatedImage = await updateImageRequest({
              image: { ...imageData, _id: data._id },
              path: `/transformations/${data._id}`,
              userId,
            })

            if (updatedImage) {
              router.push(`/transformations/${updatedImage._id}`)
            }
          } catch (error) {
            console.error(error)
          }
        }
      }
    },
  )

  useEffect(() => {
    if (image && (type === 'RESTORE' || type === 'REMOVEBACKGROUND')) {
      setNewTransformation(transformationType.config)
    }
  }, [image, transformationType.config, type])

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        {creditBalance < Math.abs(CREDIT_FEE) && <DialogInsufficientCredits />}

        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} />}
        />

        {type === 'FILL' && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                onValueChange={(value) => onSelectFieldHandler(value, onChange)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(ASPECT_RATIO_OPTIONS).map((aspectRatio) => (
                    <SelectItem key={aspectRatio} value={aspectRatio}>
                      {
                        ASPECT_RATIO_OPTIONS[aspectRatio as AspectRatioKey]
                          .label
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {showInputRemoveOrRecolor && (
          <div className="prompt-field">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === 'REMOVE' ? 'Object to remove' : 'Object to recolor'
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={({ target: { value } }) =>
                    onInputChangeHandler('prompt', value, type, field.onChange)
                  }
                />
              )}
            />

            {type === 'RECOLOR' && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={({ target: { value } }) =>
                      onInputChangeHandler(
                        'color',
                        value,
                        'RECOLOR',
                        field.onChange,
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="media-uploader-field">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                onImageChange={onImageChange}
                publicId={field.value || ''}
                image={image}
                type={type}
              />
            )}
          />

          <TransformedImage
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            onTransformingChange={setIsTransforming}
            transformationConfig={transformationConfig}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            disabled={isTransforming || newTransformation === null}
            onClick={handleTransform}
            variant="secondary"
          >
            {isTransforming ? 'Transforming...' : 'Apply Transformation'}
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformationForm
