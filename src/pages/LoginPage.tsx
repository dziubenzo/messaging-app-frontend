import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URL from '../API';
import { logInAsGuest, statusIcons } from '../helpers';
import { socket } from '../socket';
import { StyledLoginPage } from '../styles/LoginPage.styled';

function LoginPage() {
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggingInAsGuest, setLoggingInAsGuest] = useState(false);

  // Log in user, change their status icon to available and navigate to the Home page on successful login
  // Make sure icon is changed before navigating to the Home page
  // Otherwise show error message in toast
  async function logIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    setLoggingIn(true);
    const toastRef = toast.info('Logging in...');
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) {
      setLoggingIn(false);
      return toast.update(toastRef, {
        render: 'Incorrect username or password',
        type: 'error',
      });
    }
    const loggedInUser = await res.json();
    socket.emit(
      'change status icon',
      loggedInUser.user_id,
      statusIcons.unavailable,
    );
    toast.dismiss();
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
        <button type="submit">{loggingIn ? 'Logging In...' : 'Log In'}</button>
      </form>
      <Link to="/register">
        <button>Register Page</button>
      </Link>
      <button
        className="guest-account-btn"
        onClick={() => logInAsGuest(setLoggingInAsGuest, navigate)}
      >
        {loggingInAsGuest ? 'Logging In As Guest...' : 'Log In As Guest'}
      </button>
    </StyledLoginPage>
  );
}

export default LoginPage;
