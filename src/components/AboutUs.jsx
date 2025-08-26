import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutUs = ({ onAboutUsClick }) => {
  const handleAboutUsClick = () => {
    if (onAboutUsClick) {
      onAboutUsClick();
    }
  };
  return (
    <section className="about-section container-fluid py-5">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-md-6 text-section px-5">
          <p className="section-subtitle">— OUR STORY</p>
          <h2 className="section-title">
            Inspired by minimalism, <br /> Made for everyday life.
          </h2>
          <p className="section-description">
            Miori is inspired by my personal path towards minimalism. I wanted
            to take the guesswork out of beauty and create consciously
            formulated essentials that look beautiful on everyone.
          </p>
          <p className="founder">– Amina Beatrice, Founder</p>
          <button className="btn btn-custom mt-3" onClick={handleAboutUsClick}>
            ABOUT US
          </button>
        </div>

        {/* Image Section */}
        <div className="col-md-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1643883540345-64ebe9258337?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image URL
            alt="About Us"
            className="img-fluid about-img"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
