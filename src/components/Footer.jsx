import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../css/Footer.css'
const Footer = () => {
  return (
    <div>
      <footer className="footer">
      <div>
        <h4>Síguenos en redes sociales:</h4>
        <ul className="social-list">
          <li><a href="https://www.facebook.com/enzo.gonzalez.5891" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
          <li><a href="https://twitter.com/EnzoJaviGonz" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
          <li><a href="https://www.instagram.com/enzoogonzalez98/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
        </ul>
      </div>
      <p>&copy; 2023 Tu Librería</p>
    </footer>
    </div>
  )
}

export default Footer
