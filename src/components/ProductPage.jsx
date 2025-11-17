import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

export default function ProductPage() {
  const [useFallback, setUseFallback] = useState(false)
  const [searchParams] = useSearchParams()

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const defaultSpline = 'https://prod.spline.design/myxXfbNiwnbTpGFp/scene.splinecode'
  const defaultFallback = 'https://images.unsplash.com/photo-1592945403244-b3baf5c4b7a6?q=80&w=1500&auto=format&fit=crop'

  const splineUrl = searchParams.get('spline') || defaultSpline
  const fallbackUrl = searchParams.get('fallback') || defaultFallback

  useEffect(() => {
    const lowPower = navigator?.hardwareConcurrency && navigator.hardwareConcurrency <= 2
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (prefersReducedMotion) {
      setUseFallback(true)
      return
    }
    if (!supportsWebGL() || lowPower) setUseFallback(true)
    if (!supportsWebGL() && isMobile) setUseFallback(true)
  }, [prefersReducedMotion])

  const galleryImages = useMemo(() => {
    const fromParams = ['g1','g2','g3','g4']
      .map((key) => searchParams.get(key))
      .filter(Boolean)
    if (fromParams.length === 4) return fromParams
    return [
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520974749544-5f0f5f2c8f58?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530639834899-5e5a7f6f3f81?q=80&w=1200&auto=format&fit=crop',
    ]
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[#0D2440] text-[#E7F0FA]">
      {/* Main two-column grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left visuals 65% */}
          <div className="lg:col-span-8">
            <div className="relative w-full" style={{ height: '70vh' }}>
              <div className="absolute inset-0 rounded-lg overflow-hidden ring-1 ring-white/5">
                {useFallback ? (
                  <img
                    src={fallbackUrl}
                    alt="Baccarat Rouge 540 bottle render"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <Suspense fallback={<div className="w-full h-full grid place-items-center text-[#7BA4D0]">Loading 3D…</div>}>
                    <Spline
                      scene={splineUrl}
                      className="w-full h-full"
                      onLoad={(e) => {
                        try { e?.setBackgroundColor?.(0,0,0,0) } catch {}
                      }}
                    />
                  </Suspense>
                )}
                {/* idle float effect overlay to hint motion */}
                {!useFallback && (
                  <div className="pointer-events-none absolute inset-0">{/* subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
                  </div>
                )}
              </div>
            </div>
            {/* Secondary grid 2x2 */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="relative overflow-hidden rounded-md ring-1 ring-white/5 group"
                >
                  <img src={src} alt="Detail" className="w-full h-44 object-cover transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]" loading="lazy" />
                  {/* grain overlay */}
                  <div className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjMzMDU0MTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80)' }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right info 35% */}
          <div className="lg:col-span-4 lg:pl-6">
            <div className="space-y-6">
              <div className="tracking-[0.05em] uppercase text-[#7BA4D0] font-mono text-sm">MAISON FRANCIS KURKDJIAN</div>
              <h1 className="font-display text-[44px] sm:text-[48px] leading-[1.2] text-[#E7F0FA]">Baccarat Rouge 540</h1>
              <p className="text-[#E7F0FA]/85 text-[18px] leading-[1.6] max-w-prose">
                An ethereal, luminous, and intense fragrance. A poetic alchemy where the breeze of petals meets the fire of woods.
              </p>
              <div className="pt-2">
                <div className="font-mono text-[20px] text-[#E7F0FA]">₪980.00</div>
              </div>
              <div className="pt-2">
                <button className="bg-[#2E5E99] text-[#FAFAFA] text-[16px] font-medium px-9 py-[18px] rounded-[4px] shadow-[0_8px_24px_rgba(46,94,153,0.3)] hover:-translate-y-1 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                  Add to Bag
                </button>
              </div>
              <ul className="flex flex-col gap-3 pt-4 text-[#7BA4D0] text-[14px]">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Guaranteed Authentic</li>
                <li className="flex items-center gap-2"><ShieldCheck size={16} /> Curated by Secret Closet</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} /> Premium Express Shipping</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sensory details */}
      <div className="border-t border-[#7BA4D0]/40" />
      <section className="py-20 px-[10%]">
        <h2 className="font-display text-[32px] sm:text-[36px] text-center text-[#E7F0FA] mb-12">The Olfactive Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="font-mono text-sm tracking-[0.05em] uppercase text-[#7BA4D0] mb-3">Top Notes</div>
            <div className="text-[18px] text-[#E7F0FA]">Jasmine, Saffron</div>
          </div>
          <div>
            <div className="font-mono text-sm tracking-[0.05em] uppercase text-[#7BA4D0] mb-3">Heart Notes</div>
            <div className="text-[18px] text-[#E7F0FA]">Amberwood, Ambergris</div>
          </div>
          <div>
            <div className="font-mono text-sm tracking-[0.05em] uppercase text-[#7BA4D0] mb-3">Base Notes</div>
            <div className="text-[18px] text-[#E7F0FA]">Fir Resin, Cedar</div>
          </div>
        </div>
      </section>

      {/* Curator's note */}
      <section className="bg-[#0F2C4F] py-24 px-[15%] text-center">
        <h3 className="font-display text-[32px] sm:text-[36px] text-[#E7F0FA] mb-7">"Why It's in The Closet"</h3>
        <p className="text-[#E7F0FA]/90 text-[20px] leading-[1.7] italic max-w-[65ch] mx-auto">
          "This is not a fragrance; it's an signature. Its sillage is legendary—a perfect, clean sweetness that is both powerful and transparent. We selected it for its ability to transform on the skin, a true contradiction of warmth and air. It is the definition of a modern icon."
        </p>
      </section>

      {/* Related products carousel */}
      <section className="py-24">
        <h4 className="font-display text-[32px] sm:text-[36px] text-[#E7F0FA] pl-[10%] mb-8">You Might Also Desire</h4>
        <div className="relative">
          <div className="overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none]" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex gap-6 px-[10%] pr-24">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[260px] max-w-[260px] bg-[#0F2C4F] rounded-lg overflow-hidden ring-1 ring-white/5">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1556228724-4c1b4c5b2e8b?q=80&w=1200&auto=format&fit=crop&ixid=${i}`}
                      alt="Related product"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-[#E7F0FA] font-semibold">Curator's Pick #{i + 1}</div>
                    <div className="text-[#7BA4D0] text-sm mt-1">Limited Drop</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* right fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0D2440] to-transparent" />
        </div>
      </section>
    </div>
  )
}
