import React from 'react'
import styles from './GlobalLoader.module.scss'

type loaderProps = {
  smalMode?: Boolean
}

export const GlobalLoader: React.FC<loaderProps> = ({ smalMode = false }) => {
  return (
    <div className={`${styles.globalOverlay} ${smalMode ? styles.smalSpiner : ''}`}>
      <div className={styles.loadingSpinner}></div>
    </div>
  )
}
