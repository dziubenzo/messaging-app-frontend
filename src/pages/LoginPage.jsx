import { useState } from 'react';
import { StyledLoginPage } from '../styles/LoginPage.styled';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import API_URL from '../API';

function LoginPage() {
  const navigate = useNavigate();
  const { setUserId } = useOutletContext();
  const [error, setError] = useState('');

  // Log in user, set userId and redirect to the Home page on successful login
  // Otherwise show error message
  async function logIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) {
      return setError('Incorrect username or password');
    }
    const userId = await res.json();
    setUserId(userId);
    return navigate('/home');
  }

  return (
    <StyledLoginPage>
      <div className="top-bar">
        <p>Log In</p>
      </div>
      <form method="post" onSubmit={logIn}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Log In</button>
      </form>
      <Link to="/register">
        <button>Register Page</button>
      </Link>
    </StyledLoginPage>
  );
}

export default LoginPage;
