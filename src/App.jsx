import { HashRouter as BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Locations from './pages/Locations'
import Request from './pages/Request'
import Contact from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/request" element={<Request />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
