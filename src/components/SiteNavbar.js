import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'


const SiteNavbar = () => {

  return (
    <Navbar expand="sm" bg="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className='btn btn-light'>👩‍🍳</Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}


  
export default SiteNavbar