import React, { useState } from 'react'
import styles from '@/styles/ConfiguratorStage.module.css'
import Image from 'next/image'

const AddNewProducts = ({
  ultimulProdus,
  heightPfosten,
  breitePfosten,
  zoomLevel,
  heightElement,
  breite,
  handleAddNew,
  openModal,
}) => {
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const width = ultimulProdus?.node?.options.find((o) => o.name === 'Breite')

  return (
    <>
      {hoveredProduct ? (
        <>
          <li
            className={`${styles.ElementTrack_Item} opacity-50  transition ease-in-out`}
          >
            <div className={styles.FenceConfigurator_StageItem}>
              <div className={styles.Inner}>
                <div
                  className={styles.ProductItem}
                  style={{
                    height: (heightElement(ultimulProdus) + 36) * zoomLevel,
                  }}
                >
                  <Image
                    src={ultimulProdus?.node?.images?.nodes[1]?.src}
                    width={(breite(ultimulProdus) + 20) * zoomLevel}
                    height={heightElement(ultimulProdus) * zoomLevel}
                    style={{
                      width: (breite(ultimulProdus) + 20) * zoomLevel,
                      height: (heightElement(ultimulProdus) + 36) * zoomLevel,
                    }}
                    alt={ultimulProdus?.node?.handle}
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
                    <span className={`${styles.InfoPopover} ${styles.info}`}>
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
          <li className={`${styles.ElementTrack_Item} opacity-50`}>
            <div className={styles.FenceConfigurator_StageItem}>
              <div className={styles.Inner}>
                <div
                  className={styles.ProductItem}
                  style={{
                    height: heightPfosten(ultimulProdus) * zoomLevel,
                  }}
                >
                  <Image
                    src={
                      ultimulProdus?.pfosten?.node?.images?.edges[1]?.node?.src
                    }
                    width={(breitePfosten(ultimulProdus) + 1) * zoomLevel}
                    height={heightPfosten(ultimulProdus)}
                    style={{
                      width: (breitePfosten(ultimulProdus) + 1) * zoomLevel,
                      height: heightPfosten(ultimulProdus) * zoomLevel,
                    }}
                    alt={ultimulProdus?.node?.handle}
                  />
                </div>
              </div>
            </div>
          </li>
        </>
      ) : (
        <div
          className={styles.CloneSpace}
          style={{ width: parseFloat(width?.values[0]) + 31 }}
        />
      )}

      <div
        className={styles.CloneButton}
        style={{ right: parseFloat(width?.values[0]), top: `70%` }}
      >
        <button
          onMouseEnter={() => setHoveredProduct(ultimulProdus.id)}
          onMouseLeave={() => setHoveredProduct(null)}
          onClick={() => handleAddNew(ultimulProdus)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{
              borderRadius: '50%',
              width: 30,
              height: 30,
              color: '#fff',
              padding: 2,
            }}
            className="w-6 h-6 bg-[#c9c7be] hover:bg-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <svg height="10" width="40" className={styles.LineIcon}>
            <path d="M5 5h40" fill="none"></path>
            <circle cx="5" cy="5" r="4"></circle>
          </svg>
        </button>
      </div>
      <div
        style={{
          right: parseFloat(width?.values[0]) - 35,
          top: `70%`,
          position: 'absolute',
          zIndex: 30,
          color: '#fff',
        }}
      >
        <button
          onMouseEnter={() => setHoveredProduct(ultimulProdus.id)}
          onMouseLeave={() => setHoveredProduct(null)}
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Ebene_1"
            data-name="Ebene 1"
            viewBox="0 0 30 30"
            version="1.1"
            className="w-[30px] h-[30px] rounded-full bg-[#c9c7be] hover:bg-red-500"
          >
            <defs id="defs4">
              <style id="style2"></style>
            </defs>
            <path
              className="line"
              d="M14.31 14.345h-3.93v-3.93H9.07v3.93H5.14v1.31h3.93v3.93h1.31v-3.93h3.93z"
              id="path8"
              fill="currentColor"
              strokeWidth=".655"
            ></path>
            <path
              className="line"
              d="M24.86 14.345h-3.93v-3.93h-1.31v3.93h-3.93v1.31h3.93v3.93h1.31v-3.93h3.93z"
              id="path8-7"
              fill="currentColor"
              strokeWidth=".655"
            ></path>
          </svg>
        </button>
      </div>
    </>
  )
}

export default AddNewProducts
