import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useScroll, useTransform } from 'framer-motion'
import DataTicker from './DataTicker'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Scroll-driven transforms per spec
  const scale3D = useTransform(scrollYProgress, [0, 1], [1, 0.7])
  const y3D = useTransform(scrollYProgress, [0, 1], [0, -150])
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  return (
    <section ref={ref} className="relative min-h-[120vh] bg-[#0D2440] text-[#0D2440] overflow-hidden">
      {/* Fluid gradient mesh */}
      <div className="absolute inset-0">
        {/* Implemented with Three.js in separate component */}
        <div id="fluid-bg" className="absolute inset-0" />
      </div>

      {/* Content left */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="min-h-screen flex items-center">
          <div className="w-full md:w-[45%] py-24">
            <motion.h1
              style={{ scale: headlineScale, opacity: headlineOpacity }}
              className="font-['Playfair Display',serif] text-[52px] sm:text-[64px] leading-[1.1] tracking-[-0.02em] text-[#E7F0FA]"
            >
              <motion.span initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}>Discover.</motion.span>
              <br />
              <motion.span initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}>Desire.</motion.span>
              <br />
              <motion.span initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}>Own.</motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="mt-6 text-[18px] leading-[1.6] text-[#2E5E99] max-w-[60ch]"
            >
              Curated luxury fragrances, fashion, jewelry, and tech – all in one exclusive closet.
            </motion.p>

            <div className="mt-6">
              <DataTicker />
            </div>

            <motion.a
              href="#explore"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
              className="inline-block mt-10 bg-[#2E5E99] text-[#FAFAFA] text-[16px] font-medium px-9 py-[18px] rounded-[4px] shadow-[0_8px_24px_rgba(46,94,153,0.3)] hover:-translate-y-1 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              Explore The Closet →
            </motion.a>
          </div>

          {/* 3D side */}
          <div className="hidden md:block md:w-[55%] relative">
            <motion.div style={{ scale: scale3D, y: y3D }} className="relative h-[80vh]">
              <Spline scene="https://prod.spline.design/myxXfbNiwnbTpGFp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
              {/* subtle overlay lines */}
              <div className="pointer-events-none absolute inset-0">
                <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#7BA4D0" stopOpacity="0.0" />
                      <stop offset="100%" stopColor="#7BA4D0" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <g stroke="url(#g)" strokeWidth="1">
                    <line x1="10%" y1="15%" x2="60%" y2="25%" />
                    <line x1="40%" y1="60%" x2="85%" y2="45%" />
                    <line x1="25%" y1="80%" x2="70%" y2="70%" />
                  </g>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
