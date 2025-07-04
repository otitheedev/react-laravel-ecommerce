import React, { useEffect, useState } from 'react';
import { apiService, handleApiError, extractData } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    apiService.products.getAll()
      .then(res => {
        const productsData = Array.isArray(extractData(res)) ? extractData(res) : [];
        setProducts(productsData);
        setLoading(false);
      })
      .catch((error) => {
        setError(handleApiError(error));
        setLoading(false);
      });
  }, []);

  const addToCart = (productId) => {
    setAdding(a => ({ ...a, [productId]: true }));
    apiService.cart.addItem({ product_id: productId, quantity: 1 })
      .then(() => {
        setMessage('Added to cart!');
        setTimeout(() => setMessage(''), 1500);
      })
      .catch((error) => setMessage(handleApiError(error)))
      .finally(() => setAdding(a => ({ ...a, [productId]: false })));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Products</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {products.length === 0 ? (
            <div className="col-12 text-center">
              <p>No products found.</p>
            </div>
          ) : (
            products.map(product => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                <div className="card h-100">
                  {product.image && (
                    <img src={product.image} className="card-img-top" alt={product.name} style={{objectFit:'cover',height:'180px'}} />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted mb-2">${product.price}</p>
                    <p className="card-text small flex-grow-1">{product.description}</p>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => addToCart(product.id)}
                      disabled={adding[product.id]}
                    >
                      {adding[product.id] ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home; 