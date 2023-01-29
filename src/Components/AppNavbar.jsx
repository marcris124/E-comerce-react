import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  return (
    <Navbar bg="primary" expand="lg" variant='dark'>
    <Container>
      <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/login">login</Nav.Link>
          <Nav.Link as={Link} to="/purchases">purchases</Nav.Link>
          <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>     
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default AppNavbar;