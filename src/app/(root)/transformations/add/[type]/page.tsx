import Header from '@/components/shared/header'
import { TRANSFORMATION_TYPES } from '@/utils/constants'

function AddTransformationTypePage({ params: { type } }: SearchParamProps) {
  const typeParams = type.toUpperCase() as keyof typeof TRANSFORMATION_TYPES
  const transformation = TRANSFORMATION_TYPES[typeParams]

  return (
    <Header title={transformation.title} subtitle={transformation.subTitle} />
  )
}

export default AddTransformationTypePage
