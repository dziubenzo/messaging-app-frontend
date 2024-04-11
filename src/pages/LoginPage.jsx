import { StyledLoginPage } from '../styles/LoginPage.styled';
import { Link } from 'react-router-dom';

function LoginPage() {
  function logIn(event) {
    event.preventDefault();
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
    </StyledLoginPage>
  );
}

export default LoginPage;
