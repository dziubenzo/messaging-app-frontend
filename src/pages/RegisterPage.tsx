import Cookies from 'js-cookie';
import { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { type Id, toast } from 'react-toastify';
import API_URL from '../API';
import { logInAsGuest } from '../helpers';
import { socket } from '../socket';
import { StyledRegisterPage } from '../styles/RegisterPage.styled';
import { OutletContext } from '../types';

function RegisterPage() {
  const navigate = useNavigate();
  const { setIsAuth } = useOutletContext<OutletContext>();

  const [buttonText, setButtonText] = useState('Register');
  const [loggingInAsGuest, setLoggingInAsGuest] = useState(false);

  // Register user
  async function register(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const toastRef = toast.info('Registering...');

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;

    if (!username || !password || !confirmPassword) return;

    setButtonText('Registering...');
    const newUser = {
      username: username.trim(),
      password: password.trim(),
      confirm_password: confirmPassword.trim(),
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
        setButtonText('Register');
        throw result;
      }
      socket.emit('user registers', newUser.username);
      return logInAfterRegister(newUser.username, newUser.password, toastRef);
    } catch (error) {
      if (error instanceof Error) {
        setButtonText('Register');
        toast.update(toastRef, { render: error.message, type: 'error' });
      } else if (typeof error === 'string') {
        setButtonText('Register');
        toast.update(toastRef, { render: error, type: 'error' });
      }
    }
  }

  // Log them in if registration successful
  async function logInAfterRegister(
    username: string,
    password: string,
    toastRef: Id,
  ) {
    const user = {
      username,
      password,
    };
    setButtonText('Logging In...');
    toast.update(toastRef, { render: 'Logging in...' });
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('jwt')}`,
      },
    });
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
        <button type="submit">{buttonText}</button>
      </form>
      <Link to="/login">
        <button>Log In Page</button>
      </Link>
      <button
        className="guest-account-btn"
        onClick={() => logInAsGuest(setLoggingInAsGuest, setIsAuth, navigate)}
      >
        {loggingInAsGuest ? 'Logging In As Guest...' : 'Log In As Guest'}
      </button>
    </StyledRegisterPage>
  );
}

export default RegisterPage;
