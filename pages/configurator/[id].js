import useSWR from 'swr'
import axios from 'axios'
import { Breadcrumb } from 'antd'
import InfoBox from '@/components/InfoBox'
import { useParams, useRouter } from 'next/navigation'
import { Context } from '@/context/configuratorContext'
import ElementLibrary from '@/components/ElementLibrary'
import styles from '@/styles/ConfiguratorStage.module.css'
import InstructionSteps from '@/components/InstructionSteps'
import React, { useContext, useEffect, useState } from 'react'
import ConfiguratorStage from '@/components/ConfiguratorStage'
import ConfiguratorOptions from '@/components/ConfiguratorOptions'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudIcon,
} from '@heroicons/react/20/solid'
import { CartContext } from '@/context/shopContext'

const title = 'Willkommen beim Zaunplaner von hoerner-gmbh.com'
const stepOne =
  'Planen Sie Ihren Zaunverlauf, indem Sie die Zaunelemente aus der Übersicht mit der Maus auf die Rasenfläche ziehen. Länge und Preis werden immer angezeigt.'
const stepTwo =
  'Wählen Sie die gewünschten Pfosten, die bevorzugte Befestigungsart und ggf. extra Zubehör aus.'
const stepThree =
  'Mit dem Klick auf den "weiter"-Button landet Ihre komplette Zaunanlage im Warenkorb. Falls Sie Ihren Wunschzaun später noch einmal aufrufen möchten, einfach auf "speichern" klicken.'

// setup inventory fetcher
const fetchCollections = (url) => axios.get(url).then((res) => res.data)

