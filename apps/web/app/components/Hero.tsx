'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { heroSlides } from '../lib/constants';
import { Building, Zap, Droplets, Fuel, Pickaxe, Truck } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideIcons = [Building, Zap, Zap, Zap, Building, Building];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 ${slide.image} bg-cover bg-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-slate-950/80" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl sm:text-2xl text-[#1185AE] font-semibold mb-6">
              {heroSlides[currentSlide].subtitle}
            </p>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto"
          >
            Delivering mining support, engineering, energy, logistics, and infrastructure solutions with uncompromising safety and quality standards.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact" className="glass bg-[#BD2227] px-6 sm:px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
              Request a Quote
            </Link>
            <Link href="/services" className="glass border border-white/20 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-white/5 transition-colors">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators with Icons */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 sm:gap-3">
        {heroSlides.map((_, index) => {
          const IconComponent = slideIcons[index];
          return (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-[#1185AE] text-white shadow-lg scale-110'
                  : 'bg-white/20 text-white/60 hover:bg-white/30 hover:text-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <IconComponent size={16} className="sm:w-5 sm:h-5" />
            </button>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-4 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-0.5 h-1.5 sm:w-1 sm:h-2 bg-white/50 rounded-full mt-1 sm:mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}