import React from 'react'
import styles from '@/styles/ZoomControl.module.css'

const ZoomControl = ({ zoomOut, zoomIn, zoomLevel }) => {
  return (
    <div className={styles.ZoomControl}>
      <button className={`${styles.Button} ${styles._out}`} onClick={zoomOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </button>
      <span>{`${Math.round(zoomLevel * 100)}%`}</span>
      <button className={`${styles.Button} ${styles._in}`} onClick={zoomIn}>
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  )
}

export default ZoomControl
