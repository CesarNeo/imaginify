'use client'

import { ImageDown } from 'lucide-react'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { useState } from 'react'

import { dataUrl, debounce, download, getImageSize } from '@/utils'

import { Button } from '../ui/button'

function TransformedImage({
  title,
  image,
  isTransforming,
  transformationConfig,
  type,
  hasDownload = false,
  onTransformingChange,
}: TransformedImageProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownload() {
    setIsDownloading(true)

    await download(
      getCldImageUrl({
        width: image.width,
        height: image.height,
        src: image.publicId,
        ...transformationConfig,
      }),
      title,
    )

    setIsDownloading(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold">Transformed</h3>

        {hasDownload && (
          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <ImageDown className="size-6" />
          </Button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, 'width')}
            height={getImageSize(type, image, 'height')}
            src={image?.publicId}
            alt="Original image"
            sizes="(max-width: 767px) 100vw, 50vw"
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => onTransformingChange?.(false)}
            onError={() =>
              debounce(() => onTransformingChange?.(false), 8000)()
            }
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="Transforming loader"
                className="h-12 w-12"
              />
              <p className="text-muted-foreground">Please wait...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">Transformed Image</div>
      )}
    </div>
  )
}

export default TransformedImage
