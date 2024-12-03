import {
  isRouteErrorResponse,
  Link,
  useAsyncError,
  useRouteError,
} from 'react-router-dom';
import { ApiError } from '../helpers';
import { StyledErrorPage } from '../styles/ErrorPage.styled';

function ErrorPage() {
  const error = useRouteError();

  const asyncError = useAsyncError();

  if (isRouteErrorResponse(error)) {
    return (
      <StyledErrorPage>
        <h2>{error.status}</h2>
        <h1>{error.statusText}</h1>
        <Link to="/">Back to Home Page</Link>
        <Link to="/login">Back to Log In Page</Link>
      </StyledErrorPage>
    );
  } else if (asyncError && asyncError instanceof ApiError) {
    return (
      <StyledErrorPage>
        <h2>{asyncError.status}</h2>
        <h1>{asyncError.message}</h1>
        {asyncError.status !== 401 && <Link to="/">Back to Home Page</Link>}
        <Link to="/login">Back to Log In Page</Link>
      </StyledErrorPage>
    );
  } else if (error instanceof ApiError) {
    return (
      <StyledErrorPage>
        <h2>{error.status}</h2>
        <h1>{error.message}</h1>
        <Link to="/">Back to Home Page</Link>
        <Link to="/login">Back to Log In Page</Link>
      </StyledErrorPage>
    );
  } else if (error instanceof Error) {
    return (
      <StyledErrorPage>
        <h2>Something went wrong.</h2>
        <h1>{error.message}</h1>
        <Link to="/">Back to Home Page</Link>
        <Link to="/login">Back to Log In Page</Link>
      </StyledErrorPage>
    );
  } else {
    return (
      <StyledErrorPage>
        <h2>Something went wrong.</h2>
        <h1>Please try again.</h1>
        <Link to="/">Back to Home Page</Link>
        <Link to="/login">Back to Log In Page</Link>
      </StyledErrorPage>
    );
  }
}

export default ErrorPage;
