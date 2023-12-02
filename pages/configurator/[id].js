import useSWR from 'swr'
import axios from 'axios'
import InfoBox from '@/components/InfoBox'
import { useParams, usePathname, useRouter } from 'next/navigation'
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
import NextBreadcrumb from '@/components/Breadcrumb'
import { Breadcrumb } from 'antd'

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

  const [loading, setLoading] = useState(true)
  const { selectedPfosten, setSelectedPfosten, handleAddToConfigurator } =
    useContext(Context)

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
      const pfosten = filterMeta.map((m) => m.node.fields[2])
      return pfosten
    }
    return
  }

  const getCollection = (allCollections) => {
    if (allCollections) {
      const meta = allCollections?.collections.edges

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
          (z) => z?.reference?.fields[1]?.references.edges[0]
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
                title: 'Zurück',
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
            filteredCollection={filteredCollections}
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

              <a
                href="#"
                className="flex items-center m-0  min-w-[160px] justify-center bg-red-500 text-white px-4 py-2 gap-1 cursor-pointer"
              >
                weiter
                <ChevronRightIcon className="w-5 h-5 mt-1" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Configurator
