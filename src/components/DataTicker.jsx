import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const messages = [
  '500+ premium items available',
  '100+ top brands curated',
  'Limited releases weekly',
]

export default function DataTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 2500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-6 overflow-hidden text-[#7BA4D0] font-mono text-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="will-change-transform"
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
