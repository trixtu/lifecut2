import Image from 'next/image'
import ZoomControl from './ZoomControl'
import ChevronLeft from './ui/ChevronLeft'
import ChevronRight from './ui/ChevronRight'
import { Context } from '@/context/configuratorContext'
import getSymbolFromCurrency from 'currency-symbol-map'
import styles from '@/styles/ConfiguratorStage.module.css'
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import AddNewProducts from './AddNewProducts'

import ModalAddMultiple from './ModalAddMultiple'
import Element from './Element'

export default function ConfiguratorStage() {
  const scrollContainerRef = useRef(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [dragEnabled, setDragEnabled] = useState(true)
  const [showScrollLeftButton, setShowScrollLeftButton] = useState(false)
  const [showScrollRightButton, setShowScrollRightButton] = useState(false)

  const {
    dragItem,
    handleSort,
    dragOverItem,
    handleAddNew,
    selectedPfosten,
    configuratorItems,
    addMultipleProducts,
    removeFromConfigurator,
  } = useContext(Context)

  const ultimulProdus = configuratorItems[configuratorItems.length - 1]
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const container = scrollContainerRef.current

    if (container) {
      setShowScrollLeftButton(container.scrollLeft > 0)
      setShowScrollRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      )

      // Verifică dacă utilizatorul a derulat suficient pentru a dezactiva funcționalitatea de tragere
      if (container.scrollLeft > 50 && dragEnabled) {
        setDragEnabled(false)
      } else if (container.scrollLeft <= 50 && !dragEnabled) {
        setDragEnabled(true)
      }
    }

    if (container) {
      setShowScrollLeftButton(container.scrollLeft > 0)
      setShowScrollRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      )
      container.addEventListener('scroll', handleScroll)
      // Asigură-te că te dezabonezi de la eveniment la dezmontarea componentei
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }

  useEffect(() => {
    handleScroll()
  }, [handleScroll])

  function calculateTotalPrice(configuratorItems) {
    const totalPrice = configuratorItems.reduce((accumulator, product) => {
      const variantPrice =
        parseFloat(product?.node?.variants?.edges[0]?.node?.priceV2?.amount) ||
        0

      return accumulator + variantPrice
    }, 0)

    return totalPrice
  }

  function heightPfosten(pfoste, prevPfoste) {
    const options = pfoste?.node?.options || []
    const heightOption = options.find((option) => option.name === 'Höhe')
    const height = heightOption ? parseFloat(heightOption.values[0]) : 0

    if (prevPfoste) {
      const prevHeightOptions =
        prevPfoste?.node?.options.find((option) => option.name === 'Höhe') || {}
      const prevHeight = parseFloat(prevHeightOptions.values[0]) || 0

      // Alege înălțimea maximă dintre înălțimea elementului curent și elementul din față
      return Math.max(height + 40, prevHeight + 40)
    }

    return height + 40
  }

  function calculateTotalPricePfosten(configuratorItems) {
    const pfoste =
      configuratorItems[0]?.node?.pfosten?.reference?.variants?.edges[0]?.node
        ?.priceV2?.amount || 0
    const totalPrice = configuratorItems.reduce((accumulator, product) => {
      const variantPrice =
        parseFloat(
          product?.node?.pfosten?.reference?.variants?.edges[0]?.node?.priceV2
            ?.amount
        ) || 0

      return accumulator + variantPrice
    }, 0)
    const totalPricePfoste = totalPrice + parseFloat(pfoste)

    return totalPricePfoste
  }

  function calculateTotalCompareAtPrice(configuratorItems) {
    const totalPrice = configuratorItems.reduce((accumulator, product) => {
      const variantPrice =
        parseFloat(
          product?.node?.variants?.edges[0]?.node?.compareAtPriceV2?.amount
        ) || 0

      return accumulator + variantPrice
    }, 0)

    return totalPrice
  }

  function calculateTotalComparePricePfosten(configuratorItems) {
    const pfoste =
      configuratorItems[0]?.node?.pfosten?.reference?.variants?.edges[0]?.node
        ?.compareAtPriceV2?.amount || 0
    const totalPrice = configuratorItems.reduce((accumulator, product) => {
      const variantPrice =
        parseFloat(
          product?.node?.pfosten?.reference?.variants?.edges[0]?.node
            ?.compareAtPriceV2?.amount
        ) || 0

      return accumulator + variantPrice
    }, 0)

    return totalPrice + pfoste
  }

  // Utilizare în codul tău
  const totalConfiguratorPrice = calculateTotalPrice(configuratorItems)
  const totalConfiguratorCompareAtPrice =
    calculateTotalCompareAtPrice(configuratorItems)

  const totalConfiguratorPricePfosten =
    calculateTotalPricePfosten(configuratorItems)

  const totalConfiguratorCompareAtPricePfosten =
    calculateTotalComparePricePfosten(configuratorItems)

  const totalElementPlusPfosten =
    totalConfiguratorPrice + totalConfiguratorPricePfosten

  const totalElementPlusPfostenCompareAtPrice =
    totalConfiguratorCompareAtPrice + totalConfiguratorCompareAtPricePfosten

  function calculateTotalForOption(options, optionName) {
    // Găsește opțiunea cu numele specificat
    const targetOption = options?.find((option) => option.name === optionName)

    // Verifică dacă opțiunea a fost găsită
    if (targetOption) {
      // Suma valorilor opțiunii
      const total = targetOption.values.reduce(
        (accumulator, currentValue) => accumulator + parseFloat(currentValue),
        0
      )

      return total
    }

    // În cazul în care opțiunea nu a fost găsită, returnează 0 sau altă valoare implicită
    return 0
  }

  function calculateTotalForAllProducts(products) {
    let totalForBreiteOption = 0

    products.forEach((product) => {
      const totalForWidthOption = calculateTotalForOption(
        product?.node?.options,
        'Breite'
      )

      totalForBreiteOption += totalForWidthOption
    })

    return totalForBreiteOption
  }

  function calculateTotalForAllPfosten(products) {
    let totalForBreiteOption = 0
    const widthPfoste =
      parseFloat(
        products[0]?.node?.pfosten?.reference?.options.find(
          (option) => option.name === 'Breite'
        ).values[0]
      ) || 0

    products.forEach((product) => {
      const totalForWidthOption = calculateTotalForOption(
        product?.node?.pfosten?.reference?.options,
        'Breite'
      )

      totalForBreiteOption += totalForWidthOption
    })

    return totalForBreiteOption + widthPfoste
  }

  const totalForAllBreiteOptions =
    calculateTotalForAllProducts(configuratorItems)

  const totalForAllBreitePfosten =
    calculateTotalForAllPfosten(configuratorItems)

  const totalPfostenFeld = totalForAllBreiteOptions + totalForAllBreitePfosten

  function breite(product) {
    const options = product?.node?.options || []
    const value = options.find((option) => option.name === 'Breite')

    return value ? parseFloat(value.values[0]) : 0
  }

  function breitePfosten(pfoste) {
    const options = pfoste?.pfosten?.node?.options || []
    const value = options.find((option) => option.name === 'Breite')

    return value ? parseFloat(value.values[0]) : 0
  }

  function heightPfostenAuf(pfoste) {
    const optionsElement = pfoste?.node?.options || []
    const options = pfoste?.node?.pfosten?.reference?.options || []
    const heightOption = options.find((option) => option.name === 'Höhe')
    const heightAuf = optionsElement.find((option) => option.name === 'Auf')

    return heightOption
      ? parseFloat(205 - (heightOption.values[0] - heightAuf.values[0]))
      : 0
  }

  function heightElement(product) {
    const options = product?.node?.options || []
    const heightOption = options.find((option) => option.name === 'Höhe')

    return heightOption ? parseFloat(heightOption.values[0]) : 0
  }

  // Funcție pentru scroll la dreapta
  const scrollRight = () => {
    setDragEnabled(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 100, // Numărul de pixeli cu care să faci scroll la dreapta
        behavior: 'smooth', // Opțional: face scroll într-un mod lin
      })
    }
  }

  // Funcție pentru scroll la stânga
  const scrollLeft = () => {
    setDragEnabled(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -100, // Numărul de pixeli cu care să faci scroll la stânga
        behavior: 'smooth', // Opțional: face scroll într-un mod lin
      })
    }
  }

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(0.5, prevZoom - 0.1)) // Redu nivelul de zoom cu 0.1, dar nu mai puțin de 0.2
  }

  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(1, prevZoom + 0.1)) // Crește nivelul de zoom cu 0.1, dar nu mai mult de 2
  }

  return (
    <div className={`${styles.Configurator}`}>
      <div className={`${styles.Configurator_Show} ${styles.Holder}`}>
        <div className={`${styles.ScrollableArea}`}>
          <div
            className={styles.ControlBoardd}
            ref={scrollContainerRef}
            style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
          >
            <ul className={`${styles.ElementTrack} ${styles.Track}`}>
              <Element
                configuratorItems={configuratorItems}
                zoomLevel={zoomLevel}
                heightPfosten={heightPfosten}
                breitePfosten={breitePfosten}
                handleSort={handleSort}
                heightElement={heightElement}
                breite={breite}
                removeFromConfigurator={removeFromConfigurator}
                dragItem={dragItem}
                dragOverItem={dragOverItem}
                heightPfostenAuf={heightPfostenAuf}
              />

              <div
                className={styles.myBackgroundGrass}
                style={{
                  height: 22 * zoomLevel,
                  backgroundPositionY: '3px',
                  backgroundRepeat: 'repeat-x',
                }}
              />
              {ultimulProdus !== undefined && (
                <AddNewProducts
                  ultimulProdus={ultimulProdus}
                  heightPfosten={heightPfosten}
                  breitePfosten={breitePfosten}
                  heightElement={heightElement}
                  breite={breite}
                  handleAddNew={handleAddNew}
                  zoomLevel={zoomLevel}
                  openModal={openModal}
                />
              )}
            </ul>
          </div>
          {showScrollLeftButton && (
            <button className={styles.arrow_left} onClick={scrollLeft}>
              <ChevronLeft className={'h-4 w-4'} />
            </button>
          )}
          {showScrollRightButton && (
            <button className={styles.arrow_right} onClick={scrollRight}>
              <ChevronRight className={'h-4 w-4'} />
            </button>
          )}
        </div>
        {/* <ZoomoutPreview /> */}

        <div
          className={`${styles.Page_Configurator_Show} ${styles.TotalLength}`}
        >
          <span>ca.</span>
          <strong>{totalPfostenFeld / 100} m</strong>
          <span>Gesamtlänge</span>
        </div>
        <div
          className={`${styles.Page_Configurator_Show} ${styles.TotalPrices}`}
        >
          <span className={styles.Label}>Preis</span>
          <strong className={`${styles.k5price} ${styles.k5WithoutDiscount}`}>
            {configuratorItems &&
              getSymbolFromCurrency(
                configuratorItems[0]?.node?.variants?.edges[0].node?.priceV2
                  ?.currencyCode
              )}
            {totalElementPlusPfostenCompareAtPrice.toFixed(2)}
          </strong>
          <br />
          <strong className={styles.SpecialPrice}>
            {configuratorItems &&
              getSymbolFromCurrency(
                configuratorItems[0]?.node?.variants?.edges[0].node?.priceV2
                  ?.currencyCode
              )}
            {totalElementPlusPfosten.toFixed(2)}
          </strong>
          <p className={styles.DeliveryDays}>Lieferzeit in 10 Werktagen</p>
        </div>
      </div>
      <ZoomControl zoomIn={zoomIn} zoomOut={zoomOut} zoomLevel={zoomLevel} />

      <ModalAddMultiple
        isOpen={isOpen}
        ultimulProdus={ultimulProdus}
        closeModal={closeModal}
        addMultipleProducts={addMultipleProducts}
      />
    </div>
  )
}
