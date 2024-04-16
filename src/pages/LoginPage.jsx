import { useState } from 'react';
import { StyledLoginPage } from '../styles/LoginPage.styled';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import API_URL from '../API';
import { changeStatusIcon, statusIcons } from '../helpers';
import { socket } from '../socket';
import { toast } from 'react-toastify';

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useOutletContext();
  const [error, setError] = useState('');

  // Log in user, change their status icon to available, set user state and navigate to the Home page on successful login
  // Make sure icon is changes and user state is set before navigating to the Home page
  // Otherwise show error message
  async function logIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    toast('Logging in...');
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
    const loggedInUser = await res.json();
    socket.emit(
      'change status icon',
      loggedInUser.user_id,
      statusIcons.unavailable,
    );
    await changeStatusIcon(loggedInUser, setUser, statusIcons.available);
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
