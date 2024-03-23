import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import Header from '@/components/shared/header'
import TransformationForm from '@/components/shared/transformation-form'
import { getImageByIdRequest } from '@/lib/actions/image.actions'
import { getUserByIdRequest } from '@/lib/actions/user.actions'
import { TRANSFORMATION_TYPES } from '@/utils/constants'

async function UpdateTransformationPage({ params: { id } }: SearchParamProps) {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const user = await getUserByIdRequest(userId)
  const image = await getImageByIdRequest(id)

  const transformation =
    TRANSFORMATION_TYPES[image.transformationType as TransformationTypeKey]

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={user._id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  )
}

export default UpdateTransformationPage
