import { formatter } from '@/utils/helpers'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import ProductOptions from './ProductOptions'
import { CartContext } from '@/context/shopContext'

// setup inventory fetcher
const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data)

export default function ProductForm({ product }) {
  const { data: productInventory } = useSWR(
    [`/api/available?id=${product.handle}`],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  )

  const { addToCart } = useContext(CartContext)

  const [available, setAvailable] = useState(true)

  const allVariantOptions = product.variants.edges?.map((variant) => {
    const allOptions = {}

    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value
    })

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
    }
  })

  const defaultValues = {}
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)

  function setOptions(name, value) {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value }
    })

    const selection = {
      ...selectedOptions,
      [name]: value,
    }

    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(
        (item) => item.node.id === selectedVariant.id
      )

      if (checkAvailable[0]?.node.availableForSale) {
        setAvailable(true)
      } else {
        setAvailable(false)
      }
    }
  }, [productInventory, selectedVariant])

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-6">
        {formatter.format(product.variants.edges[0].node.priceV2.amount)}
      </span>
      {product.options.map(({ name, values }) => (
        <ProductOptions
          key={`key-${name}`}
          name={name}
          values={values}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
        />
      ))}
      {available ? (
        <button
          onClick={() => {
            addToCart(selectedVariant)
          }}
          className="px-2 py-3 mt-3 text-white bg-black rounded-lg hover:bg-gray-800"
        >
          Add To Card
        </button>
      ) : (
        <button className="px-2 py-3 mt-3 text-white bg-gray-800 rounded-lg cursor-not-allowed">
          Sold out!
        </button>
      )}
    </div>
  )
}