const Configurator = () => {
  const params = useParams()
  const router = useRouter()
  const { addItemsToCart, addMultipleToCart } = useContext(CartContext)

  const [loading, setLoading] = useState(true)
  const {
    selectedPfosten,
    setSelectedPfosten,
    handleAddToConfigurator,
    configuratorItems,
  } = useContext(Context)

  const { data: allCollections } = useSWR(
    [`/api/collections`],
    (url) => fetchCollections(url),
    { errorRetryCount: 3 }
  )

  const { data: allZaunserie } = useSWR(
    ['/api/zaunserie'],
    (url) => fetchCollections(url),
    { errorRetryCount: 3 }
  )

  const getZaunseriePfoste = (allZaunserie) => {
    if (allZaunserie) {
      const meta = allZaunserie?.metaobjects?.edges
      const filterMeta = meta?.filter((m) => m?.node?.handle === params?.id)
      const pfosten = filterMeta.map((m) =>
        m.node.fields.find((f) => f.key === 'pfosten')
      )
      return pfosten
    }
    return
  }

  const getCollection = (allCollections) => {
    if (allCollections) {
      const meta = allCollections?.collections?.edges

      const filterMeta = meta?.filter(
        (f) => f?.node?.handleCollection?.value === params?.id
      )
      return filterMeta[0].node.products
    }

    return
  }

  const getZaunserie = (allZaunserie) => {
    if (allZaunserie) {
      const meta = allZaunserie?.metaobjects?.edges
      const filterMeta = meta.filter((m) => m.node.handle === params?.id)
      return filterMeta
    }
    return
  }

  const filteredCollections = getCollection(allCollections)
  const filteredZaunseriesPfoste = getZaunseriePfoste(allZaunserie)
  const filteredZaunserie = getZaunserie(allZaunserie)

  useEffect(() => {
    if (filteredCollections && filteredZaunseriesPfoste && filteredZaunserie) {
      setLoading(false)
    }
  }, [filteredCollections, filteredZaunserie, filteredZaunseriesPfoste])

  const data =
    filteredZaunseriesPfoste?.length > 0
      ? filteredZaunseriesPfoste.map(
          (z) =>
            z?.reference?.fields.find((f) => f.key === 'pfosten').references
              .edges[0]
        )
      : null

  const defaultPfoste = data
    ? data?.filter((pfoste) =>
        pfoste?.node?.tags.some((tag) => tag === 'defaultPfoste')
      )
    : null

  useEffect(() => {
    setSelectedPfosten(defaultPfoste ? defaultPfoste[0] : data)
  }, [data, defaultPfoste, selectedPfosten, setSelectedPfosten])

  //elements
  const configuratorToAdeddItems = configuratorItems.map((item) => {
    const allOptions = {}

    item.node.options.map((item) => {
      allOptions[item.name] = item.values[0]
    })

    return {
      id: item.node.variants.edges[0].node.id,
      title: item.node.title,
      handle: item.node.handle,
      image: item.node.images?.nodes[0].url,
      options: allOptions,
      variantTitle: item.node.title,
      variantPrice: item.node.variants.edges[0].node.priceV2.amount,
      variantQuantity: 1,
    }
  })

  //pfosten
  const configuratorPfosten = configuratorItems.map((pfoste) => {
    const allOptions = {}

    pfoste.pfosten.node.options.map((item) => {
      allOptions[item.name] = item.values[0]
    })

    return {
      id: pfoste.pfosten.node.variants.edges[0].node.id,
      title: pfoste.pfosten.node.title,
      handle: pfoste.node.handle,
      image: pfoste.pfosten.node.images?.edges[0].node.src,
      height: pfoste.node.options.find((f) => f.name === 'Höhe').values[0],
      options: allOptions,
      variantTitle: pfoste.pfosten.node.title,
      variantPrice: pfoste.pfosten.node.variants.edges[0].node.priceV2.amount,
      variantQuantity: 1,
    }
  })

  //grouped elements
  function groupedProducts(configuratorToAdeddItems) {
    if (configuratorToAdeddItems.length > 0) {
      const groupedProductsObj = {}

      configuratorToAdeddItems.forEach((product) => {
        const productId = product.id

        // Dacă produsul există în obiectul grupat, mărește variantQuantity
        if (groupedProductsObj[productId]) {
          groupedProductsObj[productId].variantQuantity +=
            product.variantQuantity
        } else {
          // Dacă produsul nu există, adaugă-l în obiectul grupat
          groupedProductsObj[productId] = { ...product }
        }
      })

      // Transformă obiectul grupat într-un array
      const resultProducts = Object.values(groupedProductsObj)

      return resultProducts
    }
    return
  }

  const groupedProductsFinal = groupedProducts(configuratorToAdeddItems)

  //grouped pfosten
  function groupedPfosten(configuratorPfosten) {
    if (configuratorPfosten.length > 0) {
      const groupedProductsObj = {}

      configuratorPfosten.forEach((product) => {
        const productId = product.id
        const height = product.height

        // Creați o cheie unică pentru fiecare grup în funcție de productId și height
        const groupKey = `${productId}_${height}`

        // Dacă produsul există în obiectul grupat, mărește variantQuantity
        if (groupedProductsObj[groupKey]) {
          groupedProductsObj[groupKey].variantQuantity +=
            product.variantQuantity
        } else {
          // Dacă produsul nu există, adaugă-l în obiectul grupat
          groupedProductsObj[groupKey] = { ...product }
        }
      })

      // Transformă obiectul grupat într-un array
      let resultProducts = Object.values(groupedProductsObj)

      // Adaugă 1 la variantQuantity pentru fiecare element din array

      resultProducts = resultProducts.map((product, index) => {
        if (index === 0) {
          return {
            ...product,
            variantQuantity: product.variantQuantity + 1,
          }
        } else {
          return {
            ...product,
          }
        }
      })

      return resultProducts
    }
    return []
  }

  const groupedPfostenFinal = groupedPfosten(configuratorPfosten)

  const items = [...groupedProductsFinal, ...groupedPfostenFinal]

  const products = () => {
    const products = [
      { title: 'eeer', desc: 'ddfdfdfdf' },
      { title: 'sdsdsdsdd', desc: 'effdfds' },
    ]

    return (
      <div>
        <ul>
          {products &&
            products.map((product, index) => (
              <li key={index}>
                {product.title}
                <span>{product.desc}</span>
              </li>
            ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="container">
      {loading ? (
        <div className="flex items-center justify-center h-auto">
          <div className="relative transition delay-1000 ease-in duration-1000">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-yellow-500"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-red-500 animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
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
                title: `${
                  filteredZaunserie[0]?.node?.fields.find(
                    (f) => f.key === 'collection'
                  ).reference.title
                }`,
              },
              {
                title: 'Zaunserie ändern',
                href: '#',
                onClick: () =>
                  router.push(
                    `/zaunserie/${
                      filteredZaunserie[0]?.node?.fields.find(
                        (f) => f.key === 'parent'
                      ).reference.handle
                    }`
                  ),
              },
            ]}
          />

          <ElementLibrary
            filteredCollection={filteredZaunserie}
            handleAddToConfigurator={handleAddToConfigurator}
          />
          <ConfiguratorStage />

          <ConfiguratorOptions filteredZaunserie={filteredZaunseriesPfoste} />
          <InfoBox title={'Zubehör'} content={products} />
          <InfoBox title={'Technische Infos'} content={products} />
          <div className={styles.ConfiguratorFooter}>
            <div className={`${styles.ConfiguratorFooter} ${styles.Buttons}`}>
              <button className="flex items-center m-0  min-w-[160px] justify-center bg-neutral-800 text-white  px-4 py-2 gap-1 hover:bg-neutral-700">
                <ChevronLeftIcon className="w-5 h-5 mt-1" />
                <span className="">zurück</span>
              </button>
              <a
                href="#"
                className="flex items-center m-0  min-w-[160px] justify-center bg-neutral-800 text-white px-4 py-2 gap-1 cursor-pointer hover:bg-neutral-700"
              >
                speichern / teilen
                <CloudIcon className="w-5 h-5" />
              </a>

              <button
                onClick={() => addMultipleToCart(items)}
                className="flex items-center m-0  min-w-[160px] justify-center bg-red-500 text-white px-4 py-2 gap-1 cursor-pointer"
              >
                weiter
                <ChevronRightIcon className="w-5 h-5 mt-1" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Configurator
