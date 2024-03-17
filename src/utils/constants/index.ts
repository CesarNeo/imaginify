import {
  Camera,
  Home,
  Image,
  ScanEye,
  ShoppingBag,
  SlidersHorizontal,
  Stars,
  User,
} from 'lucide-react'

export const NAV_LINKS = [
  {
    label: 'Home',
    route: '/',
    icon: Home,
  },
  {
    label: 'Image Restore',
    route: '/transformations/add/restore',
    icon: Image,
  },
  {
    label: 'Generative Fill',
    route: '/transformations/add/fill',
    icon: Stars,
  },
  {
    label: 'Object Remove',
    route: '/transformations/add/remove',
    icon: ScanEye,
  },
  {
    label: 'Object Recolor',
    route: '/transformations/add/recolor',
    icon: SlidersHorizontal,
  },
  {
    label: 'Background Remove',
    route: '/transformations/add/removeBackground',
    icon: Camera,
  },
  {
    label: 'Profile',
    route: '/profile',
    icon: User,
  },
  {
    label: 'Buy Credits',
    route: '/credits',
    icon: ShoppingBag,
  },
]

export const PLANS = [
  {
    _id: 1,
    name: 'Free',
    icon: '/assets/icons/free-plan.svg',
    price: 0,
    credits: 20,
    inclusions: [
      {
        label: '20 Free Credits',
        isIncluded: true,
      },
      {
        label: 'Basic Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: false,
      },
      {
        label: 'Priority Updates',
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: 'Pro Package',
    icon: '/assets/icons/free-plan.svg',
    price: 40,
    credits: 120,
    inclusions: [
      {
        label: '120 Credits',
        isIncluded: true,
      },
      {
        label: 'Full Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: true,
      },
      {
        label: 'Priority Updates',
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: 'Premium Package',
    icon: '/assets/icons/free-plan.svg',
    price: 199,
    credits: 2000,
    inclusions: [
      {
        label: '2000 Credits',
        isIncluded: true,
      },
      {
        label: 'Full Access to Services',
        isIncluded: true,
      },
      {
        label: 'Priority Customer Support',
        isIncluded: true,
      },
      {
        label: 'Priority Updates',
        isIncluded: true,
      },
    ],
  },
]

export const TRANSFORMATION_TYPES = {
  RESTORE: {
    type: 'restore',
    title: 'Restore Image',
    subTitle: 'Refine images by removing noise and imperfections',
    config: { restore: true },
    icon: 'image.svg',
  },
  REMOVE_BACKGROUND: {
    type: 'removeBackground',
    title: 'Background Remove',
    subTitle: 'Removes the background of the image using AI',
    config: { removeBackground: true },
    icon: 'camera.svg',
  },
  FILL: {
    type: 'fill',
    title: 'Generative Fill',
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: 'stars.svg',
  },
  REMOVE: {
    type: 'remove',
    title: 'Object Remove',
    subTitle: 'Identify and eliminate objects from images',
    config: {
      remove: { prompt: '', removeShadow: true, multiple: true },
    },
    icon: 'scan.svg',
  },
  RECOLOR: {
    type: 'recolor',
    title: 'Object Recolor',
    subTitle: 'Identify and recolor objects from the image',
    config: {
      recolor: { prompt: '', to: '', multiple: true },
    },
    icon: 'filter.svg',
  },
}

export const ASPECT_RATIO_OPTIONS = {
  '1:1': {
    aspectRatio: '1:1',
    label: 'Square (1:1)',
    width: 1000,
    height: 1000,
  },
  '3:4': {
    aspectRatio: '3:4',
    label: 'Standard Portrait (3:4)',
    width: 1000,
    height: 1334,
  },
  '9:16': {
    aspectRatio: '9:16',
    label: 'Phone Portrait (9:16)',
    width: 1000,
    height: 1778,
  },
}

export const DEFAULT_VALUES = {
  title: '',
  aspectRatio: '',
  color: '',
  prompt: '',
  publicId: '',
}

export const CREDIT_FEE = -1
