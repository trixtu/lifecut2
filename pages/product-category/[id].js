import React from 'react'
import Link from 'next/link'
import { Breadcrumb } from 'antd'
import { getAllSubcategory } from '@/lib/shopify'
import InstructionSteps from '@/components/InstructionSteps'
import ProductCategoryList from '@/components/ProductCategoryList'

const title = 'Willkommen beim Zaunplaner von hoerner-gmbh.com'
const stepOne =
  'Wählen Sie im unteren Bereich das gewünschte Material und die Zaunserie aus, die Ihnen gefällt.'
const stepTwo =
  'Planen Sie Ihren Zaunverlauf, indem Sie die Zaunelemente aus der Übersicht auf die Rasenfläche ziehen. Länge und Preis werden immer angezeigt.'
const stepThree =
  'Wählen Sie abschießend die gewünschten Pfosten, die bevorzugte Befestigungsart und ggf. extra Zubehör aus. Mit nur einem Klick legen Sie den gesamten Zaun samt Zubehör in den Warenkorb.'

export default function productsCategory({ categories }) {
  if (categories?.length > 0) {
    return (
      <div className="container">
        <InstructionSteps
          title={title}
          stepOne={stepOne}
          stepTwo={stepTwo}
          stepThree={stepThree}
        />

        <Breadcrumb
          className="font-semibold"
          separator={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          }
          items={[
            {
              title: 'Material wählen',
            },
            {
              title: 'Zurück',
              href: '/',
            },
          ]}
        />

        <ul className="mt-5">
          {categories.map((c) => (
            <Link key={c.node?.handle} href={`/zaunserie/${c.node?.handle}`}>
              <ProductCategoryList
                title={c.node?.handle}
                image={
                  c.node?.fields.find((f) => f.key === 'subcategory_image')
                    .reference.image?.url
                }
                handle={c.node?.handle}
              />
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  return <div>Null Material</div>
}

export async function getStaticProps(context) {
  const { params } = context
  const subCategoryId = params.id
  const subCategory = await getAllSubcategory()
  const meta = subCategory.metaobjects.edges
  const categories = meta.filter(
    (m) =>
      m.node.fields.find((f) => f.key === 'parent').reference.handle ===
      subCategoryId
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
