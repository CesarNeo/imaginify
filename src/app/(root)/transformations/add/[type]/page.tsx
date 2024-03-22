import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import Header from '@/components/shared/header'
import TransformationForm from '@/components/shared/transformation-form'
import { getUserByIdRequest } from '@/lib/actions/user.actions'
import { TRANSFORMATION_TYPES } from '@/utils/constants'

async function AddTransformationTypePage({
  params: { type },
}: SearchParamProps) {
  const { userId } = auth()

  const typeParams = type.toUpperCase() as keyof typeof TRANSFORMATION_TYPES
  const transformation = TRANSFORMATION_TYPES[typeParams]

  if (!userId) return redirect('/sign-in')

  const user = await getUserByIdRequest(userId)

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage
