import { useRouteError } from 'react-router-dom';
import { StyledErrorPage } from '../styles/ErrorPage.styled';

function ErrorPage() {
  const error = useRouteError();

  return (
    <StyledErrorPage>
      <h2>{error.status || 500}</h2>
      <h1>{error.statusText || 'Error'}</h1>
    </StyledErrorPage>
  );
}

export default ErrorPage;
