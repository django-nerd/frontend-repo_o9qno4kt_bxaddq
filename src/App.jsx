import Layout from './components/Layout'
import Hero from './components/Hero'

function App() {
  return (
    <Layout>
      <Hero />
      <section id="explore" className="relative z-10 bg-[#0D2440] text-[#E7F0FA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-28">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-[#E7F0FA]">A private showroom</h3>
              <p className="text-[#7BA4D0]">A selection that whispers luxury — minimal, intentional, and rare.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-[#E7F0FA]">Only what matters</h3>
              <p className="text-[#7BA4D0]">Every piece is chosen for feeling first. The details follow.</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-[#E7F0FA]">New drops, limited runs</h3>
              <p className="text-[#7BA4D0]">Releases arrive quietly. Those who know, know.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default App
