import React from 'react'
import { Container, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/Header.css'
const Header = () => {
  return (
    <div className='contenedor-navbar'>
     <Navbar expand="lg" className='Navbar'>
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" className='linkhome'>Libreria TestCode</Navbar.Brand>
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/autores" className='linkhome'>Autores</Nav.Link>
            <Nav.Link as={Link} to="/editorial" className='linkhome'>Editoriales</Nav.Link>
            <Nav.Link as={Link} to="/libros" className='linkhome'>Libros</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
