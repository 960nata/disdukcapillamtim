'use client';

import styles from "./page.module.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import PopulationChart from "@/components/PopulationChart";
import PopularServices from "@/components/PopularServices";
import FeaturedPrograms from "@/components/FeaturedPrograms";
import LatestNews from "@/components/LatestNews";
import GallerySection from "@/components/GallerySection";
import SpeechSection from "@/components/SpeechSection";
import Achievements from "@/components/Achievements";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <Header />
        <div className="w-full p-5 bg-white">
          <Hero />
        </div>
        <Statistics />
        <PopulationChart />
        <div id="layanan"><PopularServices /></div>
        <FeaturedPrograms />
        <div id="berita"><LatestNews /></div>
        <GallerySection />
        <SpeechSection />
        <Achievements />
        <div id="kontak"><ContactSection /></div>
        <Footer />
      </div>
    </div>
  );
}
