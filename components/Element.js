import Image from 'next/image'
import React from 'react'
import styles from '@/styles/ConfiguratorStage.module.css'
import { Popover } from 'antd'
import getSymbolFromCurrency from 'currency-symbol-map'

const Element = ({
  configuratorItems,
  zoomLevel,
  breitePfosten,
  handleSort,
  heightElement,
  breite,
  removeFromConfigurator,
  dragItem,
  dragOverItem,
  heightPfostenAuf,
}) => {
  const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPopover } = Popover

  function heightPfosten(pfoste, prevPfoste) {
    const options = pfoste?.node?.options || []
    const heightOption = options.find((option) => option.name === 'Höhe')
    const height = heightOption ? parseFloat(heightOption.values[0]) : 0

    if (prevPfoste) {
      const prevHeightOptions =
        prevPfoste?.node?.options.find((option) => option.name === 'Höhe') || {}
      const prevHeight = parseFloat(prevHeightOptions.values[0]) || 0

      // Alege înălțimea maximă dintre înălțimea elementului curent și elementul din stânga
      const newHeight = Math.max(height + 40, prevHeight + 40)

      // Setează înălțimea postei curente pe baza comparației
      heightOption.values[0] = newHeight.toString()

      return newHeight
    }

    return height + 40
  }
  const handleContent = (item) => {
    return (
      <div className="text-xs p-2 relative min-w-[160px] max-w-sm">
        <p>Material:{item.node?.title}</p>
        <div className="mt-2">
          <p>
            Breite unten:
            <span className="pl-2">
              {item.node?.options.find((o) => o.name === 'Breite').values[0]}
            </span>
          </p>
          <p>
            Höhe links:
            <span className="pl-2">
              {item.node?.options.find((o) => o.name === 'Höhe').values[0]}
            </span>
          </p>
          <p>
            Höhe rechts:
            <span className="pl-2">
              {item.node?.options.find((o) => o.name === 'Auf')
                ? item.node.options.find((o) => o.name === 'Auf').values[0]
                : item.node?.options.find((o) => o.name === 'Höhe').values[0]}
            </span>
          </p>
        </div>
        <div className="absolute bottom-0 right-0 font-bold text-sm flex flex-col">
          {item.node?.variants?.edges[0].node.compareAtPriceV2 !== null ? (
            <span className="line-through">
              {item.node?.variants?.edges[0].node.compareAtPriceV2 !== null &&
                getSymbolFromCurrency(
                  item.node?.variants?.edges[0].node.compareAtPriceV2
                    .currencyCode
                )}
              {item.node?.variants?.edges[0].node.compareAtPriceV2.amount}
            </span>
          ) : null}

          <span
            className={
              item.node?.variants?.edges[0].node.compareAtPriceV2 !== null
                ? 'text-red-500'
                : ''
            }
          >
            {getSymbolFromCurrency(
              item.node?.variants?.edges[0].node.priceV2.currencyCode
            )}
            {item.node?.variants?.edges[0].node.priceV2.amount}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      {configuratorItems &&
        configuratorItems.length > 0 &&
        configuratorItems.map((item, index) => (
          <div className={styles.ElementTrack_Item} key={index}>
            <li className={styles.ElementTrack_Item}>
              <div className={styles.FenceConfigurator_StageItem}>
                <div className={styles.Inner}>
                  <div
                    className={styles.ProductItem}
                    style={{
                      height: heightPfosten(item) * zoomLevel,
                    }}
                  >
                    <Image
                      src={
                        configuratorItems[0]?.pfosten?.node?.images?.edges[1]
                          ?.node?.src
                      }
                      width={(breitePfosten(item) + 1) * zoomLevel}
                      height={heightPfosten(item)}
                      style={{
                        width: (breitePfosten(item) + 1) * zoomLevel,
                        height: heightPfosten(item) * zoomLevel,
                      }}
                      alt={item?.node?.handle + 'key'}
                    />
                  </div>
                </div>
              </div>
            </li>

            <li
              className={styles.ElementTrack_Item}
              draggable
              onDragStart={(e) => (dragItem.current = index)}
              onDragEnter={(e) => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className={styles.FenceConfigurator_StageItem}>
                <div className={styles.Inner}>
                  <div
                    className={styles.ProductItem}
                    style={{
                      height: (heightElement(item) + 36) * zoomLevel,
                    }}
                  >
                    <Image
                      src={item?.node?.images?.nodes[1]?.src}
                      width={(breite(item) + 20) * zoomLevel}
                      height={heightElement(item) * zoomLevel}
                      style={{
                        width: (breite(item) + 20) * zoomLevel,
                        height: (heightElement(item) + 36) * zoomLevel,
                      }}
                      alt={item?.node?.handle + 'img'}
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
                      onClick={() => removeFromConfigurator(item.id)}
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
                      <Popover
                        content={handleContent(item)}
                        title={item.node?.title}
                      >
                        <button
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
                        </button>
                      </Popover>
                    </div>
                  </div>
                  {/* end */}
                </div>
              </div>
            </li>
          </div>
        ))}

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
                          ].node?.options?.some(
                            (option) => option.name === 'Auf'
                          )
                          ? heightPfostenAuf(
                              configuratorItems[configuratorItems.length - 1]
                            ) * zoomLevel
                          : heightPfosten(
                              configuratorItems[configuratorItems.length - 1]
                            ) * zoomLevel
                        : 0,
                  }}
                >
                  {/* Afisează imaginea pentru pfosten */}
                  <Image
                    src={
                      configuratorItems[0]?.pfosten?.node?.images?.edges[1]
                        ?.node?.src
                    }
                    width={
                      parseFloat(
                        configuratorItems.length > 0
                          ? breitePfosten(
                              configuratorItems[configuratorItems.length - 1]
                            )
                          : 0
                      ) + 1
                    }
                    height={
                      configuratorItems.length > 0
                        ? configuratorItems[
                            configuratorItems.length - 1
                          ].node?.options?.some(
                            (option) => option.name === 'Auf'
                          )
                          ? heightPfosten(
                              configuratorItems[configuratorItems.length - 1]
                            )
                          : heightPfosten(
                              configuratorItems[configuratorItems.length - 1]
                            )
                        : 0
                    }
                    style={{
                      width:
                        (parseFloat(
                          configuratorItems.length > 0
                            ? breitePfosten(
                                configuratorItems[configuratorItems.length - 1]
                              )
                            : 0
                        ) +
                          1) *
                        zoomLevel,
                      height:
                        (heightPfosten(
                          configuratorItems[configuratorItems.length - 1]
                        ) +
                          48) *
                        zoomLevel,
                    }}
                    alt={
                      configuratorItems[configuratorItems.length - 1].node
                        ?.pfosten?.reference?.handle + 'img_1'
                    }
                  />
                </div>
              </div>
            </div>
          </li>
        </div>
      )}
    </div>
  )
}

export default Element
