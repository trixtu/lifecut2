import React, { useContext, useEffect, useState } from 'react'
import { getAllZaunserie } from '@/lib/shopify'
import { generateRandomId } from '@/utils/randomId'
import NextBreadcrumb from '@/components/Breadcrumb'
import ChevronRight from '@/components/ui/ChevronRight'
import InstructionSteps from '@/components/InstructionSteps'
import ProductCategoryList from '@/components/ProductCategoryList'
import { Context } from '@/context/configuratorContext'
import useSWR from 'swr'
import axios from 'axios'
import { useParams } from 'next/navigation'

const title = 'Willkommen beim Zaunplaner von hoerner-gmbh.com'
const stepOne =
  'Wählen Sie im unteren Bereich das gewünschte Material und die Zaunserie aus, die Ihnen gefällt.'
const stepTwo =
  'Planen Sie Ihren Zaunverlauf, indem Sie die Zaunelemente aus der Übersicht auf die Rasenfläche ziehen. Länge und Preis werden immer angezeigt.'
const stepThree =
  'Wählen Sie abschießend die gewünschten Pfosten, die bevorzugte Befestigungsart und ggf. extra Zubehör aus. Mit nur einem Klick legen Sie den gesamten Zaun samt Zubehör in den Warenkorb.'

// setup inventory fetcher
const fetchCollections = (url) => axios.get(url).then((res) => res.data)

let filteredCollection = null

export default function Zaunseries() {
  const { selectedPfosten } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [collection, setCollection] = useState([])

  const params = useParams()

  const { data: allCollections } = useSWR(
    [`/api/zaunserie`],
    (url) => fetchCollections(url),
    { errorRetryCount: 3 }
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCollection = () => {
    const meta = allCollections?.metaobjects?.edges
    const filterMeta = meta.filter(
      (m) => m?.node?.fields[1]?.reference?.handle === params.id
    )
    return
  }

  const filteredCollection = (allCollections) => {
    if (allCollections) {
      const meta = allCollections?.metaobjects?.edges
      const filterMeta = meta?.filter(
        (m) => m?.node?.fields[1]?.reference?.handle === params.id
      )
      return filterMeta
    }
    return
  }

  const filteredCollections = filteredCollection(allCollections)

  console.log(filteredCollections)
  function defaultPfosten(filteredCollections) {
    // Verifică dacă filteredCollections conține elemente
    if (filteredCollections && filteredCollections.length > 0) {
      // Alege prima valoare a proprietății pfosten din prima colecție filtrată
      const firstPfosten = filteredCollections[0]?.node

      // Returnează valoarea pfosten sau o valoare implicită
      return firstPfosten
    }

    // În cazul în care filteredCollections nu conține elemente
    return 'Valoare implicită pentru pfosten'
  }

  function defaultProduct(products, fields) {
    const defaultProducts = products.filter((product) =>
      product.node.tags.some((tag) => tag === 'defaultProduct')
    )
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

    console.log(products)
    localStorage.setItem('configuratorItems', JSON.stringify(newItemWithIds))
  }

  if (filteredCollections) {
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
          {filteredCollections &&
            filteredCollections?.map((c) => (
              <a
                key={c.node.handle}
                href={`/configurator/${c.node.handle}`}
                onClick={() =>
                  defaultProduct(
                    c.node.fields[0].reference.products.edges,
                    c.node
                  )
                }
              >
                <ProductCategoryList
                  title={c?.node?.fields[3]?.value}
                  image={c.node.fields[5].reference?.image?.url}
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

// export async function getStaticProps({ params }) {
//   const subCategory = await getAllZaunserie()
//   const meta = subCategory?.metaobjects?.edges
//   const categories = meta.filter(
//     (m) => m?.node?.fields[1]?.reference?.handle === params.id
//   )

//   return {
//     props: { categories }, // will be passed to the page component as props
//   }
// }

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: 'sd' } }], // will be passed to the page component as props
//     fallback: true,
//   }
// }
