import React from 'react';

function Footer() {
  return (
    <footer className="border-top mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-3 mb-3">
            <h5>About Us</h5>
            <p className="text-muted small">
              We provide high-quality products at competitive prices. 
              Your satisfaction is our top priority.
            </p>
          </div>
          
          <div className="col-md-3 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-muted">Home</a></li>
              <li><a href="/cart" className="text-decoration-none text-muted">Cart</a></li>
              <li><a href="/login" className="text-decoration-none text-muted">Login</a></li>
              <li><a href="/signup" className="text-decoration-none text-muted">Sign Up</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-3">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted">Contact Us</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Shipping Info</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Returns</a></li>
              <li><a href="#" className="text-decoration-none text-muted">FAQ</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-3">
            <h5>Newsletter</h5>
            <p className="text-muted small">
              Subscribe to get updates on new products and special offers.
            </p>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="form-control form-control-sm"
              />
              <button className="btn btn-outline-secondary btn-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-top py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-muted small mb-0">
                © 2024 React Laravel E-commerce. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <a href="#" className="text-decoration-none text-muted small me-3">Privacy Policy</a>
              <a href="#" className="text-decoration-none text-muted small">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 