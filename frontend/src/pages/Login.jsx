import React, { useState } from 'react';
import { apiService, handleApiError, extractData } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login({ setAuth }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    apiService.auth.login(form)
      .then(res => {
        const data = extractData(res);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setAuth(true);
        navigate('/');
      })
      .catch((error) => setError(handleApiError(error)))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container py-5" style={{maxWidth:400}}>
      <h2 className="mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-3 text-center">
        <a href="/signup">Don't have an account? Sign up</a>
      </div>
    </div>
  );
}

export default Login; 