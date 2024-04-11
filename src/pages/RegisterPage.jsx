import { StyledRegisterPage } from '../styles/RegisterPage.styled';
import { Link } from 'react-router-dom';

function RegisterPage() {
  function register(event) {
    event.preventDefault();
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
      <Link to="/">
        <button>Log In Page</button>
      </Link>
    </StyledRegisterPage>
  );
}

export default RegisterPage;
