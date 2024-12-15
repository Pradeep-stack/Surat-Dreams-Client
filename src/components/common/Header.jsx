import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" sticky="top" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home">International Ethnic Expo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#sponsors">Sponsors</Nav.Link>
          </Nav>
          <Nav>
            {/* Register Link Styled as a Button */}
            <Link to="/register" className="btn btn-outline-light me-2 text-decoration-none">
              Register
            </Link>

            {/* Download Brochure Link Styled as a Button */}
            <Link to="/download-page" className="btn btn-primary me-2 text-decoration-none">
              <i className="fas fa-download me-1"></i> Download Your Card
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
