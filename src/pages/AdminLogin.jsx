import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from 'react-icons/fi';
import { login } from '../services/authService';

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page d-flex align-items-center justify-content-center">
      <div className="admin-login-card">
        <div className="text-center mb-4">
          <div className="admin-logo-mark">O</div>
          <h1 className="admin-brand-name">
            Oluwaseun <span>Dev</span>
          </h1>
          <p className="admin-brand-tag">ADMIN DASHBOARD</p>
        </div>

        <div className="admin-login-divider"></div>

        <div className="text-center mb-4">
          <h2 className="admin-login-title">Admin Login</h2>
          <p className="admin-login-subtitle">
            Only authorized admin can access this area.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label-custom">
              Email
            </label>
            <div className="admin-input-wrapper">
              <FiMail className="admin-input-icon" />
              <input
                type="email"
                id="email"
                className="admin-input"
                placeholder="admin@oluwaseun.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label-custom">
              Password
            </label>
            <div className="admin-input-wrapper">
              <FiLock className="admin-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="admin-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="admin-input-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {error && <p className="field-error text-center">{error}</p>}

          <button
            type="submit"
            className="admin-signin-btn d-flex align-items-center justify-content-center gap-2 mt-4"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <FiArrowRight />}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="admin-secure-note d-flex align-items-center justify-content-center gap-2">
            <FiShield size={14} />
            Secure Admin Access
          </p>
          <p className="admin-secure-subtext">
            This area is restricted to the admin only.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;