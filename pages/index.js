import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import {
  getAllProducts,
  getMainMenu,
  getProductsInCollection,
} from '@/lib/shopify'
import Link from 'next/link'
import ProductCategoryList from '@/components/ProductCategoryList'
import InstructionSteps from '@/components/InstructionSteps'
import { Breadcrumb } from 'antd'

const categories = [
  {
    title: 'Sichtschutzzäune',
    url: '#',
    image: '/images/sichtschutzzaun.jpg',
    handle: 'sichtschutzzaune',
  },
]

const title = 'Willkommen beim Zaunplaner von hoerner-gmbh.com'
const stepOne =
  'Wählen Sie im unteren Bereich eine Zaunvariante, je nachdem ob Sie einen Sichtschutz, einen Garten- oder Doppelstabzaun benötigen.'
const stepTwo =
  'Bestimmen Sie nun das gewünschte Material und wählen die Zaunserie aus, deren Design Ihnen gefällt.'
const stepThree =
  'Planen Sie Ihren Zaunverlauf, indem Sie die Zaunelemente aus der Übersicht auf die Rasenfläche ziehen. Länge und Preis werden immer angezeigt und mit nur einem Klick legen Sie den gesamten Zaun samt Zubehör in den Warenkorb.'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <InstructionSteps
            title={title}
            stepOne={stepOne}
            stepTwo={stepTwo}
            stepThree={stepThree}
          />
          <Breadcrumb
            className="font-semibold"
            separator="/"
            items={[
              {
                title: 'Zaunvariante wählen',
              },
            ]}
          />

          <ul className="ProductCategoryList w-auto p-0 mt-5 mb-4 box-border">
            {categories.map((category, index) => (
              <Link href={`/product-category/${category.handle}`} key={index}>
                <ProductCategoryList
                  image={category.image}
                  title={category.title}
                  handle={category.handle}
                />
              </Link>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
