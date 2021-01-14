import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ClearSession from '../modules/ClearSession';
import Cookies from 'universal-cookie';

function App() {
    const cookies = new Cookies()
    const type=cookies.get('type')

    return <Navbar expand="lg" bg={localStorage.getItem('colorScheme')} variant={localStorage.getItem('colorScheme')} style={{zIndex: '5'}}>
    <Navbar.Brand as={Link} to="/">QR Hang Tag</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        {
          type ? (
            type === 'admin' ? (<Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/hangtags">Hang Tags</Nav.Link>
            <Nav.Link onClick={() => {ClearSession()}}>Log out</Nav.Link>
          </Nav>):<Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link onClick={() => {ClearSession()}}>Log out</Nav.Link>
          </Nav>
          ):(
          <Nav className="ml-auto">
            <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
              </Nav>
          </Nav>
          )
        }
      
    </Navbar.Collapse>
  </Navbar>
}

export default App;