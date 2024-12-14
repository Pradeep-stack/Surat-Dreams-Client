import React from "react";
import { Container } from "react-bootstrap";

function SponsorSection() {
  return (
    <section id="sponsors" className="sponsor-section">
      <Container>
        <h2 >Our Diamond Sponsor</h2>
        <div className="d-flex justify-content-center align-items-center gap-3 ">
        <img
          src="https://via.placeholder.com/150"
          alt="Sponsor Logo"
          style={{ maxWidth: "250px", borderRadius: "10px" }}
        />
      
        <img
          src="https://via.placeholder.com/150"
          alt="Sponsor Logo"
          style={{ maxWidth: "250px", borderRadius: "10px" }}
        />
      
        <img
          src="https://via.placeholder.com/150"
          alt="Sponsor Logo"
          style={{ maxWidth: "250px", borderRadius: "10px" }}
        />
      
        <img
          src="https://via.placeholder.com/150"
          alt="Sponsor Logo"
          style={{ maxWidth: "250px", borderRadius: "10px" }}
        />
      
        </div>
        <h3 className="mt-3">KRESHVA</h3>
      </Container>
    </section>
  );
}

export default SponsorSection;
