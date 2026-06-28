import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/hustle_logo.jpg" alt="Hustle Vending" className="footer__logo-img" />
          <p className="footer__tagline">Premium vending. Sydney.</p>
        </div>

        <nav className="footer__nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/locations">Locations</Link>
          <Link to="/request">Request an Item</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Hustle Vending. All rights reserved. Sydney, NSW.</p>
        </div>
      </div>
    </footer>
  )
}
