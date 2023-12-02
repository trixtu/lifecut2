import React from 'react'
import styles from '@/styles/ElementLibrary.module.css'
import Image from 'next/image'

const ElementLibrary = ({ filteredCollection, handleAddToConfigurator }) => {
  function heightElement(product) {
    const options = product?.node?.options || []
    const heightOption = options.find((option) => option.name === 'Höhe')

    return heightOption ? parseFloat(heightOption.values[0]) / 2 : 0
  }

  function breiteElement(product) {
    const options = product?.node?.options || []
    const breiteOption = options.find((option) => option.name === 'Breite')

    return breiteOption ? parseFloat(breiteOption.values[0]) / 2 : 0
  }

  return (
    <div className={styles.ElementLibrary}>
      <div className="relative">
        <div className={styles.ScrollableAreaControlBoard}>
          <ul className={styles.ElementTrack}>
            {filteredCollection &&
              filteredCollection.edges.map((product) => (
                <li
                  key={product.node.handle}
                  className={
                    product.node.tags.some((tag) => tag === 'pfosten')
                      ? styles.hidden
                      : styles.ElementTrack_Item
                  }
                >
                  <div className={styles.ElementLibrary_Item}>
                    {product.node.options &&
                      product.node.options.map((o) =>
                        o.name === 'Höhe' ? (
                          <span
                            key={o.name}
                            className={`${styles.ElementLibrary_Item_Dimension} ${styles.height}`}
                          >
                            {o.values}
                          </span>
                        ) : null
                      )}
                    <div className={styles.ElementLibrary_Item}>
                      <button
                        className={styles.AddIcon}
                        onClick={() => handleAddToConfigurator(product)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                      <div
                        className={styles.ProductItem}
                        style={{
                          width: breiteElement(product),
                          height: heightElement(product),
                        }}
                      >
                        <Image
                          src={product.node.images.nodes[1].src}
                          width={breiteElement(product)}
                          height={heightElement(product)}
                          alt={product.node.handle}
                          priority
                        />
                      </div>
                      {product?.node?.options &&
                        product.node.options.map((o) =>
                          o.name === 'Breite' ? (
                            <span
                              key={o.name}
                              className={`${styles.ElementLibrary_Item_Dimension} ${styles.width}`}
                            >
                              {o.values}
                            </span>
                          ) : null
                        )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ElementLibrary
