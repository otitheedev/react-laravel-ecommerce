import React, { useEffect, useState } from 'react';
import { apiService, handleApiError, extractData } from '../services/api';

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    apiService.products.getAll()
      .then(res => {
        setProducts(Array.isArray(extractData(res)) ? extractData(res) : []);
        setLoading(false);
      })
      .catch((error) => {
        setError(handleApiError(error));
        setLoading(false);
      });
  };

  const handleEdit = (product) => {
    setEditing(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image || '',
    });
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ name: '', price: '', description: '', image: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    apiService.products.update(editing, form)
      .then(() => {
        setMessage('Product updated');
        setEditing(null);
        fetchProducts();
      })
      .catch((error) => setError(handleApiError(error)))
      .finally(() => setSaving(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this product?')) return;
    setSaving(true);
    setError('');
    setMessage('');
    apiService.products.delete(id)
      .then(() => {
        setMessage('Product deleted');
        fetchProducts();
      })
      .catch((error) => setError(handleApiError(error)))
      .finally(() => setSaving(false));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Admin - Products</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                editing === product.id ? (
                  <tr key={product.id}>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={handleSave} disabled={saving}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel} disabled={saving}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.image && <img src={product.image} alt={product.name} style={{width:40, height:40, objectFit:'cover'}} />}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(product)} disabled={saving}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)} disabled={saving}>Delete</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin; 