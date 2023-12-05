import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '@/styles/ConfiguratorStage.module.css'
import { Context } from '@/context/configuratorContext'
import Image from 'next/image'
import getSymbolFromCurrency from 'currency-symbol-map'
import ChevronRight from './ui/ChevronRight'
import ChevronLeft from './ui/ChevronLeft'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function ConfiguratorStage2() {
  const scrollContainerRef = useRef(null)
  const [showScrollLeftButton, setShowScrollLeftButton] = useState(false)
  const [showScrollRightButton, setShowScrollRightButton] = useState(false)
  const [dragEnabled, setDragEnabled] = useState(true)
  const [items, setItems] = useState([])

  const {
    configuratorItems,
    removeFromConfigurator,
    dragItem,
    dragOverItem,
    handleSort,
  } = useContext(Context)

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
        parseFloat(product.node.variants.edges[0]?.node.priceV2?.amount) || 0

      return accumulator + variantPrice
    }, 0)

    return totalPrice
  }

  function calculateTotalPricePfosten(configuratorItems) {
    const totalPrice = configuratorItems.reduce((accumulator, product) => {
      const variantPrice =
        parseFloat(
          product.node.pfosten.reference.variants.edges[0]?.node.priceV2?.amount
        ) || 0

      return accumulator + variantPrice
    }, 0)

    return totalPrice
  }

  function calculateTotalCompareAtPrice(configuratorItems) {
    const totalPrice = configuratorItems.reduce((accumulator, product) => {
      const variantPrice =
        parseFloat(
          product.node.variants.edges[0]?.node.compareAtPriceV2?.amount
        ) || 0

      return accumulator + variantPrice
    }, 0)

    return totalPrice
  }

  function calculateTotalComparePricePfosten(configuratorItems) {
    const totalPrice = configuratorItems.reduce((accumulator, product) => {
      const variantPrice =
        parseFloat(
          product.node.pfosten.reference.variants.edges[0]?.node
            .compareAtPriceV2?.amount
        ) || 0

      return accumulator + variantPrice
    }, 0)

    return totalPrice
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
        product.node.options,
        'Breite'
      )

      totalForBreiteOption += totalForWidthOption
    })

    return totalForBreiteOption
  }

  function calculateTotalForAllPfosten(products) {
    let totalForBreiteOption = 0

    products.forEach((product) => {
      const totalForWidthOption = calculateTotalForOption(
        product.node.pfosten.reference?.options,
        'Breite'
      )

      totalForBreiteOption += totalForWidthOption
    })

    return totalForBreiteOption
  }

  const totalForAllBreiteOptions =
    calculateTotalForAllProducts(configuratorItems)

  const totalForAllBreitePfosten =
    calculateTotalForAllPfosten(configuratorItems)

  const totalPfostenFeld =
    totalForAllBreiteOptions + (totalForAllBreitePfosten + 10)

  function breite(product) {
    const options = product?.node?.options || []
    const value = options.find((option) => option.name === 'Breite')

    return value ? parseFloat(value.values[0]) : 0
  }

  function breitePfosten(pfoste) {
    const options = pfoste?.node?.pfosten?.reference?.options || []
    const value = options.find((option) => option.name === 'Breite')

    return value ? parseFloat(value.values[0]) : 0
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

  // Funcție pentru a reordona elementele atunci când sunt trase și plasate
  const onDragEnd = (result) => {
    // const droppableId = result.destination.droppableId
    // // Logica de actualizare a stării în funcție de
    // if (!result.destination) {
    //   return // A fost anulată operația de tragere și plasare
    // }
    // const updatedItems = Array.from(items)
    // const [reorderedItem] = updatedItems.splice(result.source.index, 1)
    // updatedItems.splice(result.destination.index, 0, reorderedItem)
    // // Actualizează starea ta cu noile elemente ordonate
    // setItems(updatedItems)
  }

  return (
    <div className={styles.Configurator}>
      <div className={`${styles.Configurator_Show} ${styles.Holder}`}>
        <div className={styles.ScrollableArea}>
          <div
            className={styles.ControlBoardd}
            ref={scrollContainerRef}
            style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                  <ul className={`${styles.ElementTrack} ${styles.Track}`}>
                    <div
                      className="flex"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {configuratorItems && configuratorItems.length > 0
                        ? configuratorItems.map((item, index) => (
                            <div
                              key={index}
                              className={styles.ElementTrack_Item}
                            >
                              {/* ... restul codului existent ... */}

                              <li className={styles.ElementTrack_Item}>
                                <Draggable
                                  draggableId={item.node.id}
                                  key={item.node.id}
                                  index={index}
                                  className={styles.FenceConfigurator_StageItem}
                                >
                                  {(provided) => (
                                    <div
                                      className={styles.Inner}
                                      {...provided.dragHandleProps}
                                      {...provided.draggableProps}
                                      ref={provided.innerRef}
                                    >
                                      <div
                                        className={styles.ProductItem}
                                        style={{
                                          height: heightPfosten(item),
                                        }}
                                      >
                                        <Image
                                          src={
                                            item?.node?.pfosten?.reference
                                              ?.images?.nodes[1].src
                                          }
                                          width={breitePfosten(item) + 1}
                                          height={heightPfosten(item)}
                                          style={{
                                            width: breitePfosten(item) + 1,
                                            height: heightPfosten(item),
                                          }}
                                          alt={item?.node?.handle}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              </li>

                              <li className={styles.ElementTrack_Item}>
                                <div
                                  className={styles.FenceConfigurator_StageItem}
                                >
                                  <div className={styles.Inner}>
                                    <div
                                      className={styles.ProductItem}
                                      style={{
                                        height: heightElement(item) + 36,
                                      }}
                                    >
                                      <Image
                                        src={item.node.images?.nodes[1].src}
                                        width={breite(item)}
                                        height={heightElement(item)}
                                        style={{
                                          width: breite(item),
                                          height: heightElement(item) + 36,
                                        }}
                                        alt=""
                                      />
                                    </div>
                                    {/* button */}
                                    <div className={styles.EditBButtons}>
                                      <button
                                        className={`${styles.Button} ${styles.IconButton} ${styles.btn} ${styles.btn_swap} ${styles._left}`}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-6 h-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        className={`${styles.Button}  ${styles.IconButton} ${styles.btn} ${styles.btn_swap} ${styles._right}`}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-6 h-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                          />
                                        </svg>
                                      </button>
                                      <button
                                        className={`${styles.Button} ${styles.IconButton} ${styles.btn} ${styles.btn_danger} ${styles._delete}`}
                                        onClick={() =>
                                          removeFromConfigurator(item.id)
                                        }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                          className="w-5 h-5"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                      <div className={styles.Info}>
                                        <span
                                          className={`${styles.InfoPopover} ${styles.info}`}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                            />
                                          </svg>
                                        </span>
                                      </div>
                                    </div>
                                    {/* end */}
                                  </div>
                                </div>
                              </li>
                            </div>
                          ))
                        : null}

                      {/* Adaugă un element suplimentar de tip "pfosten" la sfârșit */}
                      {configuratorItems.length > 0 && (
                        <div className={styles.ElementTrack_Item}>
                          <li className={styles.ElementTrack_Item}>
                            <div className={styles.FenceConfigurator_StageItem}>
                              <div className={styles.Inner}>
                                <div
                                  className={styles.ProductItem}
                                  style={{
                                    height:
                                      configuratorItems.length > 0
                                        ? configuratorItems[
                                            configuratorItems.length - 1
                                          ].node.options.some(
                                            (option) => option.name === 'Auf'
                                          )
                                          ? heightPfostenAuf(
                                              configuratorItems[
                                                configuratorItems.length - 1
                                              ]
                                            )
                                          : heightPfosten(
                                              configuratorItems[
                                                configuratorItems.length - 1
                                              ]
                                            )
                                        : 0,
                                  }}
                                >
                                  {/* Afisează imaginea pentru pfosten */}
                                  <Image
                                    src={
                                      configuratorItems.length > 0
                                        ? configuratorItems[
                                            configuratorItems.length - 1
                                          ].node.pfosten.reference?.images
                                            ?.nodes[1].src
                                        : ''
                                    }
                                    width={
                                      parseFloat(
                                        configuratorItems.length > 0
                                          ? breitePfosten(
                                              configuratorItems[
                                                configuratorItems.length - 1
                                              ]
                                            )
                                          : 0
                                      ) + 1
                                    }
                                    height={
                                      configuratorItems.length > 0
                                        ? configuratorItems[
                                            configuratorItems.length - 1
                                          ].node.options.some(
                                            (option) => option.name === 'Auf'
                                          )
                                          ? heightPfosten(
                                              configuratorItems[
                                                configuratorItems.length - 1
                                              ]
                                            )
                                          : heightPfosten(
                                              configuratorItems[
                                                configuratorItems.length - 1
                                              ]
                                            )
                                        : 0
                                    }
                                    style={{
                                      width:
                                        parseFloat(
                                          configuratorItems.length > 0
                                            ? breitePfosten(
                                                configuratorItems[
                                                  configuratorItems.length - 1
                                                ]
                                              )
                                            : 0
                                        ) + 1,
                                      height:
                                        heightPfosten(
                                          configuratorItems[
                                            configuratorItems.length - 1
                                          ]
                                        ) + 48,
                                    }}
                                    alt={
                                      configuratorItems.length > 0
                                        ? configuratorItems[
                                            configuratorItems.length - 1
                                          ].node.pfosten.reference?.handle
                                        : ''
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
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
                configuratorItems[0]?.node.variants?.edges[0].node?.priceV2
                  ?.currencyCode
              )}
            {totalElementPlusPfostenCompareAtPrice.toFixed(2)}
          </strong>
          <br />
          <strong className={styles.SpecialPrice}>
            {configuratorItems &&
              getSymbolFromCurrency(
                configuratorItems[0]?.node.variants?.edges[0].node?.priceV2
                  ?.currencyCode
              )}
            {totalElementPlusPfosten.toFixed(2)}
          </strong>
          <p className={styles.DeliveryDays}>Lieferzeit in 10 Werktagen</p>
        </div>
      </div>
    </div>
  )
}
