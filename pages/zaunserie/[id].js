'use client'

import NextBreadcrumb from '@/components/Breadcrumb'
import InstructionSteps from '@/components/InstructionSteps'
import ProductCategoryList from '@/components/ProductCategoryList'
import ChevronRight from '@/components/ui/ChevronRight'
import { getAllSubcategory } from '@/lib/shopify'
import { generateRandomId } from '@/utils/randomId'
import { useRouter } from 'next/router'
import React from 'react'

const title = 'Willkommen beim Zaunplaner von hoerner-gmbh.com'
const stepOne =
  'Wählen Sie im unteren Bereich das gewünschte Material und die Zaunserie aus, die Ihnen gefällt.'
const stepTwo =
  'Planen Sie Ihren Zaunverlauf, indem Sie die Zaunelemente aus der Übersicht auf die Rasenfläche ziehen. Länge und Preis werden immer angezeigt.'
const stepThree =
  'Wählen Sie abschießend die gewünschten Pfosten, die bevorzugte Befestigungsart und ggf. extra Zubehör aus. Mit nur einem Klick legen Sie den gesamten Zaun samt Zubehör in den Warenkorb.'

export default function Zaunseries({ categories }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const route = useRouter()
  const id = route.query.id

  // const meta = subCategory?.metaobjects?.edges.map((m) =>
  //   m.node.fields.find((field) => field?.reference?.handle === id)
  // )

  function defaultProduct(products) {
    const defaultProducts = products.filter((product) =>
      product.node.tags.some((tag) => tag === 'defaultProduct')
    )

    const newItemWithIds = defaultProducts.map((item) => ({
      ...item,
      id: generateRandomId(),
    }))

    localStorage.setItem('configuratorItems', JSON.stringify(newItemWithIds))
  }

  if (categories) {
    return (
      <div className="container">
        <InstructionSteps
          title={title}
          stepOne={stepOne}
          stepTwo={stepTwo}
          stepThree={stepThree}
        />
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
        <h2 className="HeaderNav">Zaunserie wählen</h2>
        <ul>
          {categories?.map((c) => (
            <a
              key={c.node.handle}
              href={`/configurator/${c.node.handle}`}
              onClick={() =>
                defaultProduct(c.node.fields[0].reference.products.edges)
              }
            >
              <ProductCategoryList
                title={c.node.handle}
                image={c.node.fields[2].reference.image?.url}
                handle={c.node.handle}
              />
            </a>
          ))}
        </ul>
      </div>
    )
  }

  return <div>null</div>
}

export async function getStaticProps({ params }) {
  const subCategory = await getAllSubcategory()
  const meta = subCategory?.metaobjects?.edges
  const categories = meta.filter(
    (m) => m.node.fields[1].reference.handle === params.id
  )

  return {
    props: { categories }, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'sd' } }], // will be passed to the page component as props
    fallback: true,
  }
}
