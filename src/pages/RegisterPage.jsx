import { StyledRegisterPage } from '../styles/RegisterPage.styled';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import API_URL from '../API.js';
import { statusIcons, changeStatusIcon } from '../helpers.js';
import { toast } from 'react-toastify';
import { socket } from '../socket';

function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useOutletContext();

  // Register user
  async function register(event) {
    event.preventDefault();
    const toastRef = toast.info('Registering...');
    const formData = new FormData(event.target);
    const newUser = {
      username: formData.get('username').trim(),
      password: formData.get('password').trim(),
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
      return logInAfterRegister(newUser.username, newUser.password, toastRef);
    } catch (error) {
      toast.update(toastRef, { render: error, type: 'error' });
    }
  }

  // Log them in if registration successful
  async function logInAfterRegister(username, password, toastRef) {
    const user = {
      username,
      password,
    };
    toast.update(toastRef, { render: 'Logging in...' });
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const loggedInUser = await res.json();
    socket.emit(
      'change status icon',
      loggedInUser.user_id,
      statusIcons.unavailable,
    );
    await changeStatusIcon(loggedInUser, setUser, statusIcons.available);
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
        <button type="submit">Register</button>
      </form>
      <Link to="/login">
        <button>Log In Page</button>
      </Link>
    </StyledRegisterPage>
  );
}

export default RegisterPage;
