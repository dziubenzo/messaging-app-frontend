import { StyledLoginPage } from '../styles/LoginPage.styled';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import API_URL from '../API';
import { changeStatusIcon, statusIcons } from '../helpers';
import { socket } from '../socket';
import { toast } from 'react-toastify';

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useOutletContext();

  // Log in user, change their status icon to available, set user state and navigate to the Home page on successful login
  // Make sure icon is changes and user state is set before navigating to the Home page
  // Otherwise show error message in toast
  async function logIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
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
    await changeStatusIcon(loggedInUser, setUser, statusIcons.available);
    toast.dismiss();
    return navigate('/home');
  }

  // Log in as guest
  async function logInAsGuest() {
    const user = {
      username: 'Guest',
      password: 'Guest',
    };
    toast.info('Logging in as Guest...');
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
        <button type="submit">Log In</button>
      </form>
      <Link to="/register">
        <button>Register Page</button>
      </Link>
      <button className="guest-account-btn" onClick={logInAsGuest}>
        Log In As Guest
      </button>
    </StyledLoginPage>
  );
}

export default LoginPage;
