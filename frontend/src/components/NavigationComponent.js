import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function App() {
    var ColorScheme
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) ColorScheme = 'dark';
    else ColorScheme = 'light'

    return <Navbar expand="lg" variant={ColorScheme}>
    <Navbar.Brand as={Link} to="/">QR Hang Tag</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}

export default App;