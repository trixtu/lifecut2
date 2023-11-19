import ConfiguratorOptions from '@/components/ConfiguratorOptions'
import ConfiguratorStage from '@/components/ConfiguratorStage'
import ElementLibrary from '@/components/ElementLibrary'
import InfoBox from '@/components/InfoBox'
import InstructionSteps from '@/components/InstructionSteps'
import { Context } from '@/context/configuratorContext'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudIcon,
} from '@heroicons/react/20/solid'

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import styles from '@/styles/ConfiguratorStage.module.css'
import { useParams } from 'next/navigation'

const title = 'Willkommen beim Zaunplaner von hoerner-gmbh.com'
const stepOne =
  'Planen Sie Ihren Zaunverlauf, indem Sie die Zaunelemente aus der Übersicht mit der Maus auf die Rasenfläche ziehen. Länge und Preis werden immer angezeigt.'
const stepTwo =
  'Wählen Sie die gewünschten Pfosten, die bevorzugte Befestigungsart und ggf. extra Zubehör aus.'
const stepThree =
  'Mit dem Klick auf den "weiter"-Button landet Ihre komplette Zaunanlage im Warenkorb. Falls Sie Ihren Wunschzaun später noch einmal aufrufen möchten, einfach auf "speichern" klicken.'

// setup inventory fetcher
const fetchCollections = (url) => axios.get(url).then((res) => res.data)

let filteredCollection = null

const Configurator = () => {
  const { handleAddToConfigurator } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  const { data: allCollections } = useSWR(
    [`/api/collections`],
    (url) => fetchCollections(url),
    { errorRetryCount: 3 }
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCollection = () => {
    const meta = allCollections?.collections.edges
    const filterMeta = meta.filter(
      (f) => f?.node?.handleCollection?.value === params.id
    )

    return (filteredCollection = filterMeta[0]?.node?.products)
  }

  useEffect(() => {
    if (allCollections !== undefined) {
      getCollection()
      setLoading(false)
    }
  }, [allCollections, getCollection])

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
          <h2 className="HeaderNav">Zaunserie wählen</h2>
          <ElementLibrary
            filteredCollection={filteredCollection}
            handleAddToConfigurator={handleAddToConfigurator}
          />
          <ConfiguratorStage />

          <ConfiguratorOptions />
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
