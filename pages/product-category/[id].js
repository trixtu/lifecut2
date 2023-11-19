'use client'

import NextBreadcrumb from '@/components/Breadcrumb'
import InstructionSteps from '@/components/InstructionSteps'
import ProductCategoryList from '@/components/ProductCategoryList'
import ChevronRight from '@/components/ui/ChevronRight'
import { getAllSubcategory } from '@/lib/shopify'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function productsCategory({ subCategory }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const route = useRouter()

  const id = route.query.id

  // const meta = subCategory?.metaobjects?.edges.map((m) =>
  //   m.node.fields.find((field) => field?.reference?.handle === id)
  // )
  let categories = []
  if (subCategory) {
    const meta = subCategory?.metaobjects?.edges.filter(
      (m) =>
        (m.node.fields[0].reference.handle === id) |
        (m.node.fields[1].reference.handle === id)
    )

    categories = meta
  }

  if (categories.length > 0) {
    return (
      <div className="container">
        <InstructionSteps />
        <NextBreadcrumb
          homeElement={'Home'}
          separator={
            <span>
              <ChevronRight className={'w-4 h-4'} />
            </span>
          }
          activeClasses="text-amber-500"
          containerClasses="flex items-center"
          listClasses="hover:underline mx-2 font-bold"
          capitalizeLinks
        />
        <h2 className="HeaderNav">Material wählen</h2>
        <ul>
          {categories.map((c) => (
            <Link key={c.node?.handle} href={`/zaunserie/${c.node?.handle}`}>
              <ProductCategoryList
                title={c.node?.handle}
                image={c.node.fields[1].reference.image?.url}
                handle={c.node?.handle}
              />
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  return <div>null</div>
}

export async function getStaticProps() {
  const subCategory = await getAllSubcategory()

  return {
    props: { subCategory }, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'sd' } }], // will be passed to the page component as props
    fallback: true,
  }
}
