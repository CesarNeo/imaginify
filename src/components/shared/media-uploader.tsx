import { CirclePlus } from 'lucide-react'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { toast } from 'sonner'

import { dataUrl, getImageSize } from '@/utils'

interface OnImageChangeProps {
  publicId: string
  width: string
  height: string
  secureURL: string
}

interface MediaUploaderProps {
  onValueChange: (value: string) => void
  onImageChange: (data: OnImageChangeProps) => void
  publicId: string
  image: any
  type: string
}

function MediaUploader({
  onImageChange,
  onValueChange,
  image,
  publicId,
  type,
}: MediaUploaderProps) {
  function onUploadSuccess(result: any) {
    onImageChange({
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    })

    onValueChange(result?.info?.public_id)

    toast.success('Image uploaded successfully', {
      description: '1 credit has been deducted from your account.',
      duration: 5000,
    })
  }

  function onUploadError() {
    toast.error('Something went wrong while uploading', {
      description: 'Please try again later.',
      duration: 5000,
    })
  }

  return (
    <CldUploadWidget
      uploadPreset="imaginify"
      options={{
        multiple: false,
        resourceType: 'image',
      }}
      onSuccess={onUploadSuccess}
      onError={onUploadError}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold">Original</h3>

          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-lg">
                <CldImage
                  width={getImageSize(type, image, 'width')}
                  height={getImageSize(type, image, 'height')}
                  src={publicId}
                  alt="Original image"
                  sizes="(max-width: 767px) 100vw, 50vw"
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage"
                />
              </div>
            </>
          ) : (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-upload_cta-image">
                <CirclePlus className="size-6 text-primary" />
              </div>
              <p className="p-14-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader
