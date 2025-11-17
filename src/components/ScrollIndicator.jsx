import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) setHide(true)
    }
    const t = setTimeout(() => setHide(true), 3000)
    window.addEventListener('scroll', onScroll)
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={`fixed left-1/2 -translate-x-1/2 bottom-10 transition-opacity duration-500 ${hide ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex items-center gap-4 text-[#7BA4D0]">
        <div className="relative h-16 w-px bg-[#7BA4D0]/80 overflow-hidden">
          <span className="absolute top-0 left-0 right-0 h-2 bg-[#7BA4D0] animate-bounce rounded-full" />
        </div>
        <span className="text-sm">Scroll to explore Secret Closet</span>
      </div>
    </div>
  )
}
