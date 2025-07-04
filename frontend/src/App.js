import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));

  // Set axios auth header if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [auth]);

  const handleLogout = () => {
    axios.post('/api/logout').finally(() => {
      localStorage.removeItem('token');
      setAuth(false);
    });
  };

  return (
    <Router>
      <div className="app">
        <Navbar auth={auth} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
