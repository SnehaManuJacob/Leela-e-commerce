import React from "react";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold section-title collectionBtn">Leela's</h5>
            <p className="text-muted small">
              Bringing you quality fashion at the best prices. Sustainable,
              stylish, and customer-first.
            </p>
            <p className="small mb-1">
              <i className="bi bi-geo-alt-fill me-2"></i>
              123 Leela's Street, Bangalore, NY
            </p>
            <p className="small mb-1">
              <i className="bi bi-telephone-fill me-2"></i>
              +91 000 000 000
            </p>
            <p className="small">
              <i className="bi bi-envelope-fill me-2"></i>
              support@leelas.com
            </p>
          </div>

          {/* Customer Service */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Customer Service</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="/faq" className="footer-link">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/returns" className="footer-link">
                  Returns
                </a>
              </li>
              <li>
                <a href="/shipping" className="footer-link">
                  Shipping
                </a>
              </li>
              <li>
                <a href="/privacy" className="footer-link">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="footer-social">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="footer-social">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="footer-social">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="footer-social">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 pt-3 border-top border-secondary small">
          © {new Date().getFullYear()} Leelas. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
