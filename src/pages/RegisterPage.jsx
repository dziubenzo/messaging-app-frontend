import { StyledRegisterPage } from '../styles/RegisterPage.styled';
import { Link, useNavigate } from 'react-router-dom';
import API_URL from '../API.js';
import { useState } from 'react';
import { toast } from 'react-toastify';

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function register(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUser = {
      username: formData.get('username'),
      password: formData.get('password'),
      confirm_password: formData.get('confirm_password'),
    };
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw result;
      }
      // Show toast and redirect to login if user created successfully
      toast.success(result);
      navigate('/');
    } catch (error) {
      setError(error);
    }
  }
  return (
    <StyledRegisterPage>
      <div className="top-bar">
        <p>Register</p>
      </div>
      <form method="post" onSubmit={register}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          minLength={3}
          maxLength={16}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          maxLength={16}
          required
        />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          name="confirm_password"
          id="confirm-password"
          maxLength={16}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
      <Link to="/login">
        <button>Log In Page</button>
      </Link>
    </StyledRegisterPage>
  );
}

export default RegisterPage;
