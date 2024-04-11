import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>{error.status}</h1>
      <h1>{error.statusText}</h1>
      <h1>{error.data || error.message}</h1>
    </div>
  );
}

export default ErrorPage;
