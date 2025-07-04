import React, { useEffect, useState } from 'react';
import { apiService, handleApiError, extractData } from '../services/api';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState({});
  const [updating, setUpdating] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    setLoading(true);
    apiService.cart.getCart()
      .then(res => {
        setCart(extractData(res));
        setLoading(false);
      })
      .catch((error) => {
        setError(handleApiError(error));
        setLoading(false);
      });
  };

  const removeItem = (itemId) => {
    setRemoving(r => ({ ...r, [itemId]: true }));
    apiService.cart.removeItem(itemId)
      .then(() => {
        setMessage('Item removed');
        fetchCart();
      })
      .finally(() => setRemoving(r => ({ ...r, [itemId]: false })));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setUpdating(u => ({ ...u, [itemId]: true }));
    apiService.cart.updateItem(itemId, quantity)
      .then(() => {
        setMessage('Quantity updated');
        fetchCart();
      })
      .finally(() => setUpdating(u => ({ ...u, [itemId]: false })));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setLoading(true);
      apiService.cart.clearCart()
        .then(() => {
          setMessage('Cart cleared');
          fetchCart();
        })
        .catch((error) => setError(handleApiError(error)))
        .finally(() => setLoading(false));
    }
  };

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (error) return <div className="container py-5"><div className="alert alert-danger">{error}</div></div>;
  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <a href="/" className="btn btn-outline-primary">Continue Shopping</a>
      </div>
    );
  }

  const total = cart.cart_items.reduce((sum, item) => sum + (item.product?.price * item.quantity), 0);
  const itemCount = cart.cart_items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Shopping Cart</h1>
      {message && <div className="alert alert-success">{message}</div>}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <span>{itemCount} items</span>
        <button onClick={clearCart} className="btn btn-outline-danger btn-sm">Clear Cart</button>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.cart_items.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    {item.product?.image && (
                      <img src={item.product.image} alt={item.product.name} style={{width:50, height:50, objectFit:'cover'}} />
                    )}
                    <span>{item.product?.name}</span>
                  </div>
                </td>
                <td>${item.product?.price}</td>
                <td>
                  <div className="input-group input-group-sm" style={{maxWidth:120}}>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={updating[item.id] || item.quantity <= 1}
                      type="button"
                    >-</button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                      disabled={updating[item.id]}
                      className="form-control text-center"
                      style={{width:50}}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={updating[item.id]}
                      type="button"
                    >+</button>
                  </div>
                </td>
                <td>${(item.product?.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeItem(item.id)}
                    disabled={removing[item.id]}
                  >
                    {removing[item.id] ? 'Removing...' : 'Remove'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end align-items-center mt-4">
        <h4 className="me-4">Total: ${total.toFixed(2)}</h4>
        <button className="btn btn-success" disabled>Proceed to Checkout</button>
      </div>
      <div className="mt-3">
        <a href="/" className="btn btn-link">Continue Shopping</a>
      </div>
    </div>
  );
}

export default Cart; 