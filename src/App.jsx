import Header from './components/Header'
import Portfolio from './components/Portfolio'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <Portfolio />
      </main>
      <Footer />
    </div>
  )
}
