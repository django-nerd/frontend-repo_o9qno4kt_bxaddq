import FluidBackground from './FluidBackground'
import ScrollIndicator from './ScrollIndicator'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#0D2440]">
      <FluidBackground />
      {children}
      <ScrollIndicator />
    </div>
  )
}
