"use client"
import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>@2023 NEXTJS. All Rights Are Reserved</div>
      <div className={styles.social}>
        <Image src="/1.png" width={15} height={15} className={styles.icon} alt="FaceBook" />
        <Image src="/2.png" width={15} height={15} className={styles.icon} alt="Instagram" />
        <Image src="/3.png" width={15} height={15} className={styles.icon} alt="Twitter" />
        <Image src="/4.png" width={15} height={15} className={styles.icon} alt="youtube" />
      </div>
    </div>
  )
}

export default Footer