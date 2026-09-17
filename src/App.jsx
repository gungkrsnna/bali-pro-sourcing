import { useState } from 'react'
import Header from './components/Header'
import Portfolio from './components/Portfolio'
import Footer from './components/Footer'
import PortfolioV2 from './components/PortfolioV2'
import VersionToggle from './components/VersionToggle'

export default function App() {
  const [version, setVersion] = useState(1)

  return (
    <>
      {version === 1 ? (
        <div className="min-h-screen bg-paper">
          <Header />
          <main>
            <Portfolio />
          </main>
          <Footer />
        </div>
      ) : (
        <PortfolioV2 />
      )}

      <VersionToggle version={version} onChange={setVersion} />
    </>
  )
}
