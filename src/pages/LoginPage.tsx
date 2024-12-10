import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URL from '../API';
import { logInAsGuest } from '../helpers';
import { StyledLoginPage } from '../styles/LoginPage.styled';
import { OutletContext } from '../types';

function LoginPage() {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useOutletContext<OutletContext>();

  const [loggingIn, setLoggingIn] = useState(false);
  const [loggingInAsGuest, setLoggingInAsGuest] = useState(false);

  // Prevent visiting this page by logged-in users
  useEffect(() => {
    if (isAuth) navigate('/home');
  }, [isAuth]);

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
    });
    if (!res.ok) {
      setLoggingIn(false);
      return toast.update(toastRef, {
        render: 'Incorrect username or password',
        type: 'error',
      });
    }
    // Create a cookie with API-signed JWT
    const token = await res.json();
    Cookies.set('jwt', token, {
      expires: 3,
      secure: location.protocol === 'https:',
      sameSite: 'Lax',
    });
    setIsAuth(true);
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
        onClick={() => logInAsGuest(setLoggingInAsGuest, setIsAuth, navigate)}
      >
        {loggingInAsGuest ? 'Logging In As Guest...' : 'Log In As Guest'}
      </button>
    </StyledLoginPage>
  );
}

export default LoginPage;
