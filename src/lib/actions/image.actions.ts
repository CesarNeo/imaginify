'use server'

import { v2 as cloudinaryV2 } from 'cloudinary'
import { Query } from 'mongoose'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { handleError } from '@/utils'

import Image from '../database/models/image.model'
import User from '../database/models/user.model'
import { connectToDatabase } from '../database/mongoose'

function populateUser(
  query: Query<unknown, unknown, unknown, unknown, 'findOne'>,
) {
  return query.populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName clerkId',
  })
}

export async function addImageRequest({ image, path, userId }: AddImageParams) {
  try {
    await connectToDatabase()

    const author = await User.findById(userId)

    if (!author) throw new Error('User not found')

    const newImage = await Image.create({
      ...image,
      author: author._id,
    })

    revalidatePath(path)

    return JSON.parse(JSON.stringify(newImage))
  } catch (error) {
    handleError(error)
  }
}

export async function updateImageRequest({
  image,
  path,
  userId,
}: UpdateImageParams) {
  try {
    await connectToDatabase()

    const imageToUpdate = await Image.findById(image._id)

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error('Image not found or unauthorized')
    }

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true },
    )

    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedImage))
  } catch (error) {
    handleError(error)
  }
}

export async function deleteImageRequest(imageId: string) {
  try {
    await connectToDatabase()

    await Image.findByIdAndDelete(imageId)
  } catch (error) {
    handleError(error)
  } finally {
    redirect('/')
  }
}

export async function getImageByIdRequest(imageId: string) {
  try {
    await connectToDatabase()

    const image = await populateUser(Image.findById(imageId))

    if (!image) throw new Error('Image not found')

    return JSON.parse(JSON.stringify(image))
  } catch (error) {
    handleError(error)
  }
}

export async function getAllImagesRequest({
  limit = 9,
  page = 1,
  searchQuery = '',
}: {
  limit?: number
  page: number
  searchQuery?: string
}) {
  try {
    await connectToDatabase()

    cloudinaryV2.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })

    let expression = 'folder=imaginify'

    if (searchQuery) {
      expression += ` AND ${searchQuery}`
    }

    const { resources } = await cloudinaryV2.search
      .expression(expression)
      .execute()

    const resourceIds = resources.map(
      (resource: { public_id: string }) => resource.public_id,
    )

    let query = {}

    if (searchQuery) {
      query = {
        publicId: {
          $in: resourceIds,
        },
      }
    }

    const skipAmount = (Number(page) - 1) * limit

    const images = await populateUser(Image.find(query))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit)

    const totalImages = await Image.find(query).countDocuments()
    const savedImages = await Image.find().countDocuments()

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPage: Math.ceil(totalImages / limit),
      savedImages,
    }
  } catch (error) {
    handleError(error)
  }
}
