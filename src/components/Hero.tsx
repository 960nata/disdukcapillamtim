'use client';

import styles from "./Hero.module.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const images = [
    "/images/hero/hero1.avif",
    "/images/hero/hero 2.avif",
    "/images/hero/hero 3.avif"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.hero}>
      {/* Background Images with Crossfade */}
      <div className={styles.heroBackground}>
        {images.map((src, index) => (
          <motion.img
            key={src}
            src={src}
            alt={`Hero background ${index + 1}`}
            className={styles.heroBgImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 0.3 : 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroCenter}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Melayani Sepenuh Hati<br />Untuk Masyarakat Lampung Timur
          </motion.h1>
          
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Pelayanan administrasi kependudukan yang mudah, cepat, dan transparan untuk masyarakat Lampung Timur.
          </motion.p>

          <motion.div 
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className={styles.primaryBtn}>
              Ajukan Sekarang
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '6px'}}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>

          </motion.div>
        </div>
      </div>
      

    </div>
  );
}
