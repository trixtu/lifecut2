import React, { useEffect, useState } from 'react'
import { generateRandomId } from '@/utils/randomId'
import InstructionSteps from '@/components/InstructionSteps'
import ProductCategoryList from '@/components/ProductCategoryList'
import useSWR from 'swr'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { Avatar, Breadcrumb, List, Skeleton, Space } from 'antd'

const title = 'Willkommen beim Zaunplaner von hoerner-gmbh.com'
const stepOne =
  'Wählen Sie im unteren Bereich das gewünschte Material und die Zaunserie aus, die Ihnen gefällt.'
const stepTwo =
  'Planen Sie Ihren Zaunverlauf, indem Sie die Zaunelemente aus der Übersicht auf die Rasenfläche ziehen. Länge und Preis werden immer angezeigt.'
const stepThree =
  'Wählen Sie abschießend die gewünschten Pfosten, die bevorzugte Befestigungsart und ggf. extra Zubehör aus. Mit nur einem Klick legen Sie den gesamten Zaun samt Zubehör in den Warenkorb.'

// setup inventory fetcher
const fetchCollections = (url) => axios.get(url).then((res) => res.data)

export default function Zaunseries() {
  const params = useParams()
  const [loading, setLoading] = useState(true)

  const { data: allCollections } = useSWR(
    [`/api/zaunserie`],
    (url) => fetchCollections(url),
    { errorRetryCount: 3 }
  )

  const filteredCollection = (allCollections) => {
    if (allCollections) {
      const meta = allCollections?.metaobjects?.edges
      const filterMeta = meta?.filter(
        (m) => m?.node?.fields[1]?.reference?.handle === params?.id
      )

      return filterMeta
    }
    return
  }

  const filteredCollections = filteredCollection(allCollections)

  useEffect(() => {
    if (filteredCollections) {
      setLoading(false)
    }
  }, [filteredCollections])

  function defaultProduct(fields) {
    //default products
    const fieldCollection = fields.fields.find((f) => f.key === 'collection')
    const defaultProducts = fieldCollection.reference.products.edges.filter(
      (product) => product.node.tags.some((tag) => tag === 'defaultProduct')
    )

    //default pfoste
    const fieldOne = fields.fields.find((f) => f.key === 'pfosten')
    const fieldTwo = fieldOne.reference.fields.find((f) => f.key === 'pfosten')
    const defaultPfoste = fieldTwo.references.edges.find((pfoste) =>
      pfoste.node.tags.some((tag) => tag === 'defaultPfoste')
    )

    const newItemWithIds = defaultProducts.map((item) => ({
      ...item,
      id: generateRandomId(),
      pfosten: defaultPfoste,
    }))

    localStorage.setItem('configuratorItems', JSON.stringify(newItemWithIds))
  }

  const items = [
    {
      title: 'Zaunserie wählen',
    },
    {
      title: 'Zurück',
      href: '/',
    },
  ]

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
        items={items}
      />

      <ul className="mt-5">
        {filteredCollections &&
          filteredCollections?.map((c, index) =>
            !loading ? (
              <a
                key={index}
                href={`/configurator/${c.node.handle}`}
                onClick={() => defaultProduct(c.node)}
              >
                <ProductCategoryList
                  title={c?.node?.fields[3]?.value}
                  image={c.node.fields[5].reference?.image?.url}
                  handle={c.node.handle}
                />
              </a>
            ) : (
              <Space key={index}>
                <Skeleton.Button size="large" />
              </Space>
            )
          )}
      </ul>
    </div>
  )
}
