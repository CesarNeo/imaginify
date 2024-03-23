'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/utils'

function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: 'query',
          value: query,
        })

        router.push(newUrl, { scroll: false })
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ['query'],
        })

        router.push(newUrl, { scroll: false })
      }
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [router, searchParams, query])

  return (
    <div className="relative w-full md:max-w-96">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
        className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        className="w-full !pr-7"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default Search
