import React from "react";
import {Navbar, Nav, Container, Offcanvas} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import './myStyles.css'

function Navibar() {
  return (
    <div>
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="/">My Crypto Table</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                My Crypto Table
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/tablecrypto'>Crypto Table</Nav.Link>
                <Nav.Link href='/addtransaction'>Add a Transaction</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navibar;
