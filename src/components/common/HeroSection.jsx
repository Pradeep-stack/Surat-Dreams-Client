import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function HeroSection() {
  return (
    <div className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1>Welcome to the International Ethnic Expo</h1>
            <p>
              Join us in celebrating culture, tradition, and innovation with participants and sponsors from around the world.
            </p>
            <a href="#explore" className="cta-button">
              Explore More
            </a>
          </Col>
          <Col md={6} className="text-center mt-4">
            <img
              src="https://via.placeholder.com/300"
              alt="Expo Banner"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HeroSection;
