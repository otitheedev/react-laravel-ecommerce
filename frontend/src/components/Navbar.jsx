import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { apiService } from '../services/api';

function Navbar({ auth, onLogout }) {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Fetch cart items count and user info
  useEffect(() => {
    if (auth) {
      setLoading(true);
      // Fetch cart
      apiService.cart.getCart()
        .then(response => {
          const cart = response.data.data || response.data;
          const count = cart.cart_items ? cart.cart_items.reduce((sum, item) => sum + item.quantity, 0) : 0;
          setCartItemCount(count);
        })
        .catch(() => {
          setCartItemCount(0);
        })
        .finally(() => {
          setLoading(false);
        });

      // Try to get user info from localStorage or set default
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
        try {
          setUser(JSON.parse(userInfo));
        } catch (e) {
          setUser({ name: 'User' });
        }
      } else {
        setUser({ name: 'User' });
      }
    } else {
      setCartItemCount(0);
      setUser(null);
    }
  }, [auth, location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          E-Shop
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link 
                to="/cart" 
                className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
              >
                Cart
                {cartItemCount > 0 && (
                  <span className="badge bg-primary ms-1">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>
            </li>
            
            {auth && (
              <li className="nav-item">
                <Link 
                  to="/admin" 
                  className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {auth ? (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    {user?.name || 'User'}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={onLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link 
                    to="/login" 
                    className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/signup" 
                    className={`nav-link ${isActive('/signup') ? 'active' : ''}`}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 