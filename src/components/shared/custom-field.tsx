import { Control, ControllerRenderProps } from 'react-hook-form'
import { z } from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { formSchema } from './transformation-form'

type TransformationFormSchema = z.infer<typeof formSchema>

type CustomFieldProps = {
  control: Control<TransformationFormSchema> | undefined
  render: (props: {
    field: ControllerRenderProps<TransformationFormSchema>
  }) => React.ReactNode
  name: keyof TransformationFormSchema
  formLabel?: string
  className?: string
}

function CustomField({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomField
