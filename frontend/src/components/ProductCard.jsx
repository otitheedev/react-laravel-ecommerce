import React from 'react';

function ProductCard({ product, onAddToCart, adding }) {
  return (
    <div className="card h-100">
      {product.image ? (
        <img 
          src={product.image} 
          alt={product.name} 
          className="card-img-top" 
          style={{height: '200px', objectFit: 'cover'}}
        />
      ) : (
        <div 
          className="card-img-top d-flex align-items-center justify-content-center bg-light" 
          style={{height: '200px'}}
        >
          <span className="text-muted">No Image</span>
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted flex-grow-1">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">${product.price}</span>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={() => onAddToCart(product.id)} 
            disabled={adding}
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard; 