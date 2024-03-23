import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

import DialogDeleteConfirmation from '@/components/shared/dialog-delete-confirmation'
// import { DeleteConfirmation } from '@/components/shared/DeleteConfirmation'
import Header from '@/components/shared/header'
import TransformedImage from '@/components/shared/transformed-image'
import { Button } from '@/components/ui/button'
import { getImageByIdRequest } from '@/lib/actions/image.actions'
import { getImageSize } from '@/utils'

async function TransformationImageDetails({
  params: { id },
}: SearchParamProps) {
  const { userId } = auth()

  const image = await getImageByIdRequest(id)

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation:</p>
          <p className=" capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="text-dark-400/50 hidden md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className=" capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="text-dark-400/50 hidden md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className=" capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="text-dark-400/50 hidden md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className=" capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="border-dark-400/15 mt-10 border-t">
        <div className="transformation-grid">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, 'width')}
              height={getImageSize(image.transformationType, image, 'height')}
              src={image.secureURL}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          {/* TRANSFORMED IMAGE */}
          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="w-full">
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <DialogDeleteConfirmation imageId={image._id} />
          </div>
        )}
      </section>
    </>
  )
}

export default TransformationImageDetails
