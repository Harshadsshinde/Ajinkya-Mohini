import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import bgImage from "../assets/bg.jpg";
import FlipClock from "../components/FlipClock";
import MapComponent from "./MapComponent";
import { LeafletContext } from "@react-leaflet/core";
import GallerySlider from "../components/GallerySlider";
import SakuraPetals from "../components/SakuraPetals";
import "../index.css";
import "@fontsource/great-vibes";
import "@fontsource/playfair-display";
import "@fontsource/lora";
import VideoBackground from "../components/VideoBackground";
import HowWeMet from "../components/HowWeMet";

function Hero() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  // More dramatic parallax
// Background moves slower (parallax)
const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

// Text moves more dramatically
const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

// Slow fade-out
const opacity = useTransform(scrollYProgress, [0, 1.5], [1, 0]);


  function calculateTimeLeft() {
    const weddingDate = new Date("2025-11-30");
    const now = new Date();
    const difference = weddingDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  
  return (
    <>
      <div className="min-h-screen bg-cream font-simple">
        {/* Navigation */}
       <motion.nav
  className="fixed top-0 w-full z-50 bg-cream/90 backdrop-blur-sm shadow-sm overflow-x-hidden"
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.8 }}
>
  <div className="container mx-auto px-4 py-3">
    <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-center">
      {["HOME", "EVENTS", "GALLERY", "How We Met", "HIGHLIGHTS"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="text-navy hover:text-gold transition-all duration-300 font-semibold tracking-wider text-xs md:text-sm uppercase"
        >
          {item}
        </a>
      ))}
    </div>
  </div>
</motion.nav>


        {/* Hero Section with Parallax */}
        <section
          ref={heroRef}
          id="home"
          className="min-h-screen relative flex items-center justify-center overflow-hidden"
        >
          {/* Background Image with Parallax */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bgImage})`,
              y: backgroundY, // This creates the parallax effect
              scale: 1.1, // Slight zoom to prevent showing edges
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>

          {/* Sakura Petals */}
          <div className="absolute inset-0 overflow-hidden">
            <SakuraPetals />
          </div>

          {/* Main Content with Parallax */}
          <motion.div 
            className="text-center text-white z-20 relative"
            style={{
              y: textY, // Text moves faster than background
              opacity: opacity, // Text fades out as you scroll
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-7xl md:text-9xl font-wedding mb-4 text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
              >
                Ajinkya <span className="text-gold">&</span> Mohini
              </motion.h1>
              
              <div className="relative flex items-center justify-center">
                <img
                  src="/fprint.png"
                  alt="Overlay"
                  className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 h-auto object-contain"
                />
              </div>

              {/* Countdown Timer */}
              <motion.div
                className="my-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <div className="flex justify-center space-x-4 md:space-x-8">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-20">
                        <div className="text-3xl md:text-4xl font-bold text-gold">
                          {value.toString().padStart(2, "0")}
                        </div>
                        <div className="text-sm uppercase tracking-wider mt-2">
                          {unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: "0.2em",
                }}
                className="text-2xl md:text-3xl mb-8 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                Save Our Date
              </motion.h2>

              <motion.p
                style={{ fontFamily: "'Lora', serif" }}
                className="text-xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                November 30, 2025 • Darashiv, India
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                <motion.a
                  href="#events"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-navy transition-all duration-300 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Events
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-2xl z-30"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ opacity: opacity }}
          >
            ↓
          </motion.div>
        </section>

        {/* Rest of your existing code remains the same */}
        <section
          id="events"
          className="py-20 px-6 bg-gradient-to-b from-cream to-white"
        >
          <div className="container mx-auto max-w-6xl">
            <motion.h2
              className="text-5xl md:text-6xl font-cursive text-center text-maroon mb-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Events
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  title: "Haldi & Mehndi",
                  date: "November 30, 2025",
                  time: "9:00 AM",
                  location: "Shree Ganesh Mangal Karyalay Dharashiv",
                  address: "Shree Ganesh Mangal Karyalay Dharashiv, Maharashtra 413802",
                  mapQuery:  "Shree Ganesh Mangal Karyalay Dharashiv, Maharashtra 413802",
                  description:
                    "Traditional Haldi and Mehndi ceremonies with family and close friends",
                },
                {
                  title: "Wedding Ceremony",
                  date: "November 30, 2025",
                  time: "12:00 PM",
                  location: "Shree Ganesh Mangal Karyalay Dharashiv",
                  address: "Shree Ganesh Mangal Karyalay Dharashiv, Maharashtra 413802",
                  mapQuery:  "Shree Ganesh Mangal Karyalay Dharashiv, Maharashtra 413802",
                  description:
                    "Traditional Maharashtrian wedding ceremony followed by reception",
                },
              ].map((event, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gold/20 hover:shadow-2xl transition-all duration-500"
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <h3 className="text-3xl font-cursive text-maroon mb-6">
                    {event.title}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-gold">📅</span>
                      <span className="font-semibold font-sans">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex columns-1 items-center justify-center space-x-3">
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-gold">⏰</span>
                        <span className="font-semibold font-sans">
                          {event.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-gold">📍</span>
                        <span className="font-semibold font-sans">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 font-sans leading-relaxed">
                    {event.description}
                  </p>

                  {/* Interactive Map Section */}
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="h-64 rounded-lg overflow-hidden relative group">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${event.mapQuery}&zoom=14&maptype=roadmap`}
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: "8px" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map for ${event.title}`}
                        className="transition-transform duration-300 group-hover:scale-105"
                      ></iframe>

                      {/* Map Controls Overlay */}
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
                          <div className="text-xs text-gray-600 font-semibold font-sans"></div>
                        </div>
                      </div>
                    </div>

                    {/* Map Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
                      <div className="flex space-x-2">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            event.address
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-maroon text-black px-4 py-2 rounded-lg text-sm font-semibold font-sans hover:bg-maroon/90 transition-all duration-300 shadow-md"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Directions
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
       
        <GallerySlider />
        <HowWeMet/>
        <VideoBackground />
       
        {/* Highlights Section */}
        <section
          id="highlights"
          className="py-20 px-6 bg-gradient-to-b from-cream to-maroon text-black"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              className="text-5xl md:text-6xl text-black font-cursive text-center text-gold mb-16"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Highlights
            </motion.h2>

            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-gold/30"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-black/20 rounded-2xl overflow-hidden">
                <div className="w-full h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl text-gold mb-4">🎬</div>
                    <p className="text-xl text-gold font-semibold">video </p>
                    <p className="text-white/70 mt-2">Coming soon...</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <motion.button
                  className="bg-gold text-maroon px-8 py-3 rounded-full font-semibold hover:bg-gold/90 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Highlights
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
     
        {/* Footer */}
        <footer className="bg-navy text-cream py-12 mt-0 text-center">
          <div className="container ">
            <motion.p
              className="text-3xl font-cursive text-gold mb-4"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              Ajinkya & Mohini
            </motion.p>
            <p className="opacity-75">November 30, 2025 • Darashiv, India</p>
            <p className="mt-4 opacity-60">Made with ❤️ for our special day</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Hero;