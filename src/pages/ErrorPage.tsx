import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { ApiError } from '../helpers';
import { StyledErrorPage } from '../styles/ErrorPage.styled';

function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <StyledErrorPage>
        <h2>{error.status}</h2>
        <h1>{error.statusText}</h1>
        <h3>{error.data}</h3>
        <Link to="/">Go Home</Link>
      </StyledErrorPage>
    );
  } else if (error instanceof ApiError) {
    return (
      <StyledErrorPage>
        <h2>{error.status}</h2>
        <h1>{error.message}</h1>
        <Link to="/">Go Home</Link>
      </StyledErrorPage>
    );
  } else if (error instanceof Error) {
    return (
      <StyledErrorPage>
        <h2>Something went wrong.</h2>
        <h1>{error.message}</h1>
        <Link to="/">Go Home</Link>
      </StyledErrorPage>
    );
  } else {
    return (
      <StyledErrorPage>
        <h2>Something went wrong.</h2>
        <h1>Please try again.</h1>
        <Link to="/">Go Home</Link>
      </StyledErrorPage>
    );
  }
}

export default ErrorPage;
