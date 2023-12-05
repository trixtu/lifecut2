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
  const categoryItems = categories?.map((item) => {
    const image = item.node.fields.find((f) => f.key === 'subcategory_image')
      .reference.image.url
    return {
      key: item.node.handle,
      title: item.node.handle,
      image: image,
    }
  })

  if (categoryItems) {
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
          {categoryItems &&
            categoryItems.map((c) => (
              <Link key={c.key} href={`/zaunserie/${c.title}`}>
                <ProductCategoryList
                  title={c.title}
                  image={c.image}
                  handle={c.title}
                />
              </Link>
            ))}
        </ul>
      </div>
    )
  }
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
