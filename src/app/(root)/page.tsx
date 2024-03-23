import Link from 'next/link'

import Collection from '@/components/shared/collection'
import { getAllImagesRequest } from '@/lib/actions/image.actions'
import { NAV_LINKS } from '@/utils/constants'

export default async function Home({
  searchParams: { page, query },
}: SearchParamProps) {
  const images = await getAllImagesRequest({
    page: page ? Number(page) : 1,
    searchQuery: query,
  })

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>

        <ul className="flex-center w-full gap-20">
          {NAV_LINKS.slice(1, 5).map((link) => {
            const Icon = link.icon

            return (
              <Link
                key={link.route}
                href={link.route}
                className="flex-center flex-col gap-2"
              >
                <li className="flex-center w-fit rounded-full bg-white p-4">
                  <Icon className="size-6 text-muted-foreground" />
                </li>
                <p className="p-14-medium text-center text-white">
                  {link.label}
                </p>
              </Link>
            )
          })}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch
          images={images?.data}
          totalPages={images?.totalPage}
          page={Number(page) || 1}
        />
      </section>
    </>
  )
}
