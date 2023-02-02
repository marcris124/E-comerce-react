import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PurchaseSidebar from './PurchaseSidebar';

const AppNavbar = () => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem("token", "")
    navigate("/login")

  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (

    <>
      <Navbar sticky='top' bg="primary" expand="lg" variant='dark'>
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">login</Nav.Link>
              <Nav.Link as={Link} to="/purchases">purchases</Nav.Link>
              <Nav.Link onClick={logout} >Log out</Nav.Link>
              <Nav.Link onClick={handleShow} ><i className="fa-solid fa-cart-shopping"></i></Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

     <PurchaseSidebar show={show} handleClose={handleClose}/>
    </>
  );
};

export default AppNavbar;