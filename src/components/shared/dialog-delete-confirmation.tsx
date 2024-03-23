'use client'

import { useTransition } from 'react'

import { deleteImageRequest } from '@/lib/actions/image.actions'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

function DialogDeleteConfirmation({ imageId }: { imageId: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" className="w-full" variant="destructive">
          Delete Image
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col gap-10">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-16-regular">
            This will permanently delete this image
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button asChild variant="destructive">
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  await deleteImageRequest(imageId)
                })
              }
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DialogDeleteConfirmation
